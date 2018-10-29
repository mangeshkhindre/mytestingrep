'@**************************************************************************************************
'@ TestStory: PTAC-2010- E2E_6FHAPURARM
'@ TestCase: 
	'1 PTAC- 2050 - Approval 1 - Fill underwriter Summary
	'2 PTAC- 2051 - Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2124 - E2E_6FHAPURARM_Approval
'@ TestData:
	'1 Global_Data, Login, E2E_janet
	'2 Loans, LoanTemplate, E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHAPURARM
	'4 Forms_TransmittalSummary, SetProperty,E2E_FHAPURARM
	'5 Loans, Milestone and E2E_FHAPURARM_Approval
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
   'Fill Underwriter summary Details
   'Finish Approval milestone
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2124","Script Name: E2E_6FHAPURARM_Approval", Null

'===== Approval 1 - Fill underwriter Summary =====
RunAction "Approval_ FillUnderWriterSummary_001", oneIteration

'===== Approval 2 - Finish Approval milestone =====
RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)