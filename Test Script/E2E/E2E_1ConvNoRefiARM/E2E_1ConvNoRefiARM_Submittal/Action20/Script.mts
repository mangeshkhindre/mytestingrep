'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM 
'@ TestCase: 
   '1. PTAC-1365 - CONVNOCASHREFIARM -Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-1781 E2E_1ConvNoRefiARM_Submittal
'@ TestData:
	'1 Loans, Milestone and E2E_ConvNoRefiARM_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_ConvNoRefiARM
	'3 Forms_LoanEstimatePage, SetReasons and E2E_ConvNoRefiARM
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_ConvNoRefiARM
	'5 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
	'6 Global_Data, Website and E2E_ConvNoRefiARM
	'7 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
	'8 Loans, MilestoneDocument and E2E_ConvNoRefiARM_Submittal
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
   '6 Select documents page should open
   '7 Send edisclosure page with email message will be shown
   '8 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve the borrower signed documents".Esign document will open
   '9 The disclosure package has been sent to borrower window will open
   '10 Disclosure tracking tool page opens
   '11 Loan center page should open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed.
   '15 Submittal worksheet will open.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1365","Test Case Name - CONVNOCASHREFIARM -Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim strLoanNumber,objData
BIZ_2015Itemization_SetE2EBasicData "E2E_ConvNoRefiARM"
BIZ_LoanEstimatePage1_SetReason "E2E_ConvNoRefiARM"

'Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM_LE", "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM"

BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_ConvNoRefiARM_Borrower", "E2E_ConvNoRefiARM" @@ hightlight id_;_464508_;_script infofile_;_ZIP::ssf5.xml_;_

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_Submittal")

BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_ConvNoRefiARM_Submittal"

'Go to Qualification, AssignUser & check Finish check box ON
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_ConvNoRefiARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData =  Nothing
