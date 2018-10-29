'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
	'1  PTAC-2207 Conditional Approval 1 - Complete Underwriter Summary
	'2  PTAC-2209 Conditional Approval 2 - Complete Transmittal Summary
	'3  PTAC-2210 Conditional Approval 3 - Clear conditions.
	'4  PTAC-2211 Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-2405 E2E_8VAPURARM_ConditionalApproval
'@ TestData:
	'1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_VAPURARM
    '2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VAPURARM
    '3 Global_Data, Login and E2E_marksuw
	'4 Forms_TransmittalSummary, SetProperty and E2E_VAPURARM
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2405","Script Name: E2E_8VAPURARM_ConditionalApproval", Null

'====== PTAC-2207 - Conditional Approval 1- Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== PTAC-2209 - Conditional Approval 2 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-2210 - Conditional Approval 3 - Clear conditions. ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-2211 - Conditional Approval 4 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)