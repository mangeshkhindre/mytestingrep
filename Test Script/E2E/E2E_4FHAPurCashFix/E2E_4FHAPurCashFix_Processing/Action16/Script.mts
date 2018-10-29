'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3165 FHAPURCHASEFIX - Processing 4- Order Valuation
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData: 
	'Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click TQL services
	'2 click order button next to valuation service order.
	'3 Select the date as todays date and type: full appraisal and click order.
'@ ExpectedResult: 
	'TQL services page will open.
	'valuation service order window pop up will open.
	'report is generated and result -pass.(when you close the report generated under valuation services you can see the order details)"
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3165","FHAPURCHASEFIX - Processing 4- Order Valuation", Null

'BIZ_TQLServices_SubmitOrder "Valuation Service", "E2E_FHAPURCASHFIX"

Wait g_TinyWaitLarge
