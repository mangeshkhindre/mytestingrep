'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase : PTAC-2206 - Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC- 2412 E2E_8VAPURARM_Submittal
'@ TestData:
	'1 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_VAPURARM
	'2 eFolder_Tab, SelectPlanCode, E2E_VAPURARM
	'3 eFolder_Tab, SelecteDisclosureDocs, E2E_VAPURARM
	'4 eFolder_Tab, SendeDisclosures, E2E_VAPURARM
 	'5 Global_Data, Website E2E_VAPURARM_Borrower
 	'6 eFolder_Tab, SendeDisclosures, E2E_VAPURARM
 	'7 Loans, MilestoneDocument, E2E_VAPURARM_Submittal
'@ Pre-conditions:
'@ Description:  
'@ TestSteps:
   '1 Click on Forms and click on 2015 Itemization.Change Appraisal Fee to 600
   '2 Go to LE page 1 and do the following:
   '3 Check the checkbox for 'Revisions requested by consumer'
   '4 Click check box for changed circumstance
   '5 Select magnifying lens next to the changed circumstances and select ' change in loan amount'
      '(prerequisite-if not found, needed to be added in Loan Setup as an admin)
   '6 Click e-folder
   '7 Click e-disclosure
   '8 Select a plan code-  VA 5/1 Treasury ARM open term and click 'order disclosures' button.
   '9 Click ""order edisclosures"" button in the disclosures audit window
   '10 Select Loan Estimate and click send.Click 'ok' in the pop up message
   '11 Check the checkboxes for borrower and co borrower
       'Select for borrower signing option " esign" option. For borrower authentication method select Authorization code from the dropdown 
	   'and give 1111 as borrower authorization and co-borrower authorization code. click send.
   '12 Click 'yes' in the pop up
   '13 Click 'Next' button and sign in all places and click 'Finish' button
   '14 Click ok
   '15 Login to Gmail as borrower.click on to electronic loan document request
   '16 Sign-in to loan center with credentials 
       'Email- integrationborrower@gmail.com
       'Password - Respa15
   '17 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '18 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
   '19 Under log tab click on 'submittal'.Click magnifying lens next to underwriter. Select 'sol'  and click ok
'@ ExpectedResult:
   '1 2015 Itemization should open.Appraisal Fee should change
   '2 LE page should open and should be able to select all check boxes
   '3 E-folder should open
   '4 Send E-disclosure window should open
   '5 Disclosure Audit window opens
   '6 An error message should open. 'Select documents' page should open.
   '7 Send edisclosure page with email message will be shown
   '8 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve the borrower signed documents".
      'Esign document will open
   '9 The disclosure package has been sent to borrower window will open
   '10 Disclosure tracking tool page opens
   '11 Loan center page should open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed.
   '15 Submittal worksheet will open.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2206","Test Case Name - Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim objData, objLEPage1, objFeeDetailsPage, objDatafee, objdialog, objDataLE, strLoanNumber

Set objData 		  = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Submittal")
Set objDatafee  	  = FRM_DS_GetTestData("Forms_2015Itemization", "ChangeApprisalFee", "E2E_VAPURARM")
Set objDataLE 		  = FRM_DS_GetTestData("Forms_LoanEstimatePage", "SetReasons", "E2E_VAPURARM")
Set objLEPage1 		  = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objdialog		  = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector")
Set objFeeDetailsPage = SwfWindow("swfname:=MainForm").Page("index:=0")

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"
Wait g_ShortWaitMedium

'Change Appraisal Fee to 600.
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDatafee, "ApprisalFee")) Then
   GUI_WebEdit_Set objFeeDetailsPage.WebEdit("html id:=l_640"), FRM_DS_GetValue(objDatafee, "ApprisalFee")
End If

'Open Loan Estimate Page 1
BIZ_Forms_ShowAll
BIZ_Forms_Open "Loan Estimate Page 1"
Wait g_ShortWaitMedium

'Check Revisions requested by the Consumer
 If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataLE, "RevisionsRequest")) Then
    GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"), FRM_DS_GetValue(objDataLE, "RevisionsRequest") 
 End If 
 
'Click check box for changed circumstance.
 If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataLE, "3168_ChangedCircumstance")) Then
    GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_3168_Ctrl"), FRM_DS_GetValue(objDataLE, "3168_ChangedCircumstance") 
 End If 

'Select magnifying lens next to the changed circumstances and select ' change in loan amount'
Set objFeeDetailsPage=SwfWindow("swfname:=MainForm").Page("micclass:=Page")
GUI_Image_Click objFeeDetailsPage.WebButton("html id:=stdbtn_3169").Image("file name:=search.png")
Wait g_ShortWaitMedium	'Due to Sync Issue explicitly added wait statement

Set objdialog=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector")
GUI_List_ClickRow objdialog.SwfObject("swfname:=listViewOptions"), objdialog.SwfScrollBar("swfname:=vPanelScrollBar"), "Changed Circumstance", "change in loan amount", True, False, False, "Single"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=controlStrip").swfButton("swfname:=btnOK")
Wait g_ShortWaitMedium 'Due to Sync Issue explicitly added wait statement

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=controlStrip").swfButton("swfname:=btnCancel")
Wait g_ShortWaitMedium  'Due to Sync Issue explicitly added wait statement  

'Open the eFolder Screen and Send eDisclosure informations
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_VAPURARM", "E2E_VAPURARM_LE", "E2E_VAPURARM", "E2E_VAPURARM"

'Login to Loan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VAPURARM_Borrower","E2E_VAPURARM"
        
'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"

BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_VAPURARM_Submittal"

BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData  		  =  Nothing
Set objDatafee		  =  Nothing
Set objDataLE		  =  Nothing
Set objLEPage1		  =  Nothing
Set objdialog  		  =  Nothing
Set objFeeDetailsPage =  Nothing
