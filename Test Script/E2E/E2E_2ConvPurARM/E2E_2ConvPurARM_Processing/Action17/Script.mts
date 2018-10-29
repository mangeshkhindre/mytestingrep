'@**************************************************************************************************
'@ TestStory:  PTAC-871 - CONVPURARM
'@ TestCase: PTAC-707 - Order Appraisal
'@ Test Automation JIRA Task: PTAC-990 E2E_2CONVPURARM_Processing
'@ TestData: 
	'1 Tools_OrderAppraisal,SetOrderAppraisal,E2E_CONVPURARM
	'2 Global_Data,Website,E2E_CONVPURARM_Appraisal
	'3 Services,AppraisalService,E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 test Steps:
	'1 Click services and click order appraisal services and click next.
	'2 Select integration testing appraisal services and click next.
	'3 Click senders phone and due date as today's date and click submit order.
	'4 Click ok.
   'Step2 test Steps:
	'1 Now go to appraisal center link in test data column and login with the credentials provided.
	'2 Select your loan based on your loan number and click review request or view details.
	'3 Fill appointment scheduled, appointment completed, order completed as todays date and appraised value 200,000 and appraisal fee 100 
	   'click save next to these buttons and click send messages or documents button.
	'4 Under appraisal documents click browse for attached appraisal pdf select any pdf and slect appraiser as appraiser clark from the dropdown
	   'check the checkbox next to certification and click send.
	'5 Click on current orders.
	'6 under services tab click on appraisal icon.
	'7 Click on import under order update.
	'8 Click on import.
	'9 Click ok.
	'10 In e-folder you can see the attachment for the appraisal with received status.
'@ ExpectedResult:
   'Step1 Expected result:
	'1 Order appraisal window will open.
	'2 Order appraisal with details will be shown.
	'3 Your appraisal order has been sent to integration testing appraisal services message is shown.
   'Step2 Expected result:
	'1 Should be able to login to encompass appraisal center.
	'2 Encompass appraisal center order details page will open.
	'3 New window will open.
	'4 Your documents have been delivered message can be seen under order details.
	'5 The status will be changed to delivered appraisal under status for your loan.
	'6 Appraisal order status window will open.
	'7 Order update window will open.
	'8 The selected data and documents have been imported successfully message will pop up.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-707","Test Case Name - PTAC-707 - Order Appraisal", Null

BIZ_Tools_SendOrderAppraisal "E2E_CONVPURARM"
BIZ_Services_LoginAppraisalCenter "E2E_CONVPURARM_Appraisal"  
BIZ_Services_ProcessAppraisalCenterAndSendDocument "E2E_CONVPURARM"
GUI_Browser_CloseLastOpened()
GUI_Dialog_Encompass_OKX 25, ""
BIZ_Services_ImportAppraisalDocument()
