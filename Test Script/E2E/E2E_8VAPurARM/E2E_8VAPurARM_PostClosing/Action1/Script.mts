'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
	'1 PTAC-2252 - Post Closing 1 - Add Post Closing conditions 
	'2 PTAC-2253 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-2254 - Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2400 - E2E_8VAPURARM_PostClosing
'@ TestData: 
	'1 Global, Login and E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet and E2E_VAPURARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_VAPURARM
	'4 Loans, Milestone and E2E_VAPURARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'Add Post Closing conditions 
	'Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'Order Encompass Compliance services
'@ ExpectedResult: 
	'Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2400","Script Name: E2E_8VAPURARM_PostClosing", Null

'===== Post Closing 1 - Add Post Closing conditions =====
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'===== Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac =====
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'===== Post Closing 3 - Order Encompass Compliance services =====
RunAction "PostClosing_OrderEncompassCompliance services_003", oneIteration

FRM_RT_TearDownTest(Null)