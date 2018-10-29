'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2041 Submittal 2- Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-2122 E2E_6FHAPURARM_Submittal
'@ TestData: 
	'1 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURARM
	'2 eFolder_Tab, SelectPlanCode and E2E_FHAPURARM
	'3 eFolder_Tab, SelecteDisclosureDocs  and E2E_FHAPURARM
	'4 eFolder_Tab, SendeDisclosures and E2E_FHAPURARM
 	'5 Global_Data, Website E2E_FHAPURARM_Borrower
 	'6 eFolder_Tab, SendeDisclosures and E2E_FHAPURARM
 	'7 Loans, MilestoneDocument and E2E_FHAPURARM_Submittal
'@ Pre-conditions:
'@ Description:  
'@ TestSteps:
   '01 Click on Forms and click on 2015 Itemization.Change Appraisal Fee to 600
   '02 Go to LE page 1 and do the following:
      'Check the checkbox for 'Revisions requested by consumer'
      'Click check box for changed circumstance
      'Select magnifying lens next to the changed circumstances and select ' change in loan amount'
   '03 Click e-folder
   '04 Click e-disclosure
   '05 Select a plan code-  Generic FHA fixed rate open term and click 'order disclosures' button.
   '06 Click ""order edisclosures"" button in the disclosures audit window
   '07 Select Loan Estimate and click send.Click 'ok' in the pop up message
   '08 Check the checkboxes for borrower and co borrower Select for borrower signing option " esign" option. 
       'For borrower authentication method select Authorization code from the dropdown and give 1111 
       'as borrower authorization and co-borrower authorization code. click send.
       'Click 'yes' in the pop up
   '09 Click 'Next' button and sign in all places and click 'Finish' button
   '10 Click ok
   '11 Login to Gmail as borrower.click on to electronic loan document request
   '12 Sign-in to loan center with credentials
       'Email- integrationborrower@gmail.com
       'Password - Respa15   
   '13 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '14 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
   '15 Under log tab click on 'submittal'.Click magnifying lens next to underwriter. Select 'janet' and click ok
'@ ExpectedResult:
   '01 2015 Itemization should open.Appraisal Fee should change
   '02 LE page should open and should be able to select all check boxes
   '03 E-folder should open
   '04 Send E-disclosure window should open
   '05 Disclosure Audit window opens
   '06 'Select documents' page should open
   '07 Send edisclosure page with email message will be shown
   '08 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve the borrower signed documents".Esign document will open
   '09 The disclosure package has been sent to borrower window will open
   '10 Disclosure tracking tool page opens ( LE received date is shown).
   '11 Loan center page should open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed.
   '15 Submittal worksheet will open.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:  PTAC-2041","TestCase Name - Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim objData, objDatafee,objDataLE, objLEPage1, objdialog, objFeeDetailsPage, strLoanNumber

Set objData 		  = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Submittal")
Set objDatafee        = FRM_DS_GetTestData("Forms_2015Itemization", "ChangeApprisalFee", "E2E_FHAPURARM")
Set objDataLE 	  	  = FRM_DS_GetTestData("Forms_LoanEstimatePage", "SetReasons", "E2E_FHAPURARM")
Set objLEPage1 		  = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objdialog   	  = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector")
Set objFeeDetailsPage = SwfWindow("swfname:=MainForm").Page("index:=0")

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"
Wait g_ShortWaitMedium    'Wait is used to handle sync

'Change Appraisal Fee to 600.
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDatafee, "ApprisalFee")) Then
   GUI_WebEdit_Set objFeeDetailsPage.WebEdit("html id:=l_640"), FRM_DS_GetValue(objDatafee, "ApprisalFee")
End If

'Open Loan Estimate Page 1
BIZ_Forms_ShowAll
BIZ_Forms_Open "Loan Estimate Page 1"
Wait g_ShortWaitMedium		'Wait is used to handle sync

'Check Revisions requested by the Consumer
 If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataLE, "RevisionsRequest")) Then
    GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"), FRM_DS_GetValue(objDataLE, "RevisionsRequest") 
 End If 
 
'Click check box for changed circumstance.
 If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataLE, "3168_ChangedCircumstance")) Then
    GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_3168_Ctrl"), FRM_DS_GetValue(objDataLE, "3168_ChangedCircumstance") 
 End If 

'Select magnifying lens next to the changed circumstances and select ' change in loan amount'
Set objFeeDetailsPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
GUI_Image_Click objFeeDetailsPage.WebButton("html id:=stdbtn_3169").Image("file name:=search.png")
Wait g_ShortWaitMedium	'Due to Sync issue explicitly added Wait statement

Set objdialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector")
GUI_List_ClickRow objdialog.SwfObject("swfname:=listViewOptions"), objdialog.SwfScrollBar("swfname:=vPanelScrollBar"), "Changed Circumstance", "change in loan amount", True, False, False, "Single"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=controlStrip").swfButton("swfname:=btnOK")
Wait g_ShortWaitMedium	'Due to Sync issue explicitly added Wait statement
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=controlStrip").swfButton("swfname:=btnCancel")
Wait g_ShortWaitMedium	'Due to Sync issue explicitly added Wait statement

'Open the eFolder Screen and Send eDisclosure informations
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHAPURARM", "E2E_FHAPURARM_LE", "E2E_FHAPURARM", "E2E_FHAPURARM"

'Login to Loan Center a Borrower and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURARM_Borrower","E2E_FHAPURARM"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Submittal")
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objData, "NextUser")

If  BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted") Then
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_FHAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 		  = Nothing
Set objDatafee        = Nothing
Set objDataLE 	  	  = Nothing
Set objLEPage1 		  = Nothing
Set objdialog   	  = Nothing
Set objFeeDetailsPage = Nothing
