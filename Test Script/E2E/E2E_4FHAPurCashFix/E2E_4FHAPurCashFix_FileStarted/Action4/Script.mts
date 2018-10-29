'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3006 FHAPURCHASEFIX - File Started 2-Order Credit Report 
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on Services tab and select ‘Order Credit Report’.
   '2 Select 'Equifax Mortgage Solutions'from list and click submit.
   '3 In the pop up credit report request window click 'Finish'."
'@ ExpectedResult: 
   '1 Credit Report must be generated.
   '2 Under services tab next to order credit report you should see the view document thumbnail. 
   '3 If you click on the thumbnail you should see the credit report.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3006","FHAPURCHASEFIX - File Started 2-Order Credit Report", Null

'Perform Order Credit Report
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()