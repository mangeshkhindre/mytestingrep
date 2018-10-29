'@ TestCase:
   '1  NICE-2446 TC12 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Advanced Condition option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    '	<DDM.xslx>,<FeeRule>,<NICE-2446>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2446>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2446>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2446-1>
'@ Pre-Conditions: NA
'@ Description:
'	Verify execution of simple advanced condition successfully updates loan file that satisfies condition.
'	Verify execution of simple advanced condition does not update loan file that does not satisfy condition.
'	NOTE: There are no changes to the Advanced Condition execution code for this story.
'@ Test steps:
	'Add a DDM Fee Rule that populates a Fee Line # that has no duplicate, Condition option on the Details tab set to "Advanced Condition", Advanced Condition definition is borrower middle name = "Lee", and on the Value tab set specific values for the Description, Borrower and Seller fields. Save the rule and activate the scenario.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view create a new loan with borrower middle name = "Lee" and click the save icon.
	'Clear the fields in the Fee Line # that were populated by the rule, change the borrower middle name to "LeeAnn" and click the save icon.
'@Expected Result:
	'New rule is successfully defined/saved/activated.
	'DDM DPT change successfully saved.
	'Appropriate fields in Fee Line # on 2015 Itemization form are populated by the rule.
	'Fields in Fee Line # are NOT populated by the rule and remain cleared.
'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2446","TC12 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Advanced Condition option", Null


'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"


BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_CreateRule "NICE-2446"

'======Activate a new field rule========
BIZ_DDM_FeeRule_ActivateRule("NICE-2446")

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2446")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2446")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"

Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
objBorrowerPage.WebButton("html id:=btnPop808").highlight

DDM_VerifyFeeRuleActive "NICE-2446","","4001"


GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_369","index:=0"),""
GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_370","index:=0"),""
GUI_WebEdit_Set objBorrowerPage.WebEdit("html id:=l_565","index:=0"),""
Set objBorrowerPage= nothing

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2446-1")

'======Save the loan=========
BIZ_Loan_Save()

BIZ_Forms_Open"2015 Itemization"


DDM_VerifyFeeRuleActive "NICE-2446","Not Applied","4001"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

DDM_DeactivateAllFeeScenarios "NICE-2446"

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
