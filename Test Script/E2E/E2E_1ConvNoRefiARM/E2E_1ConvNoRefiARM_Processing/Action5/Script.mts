'@**************************************************************************************************
'@ TestStory:  PTAC-1665 - E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1334  - CONVNOCASHREFIARM - Processing 4- Order Valuation
'@ Test Automation JIRA Task: PTAC-1780 E2E_1ConvNoRefiARM_Processing
'@ TestData: Tools_TQLServices, SetValuationServiceOrder, E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on 'Tools' tab and then click on  'TQL services'.
   '2 Click on 'Order button' next to valuation service order.
   '3 Select the date as todays date and select Full appraisal from the dropdown for appraisal type and click order.
'@ ExpectedResult: 
   '1 TQL services page will open.
   '2 Valuation service order window pop up will open.
   '3 Report is generated and result -pass.(when you close the generated report, under valuation services you can see the order details)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1334","TestCase Name : CONVNOCASHREFIARM - Processing 4- Order Valuation", Null

'Go to Tools->TQL Services
BIZ_TQLServices_SubmitOrder "Valuation Service", "E2E_ConvNoRefiARM"
