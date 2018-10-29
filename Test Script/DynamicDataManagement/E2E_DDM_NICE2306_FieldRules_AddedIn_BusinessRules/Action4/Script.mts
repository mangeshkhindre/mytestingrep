'@ TestCase:
   '1  TC04 - NICE-2437 - Verify DDM Field Rule Condition Execution for Loan Program option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
	'	<DDM.xslx>,<DDMFieldRule>,<NICE-2437>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2437_1>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2437_2>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2437_3>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2437>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2437>    
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2437_1> 
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2437_2> 
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<NICE-2437_3> 
'@ Pre-Conditions: NA
'@ Description:
'	Verify all defined options appear in dropdown
	'Verify execution of a few of the loan program options successfully updates loan file
	'Verify loan files with loan programs not included in rule definition are not updated by the rule
	'Define a rule with multiple scenarios that have different loan programs specified and verify several loans are correctly updated or not updated depending on the loan program of the loan.
'@ Test steps:
	'Navigate to Settings > DDM > Field Rules, add a new Field rule that populates the Borrower Middle Name (field 4001), set the Conditions dropdown on the Details tab to "Loan Program" and observe the options available in the Select Loan Program Template popup.
	'Set condition option on the Details tab to "5/1 ARM" and on the Value tab set a specific value for field 4001. Activate the scenario and save the rule.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, set Loan Program (field 1401 on Borrower Summary - Origination form) to "5/1 ARM" and click the save icon.
	'Edit the rule, change the Details tab Condition value to "Investment", change the specific value set for field 4001 and save the rule.
	'Close and reopen the loan and click the save icon.
	'In the loan change Loan Program to "Investment" and click the save icon.
	'Edit the rule, add two more scenarios with different Loan Program options selected (including one custom option) and unique specific values populating Value tab fields. Activate all scenarios and save the rule.
	'Close and reopen the loan, select various values for Loan Program and click the Save icon after each different selection.
'@Expected Result:
	'Popup includes all options listed in Test Data. (These are the Example loan programs. There may be other custom templates included in the list).
	'Rule is successfully saved.
	'DDM DPT change successfully saved.
	'Borrower middle name is popuplated by the rule.
	'Rule is successfully saved.
	'Borrower middle name is NOT populated with the new value by the rule.
	'Borrower middle name is popuplated with the new value by the rule.
	'Rule is successfully saved.
	'Borrower middle name is only updated when the Loan Program in the loan matches the Loan Program in one of the scenarios.

'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2306","TC04 - NICE-2437 - Verify DDM Field Rule Condition Execution for Loan Program option", Null

BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates", "Loan Programs"
LoanPrograms_Add_LoanPrograms "NICE-2437"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

DDM_VerifyLoanProgramsAndCreateFieldRule("NICE-2437")


'======Activate a new field rule========
BIZ_DDM_ActivateFieldRule("NICE-2437")

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"


'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2437")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2437")
	

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()
DDM_VerifyRuleActive "NICE-2437","","4001"

BIZ_Loan_Exit False	
	
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_UpdateFieldRule("NICE-2437_1")
BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_SelectHomeTab()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_OpenByLoanNumber(strLoanNumber)

DDM_VerifyRuleActive "NICE-2437_1","Not Apllied","4001"

'BIZ_Login_UserLogout
'BIZ_Login_UserLogin "admin_core2p"
''---------------------------------------------------------------------------------------------------------------------------------------------
'BIZ_Nav_SelectHomeTab()
'BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
'BIZ_Loan_OpenByLoanNumber(strLoanNumber)

BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2437_1")

BIZ_Loan_Save()
DDM_VerifyRuleActive "NICE-2437_1","","4001"

'BIZ_Loan_Exit False	

'=======creating custom loan program=======

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates", "Loan Programs"
BIZ_LoanPrograms_CreateNew("Auto123")

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

BIZ_DDM_AddScenarioToRule("NICE-2437_2")
BIZ_DDM_AddScenarioToRule("NICE-2437_3")

DDM_ActivateAllFieldScenarios "NICE-2437"

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_SelectHomeTab()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_OpenByLoanNumber(strLoanNumber)

BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2437_2")
BIZ_Loan_Save()

DDM_VerifyRuleActive "NICE-2437_2","","4001"


BIZ_BorrowerSummaryOrigination_SetTransactionDetails("NICE-2437_3")
BIZ_Loan_Save()

DDM_VerifyRuleActive "NICE-2437_3","","4001"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
DDM_DeactivateAllFieldScenarios "NICE-2437"

BIZ_Login_UserLogout



