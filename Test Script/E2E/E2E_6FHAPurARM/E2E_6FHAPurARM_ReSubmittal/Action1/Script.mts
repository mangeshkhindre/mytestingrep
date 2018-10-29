'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase: 
   'PTAC-2046 Resubmittal 1- Get Rate Lock request and LO comp plan and Float
   'PTAC-2047 Resubmittal 2- Get Rate Locked
   'PTAC-2048 Resubmittal 3- Disclose lock confirmation
   'PTAC-2049 Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-2125 E2E_6FHAPURARM_ReSubmittal
'@ TestData:
    '1 Global, Login, E2E_markuslp
    '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
    '3 Loans, Milestone, E2E_FHAPURARM_Processing
    '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURARM
    '5 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURARM_LockConfirmation
    '6 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
    '7 Loans, MilestoneDocument and E2E_FHAPURARM_ReSubmittal
    '8 Loans, Milestone and E2E_FHAPURARM_ReSubmittal
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Get Rate Lock request and LO comp plan and Float
    '2 Get Rate Locked
    '3 Disclose lock confirmation
    '4 Finish Milestone
'@ ExpectedResult: Loan should finish Re-submittal milestone 
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2125","Script Name: E2E_6FHAPURARM_ReSubmittal", Null

'===== Resubmittal 1-Get Rate Lock request and LO comp plan and Float =====
RunAction "Resubmittal_GetRateLockRequestAndLOcompPlanAndFloat_001", oneIteration

'===== Resubmittal 2- Get Rate Locked =====
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'===== Resubmittal 3- Disclose lock confirmation =====
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'===== Resubmittal 4- Finish Milestone =====
RunAction "Resubmittal_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)
