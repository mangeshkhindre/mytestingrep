'***************************************************************************************************
'@ TestStory : PTAC-2703 E2E_7FHACORefiARM
'@ TestCase	 :	
	'1 PTAC-2671 FHACOREFIARM Resubmittal 1-Get Rate Lock request and LO comp plan and Float.
	'2 PTAC-2672 FHACOREFIARM Resubmittal 2-Get Rate Locked
    '3 PTAC-2673 FHACOREFIARM Resubmittal 3-Disclose Lock Confirmation
    '4 PTAC-2675 FHACOREFIARM Resubmittal 4-Finish Milestone
'@ Test Automation JIRA Task: PTAC-2719 E2E_7FHACORefiARM_ReSubmittal
'@ TestData	: Global_Data
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   'Disclose Lock Confirmation
   'Finish Milestone
'@ ExpectedResult: 
   'Loan should finish Re-submittal milestone 
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2719","Script Name: E2E_7FHACORefiARM_ReSubmittal", Null

'====== PTAC-2671 - FHACOREFIARM Resubmittal 1-Get Rate Lock request and LO comp plan and Float ======
RunAction "Resubmittal_GetRateLockRequestandLOCompPlanAndFloat_001", oneIteration

'====== PTAC-2672 - FHACOREFIARM Resubmittal 2- Get Rate Locked ======
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'====== PTAC-2673 FHACOREFIARM Resubmittal 3- Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'====== PTAC-2675 FHACOREFIARM Resubmittal 3- Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_004", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)
