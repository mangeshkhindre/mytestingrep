'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
    '1 PTAC-2360 Resubmittal 1- Get Rate Lock request and LO comp plan and Float.
    '2 PTAC-2361 Resubmittal 2- Get Rate Locked
    '3 PTAC-2362 Resubmittal 3- Disclose lock confirmation
    '4 PTAC-2363 Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-2961 E2E_9VANoCORefiARM_ReSubmittal
'@ TestData:
	'1 Loans, Milestone and E2E_VANoCORefiARM_ReSubmittal
    '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'3 Loans, LoanTemplate and E2E_SecondaryMarketing
	'4 Global, Login and E2E_markuslp
    '5 Loans, Milestone and E2E_VAPURARM_Processing
    '6 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_VAPURARM
    '7 eFolder_Tab, SelecteDisclosureDocs and E2E_VAPURARM
    '8 eFolder_Tab, SendeDisclosures and E2E_VAPURARM
	'9 Globaldata, Loans MilestoneDocument
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Disclose Lock Confirmation
   '2 Finish Milestone
'@ ExpectedResult: Loan should finish Re-submittal milestone 
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2961","Script Name: E2E_9VANoCORefiARM_ReSubmittal", Null

'====== Get Rate Lock Request and LO complan and Float ======
RunAction "Resubmittal_GetRateLockRequestAndLOcompplanandFloat_001", oneIteration

'====== Get Rated Locked ======
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'====== Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'====== Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_004", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)