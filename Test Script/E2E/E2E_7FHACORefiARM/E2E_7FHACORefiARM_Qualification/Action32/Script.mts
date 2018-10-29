'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2418 - FHACOREFIARM Qualification 3 - edisclosures
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualification
'@ TestData: 
   '1 Services,Underwriting and E2E_FHACORefiARM
   '2 eFolder_Tab,SendeDisclosures and E2E_FHACORefiARM
   '3 eFolder_Tab,SelectPackageTypeAndPlanCode and E2E_FHACORefiARM
   '4 eFolder_Tab,SelecteDisclosureDocs and E2E_FHACORefiARM
   '5 Global_Data,Website and E2E_FHACORefiARM_Borrower
   '6 Global_Data,Website and E2E_FHACORefiARM_CoBorrower
'@ Pre-conditions: 
'@ Description:
'@ TestSteps:
   '1 Click e-folder 
   '2 Click e-disclosure 
   '3 Select a plan code-  Generic 5/1 Treasury ARM and click 'order disclosures' button 
   '4 Click on the fields and clear any audits which are in red color (Ignore others which are black)  click refresh audit button 
   '5 Click "order edisclosures" button in the disclosures audit window  
   '6 Click Add additional docs button 
   '7 Select Loan Estimate and click add 
   '8 Check if all documents are selected and Click send in the select documents window 
   '9 Select for borrower signing option " esign + wetsign" option For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
   '10 Click 'Next' button and sign in all places and click 'Finish' button.
   '11 Click ok 
   '12 Login In gmail with click on to electronic loan document request 
   '13 Sign-in to loan center with the following credentials
   '14 Click on to e-sign and give authorisation code as 1111 for borrower and click next 
   '15 Click on document and click next. click 'adopt and sign'  click on required -sign here in all places and click finish 
   '16 In the loan center page under print sign and upload documents,Click upload add any 2pdf documents 
   '17 In Encompass in disclosure tracking  click on the line item under disclosure history and check on "Intent to proceed" and click 'ok' 
'@ ExpectedResult: 
   '1 E-folder should open 
   '2 Send E-disclosure window should open 
   '3 Disclosure Audit window opens 
   '4 After filling those fields in red(if any) 
   '5 Select documents page should open 
   '6 A list of additional documents will be shown 
   '7 The selected documents has been added to the list based on current stacking order- message will appear 
   '8 Send edisclosure page with email message will be shown 
   '9 Window opens with the following message""Package includes one or more documents that require originators e-signature 
   '10 "An email message has been sent to originator" message will be shown in a new window 
   '11 Disclosure tracking tool is shown with(LE recieved date is shown) 
   '12 Loan center should open 
   '13 Loan detail page with e-sign will be shown 
   '14 Document should open 
   '15 In the loan center page it should show e-signed 
   '16 Uploaded with a green tick mark will be shown in lan center page 
   '17 Disclosure details window will open 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2418","FHACOREFIARM Qualification 3 - edisclosures", Null

Dim strLoanNumber

'Send eDisclosure information

blneDisclosureStatus = BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure("E2E_FHACORefiARM", "E2E_FHACORefiARM", "E2E_FHACORefiARM", "E2E_FHACORefiARM")

If(blneDisclosureStatus = 0) Then 
	'Login to Loan Center as Borrower and accept eSign 
	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHACORefiARM_Borrower", "E2E_FHACORefiARM"

	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHACORefiARM_CoBorrower", "E2E_FHACORefiARM"

	GUI_Dialog_Encompass_OKX 10, ""

	Wait g_TinyWaitLarge
End If

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
