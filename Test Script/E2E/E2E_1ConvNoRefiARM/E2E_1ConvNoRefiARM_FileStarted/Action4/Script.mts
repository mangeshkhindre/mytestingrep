'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase:  PTAC-1205 CONVNOCASHREFIARM - File started 3-Order Credit Report
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on Services tab and select ‘Order Credit Report’.
    '2 For a new environment this will be a one time activity.
       'To get Equifax under My provider list click on ‘All providers’ and select ‘Equifax mortgage solutions’ and then click on ‘Add to my list’.
       'Click ‘ok’ in the pop up. 
       'Click on ‘ My provider’ tab.
	'3 Select 'Equifax Mortgage Solutions'from list and click submit.
	'4 In the pop up credit report request window click 'Finish'."
'@ ExpectedResult: 
	'1 Credit Report must be generated.
	'2 Under services tab next to order credit report you should see the view document thumbnail. 
	'3 If you click on the thumbnail you should see the credit report.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1205","CONVNOCASHREFIARM - File started 3-Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()