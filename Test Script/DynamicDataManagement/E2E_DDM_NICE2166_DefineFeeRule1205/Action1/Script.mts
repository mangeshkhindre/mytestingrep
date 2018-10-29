'@**************************************************************************************************
'@ TestStory :CTA-141 DDM - NICE2166 - Define Fee Rules for Fee lines 1205
'@ TestStories Covered:
	'DDM: DDM - NICE2166 - Define Fee Rules for Fee lines 1204
'@ Test Automation JIRA Task: CTA-141 DDM: DDM - NICE2166 - Define Fee Rules for Fee lines 1205
'@ TestData:
'	<DDM.xlsx>,<FeeRule>,<CTA-141>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<CTA-141>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<CTA-141>
'	<Settings_TablesFees.xlsx>,<TaxRecord>,<CTA-141>
'@ Pre-Conditions: NA

''@ Description:
'	For Line 1205, verify if State tax tables under 'Tables and Fees' setting is available for user selection.
'@ Test steps:
'	Create a fee rule on fee line 1205.
'	Apply city tax table to rule
'	Craete an new loan,enforce and validate the rule.
'@Expected Result:
'	Created rule must be enforced and validated on 2015 itemization page.	
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: CTA-141 ","Script Name :  NICE2166 - Define Fee Rules for Fee lines 1205", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Nav_HierarchyTree "Tables and Fees", "State Tax"

'============Create state tax table===========

BIZ_Settings_TablesandFees_TaxRecord_Creation "CTA-141","State Tax"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

'============Create a fee rule==============
BIZ_DDM_FeeRule_CreateRule "CTA-141"

BIZ_DDM_FeeRule_ActivateRule "CTA-141"

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo "CTA-141"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-141"

BIZ_Forms_Open "2015 Itemization"

BIZ_2015Itemization_SetFeeDetails "1205","CTA-141"

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Loan_Exit(True)

BIZ_Loan_OpenByLoanNumber(BIZ_Loan_GetLoanNumber)

BIZ_Forms_Open "2015 Itemization"

'======Again Save the loan to trigger DDM enforcement=========
BIZ_Loan_Save()

'==========Verify the rule===========
DDM_VerifyRuleActive1205 "CTA-141","1205"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

'============Deactivate the rule===========
BIZ_DDM_DeactivateAllFeeRuleScenarios "CTA-141"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)

