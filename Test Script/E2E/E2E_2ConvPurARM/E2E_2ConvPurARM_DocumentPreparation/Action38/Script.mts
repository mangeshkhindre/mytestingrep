﻿'@**************************************************************************************************
'@ TestStory: PTAC-871- E2E_2CONVPURARM
'@ TestCase: PTAC- 1007 - Doc Preparation 4 - Encompass compliance services
'@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
'@ TestData: Tools_TQLServices, SetValuationServiceOrder, E2E_CONVPURARM
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

FRM_Logger_ReportStepEvent "Start Test Case : PTAC- 1007","Test Case Name: Doc Preparation 4 - Encompass compliance services", Null

Dim objBorrowerPage

BIZ_DisclosureTrackingTool_UpdateClosingDisclosureDetails()

BIZ_Forms_Open "ATR/QM Management"

SwfWindow("Swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfTab("swfname:=tabControlForm").Select "ATR/QM Eligibility"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
	
objBorrowerPage.WebList("html id:=l_X24").Select ""

BIZ_TQLServices_SubmitOrder "Compliance Service", "E2E_CONVPURARM"

Set objBorrowerPage =Nothing
