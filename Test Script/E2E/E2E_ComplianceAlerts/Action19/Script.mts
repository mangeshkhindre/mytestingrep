'@***************************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1844 Validate the implementation of the Compliance alert "Ability-to-Repay Exemption Reason Not Determined" into a loan file.
'@ Test Automation JIRA Task:  2215
'@ TestData:'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_Alerts_GeneralQM" 
			'"Forms_1003Page","1003Page2","2145_BaseIncomeBorrower"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_X23Exempt"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_ATRQMExemption"
			'"Settings_LoanSetup","Alerts","2145_ARExemption"
'@ Pre-conditions: "Ability-to-Repay Exemption Reason Not Determined" should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X23 = Exempt by clicking the lock icon and then save the loan.
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and under section, "ATR/QM Exemption Eligibility" check the checkbox, QM.X103 and then
		'	select all below checkboxes and select any value under drop down and save the loan
'@ ExpectedResult:
		'1.	User should be able to login successfully.
		'2. Ability-to-Repay Exemption Reason Not Determined alert should be triggered.
		'3. Ability-to-Repay Exemption Reason Not Determined' alert should be removed.
'*****************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1844","Validate the implementation of the compliance alert 'Ability-to-Repay Exemption Reason Not Determined' into a loan file",Null
'Enable "Ability-to-Repay Exemption Reason Not Determined" alert
BIZ_LoanSetup_Alerts_EditAlert "2145_ARExemption"
'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_Alerts_GeneralQM"

'1003 Page 2, Base Income
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"

'test data for ATR/QM Management
BIZ_ATRQMManagement_SetATRQMEligibility "2145_X23Exempt"

BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Ability-to-Repay Exemption Reason Not Determined"

BIZ_ATRQMManagement_SetATRQMEligibility "2145_ATRQMExemption"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Ability-to-Repay Exemption Reason Not Determined"


