'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase: 
	'1 PTAC-3487 CONVCASHOUTREFIFIX Post Closing 1 - Add Post Closing conditions 
	'2 PTAC-3488 CONVCASHOUTREFIFIX Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC-3489 CONVCASHOUTREFIFIX Post Closing 3 - Order Encompass Compliance services 
'@ Test Automation JIRA Task: PTAC-3382 E2E_3CONVCASHOUTREFIFIX_PostClosing
'@ TestData:
    '1 Global, Login, E2E_closer
    '2 eFolder_Tab, AddConditionsFromSetand and E2E_CONVCASHOUTREFIFIX
    '3 eFolder_Tab, SetPostClosingConditionsStatusand E2E_CONVCASHOUTREFIFIX
    '4 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_ConditionalApproval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Add Post Closing conditions
    '2 Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
    '3 Order Encompass Compliance services
'@ ExpectedResult:  milestone should be completed for the loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Script: PTAC-3382","Script Name- E2E_3CONVCASHOUTREFIFIX_PostClosing", Null

'====== PTAC-3487 - PostClosing1 Add Post Closing condition  ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'======  PTAC-3488 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac  ======
RunAction "PostClosing_InvestorServiceExport PDDGinnieMaeFannieMaeFreddieMac_002", oneIteration

'====== PTAC-3489 - Order Encompass Compliance services  ======
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)