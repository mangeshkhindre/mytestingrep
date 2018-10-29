'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3220 FHAPURCHASEFIX- Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-3286 E2E_4FHAPURCASHFIX_Funding
'@ TestData: 
	'1 Loans, Milestone, E2E_FHAPURCASHFIX_Funding
	'2 Tools_FundingWorkSheet, SetFundingClosing, E2E_FHAPURCASHFIX
	'3 Tools_FundingWorkSheet, SetWireInformation, E2E_FHAPURCASHFIX
	'4 Tools_FundingWorkSheet, SetFundingSource, E2E_FHAPURCASHFIX
	'5 Loans, LoanTemplate, E2E_Funder
	'6 Global_Data, Login, E2E_Funder
'@ Pre-conditions: loan Number that finished approval milestone is in Encompaass
'@ Description: N/A 
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3220","Script Name - E2E_4FHAPURCASHFIX_Funding", Null

RunAction "Funding_CompleteFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
