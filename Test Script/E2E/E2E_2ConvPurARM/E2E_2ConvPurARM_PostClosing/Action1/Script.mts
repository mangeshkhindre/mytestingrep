'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase: 
	'1 PTAC-1067 - Post Closing 1 - Add Post Closing conditions 
	'2 PTAC-1282 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-1068 - Post Closing 3 - Order Encompass Compliance Services
'@ Test Automation JIRA Task: PTAC-1071 E2E_2CONVPURARM_PostClosing
'@ TestData:
	'1 Global,Login, E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet, E2E_CONVPURARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'Add Post Closing conditions 
	'Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'Order Encompass Compliance services
'@ ExpectedResult: 
	'Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1071","Script Name: E2E_2CONVPURARM_PostClosing", Null

'====== PTAC-1067 - Add Post Closing conditions ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'====== PTAC-1282 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac ======
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'====== PTAC- 1068 - Order Encompass Compliance Services ======
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)
