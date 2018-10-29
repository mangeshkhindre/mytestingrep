'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
   '1 PTAC-2022 FHANOCHOTREFIFIX Approval 1 - Fill underwriter Summary
   '2 PTAC-2023 FHANOCHOTREFIFIX Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2707 E2E_5FHANoCHOTRefiFix_Approval
'@ TestData: 
   '1 Global_Data, Login, E2E_marksuw
   '2 Loans, LoanTemplate, E2E_Underwriter
   '3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHANoCHOTRefiFix
   '4 Loans, Milestone, E2E_CONVPURARM_Approval
'@ Pre-conditions:
'@ Description:  
'@ TestSteps:
   '1 FHANOCHOTREFIFIX Approval 1 - Fill underwriter Summary
   '2 FHANOCHOTREFIFIX Approval 2 - Finish Approval milestone
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2707","Script Name: E2E_5FHANoCHOTRefiFix_Approval", Null

RunAction "Approval_FillUnderwriterSummary_001", oneIteration

RunAction "Approval_FinishApprovalMilestone_002", oneIteration

FRM_RT_TearDownTest(Null)