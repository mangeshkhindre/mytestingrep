'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2117 Doc Preparation 4 - Encompass compliance services
'@ Test Automation JIRA Task: PTAC-2126 E2E_6FHAPURARM_DocumentPrepartion
'@ TestData:  Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Under Forms go to ATR/QM management.
	'2 Click on ATR/QM eligibility tab.
	'3 For Qualified Mortgage Loan type select blank from the dropdown.	
	'4 Click tools tab and select TQL services.	
	'5 Click 'order' button next to 'compliance service orders'.	
'@ ExpectedResult: 
	'1 ATR/QM management page should open.
	'2 ATR/QM eligibility tab should open.
	'3 Should be able to select blank.
	'4 TQL services will open
	'5 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case - PTAC- 2117","Doc Preparation 4- Encompass compliance services", Null

Dim objBorrowerPage
BIZ_Forms_Open "Closing Disclosure Page 1"
strClosingDate = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfLabel("swfname:=lblClosingDate").GetROProperty("text")
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=I_748"), strClosingDate

BIZ_DisclosureTrackingTool_UpdateClosingDisclosureDetails()
BIZ_Forms_Open "ATR/QM Management"
SwfWindow("Swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfTab("swfname:=tabControlForm").Select "ATR/QM Eligibility"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
objBorrowerPage.WebList("html id:=l_X24").Select ""
BIZ_TQLServices_SubmitOrder "Compliance Service", "E2E_FHAPURARM"

Set objBorrowerPage = Nothing
