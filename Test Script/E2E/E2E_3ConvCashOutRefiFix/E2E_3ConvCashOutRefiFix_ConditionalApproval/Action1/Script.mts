'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase: 
   '1 PTAC-3231 CONVCASHOUTREFIFIX Conditional Approval 1- Complete Underwriter Summary 
   '2 PTAC-3256 CONVCASHOUTREFIFIX Conditional Approval 2 - Complete Transmittal Summary 
   '3 PTAC-3257 CONVCASHOUTREFIFIX Conditional Approval 3 - Clear conditions. 
   '4 PTAC-3258 CONVCASHOUTREFIFIX Conditional Approval 4 - Finish Milestone 
'@ Test Automation JIRA Task: PTAC-3376 E2E_3CONVCASHOUTREFIFIX_ConditionalApproval
'@ TestData:
   '01 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_CONVCASHOUTREFIFIX
   '02 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_CONVCASHOUTREFIFIX
   '03 Global_Data, Login and E2E_marksuw
   '04 Forms_TransmittalSummary, SetProperty and E2E_CONVCASHOUTREFIFIX
   '05 Loans,  Milestone and E2E_CONVCASHOUTREFIFIX_ConditionalApproval
   '06 eFolder_Tab, SetPreliminaryConditionStatus, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Complete Underwriter Summary
   '2 Complete Transmittal Summary
   '3 Clear Conditions
   '4 Finish Milestone
'@ ExpectedResult:  Complete Conditional Approval Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3376","Script Name: E2E_3CONVCASHOUTREFIFIX_ConditionalApproval", Null

'====== PTAC-3231 - Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== PTAC-3256 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-3257 - Clear Conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-3258 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)