'@***************************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1831 Validate the implementation of the compliance alert 'General QM Loan Feature Violation' into a loan file. 
'@ Test Automation JIRA Task:  2215
'@ TestData:'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_Alerts_GeneralQM"
			'"Forms_1003Page","1003Page2","2145_Income"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_GeneralQM"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankQualifiedMortgage"
			'"Settings_LoanSetup","Alerts","2145_QMLoanFeatureViolation"
'@ Pre-conditions: 'General QM Loan Feature Violation' should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3. Make sure that QM.X23 = Qualified Mortgage AND QM.X24 = General QM and 1659 = Yes and  now save the loan.
		'4. Go to the forms and search for field ID: LOANTERMTABLE.CUSTOMIZE and make it uncheck and then save the loan.
'@ ExpectedResult:
		'1.	User should be able to login successfully.
		'2. "QM Loan Feature Violation" alert should trigger.
		'3. "QM Loan Feature Violation" alert should be removed.
'*****************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1831","Validate the implementation of the compliance alert 'General QM Loan Feature Violation' into a loan file",Null

BIZ_LoanSetup_Alerts_EditAlert "2145_QMLoanFeatureViolation"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_Alerts_GeneralQM"
'Set Base income in 1003 Page 2
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_Income"

BIZ_ATRQMManagement_SetATRQMEligibility "2145_GeneralQM"

BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","General QM Loan Feature Violation"

BIZ_ATRQMManagement_SetATRQMEligibility "2145_BlankQualifiedMortgage"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","General QM Loan Feature Violation"


