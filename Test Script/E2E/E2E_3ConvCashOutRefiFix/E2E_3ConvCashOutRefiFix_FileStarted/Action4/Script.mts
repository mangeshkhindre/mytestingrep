'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-2969 CONVCASHOUTREFIFIX File Started 2 - Order Credit Report
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Services tab and select ‘Order Credit Report’.
   '2 Under 'My provider' tab select 'Equifax Mortgage Solutions' from list and click submit.
   '3 In the credit report request window click 'Finish'.
'@ ExpectedResult: 
   '1 'Credit Report' pop up window should open.
   '2 Credit report request window opens.
   '3 Under services view tab 'credit report' should open.
	  'In your loan under services, next to order credit report ,if you click on the thumbnail 'credit report' should open.

'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2969","CONVCASHOUTREFIFIX File Started 2 - Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()