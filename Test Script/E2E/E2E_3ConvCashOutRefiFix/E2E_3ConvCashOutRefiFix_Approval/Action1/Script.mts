'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3325 CONVCASHOUTREFIFIX Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-3378 E2E_3CONVCASHOUTREFIFIX_Approval
'@ TestData: 
   '1 Global_Data, Login, E2E_marksuw
   '2 Loans, LoanTemplate, E2E_Underwriter
   '3 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Approval
   '4 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps: Fill underwriter Summary
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3378","Script Name: E2E_3CONVCASHOUTREFIFIX_Approval", Null

'====== PTAC-3325 Approval 1 - Fill Underwriter Summary ======
RunAction "Approval_FillUnderwriterSummary_001", oneIteration

FRM_RT_TearDownTest(Null)
