'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase: 
	'1 PTAC-2132 Post Closing 1 - Add Post Closing conditions
	'2 PTAC-2133 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-2134 Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2260 E2E_6FHAPURARM_PostClosing
'@ TestData: 
	'1 Global, Login, E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet, E2E_FHAPURARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus, E2E_FHAPURARM
	'4 Loans, Milestone, E2E_FHAPURARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add Post Closing conditions 
	'2 Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 Order Encompass Compliance services
'@ ExpectedResult: 
	'Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2260","Script Name: E2E_6FHAPURARM_PostClosing", Null

RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)