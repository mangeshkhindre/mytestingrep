'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
	'1 PTAC - 1468 - CONVNOCASHREFIARM - Post Closing 1 - Add Post Closing conditions
	'2 PTAC - 1658 - CONVNOCASHREFIARM - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
	'3 PTAC - 1469 - CONVNOCASHREFIARM - Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-1795 E2E_1ConvNoRefiARM_PostClosing
'@ TestData: 
	'1 Global, Login and E2E_closer
	'2 eFolder_Tab, AddConditionsFromSetand and E2E_ConvNoRefiARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_ConvNoRefiARM
	'4 Loans, Milestone and E2E_ConvNoRefiARM_ConditionalApproval
	'5 Loans, LoanTemplate and E2E_PostCloser
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Add Post Closing conditions
    '2 Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
    '3 Order Encompass Compliance services
'@ ExpectedResult:  milestone should be completed for the loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Script : PTAC - 1795","Script Name : E2E_1ConvNoRefiARM_PostClosing", Null

'====== PTAC-1468 - PostClosing1 Add Post Closing condition  ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'======  PTAC-1658 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac  ======
RunAction "PostClosing_InvestorServiceExport PDDGinnieMaeFannieMaeFreddieMac_002", oneIteration

'====== PTAC-1469 - Order Encompass Compliance services  ======
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)
