'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase: 
	'1 PTAC-2042  Conditional Approval 1 - Complete Underwriter Summary
	'2 PTAC-2043  Conditional Approval 2 - Complete Transmittal Summary
	'3 PTAC-2044  Conditional Approval 3 - Clear conditions
	'4 PTAC-2045  Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-2123 - E2E_6FHAPURARM_ConditionalApproval
'@ TestData: 
	'1 Global_Data, Tools_UnderwriterSummary
	'2 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails, E2E_FHAPURARM
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHAPURARM
	'4 Global_Data, Login, E2E_janet
	'5 Loans, LoanTemplate, E2E_LoanOfficer
	'6 Forms_TransmittalSummary, SetProperty, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Complete Underwriter Summary
	'2 Complete Transmittal Summary
	'3 Clear Conditions
	'4 Finish Milestone
'@ ExpectedResult: 
	'Complete Conditional Approval Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2123","Script Name: E2E_6FHAPURARM_ConditionalApproval", Null

'===== Conditional Approval 1 - Complete Underwriter Summary Details =====
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'===== Conditional Approval 2 - Complete Transmittal Summary  =====
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'===== Conditional Approval 3 - Clear Conditions =====
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'===== Conditional Approval 4 - Finish Milestone =====
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)

ExitGlobalIteration