'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM 
'@ TestCase : PTAC-2656 - FHACOREFIARM Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-2717 E2E_7FHACORefiARM_Submittal
'@ TestData: 
	'1 Loans, Milestone and E2E_FHACORefiARM_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_FHACORefiARM
	'3 Forms_LoanEstimatePage, SetReasons and E2E_FHACORefiARM
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHACORefiARM
	'5 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
	'6 Global_Data, Website and E2E_FHACORefiARM
	'7 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
	'8 Loans, MilestoneDocument and E2E_FHACORefiARM_Submittal
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Forms and click on 2015 Itemization.Change Appraisal Fee to 600
   '2 Go to LE page 1 and do the following:
   '3 Check the checkbox for 'Revisions requested by consumer'
   '4 Click check box for changed circumstance
   '5 Select magnifying lens next to the changed circumstances and select ' change in loan amount'
   '6 Click e-folder
   '7 Click e-disclosure
   '8 Select a plan code-  Generic 5/1 Libor ARM (WSJ)and click 'order disclosures' button
   '9 Click "order edisclosures" button in the disclosures audit window
   '10 Select Loan Estimate and click send.Click 'ok' in the pop up message
   '11 Check the checkboxes for borrower and co borrower
   '12 Click 'yes' in the pop up
   '13 Click 'Next' button and sign in all places and click 'Finish' button
   '14 Click ok
   '15 Login to Gmail as borrower.click on to electronic loan document request
   '16 Sign-in to loan center with credentials 
   '17 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '18 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
   '19 Under log tab click on 'submittal'.Click magnifying lens next to underwriter. Select 'markusuw' and click ok
'@ ExpectedResult:
   '1 2015 Itemization should open.Appraisal Fee should change
   '2 LE page should open and should be able to select all check boxes
   '3 E-folder should open
   '4 Send E-disclosure window should open
   '5 Disclosure Audit window opens
   '6 'Select documents' page should open
   '7 Send edisclosure page with email message will be shown
   '8 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve the borrower signed documents".Esign document will open
   '9 The disclosure package has been sent to borrower window will open
   '10 Disclosure tracking tool page opens
   '11 Loan center page should open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed.
   '15 Submittal worksheet should open.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2656","Test Case Name - FHACOREFIARM Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim strLoanNumber,objData
BIZ_2015Itemization_SetE2EBasicData "E2E_FHACORefiARM"
BIZ_LoanEstimatePage1_SetReason "E2E_FHACORefiARM"

'Send eDisclosure information
blneDisclosureStatus = BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure("E2E_FHACORefiARM", "E2E_FHACORefiARM_LE", "E2E_FHACORefiARM", "E2E_FHACORefiARM")
If( blneDisclosureStatus = 0) Then 
	'Login to Loan Center and Accept eSignature
	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHACORefiARM_Borrower", "E2E_FHACORefiARM"
End If

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_Submittal")
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_FHACORefiARM_Submittal"

'Go to Qualification, AssignUser & check Finish check box ON
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_FHACORefiARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData =  Nothing
