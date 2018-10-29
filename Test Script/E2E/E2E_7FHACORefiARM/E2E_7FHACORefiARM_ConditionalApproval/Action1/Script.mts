'@******************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
	'1 PTAC-2658 FHACOREFIARM Conditional Approval 1 - Complete Underwriter Summary 
	'2 PTAC-2659 FHACOREFIARM Conditional Approval 2 - Complete Transmittal Summary 
	'3 PTAC-2660 FHACOREFIARM Conditional Approval 3 - Clear conditions.
	'4 PTAC-2661 FHACOREFIARM Conditional Approval 4 - Finish Milestone 
'@ Test Automation JIRA Task: PTAC-2718 E2E_7FHACORefiARM_ConditionalApproval
'@ TestData: 
    '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_FHACORefiARM
    '2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_FHACORefiARM
    '3 Global_Data, Login and E2E_marksuw
    '4 Forms_TransmittalSummary, SetProperty and E2E_FHACORefiARM
    '5 Loans, Milestone and E2E_FHACORefiARM_ConditionalApproval
    '6 eFolder_Tab, SetPreliminaryConditionStatus and E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Complete Underwriter Summary
	'2 Complete Transmittal Summary
	'3 Clear Conditions
	'4 Finish Milestone
'@ ExpectedResult: Complete Conditional Approval Milestone
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2718","Script Name: E2E_7FHACORefiARM_ConditionalApproval", Null

'====== PTAC-2658 FHACOREFIARM Conditional Approval 1 - Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== PTAC-2659 FHACOREFIARM Conditional Approval 2 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-2660 FHACOREFIARM Conditional Approval 3 - Clear Conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-2661 FHACOREFIARM Conditional Approval 4 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)
