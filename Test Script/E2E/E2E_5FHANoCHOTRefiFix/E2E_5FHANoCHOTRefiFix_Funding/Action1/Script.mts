'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase:  PTAC-2186 FHANOCHOTREFIFIX Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-2709 E2E_5FHANoCHOTRefiFix_Funding
'@ TestData: 
   '1 Loans, Milestone and E2E_FHANoCHOTRefiFix_Funding
   '2 Tools_FundingWorkSheet and SetFundingClosing,E2E_FHANoCHOTRefiFix
   '3 Tools_FundingWorkSheet and SetWireInformation,E2E_FHANoCHOTRefiFix
   '4 Tools_FundingWorkSheet and SetFundingSource,E2E_FHANoCHOTRefiFix
   '5 Global_Data, Login and E2E_funder
   '6 Loans, LoanTemplate and E2E_Funder
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: FHANOCHOTREFIFIX Funding 1- Complete the funding worksheet
'@ ExpectedResult: Funding Milestone is completed for script
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2709","Script Name - E2E_5FHANoCHOTRefiFix_Funding", Null

'====== FHANOCHOTREFIFIX Funding 1- Complete the funding worksheet ======
RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
