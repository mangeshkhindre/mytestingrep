'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2294 FHACOREFIARM File started 3-Order Credit Report
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Services tab and select ‘Order Credit Report’
   '2 Select 'Equifax Mortgage Solutions'from list and click submit
   '3 In the pop up credit report request window click 'Finish'"
'@ ExpectedResult: 
   '1 Credit Report window must open.A pop up credit request window opens
   '2 Under services view credit report should open.Under services tab if you click on the thumbnail 'view document' next to order credit you should see the credit report 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2294","FHACOREFIARM File started 3-Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()