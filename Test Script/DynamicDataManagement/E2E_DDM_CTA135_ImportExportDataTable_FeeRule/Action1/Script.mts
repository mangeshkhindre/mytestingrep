'@**************************************************************************************************
'@ TestStory :CTA-135 DDM - Import and Export Data table
'			 :NICE-7826 DDM- Export and Import Data Table Enhancements for Output Columns
'@ TestCase:
'   DDM - Import and Export Data table  
'@ Test Automation JIRA Task: CTA-135 Automation - Fee and Field Rule E2E TC's
'@ TestData:
'	<DDM.xslx>,<DataTable>,<CTA-135>
'	<DDM.xslx>,<FeeRule>,<CTA-135>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetTransactionDetails>,<CTA-135>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<CTA-135>
'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<CTA-135>
'@ Pre-Conditions: NA

'@ Description:
	'Check import and export of data table and enforcement of fee rule
'@ Test steps:
	'Create data table
'	 Export and delete the created table
'	 Import data table
'	 Create a fee rule and check for enforcement
'@Expected Result:
	'Data table import and export should work as expected
'	 Fee rule should be created and enforced
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: CTA-135","Script Name : DDM - Import and Export Data table", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"

BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_DDM_CreateNewDataTable "CTA-135"

BIZ_DDM_ExportDataTable "CTA-135"

Set objData = FRM_DS_GetTestData("DDM", "DataTable", "CTA-135")
strDataTableName=FRM_DS_GetValue(objData, "DataTableName")
BIZ_DDM_DeleteDataTable strDataTableName
 
BIZ_DDM_ImportDataTable "CTA-135"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_CreateRule "CTA-135"
BIZ_DDM_ActivateAllFeeRuleScenarios "CTA-135"

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

BIZ_BorrowerSummaryOrigination_SetHeadInfo("CTA-135")
BIZ_BorrowerSummaryOrigination_SetBorrower("CTA-135")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CTA-135")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Forms_Open "2015 Itemization"

'Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
'objBorrowerPage.WebButton("html id:=btnPop901").highlight
'Set objBorrowerPage = nothing

DDM_VerifyRuleActive901 "CTA-135"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_DeactivateAllFeeRuleScenarios "CTA-135"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)
