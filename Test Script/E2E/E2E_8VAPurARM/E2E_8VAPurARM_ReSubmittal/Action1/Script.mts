'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
   '1 PTAC-2222 - Resubmittal 1-Get Rate Lock request and LO comp plan and Float
   '2 PTAC-2223 - Resubmittal 2-Get Rate Locked
   '3 PTAC-2224 - Resubmittal 3-Disclose lock confirmation
   '4 PTAC-2225 - Resubmittal 4-Finish Milestone
'@ Test Automation JIRA Task: PTAC-2404  E2E_8VAPURARM_Resubmittal
'@ TestData:
	'1 Global, Login and E2E_carollp
    '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '3 Loans, Milestone and E2E_VAPURARM_Processing
    '4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_VAPURARM
    '5 eFolder_Tab, SelecteDisclosureDocs and E2E_VAPURARM
    '6 eFolder_Tab, SendeDisclosures and E2E_VAPURARM
	'7 Globaldata, Loans and MilestoneDocument
	'8 Loans, LoanTemplate and E2E_SecondaryMarketing
	'9 Global, Login and E2E_Secondary
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Get Rate Lock request and LO comp plan and Float
   '2 Get Rate Locked
   '3 Disclose lock confirmation
   '4 Finish Milestone
'@ ExpectedResult: 
   'Loan should finish Re-submittal milestone 
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2404","Script Name: E2E_8VAPURARM_ReSubmittal", Null

'====== PTAC-2222 - Resubmittal 1-Get Rate Lock request and LO comp plan and Float ======
RunAction "Resubmittal_GetRateLockRequestAndLOCompPlanandFloat_001", oneIteration

'====== PTAC-2223 - Resubmittal 2-Get Rate Locked ======
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'====== PTAC-2224 - Resubmittal 3-Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'====== PTAC-2225 - Resubmittal 4-Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_004", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)
