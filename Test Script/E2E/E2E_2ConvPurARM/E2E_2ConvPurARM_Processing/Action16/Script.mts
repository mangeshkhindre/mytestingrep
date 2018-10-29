'@**************************************************************************************************
'@ TestStory: PTAC-871 - CONVPURARM
'@ TestCase : PTAC-699 - Order Valuation
'@ Test Automation JIRA Task: PTAC-990 E2E_2CONVPURARM_Processing
'@ TestData: 
	'1 Tools_TQLServices,SetValuationServiceOrder,E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click TQL services
	'2 click order button next to valuation service order.
	'3 Select the date as todays date and type: full appraisal and click order.
'@ ExpectedResult: 
	'TQL services page will open.
	'valuation service order window pop up will open.
	'report is generated and result -pass.(when you close the report generated under valuation services you can see the order details)"
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-699","Test Case Name - PTAC-699 - Order Valuation", Null

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
	BIZ_Tools_TQLServices_SubmitValuationServiceOrders "E2E_CONVPURARM"
End If

Wait g_TinyWaitLarge
