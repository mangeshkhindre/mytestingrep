'***************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase: 
   '1 PTAC-791 - Conditional Approval 1- Complete Underwriter Summary
   '2 PTAC-793 - Conditional Approval 2- Complete Transmittal Summary
   '3 PTAC-805 - Conditional Approval 3- Clear conditions.
   '4 PTAC-799 - Conditional Approval 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-1023 E2E_2CONVPURARM_ConditionalApproval
'@ TestData: Global_Data,Tools_UnderwriterSummary
    '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_CONVPURARM
	'2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_CONVPURARM
	'3 Loans, LoanTemplate and E2E_Underwriter
	'4 Global_Data, Login and E2E_marksuw
	'5 Loans, Milestone and E2E_CONVPURARM_ConditionalApproval
    '6 Loans, Milestone, E2E_CONVPURARM_ConditionalApproval
	'7 Loans, MilestoneDocument and E2E_CONVPURARM_ConditionalApproval
'@ Pre-conditions: N/A
'@ Description   : N/A
'@ TestSteps     :
   '1 Complete Underwriter Summary
   '2 Complete Transmittal Summary
   '3 Clear Conditions
   '4 Finish Milestone
'@ ExpectedResult: 
   'Complete Conditional Approval Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1023","Script Name: E2E_2CONVPURARM_ConditionalApproval", Null

'====== PTAC-791 - Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== PTAC-793 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-805 - Clear Conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-799 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)