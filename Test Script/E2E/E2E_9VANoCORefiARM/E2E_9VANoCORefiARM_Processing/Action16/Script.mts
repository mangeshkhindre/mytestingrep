'@******************************************************************************************
'@ TestStory:  PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC-2332 - Processing 4- Order Valuation
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData: 
	'Tools_TQLServices, SetValuationServiceOrder and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on 'Tools' tab and then click on  'TQL services'.
	'2 click order button next to valuation service order.
	'3 Select the date as todays date and select Full appraisal from the dropdown for appraisal type and click order.
	'4 Go to Freddie Mac Additional Data under forms tab.Enter the values as per given in the test data.
'@ ExpectedResult: 
	'1 TQL services page will open.
	'2 valuation service order window pop up will open.
	'3 report is generated and result -pass.(when you close the report generated under valuation services you can see the order details)"
	'4 Data should be entered successfully.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2332","Processing 4- Order Valuation", Null

'Go to Tools->TQL Services
BIZ_Tools_Open "TQL Services"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfObject("swfname:=topContainer"), "TQL Services", "TQL services page is open"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfButton("swfname path:=btnOrder;panelOrderSummary;;serviceContainer;avmControl;AvmPlinthContainer;pnlOrders;topContainer;TQLClientControl;TQLServices;workPanel;rightPanel;LoanPage;loanTabPage;tabControl;pnlMain;MainScreen;mainPanel;MainForm"), 90
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfButton("swfname path:=btnOrder;panelOrderSummary;;serviceContainer;avmControl;AvmPlinthContainer;pnlOrders;topContainer;TQLClientControl;TQLServices;workPanel;rightPanel;LoanPage;loanTabPage;tabControl;pnlMain;MainScreen;mainPanel;MainForm")

If (GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("text:=Valuation Service").Static("text:=Contact your administrator to access this service."))) Then
	FRM_Logger_ReportFailEvent "Valuation Service Order","Contact your administrator to access this service.", Null
	GUI_Dialog_Encompass_OKX 100, ""
Else
	FRM_Logger_ReportPassEvent "Valuation Service Order","Valuation Service Order is displayed", Null
	BIZ_Tools_TQLServices_SubmitValuationServiceOrders "E2E_VANoCORefiARM"
End If

Wait g_TinyWaitLarge