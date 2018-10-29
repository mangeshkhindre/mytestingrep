'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
	'1 PTAC-3180 FHAPURCHASEFIX- Approval 1 - Fill underwriter Summary
	'2 PTAC-3181 FHAPURCHASEFIX- Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-3247 E2E_4FHAPURCASHFIX_Approval
'@ TestData: 
	'1 Global_Data, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_FHAPURCASHFIX
	'4 Loans, Milestone and E2E_FHAPURCASHFIX_Approval
	'5 Forms_TransmittalSummary, SetProperty and E2E_FHAPURCASHFIX
    '6 Loans, Milestone and E2E_FHAPURCASHFIX_Approval
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:Fill Underwriter summary Details
'@ ExpectedResult: Loan should be created
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3247","Script Name: E2E_4FHAPURCASHFIX_Approval", Null

'====== Approval 1 - Fill Underwriter Summary ======
RunAction "Approval_ FillUnderWriterSummary_001", oneIteration

'======Approval 2 - Fill Transmittal Summary ======
RunAction "Approval_FillTransmittalSummary_002", oneIteration

FRM_RT_TearDownTest(Null)