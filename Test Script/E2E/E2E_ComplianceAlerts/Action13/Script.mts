'@**********************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1813 Validate the implementation of the compliance alert "Ability-To-Repay Loan Type Not Determined" into a loan file.  
'@ Test Automation JIRA Task:  PTAC-2214
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Settings_LoanSetup","Alerts","2145_AbilityToRepay"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_SetTrasactionDetails"
			'"Forms_1003Page","1003Page2","2145_BaseIncomeBorrower"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_NoAbilityToRepay"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay"			
'@ Pre-conditions: Ability-To-Repay Loan Type Not Determined Alert should be enabled"
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3. In ATR/QM Management form, make sure that QM.X23 is blank and now save the loan, verify the alert in the 'Alerts & Messages' tab
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X23 = General ATR by clicking the lock icon and then save the loan.
'@ ExpectedResult:
		'1. User should be able to login successfully.
		'2. "Ability-To-Repay Loan Type Not Determined" alert should trigger.
		'3. "Ability-To-Repay Loan Type Not Determined" alert should be removed.		
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1813","Validate the implementation of the compliance alert 'Ability-To-Repay Loan Type Not Determined' into a loan file",Null

'Enable Ability-To-Repay Loan Type Not Determined alert and select first two milestones
BIZ_LoanSetup_Alerts_EditAlert "2145_AbilityToRepay"
'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"
'Set Base income in 1003 Page 2
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"

'Set QM.X23 to blank
BIZ_ATRQMManagement_SetATRQMEligibility "2145_NoAbilityToRepay"

'verify Ability-To-Repay Loan Type Not Determined Alert present in log tab
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Ability-To-Repay Loan Type Not Determined"

'set QM.X23 to "General ATR"
BIZ_ATRQMManagement_SetATRQMEligibility "2145_AbilityToRepay"

BIZ_Loan_Save()

'verify Ability-To-Repay Loan Type Not Determined not present in log tab
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Ability-To-Repay Loan Type Not Determined"
