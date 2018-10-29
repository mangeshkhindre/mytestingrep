'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1137 - HP Conditional Approval 1-Assign to Loan Processor & Accept File
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: 
	'Loans/LoanTemplate/E2E_HappyPath 
	'Loans/Milestone/E2E_HapppyPath_ConditionalApproval
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description:  Assign to Loan Processor & Accept File
'@ TestSteps:
	'1 Click on Log > Conditional Approval.
	'2 Click the magnify glass and select the default Loan Processor.
	'3 Select ‘Accept File’ button.
'@ ExpectedResult: 
	'1 System should give alert message as  'Milestone alert has been cleared'.
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1137","TestCase Name - HP Conditional Approval 1-Assign to Loan Processor & Accept File", Null

Dim strLoanNumber, objDataCondApp, objData
Set objData 		= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objDataCondApp  = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HapppyPath_ConditionalApproval")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'search for loans with MS4Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_HappyPath","Cond. Approval"

BIZ_Loan_AcceptFiles "Cond. Approval", FRM_DS_GetValue(objDataCondApp, "NextUser")

Set objData 		= Nothing
Set objDataCondApp  = Nothing
