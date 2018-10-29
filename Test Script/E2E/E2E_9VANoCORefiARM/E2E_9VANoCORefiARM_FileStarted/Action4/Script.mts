'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2263 File started 3-Order Credit Report
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_Filestarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Services tab and select ‘Order Credit Report’
   '2 Select 'Equifax Mortgage Solutions' from list and click submit
   '3 In the pop up credit report request window click 'Finish'
'@ ExpectedResult: 
   '1 Credit Report must be generated
   '2 A pop up credit request window opens.
   '3 Under 'Services view' credit report should open
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2263","File started 3-Order Credit Report",Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()