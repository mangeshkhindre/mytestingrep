'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2321 Qualification 3 - edisclosures
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification 
'@ TestData:
   'eFolder_Tab, SendeDisclosures, E2E_VANoCORefiARM
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '01 Click e-folder. Click e-disclosure. Select a plan code- Generic 5/1 Treasury ARM and click 'order disclosures' button
   '02 Click on the fields and clear any audits which are in red color.(Ignore others which are black). click refresh audit button
   '03 Click "order edisclosures" button in the disclosures audit window
   '04 Click Add additional docs button.Select Loan Estimate and click add
   '05 Un-Check if all documents are selected and Click send only loan estimate
   '06 Select for borrower signing option "esign + wetsign" option
 	   'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code
 	   'click send
   '07 Click ok. Login to Gmail as borrower. click on to electronic loan document request
   '08 Sign-in to loan center with the following credentials
  	   'Email- integrationborrower@gmail.com
  	   'Password - Respa15
   '09 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '10 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
   '11 In the loan center page under print sign and upload documents, Click upload add any 2pdf documents
   '12 In Encompass in disclosure tracking.click on the line item under disclosure history and check on "Intent to proceed" and click 'ok'
'@ ExpectedResult: 
   '01 E-folder should open.Send E-disclosure window should open
   '02 Disclosure Audit window opens.Window should refresh.'Select documents' page should open
   '03 A list of additional documents will be shown
   '04 The selected documents has been added to the list based on current stacking order- message will appear
   '05 Send edisclosure page with email message will be shown. Window opens with the following message"Package includes one or more documents 
	   'that require originators e-signature"
   '06 An email message has been sent to originator" message will be shown in a new window
   '07 Disclosure tracking tool is shown with(LE received date is shown)
   '08 Loan detail page with e-sign will be shown.Document should open
   '09 In the loan center page it should show e-signed
   '10 Uploaded with a green tick mark will be shown in loan center page
   '11 Disclosure details window will open
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2321","Qualification 3 - edisclosures", Null

Dim strLoanNumber,strExpected
BIZ_Loan_SaveLoanNumber()

'Send eDisclosure information
blneDisclosureStatus = BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure("E2E_VANoCORefiARM", "E2E_VANoCORefiARM", "E2E_VANoCORefiARM", "E2E_VANoCORefiARM")

If(blneDisclosureStatus = 0) Then 
	'Login to Loan Center as Borrower and Perform Sign
	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VANoCORefiARM_Borrower", "E2E_VANoCORefiARM"

	'Login to Loan Center as CoBorrower and Perform eSign
	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VANoCORefiARM_CoBorrower", "E2E_VANoCORefiARM"
End If

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

BIZ_Tools_Open "Disclosure Tracking"

'Validate if LE received date is populated
strExpected = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname path:=txtDate;dpLEReceived;.*"),"text")
FRM_VerifyTrue UTIL_String_IsNotEmpty(strExpected), "LE Received Date", "LE Received Date is populated"

'Moves the Document History contents Intent to Proceed to top
'SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory").Click 1126,10 @@ hightlight id_;_4984852_;_script infofile_;_ZIP::ssf1.xml_;_
'SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory").Click 1126,10 @@ hightlight id_;_4984852_;_script infofile_;_ZIP::ssf2.xml_;_

'Click on recent disclosure record
BIZ_DisclosureTrackingTool_ClickRecord "Method", "eFolder eDisclosures", "Double"

'Set "Intent to Proceed" checkbox after disclosure record is opened
BIZ_DisclosureTrackingTool_SetIntentToProceed "ON"

'Close the disclosure record window
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
