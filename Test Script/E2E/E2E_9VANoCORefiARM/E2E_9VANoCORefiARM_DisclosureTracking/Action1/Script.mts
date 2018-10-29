'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2324 Disclosure Tracking1- Validate dislosure Tracking
'@ Test Automation JIRA Task: PTAC-2915 E2E_9VANoCORefiARM_DisclosureTracking
'@ TestData: 
   '1 Global_Data, Login, E2E_carollp
   '2 Loans, Milestone, E2E_VANoCORefiARM_DisclosureTracking 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
 	'1 Login to encompass with the provided credentials.
	'2 Click on 'Accept File' button.
	'3 Click 'ok' in the pop up.
	'4 click tools and click disclosure tracking.
	'5 Verify if all the compliance timeline dates and LE Tracking dates are populated except the safeharbor sent date.
	'6 Under disclosure history select a disclosure by double clicking on it.
	'7 Verify if the following fields are editable:
	   'Disclosure type dropdown
	   'Intent to proceed checkbox
	   'If not disclosed
	   'received method dropdown
	   'presumed received date lockbox and textbox
	   'actual received date combo box
	   'loan estimate disclosed by broker checkbox
    '8 Click on disclosure tracking and click finished milestone.
'@ ExpectedResult: 
   '1 Should be able to login.
   '2 Disclosure tracking tool will open.
   '3 All the dates are populated.
   '4 Disclosure details window will open.
   '5 All the fields are non-editable.(intent to proceed will be editable if it is a first time LE and non-editable if it is a revised LE.)
   '6 Milestone should be finished.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2915","Script Name:E2E_9VANoCORefiARM_DisclosureTracking", Null

Dim objData,objDataProcessing
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2324","Disclosure Tracking1- Validate dislosure Tracking", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_carollp"

Set objData           = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_DisclosureTracking")
 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_VANoCORefiARM","Disc. Tracking"
BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()
BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_DisclosureTracking")
BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objData, "NextUser")

'====== Saves the Loan Details  ======
BIZ_Loan_SaveLoanNumber()

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_VANoCORefiARM"
End If

'===== Exists the Loan Details =====
BIZ_Loan_Exit True

'===== Logs out of Encompass =====
BIZ_Login_UserLogout()

Set objData 				 = Nothing
Set objDataProcessing        = Nothing

FRM_RT_TearDownTest(Null)