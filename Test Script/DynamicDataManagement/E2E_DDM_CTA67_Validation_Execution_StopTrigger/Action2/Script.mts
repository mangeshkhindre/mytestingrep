'------------------------------------------------------------------------------------------------
'@ TestCase:
'   NICE-1802 DDM - QA Only - Data Population - Execute Fee Rule, Field Rule for 'Field Changes' conditions
'	NICE-1812 DDM - QA Only - Data Population - Stop Trigger validation of Fee Rule, Field Rule for condition 'After LE is Sent'
'	NICE-1817 DDM - QA Only - Data Population - Stop Trigger validation of Fee rule, Field rule when a Specific condition is met.
'@ Test Automation JIRA Task: CTA-67 DDM - Validation, Execution and Stop Trigger for Field Rule
'@ TestData:
'	<DDM.xslx>,<FeeRule>,<NICE-1802>
'	<DDM.xslx>,<DDMFieldRule>,<NICE-1802>
'	<DDM.xslx>,<DataTable>,<NICE-1802>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-1802>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-1802>	
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-1802_1>	
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-1802_2>	
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetCoBorrower>,<NICE-1802>	
'@ Pre-Conditions: NA
'@ Description:
	'DDM - Validation, Execution and Stop Trigger for Field Rule	
'@ Test steps:
	'Create field rule with different combination of rules and control types.
	'Check the validation and execution of created rule with loan save option.
	'Check the validation and execution of created rule with field change option.
	'Check stop trigger of rule on specific condition.
	'check stop trigger of rule on LE sent
'@Expected Result:
	'Field rule should be created successfully.
	'Rule should be executed and validated on loan save.
	'Rule should be executed and validated on field change.
	'Rule should not be exceuted on stop trigger conditions.'
'***************************************************************************************************


FRM_Logger_ReportStepEvent "Start Test Case : NICE-1802","Create_Execute_FieldRule", Null
FRM_Logger_ReportStepEvent "Validation of rule enforcement","Validation of rule enforcement on loan save", Null 

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes
BIZ_DDM_SelectDataPopulationStopTrigger "NICE-1802"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Tables"

BIZ_DDM_CreateNewDataTable "NICE-1802"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_CreateNewFieldRule "NICE-1802"
DDM_ActivateAllFieldScenarios "NICE-1802"

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetCoBorrower("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-1802")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

DDM_VerifyFiledRuleActive_ExecuteRule "","NICE-1802"

BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Validation of rule enforcement on field change","Validation of rule enforcement on field change: Field 4000", Null

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetCoBorrower("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-1802")

DDM_VerifyFiledRuleActive_ExecuteRule "","NICE-1802"

BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Validation of stop trigger","Validation of stop trigger on Condition is met", Null

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetCoBorrower("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-1802_1")

'======Save the loan=========
BIZ_Loan_Save()

DDM_VerifyFiledRuleActive_ExecuteRule "Not Applied","NICE-1802"

BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Validation of stop trigger","Validation of stop trigger on LE sent", Null

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-1802_2")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"
wait(15) 'explicit wait to handle sync issues
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", False, False

BIZ_BorrowerSummaryOrigination_SetCoBorrower("NICE-1802")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-1802")

'======Save the loan=========
BIZ_Loan_Save()

DDM_VerifyFiledRuleActive_ExecuteRule "Not Applied","NICE-1802"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

DDM_DeactivateAllFieldScenarios "NICE-1802"

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
