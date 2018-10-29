'@**************************************************************************************************
''@ TestStory :NICE-2306 DDM: Execution_Story_For_FeeScenarios_Conditions_Added_In_Business_Rule
'@ TestCase:
   '1 TC01_NICE-2306_DDM_Execution_Story_For_FeeScenarios_Conditions_Added_In_Business_Rule
'@ Test Automation JIRA Task: CTA-68 DDM: Execution Story for Fee scenarios conditions added in business rules +Effective DATE should be considered here.
'@ TestData:DDM,FeeRule,CTA-68,CTA-68_1,CTA-68_2,CTA-68_3
		   'Forms_BorrowerSummaryOrigination,SetHeadInfo,CTA-68,CTA-68_1
		   'Forms_BorrowerSummaryOrigination,SetBorrower,CTA-68_3
		   'Forms_BorrowerSummaryOrigination,SetBorrower,CTA-69_1
		   'Forms_BorrowerSummaryOrigination,SetProperty,CTA-69_1
		   'Forms_BorrowerSummaryOrigination,SetTransactionDetails,CTA-68
'@ Description:

'@ Test Steps: Updated at Action level
   '1 Login to Encompass as Admin
   '2 Navigate to Encompass-->Settings-->Dynamic Data Management-->Fee Rules
   '3 Click on New icon in Fee Rules page
   '4 Input any name in Fee Rule Name field and 802f in 'Auto Populate fee in Line #/Line Group field and click on OK
   '5 Create a fee scenario record by entering given details in the test data column
   		'Note:-Conditions: Yes --> Loan Type: Conventional
   '6 Click on "Value" tab
   '7 Check and compare each field ID and its permissible type, label, value rule options, field IDs, comments section on clicking Set Field Value button.
   '8 Click on Save and close the Add/Edit Fee Scenario page
   '9 Add a NewBlankLoan With loan Type as Conventional Enter channel and Other Details and Save Loan
   '10 Navigate to 2015 Itemisation Form and verify whether Target fields are populated with correct values.
'@ ExpectedResult:
   '01 Login should be successful
   '02 Add Fee Rules page should be opened
   '03 On clicking OK, Add/Edit Fee Scenario landing page page should land up.
   '04 fee Rule Name should be updated
   '05 Value should match with the attached excel sheet provided.
   '06 Rule should be saved and Fee Rules page should be displayed
   '07 After Loan Save is done,Target Fields should be populated with correct data as provided.
'***************************************************************************************************


FRM_Logger_ReportStepEvent "Start Test Case : NICE-2359","1 NICE-3270 - TC01_NICE-2359_Verify rule execution for Fee Line 801e fields when 801f is not populated.", Null
FRM_Logger_ReportStepEvent "Creation of FeeRule scenarios for effective date","Creation of FeeRule scenarios for effective date", Null
'======Create new Fee Rule=======
Set objSetupContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objRulesEditPage  = objSetupContainer.SwfWindow("swfname:=FeeScenarioRules")
Set objSet902Page = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")
Set oMainView=SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
'======Check the loan save/Stop Triggers checkbox in "Global DDM Settings"=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes()
BIZ_Settings_ClickClose()
'=======Create New Fee Rule==========
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_CreateRule "CTA-68"
'======Create four Scenarios=======

For intFeeRuleCount =1 To 4 Step 1
	CreateReportingInfo (intFeeRuleCount)
	strRuleName=BIZ_DDM_FeeRule_GetFeeRuleName("802f")
	BIZ_DDM_FeeRule_OpenExistingRule (strRuleName)
	BIZ_DDM_FeeRule_ActivateScenario ("SC_"&intFeeRuleCount)
	GUI_SwfButton_Click objRulesEditPage.SwfButton("swfname:=btnClose")
	BIZ_Settings_ClickClose()
	'=======Create a new blank loan==========
	FRM_Logger_ReportInfoEvent "FeeRule Validation Effective Date"," '2025 - Loan Created Date for FeeRule_changes for FeeLine 802f", Null
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
	BIZ_BorrowerSummaryOrigination_SetHeadInfo "CTA-69"
	
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-69_1"
	strRowId4Scenario=CreateRowId(intFeeRuleCount)
	Set802fLockField(intFeeRuleCount) 
	If  strRowId4Scenario="CTA-68_1" or  strRowId4Scenario="CTA-68_3" Then 
		BIZ_BorrowerSummaryOrigination_SetBorrower "CTA-69_1"
		BIZ_BorrowerSummaryOrigination_SetProperty "CTA-69_1"
		BIZ_1003Page2_SetMonthlyIncomeExpensesData  "CTA-69_1"
	End If
	BIZ_Loan_Save()
	'=======Open 2015 Itemiziation form to Verify the Data populated by the rule==========
	BIZ_Forms_Open "2015 Itemization"
	
	VerifyFeeRuleValue802f strRowId4Scenario,"SC_"&intFeeRuleCount
	BIZ_Loan_Exit False
	'=======Deactivate The FEE rule==========
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
	BIZ_DDM_FeeRule_OpenExistingRule ("NICE2306_EffDate")
	BIZ_DDM_FeeRule_DeactivateScenario ("SC_"&intFeeRuleCount) 
	GUI_SwfButton_Click objRulesEditPage.SwfButton("swfname:=btnClose")
	wait g_LongWaitSmall
Next

'Changes For All Active Scenarios.
FRM_Logger_ReportStepEvent "Validation of effective date","Validation for all active scenarios", Null
BIZ_DDM_ActivateAllFeeRuleScenarios "CTA-68"
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
FRM_Logger_ReportInfoEvent "FeeRule Validation Effective Date"," '2025 - Loan Created Date for FeeRule_changes for FeeLine 802f", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "CTA-68"
BIZ_BorrowerSummaryOrigination_SetBorrower "CTA-69_1"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-68"
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to Verify the Data populated by the rule==========
BIZ_Forms_Open "2015 Itemization"
'Since all the four scenarios are active hence sc_1 would be imposed since its order is 1
VerifyFeeRuleValue802f "CTA-68","sc_1"
BIZ_Loan_Exit False
'=======Deactivate The FEE rule==========
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
strRuleName=BIZ_DDM_FeeRule_GetFeeRuleName("802f")
BIZ_DDM_FeeRule_DeactivateRule (strRuleName)
BIZ_Settings_ClickClose()
'End of Script for 4 Scenarios



