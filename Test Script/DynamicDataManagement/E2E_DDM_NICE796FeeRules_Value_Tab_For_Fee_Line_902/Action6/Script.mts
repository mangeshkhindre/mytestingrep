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
   '2 Navigate to Encompass-->Settings-->Dynamic Data Management-->Feild Rules
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

FRM_Logger_ReportStepEvent "Start Test Case : NICE-796","TC-04 Validate in the FEILD RULE the various field IDs associated with the line # 902 (refer attachment) while logged in as non-admin are getting displayed correctly.", Null
'=======DDM Navigation till Field Rules==========
'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
'=======Create a new Field Rule==========
BIZ_DDM_DeactivateFieldRule "NICE_796_TC_02"
BIZ_DDM_CreateNewFieldRule "NICE_796_TC_02"
BIZ_DDM_ActivateFieldRule "NICE_796_TC_02"
BIZ_Settings_ClickClose
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

'=======Deactivate The FEILD rule==========

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_DeactivateFieldRule "NICE_796_TC_02"
BIZ_Settings_ClickClose

