'@**************************************************************************************************
'@ TestStory :CTA-130 DDM - NICE2166 - Define Fee Rules for Fee lines 1204
'@ TestStories Covered:
	'DDM: NICE2166 - Define Fee Rules for Fee lines 1204
	'DDM: NICE-12208 - Handle Export and Import of DDM Rules with System Table Reference (NICE-5216)
'@ Test Automation JIRA Task: CTA-67 DDM: Execution Story for Field scenarios conditions added in business rules +Effective DATE should be considered here. 
'@ TestData:
'	<DDM.xlsx>,<FeeRule>,<NICE-2166>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2166>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2166>
'	<Settings_TablesFees.xlsx>,<TaxRecord>,<NICE-2166>
'@ Pre-Conditions: NA

''@ Description:
'	For Line 1204, verify if City tax tables under 'Tables and Fees' setting is available for user selection.
'@ Test steps:
'	Create a fee rule on fee line 1204.
'	Apply city tax table to rule
'	Export the rule
'	Delete city tax table
'	Import rule and check for failed dependencies
'	Recreate city tax table
'	Import rule and check for successful import
'	Create a new loan,enforce and validate the rule.
'@Expected Result:
'	Created rule must be enforced and validated on line 1204 on 2015 itemization page.	
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: CTA-130 ","Script Name :  NICE2166 - Define Fee Rules for Fee lines 1204", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes

'====Create system table AutoCityTax
BIZ_Nav_HierarchyTree "Tables and Fees", "City Tax"
BIZ_Settings_TablesandFees_TaxRecord_Creation "NICE-2166","City Tax"

'====Create fee rule AutoNICE2166
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_CreateRule "NICE-2166"

'====Export fee rule AutoNICE2166 
BIZ_DDM_ExportFeeFieldRule "NICE-2166","Fee"

'====Delete fee rule AutoNICE2166 
BIZ_DDM_FeeRule_DeleteRule "AutoNICE2166"

'====Delete system table 
BIZ_Nav_HierarchyTree "Tables and Fees", "City Tax"
BIZ_Settings_TablesAndFees_TaxRecord_Delete "AutoCityTax","City Tax"

'======Check for failed dependencies on rule AutoNICE2166 import 
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-2166","Fee",False

'====ReCreate system table AutoCityTax
BIZ_Nav_HierarchyTree "Tables and Fees", "City Tax"
BIZ_Settings_TablesandFees_TaxRecord_Creation "NICE-2166","City Tax"

'======Import fee rule AutoNICE2166
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-2166","Fee",True

BIZ_DDM_FeeRule_ActivateRule "NICE-2166"

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE-2166"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE-2166"

BIZ_Forms_Open "2015 Itemization"

BIZ_2015Itemization_SetFeeDetails "1204","NICE-2166"

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Loan_Exit(True)

BIZ_Loan_OpenByLoanNumber(BIZ_Loan_GetLoanNumber)

BIZ_Forms_Open "2015 Itemization"

'======Again Save the loan to trigger DDM enforcement=========
BIZ_Loan_Save()

DDM_VerifyRuleActive1204 "NICE-2166","1204"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_DeactivateAllFeeRuleScenarios "NICE-2166"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)
				
