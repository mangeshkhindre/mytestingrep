'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3139 CONVCASHOUTREFIFIX - Processing 4- Order Valuation
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData: Tools_TQLServices, SetValuationServiceOrder, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on 'Tools' tab and then click on  'TQL services'.
   '2 Click on 'Order button' next to valuation service order.
   '3 Select the date as todays date and select Full appraisal from the dropdown for appraisal type and click order.
'@ ExpectedResult: 
   '1 TQL services page will open.
   '2 Valuation service order window pop up will open.
   '3 Report is generated and result -pass.(when you close the generated report, under valuation services you can see the order details)"

'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3139","CONVCASHOUTREFIFIX - Processing 4- Order Valuation", Null

BIZ_TQLServices_SubmitOrder "Valuation Service", "E2E_CONVCASHOUTREFIFIX"
