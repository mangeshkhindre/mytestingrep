'@ TestCase:
   '1  NICE-2462 TC18 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Loan Type option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    '	<DDM.xslx>,<FeeRule>,<NICE-2462>
    '	<DDM.xslx>,<FeeRule>,<NICE-2462-1>
    '	<DDM.xslx>,<FeeRule>,<NICE-2462-2>
    '	<DDM.xslx>,<FeeRule>,<NICE-2462-3>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2462>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2462>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2462-1>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2462-2>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2462-3>
'@ Pre-Conditions: NA
'@ Description:
	'Verify all defined options appear in dropdown
	'Verify execution of a few of the Loan Type options successfully updates loan file
	'Verify loan files with Loan Type not included in rule definition are not updated by the rule
	'Define a rule with multiple scenarios that have different Loan Type specified and verify several loans are correctly updated or not updated depending on the Loan Type of the loan.
'@ Test steps:
	'Add a DDM Fee Rule that populates a Fee Line # that has no duplicate, set the Conditions dropdown on the Details tab to "Loan Type" and observe the options available in the associated dropdown.
	'Set condition option on the Details tab to "HELOC" and on the Value tab set specific values for the Description, Borrower and Seller fields. Activate the scenario and save the rule.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, set Loan Type (field 1172 on Borrower Summary - Origination form) to "HELOC" and click the save icon.
	'Edit the rule, change the Details tab Condition dropdown to "FHA", change the specific values set on the Values tab and save the rule.
	'Close and reopen the loan and click the save icon.
	'In the loan change Loan Type to "FHA" and click the save icon.
	'Edit the rule, add two more scenarios with different Loan Type options selected and unique specific values populating the Description, Borrower and Seller Value tab fields. Activate all scenarios and save the rule.
	'Close and reopen the loan, select various values for Loan Type and click the Save icon after each different selection.
'@Expected Result:
	'Dropdown includes all options listed in Test Data.
	'Rule is successfully saved.
	'DDM DPT change successfully saved.
	'Appropriate Fee Line # fields are populated by the rule.
	'Rule is successfully saved.
	'Fee Line # fields are NOT populated by the rule.
	'Appropriate Fee Line # fields are populated by the rule.
	'Rule is successfully saved.
	'Fee Line # fields are only updated when the Loan Type in the loan matches the Loan Type in one of the scenarios.	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2462","TC18 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Loan Type option", Null


'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

DDM_FeeRule_CreateRuleLoanPurposeValidation "NICE-2462"


'======Activate a fee rule========
DDM_ActivateAllFeeScenariosLT "NICE-2462"

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2462")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2462")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Forms_Open"2015 Itemization"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleLTActive "NICE-2462","","4001"

BIZ_Loan_Exit False

'======Edit field rule===============
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_EditRule "NICE-2462-1"

BIZ_Settings_ClickClose()

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_OpenByLoanNumber(strLoanNumber)

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleLTActive "NICE-2462-1","Not Applied","4001"

BIZ_Forms_Open "Borrower Summary - Origination"

BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2462-1")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleLTActive "NICE-2462-1","","4001"

BIZ_Loan_Exit False

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_AddFeeScenarioToRule "NICE-2462-2"
BIZ_DDM_AddFeeScenarioToRule "NICE-2462-3"

DDM_ActivateAllFeeScenariosLT "NICE-2462"

BIZ_Settings_ClickClose()

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_OpenByLoanNumber(strLoanNumber)

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2462-2")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleLTActive "NICE-2462-2","","4001"

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2462-3")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleLTActive "NICE-2462-3","","4001"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
DDM_DeactivateAllFeeScenariosLT "NICE-2462"

BIZ_Settings_ClickClose()

Set objBorrowerPage= nothing

BIZ_Loan_Exit False

BIZ_Login_UserLogout



