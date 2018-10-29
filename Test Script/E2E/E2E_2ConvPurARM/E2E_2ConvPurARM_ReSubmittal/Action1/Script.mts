'***************************************************************************************************
'@ TestStory : PTAC-871  E2E_2CONVPURARAM
'@ TestCase : 
   '1 PTAC-800 - Resubmittal 1 - Disclose Lock Confirmation
   '2 PTAC-850 - Resubmittal 2 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-1020  E2E_2CONVPURARM_ReSubmittal
'@ TestData:
   '1 Global, Login, E2E_markuslp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3 Loans, Milestone, E2E_CONVPURARM_Processing
   '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_CONVPURARM
   '5 eFolder_Tab, SelecteDisclosureDocs, E2E_CONVPURARM_LockConfirmation
   '6 eFolder_Tab, SendeDisclosures, E2E_CONVPURARM
   '7 Loans, MilestoneDocument and E2E_CONVPURARM_ReSubmittal
   '8 Loans, Milestone and E2E_CONVPURARM_ReSubmittal
'@ Pre-conditions : Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Disclose Lock Confirmation
   '2 Finish Milestone
'@ ExpectedResult: Loan should finish Re-submittal milestone 
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1020","Script Name: E2E_2CONVPURARM_ReSubmittal", Null

'====== PTAC-800 - Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_001", oneIteration

'====== PTAC-850 - Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_002", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)
