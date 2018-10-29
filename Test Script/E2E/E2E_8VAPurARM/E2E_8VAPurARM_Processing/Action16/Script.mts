'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase:  PTAC-2167 - Processing 4 - Order Valuation
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: 
	'1 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on 'Tools' tab and then click on  'TQL services'.
   '2.click order button next to valuation service order.
   '3.Select the date as todays date and type: full appraisal and click order.
'@ ExpectedResult: 
   '1 TQL services page will open.
   '2 Valuation service order window pop up will open.
   '3 Report is generated and result -pass.(when you close the report generated under valuation services you can see the order details)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2167","TestCase Name - Processing 4- Order Valuation", Null

'Submit Order
BIZ_TQLServices_SubmitOrder "Valuation Service", "E2E_VAPURARM" 
