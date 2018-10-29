'@**************************************************************************************************
'@ TestStory:  PTAC-871- E2E_2CONVPURARM
'@ TestCase: PTAC-901 Doc Preparation 1- Clear Alerts
'@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
'@ TestData: 
	'1 Loans, Milestone, E2E_CONVPURARM_DocPreparing
	'2 Loans, LoanTemplate, E2E_Closer
	'3 Forms_ATRQMManagement, SetATRQMEligibility, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as jwuser.
	'2 To clear the alert ability to repay alert:Go to forms and click ATR/QM management
	'3 Click ATR/QM eligibility tab.For qualified mortgage loan type select 'General QM'.
	'4 Under ATR/QM exemption eligibility select checkbox - Transaction is exempt from Reg-Z ability to repay requirements based on.
	'5 select check box- creditor type and then from dropdown select 'Non- profit organization'.
'@ ExpectedResult: 
	'1 Should be able to login and will see 2 alerts.
	'2 ATR/QM management page should open.
	'3 Should be able to select 'General QM'.
	'4 Alert should be cleared
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-901","Test Case Name: Doc Preparation 1- Clear Alerts", Null

Dim objData

'Login to Encompass with user credentials
BIZ_Login_UserLogin "E2E_jwcloser" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

'search for loans with MS8Complete_CONVPURARM as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS8Complete_CONVPURARM","Doc Preparation"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_DocPreparing")

BIZ_ATRQMManagement_SetATRQMEligibility "E2E_CONVPURARM"

'=== Verify if Ability to repay alert is cleared ====
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Ability-to-Repay Exemption Reason Not Determined"

Set objData =Nothing
