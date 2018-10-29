'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1406 CONVNOCASHREFIARM - Approval 1 - Fill underwriter Summary
   '2 PTAC-1407 CONVNOCASHREFIARM - Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-1782 E2E_1ConvNoRefiARM_Approval
'@ TestData: 
   '1 Global_Data, Login and E2E_marksuw
   '2 Loans, LoanTemplate and E2E_Underwriter
   '3 Loans, Milestone and E2E_ConvNoRefiARM_Approval
   '4 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_ConvNoRefiARM
   '5 Forms_TransmittalSummary, SetProperty and E2E_ConvNoRefiARM
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Fill underwriter Summary
   '2 Fill Transmittal summary
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1782","Script Name: E2E_1ConvNoRefiARM_Approval", Null

'====== PTAC-1406 Approval 1 - Fill Underwriter Summary ======
RunAction "Approval_FillUnderWriterSummary_001", oneIteration

'====== PTAC-1407 Approval 2 - Finish Approval milestone ======
RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)