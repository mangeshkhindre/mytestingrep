'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1126 - HP Processing 3- Order Appraisal
'@ Test Automation JIRA Task: PTAC-1134 Order flood Certification
'@ TestData: 
	'1 Global_Data, Website, E2E_HappyPath_Appraisal
	'2 Tools_OrderAppraisal, SetOrderAppraisal, E2E_HappyPath
	'3 Services, AppraisalService, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click services and click order appraisal services and click next
	'2 Select "Test Appraisal" 
	'3 Enter the due date as <Today's date> and click submit order
	'4 Click ok 
	'2.
	'1 Now go to appraisal center link in test data column and login with the credentials provided
	'2 Select your loan based on your loan number and click review request or view details
	'3 Fill appointment scheduled, appointment completed, order completed as todays date and appraised value 200,000 and appraisal fee 100 click save next to these buttons and click send messages or documents button
	'4 Under appraisal documents click browse for attached appraisal pdf select any pdf and select appraiser as appraiser clark from the dropdown
	   'Appraised Value: 185000
	   'Appraisal Fee: 300
	   'Select Appraiser: Appraiser Name: Test Appraisal
	   'check the checkbox next to certification and click send
	'5 Click on current orders
	'6 Under services tab click on appraisal icon
	'7 Click on import under order update
	'8 Click on import
	'9 Click ok
	'10 In e-folder you can see the attachment for the appraisal with received status
''@ ExpectedResult: 
     '1 Order appraisal window will open
	 '2 Order appraisal with details will be shown
	 '3 The new pop-up window open with message "Your appraisal order has been sent to Appraisal Test account2"
	 '4 The pop-up window should be closed
	 '2.  
	 '1 Should be able to login to encompass appraisal center
	 '2 Encompass appraisal center order details page will open
	 '3 New window will open
	 '4 Your documents have been delivered message can be seen under order details
	 '5 The status will be changed to delivered appraisal under status for your loan
	 '6 Appraisal order status window will open
	 '7 Order update window will open
	 '8 The selected data and documents have been imported successfully message will pop up
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1126","TestCase Name - HP Processing 3- Order Appraisal", Null
BIZ_Nav_SelectLoanTab()
BIZ_Tools_SendOrderAppraisal "E2E_HappyPath"
GUI_Dialog_Encompass_OKX 50, ""
BIZ_Services_LoginAppraisalCenter "E2E_HappyPath_Appraisal"  
BIZ_Services_ProcessAppraisalCenterAndSendDocument "E2E_HappyPath"
GUI_Browser_CloseLastOpened()
GUI_Dialog_Encompass_OKX 10, ""
BIZ_Services_ImportAppraisalDocument()

