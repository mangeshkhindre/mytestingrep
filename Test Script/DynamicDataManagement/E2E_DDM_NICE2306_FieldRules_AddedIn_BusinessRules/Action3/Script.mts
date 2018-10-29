'@ TestCase:
   '1  NICE-2434 TC01 - NICE-2306 - Verify DDM Field Rule Condition Execution for Advanced Condition option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
'	<DDM.xslx>,<DDMFieldRule>,<NICE-2434>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2434-TC01>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2434-TC01>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2434-TC01-1>
'@ Pre-Conditions: NA
'@ Description:
	'Verify execution of simple advanced condition successfully updates loan file that satisfies condition.
	'Verify execution of simple advanced condition does not update loan file that does not satisfy condition.
'@ Test steps:
	'Add a DDM Field rule that populates field 1178 (borrower work email) with Condition option on the Details tab set to "Advanced Condition", Advanced Condition definition is borrower middle name = "Lee", and on the Value tab set a specific value for field 1178. Save the rule and then activate the scenario.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view create a new loan with borrower middle name = "Lee" and click the save icon.
	'Clear the borrower work email address, change the borrower middle name to "LeeAnn" and click the save icon.
'@Expected Result:
	'New rule is successfully defined/saved/activated.
	'Borrower work email address is populated by the rule.
	'Borrower work email address is NOT populated by the rule and remains cleared.
'***************************************************************************************************


'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"


FRM_Logger_ReportStepEvent "Start Test Case : NICE-2434","TC01 - NICE-2306 - Verify DDM Field Rule Condition Execution for Advanced Condition option", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"


'======Create a new field rule========
BIZ_DDM_CreateNewFieldRule("NICE-2434")

'======Activate a new field rule========
BIZ_DDM_ActivateFieldRule("NICE-2434")

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2434-TC01")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2434-TC01")

'======Save the loan=========
BIZ_Loan_Save()

'==========Verify the rule has been applied=====

DDM_VerifyRuleActive "NICE-2434","","1978"


'=========Verify the rule after the value has been changed==========
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2434-TC01-1")
Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=TextBox16","index:=0"),""
Set objBorrowerPage= nothing

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2434-TC01-1")

'======Save the loan=========
BIZ_Loan_Save()

DDM_VerifyRuleActive "NICE-2434","NotApplied","1978"

'====Deactivate field rule=======

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

BIZ_DDM_DeactivateFieldRule("NICE-2434")
BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
