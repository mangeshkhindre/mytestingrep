'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
    '1 PTAC-1975 FHANOCHOTREFIFIX Resubmittal 1- Get Rate Lock request and LO comp plan and Float.
    '2 PTAC-1990 FHANOCHOTREFIFIX Resubmittal 2- Get Rate Locked
    '3 PTAC-1996 FHANOCHOTREFIFIX Resubmittal 3- Disclose lock confirmation
    '4 PTAC-2019 FHANOCHOTREFIFIX Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-2704 E2E_5FHANoCHOTRefiFix_ReSubmittal
'@ TestData: 
    '1 Globaldata, Loans, MilestoneDocument
    '2 Global, Login, E2E_markuslp
    '3 Loans, LoanTemplate, E2E_LoanProcessorDefault
    '4 Loans, Milestone, E2E_FHANoCHOTRefiFix_Processing
    '5 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHANoCHOTRefiFix
    '6 eFolder_Tab, SelecteDisclosureDocs, E2E_FHANoCHOTRefiFix
    '7 eFolder_Tab, SendeDisclosures, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Disclose Lock Confirmation
    '2 Finish Milestone
'@ ExpectedResult:  Loan should finish Re-submittal milestone 
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2704","Script Name: E2E_5FHANoCHOTRefiFix_ReSubmittal", Null

'====== Get Rate Lock request and LO comp plan and Float ======
RunAction "Resubmittal_GetRateLockRequestAndLOCompPlanAndFloat_001", oneIteration

'====== Get Rate Locked ======
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'====== Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'====== Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_004", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)