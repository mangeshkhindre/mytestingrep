'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
    '1 PTAC-2679 FHACOREFIARM Approval 1 - Fill underwriter Summary
    '2 PTAC-2683 FHACOREFIARM Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2720 E2E_7FHACORefiARM_Approval
'@ TestData: 
	'1 Forms_TransmittalSummary, SetProperty and E2E_FHACORefiARM
	'2 Loans, Milestone and E2E_FHACORefiARM_Approval
	'3 Global_Data, Login and E2E_marksuw
	'4 Loans, LoanTemplate and E2E_Underwriter
	'5 Loans, Milestone and E2E_FHACORefiARM_Approval
	'6 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_FHACORefiARM
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Fill underwriter Summary
    '2 Fill Transmittal summary
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2720","Script Name: E2E_7FHACORefiARM_Approval", Null

'====== PTAC-2679 FHACOREFIARM Approval 1 - Fill underwriter Summary ======
RunAction "Approval_FillUnderwriterSummary_001", oneIteration

'====== PTAC-2683 FHACOREFIARM Approval 2 - Finish Approval milestone ======
RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)
