'@**************************************************************************************************
'@ TestStory: PTAC-871- E2E_2CONVPURARAM
'@ TestCase: 
	'1 PTAC-863 Approval 1 - Fill Underwriter Summary
	'2 PTAC-865 Approval 2 - Fill Transmittal Summary
	'3 PTAC-889 Approval 3 - Order Encompass Compliance Services
'@ Test Automation JIRA Task: PTAC-1024 E2E_2CONVPURARM_Approval
'@ TestData: 
	'1 Global_Data, Login, E2E_marksuw
	'2 Loans, LoanTemplate, E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_CONVPURARM
	'4 Loans, Milestone, E2E_CONVPURARM_Approval
	'5 Forms_TransmittalSummary, SetProperty, E2E_CONVPURARM
	'6 Loans, Milestone, E2E_CONVPURARM_Approval
    '7 Loans, MilestoneDocument, E2E_CONVPURARM_Approval
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:Fill Underwriter summary Details
'@ ExpectedResult: Loan should be created
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1024","Script Name: E2E_2CONVPURARM_Approval", Null

'====== PTAC-863 - Approval 1 - Fill Underwriter Summary ======
RunAction "Approval_ FillUnderWriterSummary_001", oneIteration

'====== PTAC-865 Approval 2 - Fill Transmittal Summary ======
RunAction "Approval_FillTransmittalSummary_002", oneIteration

'====== PTAC-889 Approval 3 - Order Encompass Compliance Services ======
RunAction "Approval_OrderComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)
