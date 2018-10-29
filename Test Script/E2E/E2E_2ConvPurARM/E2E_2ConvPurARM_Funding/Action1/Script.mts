'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase : PTAC-1057 - Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-1073 E2E_2CONVPURARM_Funding
'@ TestData: 
	'1 Loans, Milestone, E2E_CONVPURARM_Funding
	'2 Tools_FundingWorkSheet, SetFundingClosing, E2E_CONVPURARM
	'3 Tools_FundingWorkSheet, SetWireInformation, E2E_CONVPURARM
	'4 Tools_FundingWorkSheet, SetFundingSource, E2E_CONVPURARM
	'5 Loans, LoanTemplate, E2E_Funder
	'6 Global_Data, Login, E2E_Funder
'@ Pre-conditions: loan Number is in E2E Property file
'@ Description: N/A 
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1073","Script Name: E2E_2CONVPURARM_Funding", Null

RunAction "Funding_CompleteFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
