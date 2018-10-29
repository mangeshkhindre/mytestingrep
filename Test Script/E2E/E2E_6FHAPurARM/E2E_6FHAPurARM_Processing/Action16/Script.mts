'@**************************************************************************************************
'@ TestStory:  PTAC-2010- FHAPURARM
'@ TestCase:   PTAC-1912 - Processing 4- Order Valuation
'@ Test Automation JIRA Task: PTAC-2121 E2E_6FHAPURARM_Processing
'@ TestData: 
   'Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click on 'Tools' tab and then click on  'TQL services'.
    '2 click order button next to valuation service order.
    '3 Select the date as todays date and select Full appraisal from the dropdown for appraisal type and click order..
'@ ExpectedResult: 
	'1 TQL services page will open.
	'2 valuation service order window pop up will open.
	'3 Report is generated and result -pass.(when you close the report generated under valuation services you can see the order details)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1912","Test Case Name: Processing 4- Order Valuation", Null

BIZ_TQLServices_SubmitOrder "Valuation Service", "E2E_FHAPURARM" 