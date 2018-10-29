'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
	'1 PTAC-2187 FHANOCHOTREFIFIX Post Closing 1 - Add Post Closing conditions
	'2 PTAC-2188 FHANOCHOTREFIFIX Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-2189 FHANOCHOTREFIFIX Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2710 E2E_5FHANoCHOTRefiFix_PostClosing
'@ TestData: 
	'1 Global, Login and E2E_closer
    '2 eFolder_Tab, AddConditionsFromSet and E2E_FHANoCHOTRefiFix
	'3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_FHANoCHOTRefiFix
	'4 Loans, Milestone and  E2E_FHANoCHOTRefiFix_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add Post Closing conditions 
	'2 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 Order Encompass Compliance services
'@ ExpectedResult: 
	'1 Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2710","Script Name: E2E_5FHANoCHOTRefiFix_PostClosing", Null

'====== Post Closing 1 - Add Post Closing conditions ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'====== Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac ======
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'====== Post Closing 3 - Order Encompass Compliance services ======
RunAction "PostClosing_OrderComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)