'@**************************************************************************************************
'@ TestStory :NICE-796 DDM - Fee Rules Value tab for Fee line 902
'@ TestCase:
   '1 NICE-2420 - Validate in the FEE RULE the various field IDs associated with the line # 902 (refer attachment) while logged in as non-admin are getting displayed correctly.
'@ Test Automation JIRA Task: NICE-796 DDM - Fee Rules Value tab for Fee line 902
'@ TestData:DDM,FeeRule,NICE_796_TC_02
			'DDM,FieldRule,NICE_796_TC_02
			'DDM,DataTable,NICE_796_TC_02
			'Forms_BorrowerSummaryOrigination,SetHeadInfo,NICE_796_TC_02
			'Forms_BorrowerSummaryOrigination,SetBorrower,NICE_796_TC_02
			'Forms_BorrowerSummaryOrigination,SetTransactionDetails,NICE_796_TC_02
'@ Pre-Conditions: Please make sure that non-admin user is having access to DDM. 
		  'To make this possible, please ensure that user linked persona is having access to DDM. 
		  'For this go to the encompass settings --> Company User/ Setup --> Persona --> Select desired persona --> Settings tab --> DDM --> Select all checkboxes and under it too.
'@ Description:
'@ TestSteps:Updated at Action level
'@ Test Steps: Updated at Action level
   '1 Login to Encompass as Non-Admin
   '2 Navigate to Encompass-->Settings-->Dynamic Data Management-->Fee Rules
   '3 Click on New icon in Fee Rules page
   '4 Input any name in Fee Rule Name field and 902 in 'Auto Populate fee in Line #/Line Group field and click on OK
   '5 Create a fee scenario record by entering given details in the test data column
   		'Note:-Conditions: Yes --> Loan Type: Conventional
   '6 Click on "Value" tab
   '7 Check and compare each field ID and its permissible type, label, value rule options, field IDs, comments section on clicking Set Field Value button.
   '8 Click on Save and close the Add/Edit Fee Scenario page
'@ ExpectedResult:
   '01 Login should be successful
   '02 Add Fee Rules page should be opened
   '03 On clicking OK, Add/Edit Fee Scenario landing page page should land up.
   '04 fee Rule Name should be updated
   '05 Value should match with the attached excel sheet provided.
   '06 Rule should be saved and Fee Rules page should be displayed
'***************************************************************************************************


FRM_Logger_ReportStepEvent "Start Test Case : NICE-796","TC-02 Validate in the FEE RULE the various field IDs associated with the line # 902 (refer attachment) while logged in as non-admin are getting displayed correctly.", Null

'======Create new Fee Rule=======

Set objSetupContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objRulesEditPage  = objSetupContainer.SwfWindow("swfname:=FeeScenarioRules")
Set objSet902Page = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_CreateRule "NICE_796_TC_02"
'=======Compare Field Id values from xlsheet with Runtime values==========
strFeeRuleName=BIZ_DDM_FeeRule_GetFeeRuleName("902")
Set objSetupContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objRulesEditPage  = objSetupContainer.SwfWindow("swfname:=FeeScenarioRules")
BIZ_DDM_FeeRule_OpenExistingRule (strFeeRuleName)
'========================Click on Value tab ==========

GUI_SwfObject_SelectFormsTab objRulesEditPage.SwfObject("swfname:=tabControlRuleDetails"),"Values"
strFieldValues=UTIL_Excel_GetCellValues(FRM_RT_DataDirPath + "DDM_Validations_FeeRule.xlsx","Lines 902","Field Id")
FeeRule_FieldValidation(strFieldValues)
'======Check the loan save/Stop Triggers checkbox in Data Population Timing=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes()
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "NICE_796_TC_02"
BIZ_BorrowerSummaryOrigination_SetBorrower "NICE_796_TC_02"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "NICE_796_TC_02"
'=======Open 2015 Itemiziation form and Set the Data==========
BIZ_Forms_Open "2015 Itemization"
SetDataTableFeeRuleValue902 "NICE_796_TC_02" 
BIZ_Loan_Save()
'=======Open 2015 Itemiziation form to VErify the Data populated by the rule==========
'BIZ_Forms_Open "2015 Itemization"
VerifyFeeRuleValue902 "NICE_796_TC_02"
BIZ_Loan_Exit False
'=======Deactivate The FEE rule==========
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_DeactivateRule (strFeeRuleName)
'BIZ_Settings_ClickClose


