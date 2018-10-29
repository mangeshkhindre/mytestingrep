'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: PTAC-1150 - HP Resubmittal 1- Assign UnderWriter & Accept File
'@ Test Automation JIRA Task: PTAC--1172
'@ TestData: 
'@ Pre-conditions: 
'@ Description: Order title and closing and finish milestone.
'@ TestSteps:
	'1 Click on Log > Resubmittal
	'2 Click the magnify glass and select the default Underwriter
	'3 Select ‘Accept File’ button.
'@ ExpectedResult: System should give alert message as 'Milestone alert has been cleared'.
'**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1150","TestCase Name - HP Resubmittal 1- Assign UnderWriter & Accept File", Null

Dim strLoanNumber, objDataLoanTemplate, objDataCondApp
Set objDataLoanTemplate = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objDataCondApp 		= FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_ReSubmittal")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objDataLoanTemplate, "PipeLineView"), FRM_DS_GetValue(objDataLoanTemplate, "LoanFolder")
'Retrieve the Loan Number 

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS5Complete_HappyPath","Resubmittal"

BIZ_Loan_AcceptFiles "Resubmittal", FRM_DS_GetValue(objDataCondApp, "NextUser")

Set objDataLoanTemplate = Nothing
Set objDataCondApp      = Nothing
