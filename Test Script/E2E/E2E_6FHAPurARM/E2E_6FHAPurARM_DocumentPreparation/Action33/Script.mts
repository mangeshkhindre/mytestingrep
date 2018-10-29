'@**************************************************************************************************
'@ TestStory: PTAC- 2010 E2E_6FHAPURARM
'@ TestCase : PTAC- 2113 Doc Preparation 1 - Clear Alerts
'@ Test Automation JIRA Task: PTAC-2126 E2E_6FHAPURARM_DocumentPrepartion
'@ TestData: 
    '1 Loans, Milestone, E2E_FHAPURARM_DocPreparing
    '2 Loans, LoanTemplate, E2E_Closer
    '3 Forms_ATRQMManagement, SetATRQMEligibility, E2E_FHAPURARM
    '4 Forms_ClosingConditions, SetClosingConditions, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as jwuser.
	'2 To clear the alert ability to repay alert:Go to forms and click ATR/QM management
	'3 Click ATR/QM eligibility tab.For qualified mortgage loan type select 'General QM'.
	'4 Under ATR/QM exemption eligibility select checkbox - Transaction is exempt from Reg-Z ability to repay requirements based on.
       'select check box- creditor type and then from dropdown select 'Non- profit organization'.
'@ ExpectedResult: 
	'1 Should be able to login and will see 2 alerts.
	'2 ATR/QM management page should open.
	'3 Should be able to select 'General QM'.
	'4 Alert should be cleared
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2113","Doc Preparation 1- Clear Alerts", Null

Dim objData
'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_jwcloser" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS8Complete_FHAPURARM","Doc Preparation"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_DocPreparing")
BIZ_Loan_AcceptFiles "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")
BIZ_ATRQMManagement_SetATRQMEligibility "E2E_FHAPURARM"

'=== Verify if Ability to repay alert is cleared ====
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Ability-to-Repay Exemption Reason Not Determined"

Set objData = Nothing
