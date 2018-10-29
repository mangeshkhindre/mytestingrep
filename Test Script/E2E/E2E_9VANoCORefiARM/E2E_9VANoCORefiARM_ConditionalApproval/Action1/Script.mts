'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
	'1 PTAC-2355 Conditional Approval 1 - Complete Underwriter Summary
	'2 PTAC-2356 Conditional Approval 2 - Complete Transmittal Summary
	'3 PTAC-2358 Conditional Approval 3 - Clear conditions.
	'4 PTAC-2359 Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-2925 E2E_9VANoCORefiARM_ConditionalApproval
'@ TestData:
	'1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_VAPURARM
	'2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VAPURARM
	'3 Global_Data, Login and E2E_Tracy
	'4 Forms_TransmittalSummary, SetProperty and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Complete Underwriter Summary
	'2 Complete Transmittal Summary
	'3 Clear Conditions
	'4 Finish Milestone
'@ ExpectedResult: Complete Conditional Approval Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2925","Script Name: E2E_9VANoCORefiARM_ConditionalApproval", Null

'====== Conditional Approval 1- Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== Conditional Approval 2 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== Conditional Approval 3 - Clear conditions. ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== Conditional Approval 4 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)