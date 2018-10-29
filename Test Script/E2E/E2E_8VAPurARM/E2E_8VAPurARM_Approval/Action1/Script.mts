'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARAM
'@ TestCase: 
	'1 PTAC-2226 - Approval 1 - Fill underwriter Summary
	'2 PTAC-2227 - Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2403 E2E_8VAPURARM_Approval
'@ TestData: 
	'1 Global_Data, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VAPURARM
	'4 Forms_TransmittalSummary, SetProperty and E2E_VAPURARM
	'5 Loans, Milestone and E2E_VAPURARM_Approval
	'6 Loans, MilestoneDocument and E2E_VAPURARM_Approval
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Fill Underwriter summary Details
   '2 Finish Approval milestone
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2403","Script Name: E2E_8VAPURARM_Approval", Null

'===== PTAC-2226 - Approval 1 - Fill underwriter Summary =====
RunAction "Approval_FillUnderwriterSummary_001", oneIteration

'===== PTAC-2227 - Approval 2 - Finish Approval milestone =====
RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)
