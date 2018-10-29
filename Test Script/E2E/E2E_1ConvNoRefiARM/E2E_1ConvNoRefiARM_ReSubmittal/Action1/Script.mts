'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1396 - CONVNOCASHREFIARM-Resubmittal 1- Get Rate Lock request and LO comp plan and Float
   '2 PTAC-1397 - CONVNOCASHREFIARM-Resubmittal 2- Get Rate Locked
   '3 PTAC-1404 - CONVNOCASHREFIARM-Resubmittal 3- Disclose lock confirmation
   '4 PTAC-1405 - CONVNOCASHREFIARM-Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-1786 E2E_1ConvNoRefiARM_ReSubmittal
'@ TestData: 
   'Global, Login and E2E_markuslp
   'Loans, LoanTemplate and E2E_HappyPath
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Resubmittal 1-Get Rate Lock request and LO comp plan and Float
   '2 Resubmittal 2- Get Rate Locked
   '3 Resubmittal 3- Disclose lock confirmation
   '4 Resubmittal 4- Finish Milestone
'@ ExpectedResult: 
   '1 Loan should finish Re-submittal milestone 
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1786","Script Name: E2E_1ConvNoRefiARM_ReSubmittal", Null

'====== CONVNOCASHREFIARM-Resubmittal 1- Get Rate Lock request and LO comp plan and Float ======
RunAction "Resubmittal-GetRateLockRequestLOCompPlanFloat_001", oneIteration

'====== CONVNOCASHREFIARM-Resubmittal 2- Get Rate Locked ======
RunAction "Resubmittal-GetRateLocked_002", oneIteration

'====== CONVNOCASHREFIARM-Resubmittal 3- Disclose lock confirmation ======
RunAction "Resubmittal-DiscloseLockConfirmation_003", oneIteration

'====== CONVNOCASHREFIARM-Resubmittal 4- Finish Milestone ======
RunAction "Resubmittal-FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)
