'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
	'1 PTAC-2394 Post Closing 1 - Add Post Closing conditions
	'2 PTAC-2395 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-2396 Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2943 E2E_9VANoCORefiARM_PostClosing
'@ TestData: 
	'1 Global, Login and E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet and E2E_VANoCORefiARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_VANoCORefiARM
	'4 Loans, Milestone and E2E_VANoCORefiARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add Post Closing conditions 
	'2 Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 Order Encompass Compliance services
'@ ExpectedResult: 
	'1 Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2943","Script Name: E2E_9VANoCORefiARM_PostClosing", Null

'===== Post Closing 1 - Add Post Closing conditions =====
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'===== Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac =====
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'===== Post Closing 3 - Order Encompass Compliance services =====
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)
