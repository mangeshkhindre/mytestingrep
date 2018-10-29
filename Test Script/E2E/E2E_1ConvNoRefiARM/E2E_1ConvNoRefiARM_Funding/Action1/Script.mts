'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1467 - CONVNOCASHREFIARM- Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-1787 E2E_1ConvNoRefiARM_Funding
'@ TestData: 
   '1 Loans, Milestone and E2E_ConvNoRefiARM_Funding
   '2 Tools_FundingWorkSheet, SetFundingClosing and E2E_ConvNoRefiARM
   '3 Tools_FundingWorkSheet, SetWireInformation and E2E_ConvNoRefiARM
   '4 Tools_FundingWorkSheet, SetFundingSource and E2E_ConvNoRefiARM
'@ Pre-conditions: loan Number is in E2E Property file
'@ Description: N/A 
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1787","Script Name: E2E_1ConvNoRefiARM_Funding", Null

'====== PTAC-1467 - CONVNOCASHREFIARM- Funding 1- Complete the funding worksheet ======
RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
