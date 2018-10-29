'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM 
'@ TestCase: 
	'1 PTAC-2364 Approval 1 - Fill underwriter Summary
	'2 PTAC-2365 Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2922 E2E_9VANoCORefiARM_Approval
'@ TestData: 
	'1 Global_Data, Login and E2E_marksuw
	'2 Loans, LoanTemplate  and E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VANoCORefiARM
	'4 Loans, Milestone and E2E_VANoCORefiARM_Approval
	'5 Loans, MilestoneDocument and E2E_VANoCORefiARM_Approval
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:Fill Underwriter summary Details
'@ ExpectedResult: Loan should be created
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2922","Script Name: E2E_9VANoCORefiARM_Approval", Null

'===== Approval 1 - Fill underwriter Summary =====
RunAction "Approval_FillUnderwriterSummary_001", oneIteration

'===== Approval 2 - Finish Approval milestone =====
RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)
