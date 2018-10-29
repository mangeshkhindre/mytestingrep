'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3203 CONVCASHOUTREFIFIX - Processing 6- Order Appraisal
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData:Global_Data, Website, E2E_CONVCASHOUTREFIFIX_Appraisal
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   'Step1:
   '1 Click services and click order appraisal services and click next.
   '2 Select integration testing appraisal services and click next.
   '3 Click senders phone and due date as today's date and click submit order.
   '4 Click ok.
   'Step2: 
   '01 Now go to appraisal center link in test data column and login with the credentials provided.
   '02 Select your loan based on your loan number and click review request or view details.
   '03 Fill appointment scheduled, appointment completed, order completed as todays date and appraised value 400,000 and 
      'appraisal fee 500. Click Save icon next to all these fields and then Click 'send messages or documents' button.
   '04 Under appraisal documents click 'browse' for attached appraisal pdf select any pdf and enter appraiser 
       'name as 'appraiser clark' and appraiser Id as '2394098'.
       'check the checkbox next to certification and click send.
   '05 Click on current orders.
   '06 In Encompass, under services tab click on appraisal icon which is next to Order Appraisal 
   '07 Click on import under order update.
   '08 Click on import.
   '09 Click ok.
   '10 In e-folder you can see the attachment for the appraisal with received status.
'@ ExpectedResult:
   'Step1 Expected Result:
   '1 Order appraisal window will open.
   '2 Order appraisal with details will be shown.
   '3 Your appraisal order has been sent to integration testing appraisal services message is shown.
   'Step2 Expected Result:
   '1 Should be able to login to encompass appraisal center.
   '2 Encompass appraisal center order details page will open.
   '3 New window will open.
   '4 Your documents have been delivered message can be seen under order details.
   '5 The status will be changed to delivered appraisal under status for your loan.
   '6 Appraisal order status window will open.
   '7 Order update window will open.
   '8 The selected data and documents have been imported successfully message will pop up.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3203","CONVCASHOUTREFIFIX - Processing 6- Order Appraisal", Null

BIZ_Tools_SendOrderAppraisal "E2E_CONVCASHOUTREFIFIX"
BIZ_Services_LoginAppraisalCenter "E2E_CONVCASHOUTREFIFIX_Appraisal"  
BIZ_Services_ProcessAppraisalCenterAndSendDocument "E2E_CONVCASHOUTREFIFIX"

GUI_Browser_CloseLastOpened()
GUI_Dialog_Encompass_OKX 5, ""

BIZ_Services_ImportAppraisalDocument()