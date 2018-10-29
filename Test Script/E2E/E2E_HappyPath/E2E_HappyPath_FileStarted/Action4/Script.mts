'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1085 HP File started 3-Order Credit Report
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on Services tab and select ‘Order Credit Report’.
	'2 Select 'Equifax Mortgage Solutions'from list and click submit.
	'3 Click on loan tab and go to 'Services' tab.
'@ ExpectedResult: 
	'1 A new window should open with a list of providers.
	'2 Under 'services view'  tab 'credit report' should open.
	'3 Thumbnail document view icon against 'Order Credit Report' should be available.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1085","HP File started 3-Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()
