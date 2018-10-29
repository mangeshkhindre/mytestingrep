'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase:  PTAC-2732 FHACOREFIARM Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-2723 E2E_7FHACORefiARM_Funding
'@ TestData: 
   '1 Loans,Milestone and E2E_FHACORefiARM_Funding
   '2 Tools_FundingWorkSheet,SetFundingClosing and E2E_FHACORefiARM
   '3 Tools_FundingWorkSheet,SetWireInformation and E2E_FHACORefiARM
   '4 Tools_FundingWorkSheet,SetFundingSource and E2E_FHACORefiARM
   '5 Loans, LoanTemplate, E2E_Funder
   '6 Global_Data, Login and E2E_funder
'@ Pre-conditions: loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2723","Script Name: E2E_7FHACORefiARM_Funding", Null

'====PTAC-2732 FHACOREFIARM Funding 1- Complete the funding worksheet===
RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
