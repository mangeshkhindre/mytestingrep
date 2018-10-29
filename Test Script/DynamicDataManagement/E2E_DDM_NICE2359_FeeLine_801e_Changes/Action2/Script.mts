'@**************************************************************************************************
'@ TestStory :NICE-2359 DDM - Fee Line 801e changes.
'@ TestCase:
   '1 NICE-3270 - TC01_NICE-2359_Verify rule execution for Fee Line 801e fields when 801f is not populated.
'@ Test Automation JIRA Task: CTA-66 DDM - DDM_Validation_Execution_And_Stop_Trigger_For_Fee_Rule
'@ TestData: DDM,DataTable,NICE_2359_TC_01
			'DDM,FeeRule,NICE_2359_TC_01
			'Forms-BorrowerSummaryOrigination,SetHeadInfo,NICE_2359_TC_01
			'Forms-BorrowerSummaryOrigination,SetBorrower,NICE_2359_TC_01,NICE_2359_TC_01_2
			'Forms-BorrowerSummaryOrigination,SetTransactionsDetails,NICE_2359_TC_01
'@ Description:
'@ Test Steps: 
   '1 Login to Encompass as Admin
   '2 Navigate to Encompass-->Settings-->Dynamic Data Management-->Fee Rules
   '3 Click on New icon in Fee Rules page
   '4 Input any name in Fee Rule Name field and 801e in 'Auto Populate fee in Line #/Line Group field and click on OK
   '5 Create a fee scenario record by entering given details in the test data column
   		'Note:-Conditions: Yes --> Loan Type: Conventional
   '6 Click on "Value" tab
   '7 Check and compare each field ID and its permissible type, label, value rule options, field IDs, comments section on clicking Set Field Value button.
   '8 Click on Save and close the Add/Edit Fee Scenario page
   '8 Set the Stop Trigger and Start Trigger settings in Data Population Timimng .
   '9 Add a new Loan and Navigate to 2015 Itemisation form.
   '10 Click on FeeLine 801e and validate the Rule Data Population Fields.
   '11 Follow the above steps  for LE sent ,Specific conditions and field changes
'@ ExpectedResult:
   '01 Login should be successful
   '02 Add Fee Rules page should be opened
   '03 On clicking OK, Add/Edit Fee Scenario landing page page should land up.
   '04 fee Rule Name should be updated
   '05 Value should match with the attached excel sheet provided.
   '06 Rule should be saved and Fee Rules page should be displayed
   '07 Rule should be triggred in Loan is save 
   '08 Rule should not be triggered when LE is sent and Specific conditions criteria is met.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : NICE-2359","1 NICE-3270 - TC01_NICE-2359_Verify rule execution for Fee Line 801e fields when 801f is not populated.", Null
'======Create new Data Table for FEE Rule=======

BIZ_DDM_CreateNewDataTable "NICE_2359_TC_01"

'======Create new Fee Rule=======
Set objSetupContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objRulesEditPage  = objSetupContainer.SwfWindow("swfname:=FeeScenarioRules")
Set objSet902Page = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_CreateRule "NICE_2359_TC_01"
'=======Get the Rule name==========
strRuleName=BIZ_DDM_FeeRule_GetFeeRuleName("801e")
'======Check the loan save/Stop Triggers checkbox in Global DDM Settings=======
FRM_Logger_ReportStepEvent "Validation of rule enforcement on loan save","Validation of rule enforcement on loan save", Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_DDM_DeselectAllDPTCheckboxes()
BIZ_DDM_SelectDataPopulationStopTrigger "NICE_2359_TC_01"
BIZ_DDM_SaveDataPopulationSettings()
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
FRM_Logger_ReportStepEvent "Validation of rule enforcement on loan save","Validation of rule enforcement on loan save", Null
'FRM_Logger_ReportInfoEvent "FeeRule Validation","Happy Path flow for FeeRule_changes for FeeLine 801e", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE_2359_TC_01"
'=======Open 2015 Itemiziation form and Set the Data==========
BIZ_Forms_Open "2015 Itemization"
SetDataTableFeeRuleValue801e "NICE_2359_TC_01" 
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to VErify the Data populated by the rule==========
'BIZ_Forms_Open "2015 Itemization"
NewVerifyFeeRuleValue801e "NICE_2359_TC_01"
BIZ_Loan_Exit False
'=======Create a new blank loan for checking SPECIFIC CONDITONS ==========
FRM_Logger_ReportStepEvent "Validation of stop trigger Specific Conditon","Validation of stop trigger on field change", Null
'FRM_Logger_ReportInfoEvent "FeeRule Validation For Specific Conditon","Specific conditons flow for FeeRule_changes for FeeLine 801e", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_BorrowerSummaryOrigination_SetBorrower "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE_2359_TC_01"
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to Verify the Data populated by the rule blank==========
BIZ_Forms_Open "2015 Itemization"
VerifyFeeRuleValue801eBlank "NICE_2359_TC_01"
BIZ_Loan_Exit False
'=======Create a new blank loan for checking LE SENT CONDITONS ==========
FRM_Logger_ReportStepEvent "Validation of stop trigger","Validation of stop trigger on LE sent", Null
'FRM_Logger_ReportInfoEvent "FeeRule Validation for LE sent","LE Sent flow for FeeRule_changes for FeeLine 801e", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_2359_TC_01"
BIZ_Loan_Save()
BIZ_Tools_Open "Disclosure Tracking"
wait 25
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", false, false 
BIZ_Forms_Open "Borrower Summary - Origination"
'BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE_2359_TC_01"
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to VErify the Data populated by the rule==========
BIZ_Forms_Open "2015 Itemization"
VerifyFeeRuleValue801eBlank "NICE_2359_TC_01"
BIZ_Loan_Exit False
'=======Open 2015 Itemiziation form and Set the Data FIELD CHANGES CONDITONS ====================
FRM_Logger_ReportStepEvent "Validation of rule enforcement on field change","Validation of rule enforcement on field change:", Null
'FRM_Logger_ReportInfoEvent "FeeRule Validation for Field Changes","Field changes flow for FeeRule_changes for FeeLine 801e", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Forms_Open "2015 Itemization"
SetDataTableFeeRuleValue801e "NICE_2359_TC_01" 
BIZ_Loan_Save()
'=======Create a new blank loan for checking FIELD CHANGES CONDITONS ==========
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_2359_TC_01"
BIZ_BorrowerSummaryOrigination_SetBorrower "NICE_2359_TC_01_2"
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to VErify the Data populated by the rule==========
BIZ_Forms_Open "2015 Itemization"
NewVerifyFeeRuleValue801e "NICE_2359_TC_01"
BIZ_Loan_Exit False
'=======Deactivate The FEE rule==========
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_DeactivateRule (strRuleName)
wait g_LongWaitSmall
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_DDM_DeselectAllDPTCheckboxes()
GUI_Dialog_Encompass_YesX 3,""
BIZ_Settings_ClickClose
'=======End of the Script==========

