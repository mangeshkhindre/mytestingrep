'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1411 CONVNOCASHREFIARM - Doc Preparation 4 - Encompass compliance services
'@ Test Automation JIRA Task: PTAC-1836 E2E_1ConvNoRefiARM_DocumentPreparation
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Under Forms go to ATR/QM management.Click on ATR/QM eligibility tab.For Qualified Mortgage Loan type select blank from the dropdown
   '2 Click tools tab and select TQL services
   '3 Click order button next to compliance service orders
'@ ExpectedResult: 
   '1 ATR/QM management page should open.ATR/QM eligibility tab should open.Should be able to select blank
   '2 TQL services will open
   '3 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1411","CONVNOCASHREFIARM - Doc Preparation 5 - Encompass compliance services", Null

BIZ_DisclosureTrackingTool_UpdateClosingDisclosureDetails()

'Open Form
BIZ_Forms_Open "ATR/QM Management"

SwfWindow("Swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfTab("swfname:=tabControlForm").Select "ATR/QM Eligibility"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
	
objBorrowerPage.WebList("html id:=l_X24").Select ""

'Submit Order
BIZ_TQLServices_SubmitOrder "Compliance Service", ""
