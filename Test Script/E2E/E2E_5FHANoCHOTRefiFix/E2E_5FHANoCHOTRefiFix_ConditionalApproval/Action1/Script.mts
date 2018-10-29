'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
   '1 PTAC-1968 - FHANOCHOTREFIFIX Conditional Approval 1 - Complete Underwriter Summary
   '2 PTAC-1969 - FHANOCHOTREFIFIX Conditional Approval 2 - Complete Transmittal Summary
   '3 PTAC-1970 - FHANOCHOTREFIFIX Conditional Approval 3 - Clear conditions.
   '4 PTAC-1971 - FHANOCHOTREFIFIX Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-2706 E2E_5FHANoCHOTRefiFix_ConditionalApproval
'@ TestData: 
   '1 Global_Data, Tools_UnderwriterSummar
   '2 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails, E2E_FHANoCHOTRefiFix
   '3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHANoCHOTRefiFix
   '4 Global_Data, Login, E2E_marksuw
   '5 Forms_TransmittalSummary, SetProperty and E2E_FHANoCHOTRefiFix
   '6 eFolder_Tab, SetPreliminaryConditionStatus, E2E_FHANoCHOTRefiFix
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2706","Script Name: E2E_5FHANoCHOTRefiFix_ConditionalApproval", Null

'====== Conditional Approval 1- Complete Underwriter Summary ======
RunAction "ConditionalApproval_CompleteUnderwriterSummary_001", oneIteration

'====== Conditional Approval 2 - Complete Transmittal Summary ======
RunAction "ConditionalApproval_CompleteTransmittalSummary_002", oneIteration

'====== Conditional Approval 3 - Clear conditions ======
RunAction "ConditionalApproval_ClearConditions_003", oneIteration

'====== Conditional Approval 4 - Finish Milestone ======
RunAction "ConditionalApproval_FinishMilestone_004", oneIteration

FRM_RT_TearDownTest(Null)