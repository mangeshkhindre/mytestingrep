'***************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase	: 
    '1 PTAC-3176 FHAPURCHASEFIX- Resubmittal 1- Get Rate Lock request and LO comp plan and Float.
    '2 PTAC-3177 FHAPURCHASEFIX- Resubmittal 2- Get Rate Locked
    '3 PTAC-3178 FHAPURCHASEFIX- Resubmittal 3- Disclose lock confirmation
    '4 PTAC-3179 FHAPURCHASEFIX- Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-3156  E2E_4FHAPURCASHFIX_ReSubmittal
'@ TestData: 
	'01 Global, Login, E2E_markuslp
    '02 Loans, LoanTemplate, E2E_LoanProcessorDefault
    '03 Loans, Milestone, E2E_FHAPURCASHFIX_Processing
	'04 Loans, LoanTemplate, E2E_SecondaryMarketing
    '05 Tools_LockRequestForm, SetRateLockRequest, strRowID
	'06 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '07 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURCASHFIX
    '08 eFolder_Tab, SelecteDisclosureDocs and E2E_FHAPURCASHFIX_LockConfirmation
    '09 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
	'10 Loans, MilestoneDocument and E2E_FHAPURCASHFIX_ReSubmittal
	'11 Loans, Milestone and E2E_FHAPURCASHFIX_ReSubmittal
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Disclose Lock Confirmation
   '2 Finish Milestone
'@ ExpectedResult:'Loan should finish Re-submittal milestone 
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3156","Script Name: E2E_4FHAPURCASHFIX_ReSubmittal", Null

'====== PTAC-3176 - Get Rate Lock request and LO comp plan and Float. ======
RunAction "Resubmittal_GetRateLockRequestAndLOCompPlanAndFloat_001", oneIteration

'====== PTAC-3177 - Get Rate Locked ======
RunAction "Resubmittal_GetRateLocked_002", oneIteration

'====== PTAC-3178 - Disclose lock confirmation ======
RunAction "Resubmittal_DiscloseLockConfirmation_003", oneIteration

'====== PTAC-3179 - Finish Milestone ======
RunAction "Resubmittal_FinishMilestone_004", oneIteration

'====== Logout From Encompass ======
FRM_RT_TearDownTest(Null)