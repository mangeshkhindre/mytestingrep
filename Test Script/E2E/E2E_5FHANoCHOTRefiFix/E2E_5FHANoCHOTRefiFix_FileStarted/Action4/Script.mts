'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase:  PTAC-1488 FHANOCHOTREFIFIX File started 3 Order Credit Report
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Services tab and select ‘Order Credit Report’
   '2 Select 'Equifax Mortgage Solutions'from list and click submit
   '3 In the pop up credit report request window click 'Finish'
'@ ExpectedResult: 
   '1 Credit Report must be generated
   '2 A pop up credit request window opens 
   '3 Under services view credit report should open.Under services tab if you click 
      'on the thumbnail 'view document' next to order credit you should see the credit report
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1488","FHANOCHOTREFIFIX File started 3 Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()