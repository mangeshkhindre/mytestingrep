'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3486 CONVCASHOUTREFIFIX Funding 1- Complete the funding worksheet 
'@ Test Automation JIRA Task: PTAC-3381 E2E_3CONVCASHOUTREFIFIX_Funding
'@ TestData: 
   '1 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_Funding
   '2 Tools_FundingWorkSheet, SetFundingClosing and E2E_CONVCASHOUTREFIFIX
   '3 Tools_FundingWorkSheet, SetWireInformation and E2E_CONVCASHOUTREFIFIX
   '4 Tools_FundingWorkSheet, SetFundingSource and E2E_CONVCASHOUTREFIFIX
   '5 Loans, LoanTemplate and E2E_Funder
'@ Pre-conditions: loan Number is in E2E Property file
'@ Description: N/A 
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3381","Script Name: E2E_3CONVCASHOUTREFIFIX_Funding", Null

RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
