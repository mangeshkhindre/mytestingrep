'@***************************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1845 Validate the implementation of the "custom alert" into a loan file.
'@ Test Automation JIRA Task:  2215
'@ TestData:'"Settings_Loansetup","CreateNewAlert","2145_RegressionAlert"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","2145_CustomAlert"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_Alerts_GeneralQM"
			'"Forms_1003Page","1003Page2","2145_Income"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","2145_FirstName"
'@ Pre-conditions:  
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the encompass settings  --> loan setup --> Alerts --> Click on + icon
		'3. Enter the details as mentioned in the test data column, save
		'4. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, save
		'5. Change the value of field ID: 4000 = Sample
'@ ExpectedResult:
		'1.	User should be able to login successfully.
		'2.	Custom alert should be created successfully.
		'3. Custom alert "E2E Regression"  should be removed successfully. 
'*****************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1845","Validate the implementation of the 'custom alert' into a loan file",Null

BIZ_Nav_HierarchyTree "Loan Setup", "Alerts"

'delete E2E Regression alert if existing to avoid naming conflicts
BIZ_Alerts_DeleteAlert "E2E Regression"

'Create new alert "E2E Regression"
boolCreated =BIZ_LoanSetup_Alerts_CreateNewAlert("2145_RegressionAlert")
BIZ_Nav_Settings_Close()

FRM_VerifyTrue boolCreated,"New Alert Creation","New Alert: 'E2E Regression is created"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()

'Set test data in Borrower Summary origination and Base income in 1003 Page 2
BIZ_BorrowerSummaryOrigination_SetBorrower "2145_CustomAlert"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_Income"

BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","E2E Regression"

'change borrower first name from "Regression" to test data
BIZ_BorrowerSummaryOrigination_SetBorrower "2145_FirstName"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","E2E Regression"
