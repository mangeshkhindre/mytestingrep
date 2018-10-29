'***************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
    '1 PTAC-3172 FHAPURCHASEFIX- Conditional Approval 1- Complete Underwriter Summary 
    '2 PTAC-3173 FHAPURCHASEFIX- Conditional Approval 2 - Complete Transmittal Summary 
    '3 PTAC-3174 FHAPURCHASEFIX- Conditional Approval 3 - Clear conditions
    '4 PTAC-3175 FHAPURCHASEFIX- Conditional Approval 4 - Finish Milestone 
'@ Test Automation JIRA Task: PTAC-3155 E2E_4FHAPURCASHFIX_ConditionalApproval
'@ TestData: 
    '1 Global_Data, Tools_UnderwriterSummary
    '2 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails, E2E_FHAPURCASHFIX
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHAPURCASHFIX
	'4 Loans, LoanTemplate, E2E_Underwriter
	'5 Global_Data, Login, E2E_marksuw
	'6 Loans, Milestone, E2E_FHAPURCASHFIX_ConditionalApproval
    '7 Forms_TransmittalSummary, SetProperty, E2E_FHAPURCASHFIX
    '8 Loans, Milestone, E2E_FHAPURCASHFIX_ConditionalApproval
	'9 Loans, MilestoneDocument, E2E_FHAPURCASHFIX_ConditionalApproval
'@ Pre-conditions: N/A
'@ Description   : N/A
'@ TestSteps     :
    '1 Complete Underwriter Summary
    '2 Complete Transmittal Summary
    '3 Clear Conditions
    '4 Finish Milestone
'@ ExpectedResult: Complete Conditional Approval Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3155","Script Name: E2E_4FHAPURCASHFIX_ConditionalApproval", Null

'====== PTAC-3172 - Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== PTAC-3173 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-3174 - Clear Conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-3175 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)