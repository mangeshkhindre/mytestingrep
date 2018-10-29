'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2373 Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-2959 E2E_9VANoCORefiARM_Funding
'@ TestData:
	'1 Loans, Milestone and E2E_VANoCORefiARM_Funding
	'2 Tools_FundingWorkSheet, SetFundingClosing and E2E_VANoCORefiARM
	'3 Tools_FundingWorkSheet, SetWireInformation and E2E_VANoCORefiARM
	'4 Tools_FundingWorkSheet, SetFundingSource and E2E_VANoCORefiARM
	'5 Loans, LoanTemplate and E2E_Funder
	'6 Global_Data, Login and E2E_funder
'@ Pre-conditions: loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2959","Script Name: E2E_9VANoCORefiARM_Funding", Null

'===== Funding 1- Complete the funding worksheet =====
RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
