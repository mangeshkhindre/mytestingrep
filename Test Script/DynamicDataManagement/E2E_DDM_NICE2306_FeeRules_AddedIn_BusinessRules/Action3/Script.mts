'@ TestCase:
   '1  NICE-2466 TC22 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Rate option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    '	<DDM.xslx>,<FeeRule>,<NICE-2466>
    '	<DDM.xslx>,<FeeRule>,<NICE-2466-1>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2466>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2446>	
'@ Pre-Conditions: NA
'@ Description:
	'Verify all defined options appear in dropdown
	'Verify execution of a few of the Rate options successfully updates loan file
	'Verify loan files with Rate Lock status not included in rule definition are not updated by the rule
'@ Test steps:
	'Add a DDM Fee Rule that populates a Fee Line # that has no duplicate, set the Conditions dropdown on the Details tab to "Rate" and observe the options available in the associated options dropdown.
	'Set condition option on the Details tab to "Locked" and on the Value tab set specific values for the Description, Borrower and Seller fields. Activate the scenario and save the rule.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, check the "Rate is Locked" checkbox (field 2400 on Borrower Summary - Origination form) and click the save icon.
	'Edit the rule, change the Details tab Condition options dropdown to "Unlocked", change the specific values set on the Values tab and save the rule.
	'Close and reopen the loan and click the save icon.
	'Uncheck the "Rate is Locked" checkbox and click the save icon.
'@Expected Result:
	'Dropdown includes all options listed in Test Data.
	'Rule is successfully saved.
	'DDM DPT change successfully saved.
	'Appropriate Fee Line # fields are populated by the rule.
	'Rule is successfully saved.
	'Fee Line # fields are NOT populated by the rule.
	'Fee Line # fields are populated by the rule.'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2466","TC22 - NICE-2466 TC22 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Rate option", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"


BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

DDM_FeeRule_CreateRuleRateValidation "NICE-2466"

'======Activate a new field rule========
BIZ_DDM_FeeRule_ActivateRule("NICE-2466")

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2466")
Set objBorrowerPage =  SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckBox_Set  objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "On"
Set objBorrowerPage = Nothing

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Forms_Open"2015 Itemization"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleActive "NICE-2446","","4001"

BIZ_Loan_Exit False

'======Edit field rule===============
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_EditRule "NICE-2466-1"

BIZ_Settings_ClickClose()

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_OpenByLoanNumber(strLoanNumber)

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleActive "NICE-2466-1","Not Applied","4001"

BIZ_Forms_Open "Borrower Summary - Origination"


GUI_WebCheckBox_Set  objBorrowerPage.WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "Off"
'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleActive "NICE-2466-1","","4001"
Set objBorrowerPage = Nothing

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

DDM_DeactivateAllFeeScenarios "NICE-2466"

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout



