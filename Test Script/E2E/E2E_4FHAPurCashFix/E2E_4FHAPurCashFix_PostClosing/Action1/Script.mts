'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
	'1 PTAC-3221 FHAPURCHASEFIX- Post Closing 1 - Add Post Closing conditions 
	'2 PTAC-3222 FHAPURCHASEFIX- Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac 
	'3 PTAC-3223 FHAPURCHASEFIX- Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-3287 E2E_4FHAPURCASHFIX_PostClosing
'@ TestData: 
    '1 Global, Login, E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet, E2E_FHAPURCASHFIX
	'3 eFolder_Tab, SetPostClosingConditionsStatus, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add Post Closing conditions 
	'2 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 Order Encompass Compliance services
'@ ExpectedResult: Loan should complete Post Closing Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3287","Script Name: E2E_4FHAPURCASHFIX_PostClosing", Null

'====== PTAC-3221 - Add Post Closing conditions ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'====== PTAC-3222 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac ======
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'====== PTAC- 3223 - Order Encompass Compliance Services ======
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)