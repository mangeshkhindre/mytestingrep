'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
'1.Click on Services tab and select ‘Order Credit Report’.
'2.Select 'Equifax Mortgage Solutions' from list and click submit.
'3.In the pop up credit report request window click 'Finish'."
'@ ExpectedResult: 
'Credit Report must be generated.
'Under services tab next to order credit report you should see the view document thumbnail. 
'If you click on the thumbnail you should see the credit report.
'********************************************************************************************
BIZ_Services_OrderCreditReport_EquifaxMortgageSolutions()

GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").WinObject("text:=AVPageView"), 120

GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").WinObject("text:=AVPageView"), 120

FRM_Logger_ReportPassEvent "Create Order Report", "Select Equifax Mortgage Solutions for the Loan in Order Credit Report", null
