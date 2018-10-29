'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1392 - CONVNOCASHREFIARM - Conditional Approval 1- Complete Underwriter Summary
   '2 PTAC-1393 - CONVNOCASHREFIARM - Conditional Approval 2 - Complete Transmittal Summary
   '3 PTAC-1394 - CONVNOCASHREFIARM - Conditional Approval 3 - Clear conditions.
   '4 PTAC-1395 - CONVNOCASHREFIARM - Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-1783 - E2E_1ConvNoRefiARM_ConditionalApproval
'@ TestData:
   '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_ConvNoRefiARM
   '2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_ConvNoRefiARM
   '3 Global_Data, Login and E2E_marksuw
   '4 Loans, LoanTemplate and E2E_Underwriter	 
   '4 Forms_TransmittalSummary, SetProperty and E2E_ConvNoRefiARM
   '5 Loans, Milestone and E2E_ConvNoRefiARM_ConditionalApproval
   '6 eFolder_Tab, SetPreliminaryConditionStatus and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Complete Underwriter Summary
   '2 Complete Transmittal Summary
   '3 Clear Conditions
   '4 Finish Milestone
'@ ExpectedResult: 
   '1 Complete Conditional Approval Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1783","Script Name: E2E_1ConvNoRefiARM_ConditionalApproval", Null

'====== PTAC-1392 - Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderWriterSummary_001", oneIteration

'====== PTAC-1393 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== PTAC-1394 - Clear Conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== PTAC-1395 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)