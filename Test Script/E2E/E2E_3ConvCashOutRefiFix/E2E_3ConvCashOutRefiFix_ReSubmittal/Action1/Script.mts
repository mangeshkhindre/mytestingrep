'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3322 CONVCASHOUTREFIFIX Resubmittal 1- Finish Milestone 
'@ Test Automation JIRA Task: PTAC-3377 E2E_3CONVCASHOUTREFIFIX_ReSubmittal
'@ TestData: 
   '1 Global, Login and E2E_markuslp
   '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_ReSubmittal
'@ Pre-conditions: Loan Number which finished Conditional Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Finish Resubmittal Milestone
'@ ExpectedResult:  Loan should finish Re-submittal milestone 
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3377","Script Name: E2E_3CONVCASHOUTREFIFIX_ReSubmittal", Null

'====== Resubmittal 1- Finish Milestonen ======
RunAction "Resubmittal-FinishMilestone_001", oneIteration

FRM_RT_TearDownTest(Null)
