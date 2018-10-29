'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1828 FHANOCHOTREFIFIX Processing 7- Order Appraisal
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
	'1 Tools_OrderAppraisal, SetOrderAppraisal, E2E_FHANoCHOTRefiFix
	'2 Global_Data, Website, E2E_FHANoCHOTRefiFix_Appraisal
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click services and click order appraisal services and click next
	'2 Select 'Test Appraisal' and click next
	'3 Click senders phone and due date as today's date and click submit order.Click ok
	'4 Now go to appraisal center link in test data column and login with the credentials provided.
	'5 Select your loan based on your loan number and click review request or view details. Then click 'Accept' in the next screen
	'6 Fill appointment scheduled, appointment completed, order completed as todays date and appraised value 400,000 and appraisal fee 500. 
       'Click Save icon next to all these fields and then Click 'send messages or documents' button
	'7 Under appraisal documents click 'browse' for attached appraisal pdf select any pdf and enter appraiser name as 'appraiser clark'
        'and appraiser Id as '2394098'.check the checkbox next to certification and click send
	'8 Click on current orders.In Encompass, under services tab click on appraisal icon which is next to Order Appraisal
	'9 Click on import under order update.Click on import.Click ok
	'10 In e-folder you can see the attachment for the appraisal with received status
'@ ExpectedResult: 
	'1 Order appraisal window will open.Order appraisal with details will be shown
    '2 Your appraisal order has been sent to Test appraisal services message is shown
    '3 Should be able to login to encompass appraisal center.Encompass appraisal center order details page will open.New window will open
    '4 Your documents have been delivered message can be seen under order details
	'5 The status will be changed to delivered appraisal under status for your loan
	'6 Appraisal order status window will open
	'7 Order update window will open
	'8 The selected data and documents have been imported successfully message will pop up
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1828","FHANOCHOTREFIFIX Processing 7- Order Appraisal", Null

BIZ_Tools_SendOrderAppraisal "E2E_FHANoCHOTRefiFix"
BIZ_Services_LoginAppraisalCenter "E2E_FHANoCHOTRefiFix_Appraisal"  

BIZ_Services_ProcessAppraisalCenterAndSendDocument "E2E_FHANoCHOTRefiFix"
GUI_Browser_CloseLastOpened()
GUI_Dialog_Encompass_OKX 5, ""
BIZ_Services_ImportAppraisalDocument()