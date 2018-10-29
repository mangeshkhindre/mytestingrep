'@**************************************************************************************************
'@ TestStory :CTA-69 DDM: Execution Story for Field scenarios conditions added in business rules +Effective DATE should be considered here. 
'@ TestStories Covered:
	'DDM: Execution Story for Fee and Field scenarios conditions added in business rules with effective date  
'@ Test Automation JIRA Task: CTA-67 DDM: Execution Story for Field scenarios conditions added in business rules +Effective DATE should be considered here. 
'@ TestData:
'	<DDM.xslx>,<DDMFieldRule>,<CTA-69>
'	<DDM.xslx>,<DDMFieldRule>,<CTA-69a>
'	<DDM.xslx>,<DDMFieldRule>,<CTA-69_1>
'	<DDM.xslx>,<DDMFieldRule>,<CTA-69_2>
'	<DDM.xslx>,<DDMFieldRule>,<CTA-69_3>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<CTA-69>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<CTA-69>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<CTA-69>
'	<Forms_2015Itemization.xlsx>,<Set800Section>,<CTA-69>
'@ Pre-Conditions: NA

'@ Description:
	'Test Field rule scenarios with combinations of effective dates
'@ Test steps:
	'Create field rule with different scenarios of effective dates.
	'Check the validation and execution of each effective date scenario with loan save option.
'@Expected Result:
	'Field rule should be created successfully
	'Rule should be executed and validated on loan save for each effective date scenario.
'***************************************************************************************************

FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Story: CTA-69 ","Script Name :  Field scenarios conditions added in business rules +Effective DATE", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_DDM_CreateNewDataTable "CTA-69"
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes
FRM_Logger_ReportStepEvent "Creation of field scenarios for effective date","Creation of field scenarios for effective date", Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_CreateNewFieldRule "CTA-69"
BIZ_DDM_AddScenarioToRule "CTA-69_1" 
BIZ_DDM_AddScenarioToRule "CTA-69_2" 
BIZ_DDM_AddScenarioToRule "CTA-69_3" 
BIZ_DDM_ActivateSpecificFieldScenario "CTA-69"
BIZ_Settings_ClickClose()

FRM_Logger_ReportStepEvent "1a: Validation of effective date","Validation for '2025-Loan Created Date' and enforcement for lock fields", Null
'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo "CTA-69"
BIZ_BorrowerSummaryOrigination_SetBorrower "CTA-69"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-69"
'======Save the loan=========
BIZ_Loan_Save()
'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
'======Set Loan Origination Fees(388) to get a value in Estimated closing costs(137) =======
BIZ_2015Itemization_Set800Section "CTA-69"
BIZ_Loan_Save()
'======Verify rule enforcement=======
DDM_VerifyRuleActiveEffectiveDate "CTA-69",strMidName,"enforcement"
BIZ_Loan_Exit False
FRM_Logger_ReportStepEvent "1b: Validation of effective date","Validation for '2025-Loan Created Date' and revert for lock fields", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_UpdateFieldRule "CTA-69a"
BIZ_Settings_ClickClose()
BIZ_Loan_OpenByLoanNumber strLoanNumber
'======Save the loan=========
BIZ_Loan_Save()
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
BIZ_Forms_Open "2015 Itemization"
'======Verify rule revert=======
DDM_VerifyRuleActiveEffectiveDate "CTA-69",strMidName,"revert"
BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "2:Validation of effective date","Validation for '3142-Application Date'", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_DeActivateSpecificFieldScenario("CTA-69")
BIZ_DDM_ActivateSpecificFieldScenario("CTA-69_1")
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("CTA-69")
BIZ_BorrowerSummaryOrigination_SetBorrower("CTA-69_1")
BIZ_BorrowerSummaryOrigination_SetProperty("CTA-69_1")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CTA-69_1")
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome("CTA-69_1")
'======Save the loan=========
BIZ_Loan_Save()
'======Get Loan Number=======
'strLoanNumber = BIZ_Loan_GetLoanNumber()
'BIZ_Forms_Open "Borrower Summary - Origination"
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
BIZ_Forms_Open "2015 Itemization"
'======Verify rule enforcement=======
DDM_VerifyRuleActiveEffectiveDate "CTA-69_1",strMidName,"enforcement"
BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "3:Validation of effective date","Validation for 745 - Trans Details Application Date", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_DeActivateSpecificFieldScenario("CTA-69_1")
BIZ_DDM_ActivateSpecificFieldScenario("CTA-69_2")
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("CTA-69")
BIZ_BorrowerSummaryOrigination_SetBorrower("CTA-69")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CTA-69")
'======Save the loan=========
BIZ_Loan_Save()
'======Get Loan Number=======
'strLoanNumber = BIZ_Loan_GetLoanNumber()
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
BIZ_Forms_Open "2015 Itemization"
'======Verify rule enforcement=======
DDM_VerifyRuleActiveEffectiveDate "CTA-69_2",strMidName,"enforcement"
'DDM_VerifyRuleActiveEffectiveDate "CTA-69_2","","4001"
BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "4:Validation of effective date","Validation for Other, Field id:1402", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_DeActivateSpecificFieldScenario("CTA-69_2")
BIZ_DDM_ActivateSpecificFieldScenario("CTA-69_3")
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("CTA-69")
BIZ_BorrowerSummaryOrigination_SetBorrower("CTA-69")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CTA-69")
'======Save the loan=========
BIZ_Loan_Save()
'======Get Loan Number=======
'strLoanNumber = BIZ_Loan_GetLoanNumber()
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
BIZ_Forms_Open "2015 Itemization"
'======Verify rule enforcement=======
DDM_VerifyRuleActiveEffectiveDate "CTA-69_3",strMidName,"enforcement"
'DDM_VerifyRuleActiveEffectiveDate "CTA-69_3","","4001"
BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "5:Validation of effective date","Validation for all active scenarios", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
DDM_ActivateAllFieldScenarios "CTA-69"
BIZ_Settings_ClickClose()
'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("CTA-69")
BIZ_BorrowerSummaryOrigination_SetBorrower("CTA-69")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CTA-69")
'======Save the loan=========
BIZ_Loan_Save()
'======Get Loan Number=======
'strLoanNumber = BIZ_Loan_GetLoanNumber()
strMidName=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=TextBox10"),"value")
'======Set Loan Origination Fees(388) to get a value in Estimated closing costs(137) =======
BIZ_2015Itemization_Set800Section "CTA-69"
BIZ_Loan_Save() 
'======Verify rule enforcement=======
'DDM_VerifyRuleActiveEffectiveDate "CTA-69_3",strMidName,"enforcement"
DDM_VerifyRuleActiveEffectiveDate "CTA-69",strMidName,"revert"
BIZ_Loan_Exit False

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
DDM_DeactivateAllFieldScenarios "CTA-69"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)
