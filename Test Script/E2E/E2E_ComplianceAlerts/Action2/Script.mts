'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase: 
		'PTAC-1197 TC01_Verifying the "Send Initial Disclosures" 
'@ Test Automation JIRA Task:  PTAC-1502
'@ TestData: 
			'"Settings_LoanSetup","Alerts","Alerts_SendInitialDisc"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts_noDOB"
			'"Forms_BorrowerSummaryOrigination","SetProperty","Settings_Alerts_Propinfo"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","Settings_Alerts_Trasactiondetails"
			'"Forms_1003Page","1003Page2","Settings_Alerts_BaseIncome"
			'"Settings_LoanSetup","Alerts","Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Settings_LoanSetup","Alerts","Alerts_RemoveField"			
'@ Pre-conditions: Send Initial Disclosure Alert should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Log into Encompass as Admin/password. Navigate to Pipeline tab > Click on New Loan icon (right corner) 
		'	Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
		'2. Go to Settings- Loan setup-Alerts, select and open 'send initial disclosures'Click on 'Add fields' icon,
		'3. Enter 1402 in the Field ID, click on Add button.Click on save button and close the Alerts screen
		'4. Navigate to Pipeline tab and click on create New loan.Enter test data as mentioned and Verify that "Send initial disclosures" is generated
		'5. Execute step 3 to remove the condition (FieldID: " "). Note: This field ID should be Null
'@ ExpectedResult:
		'1. When all the mentioned fields are entered the "Send initial disclosures" alert is generated.
		'	Note: This Alert should be displayed under Alert Messages tab.
'******************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1197","TC01_Verifying the 'Send Initial Disclosures'", Null

'remove field trigger 1402 from "Send Initial Disclosures" Alert if existing
BIZ_LoanSetup_Alerts_EditAlert "Alerts_RemoveField"

'check if Send Initial Disclosures alert is enabled, if not, enable the alert
BIZ_LoanSetup_Alerts_EditAlert "Alerts_SendInitialDisc" 

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"

BIZ_Loan_AddNewBlankLoan()

'Set test data in Borrower Summary origination and Base income in 1003 Page 2
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts_noDOB"

BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"

BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1502_LoanAmount"

BIZ_1003Page2_SetMonthlyIncomeExpensesData "Settings_Alerts_BaseIncome"

BIZ_Loan_Save()

'Validate alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages", "Send Initial Disclosures"

''Save current loan number to text file
'BIZ_Loan_SaveLoanNumber
'strLoanNumber = BIZ_Loan_GetLoanNumber()
'BIZ_Loan_Exit "False"
'
''Select current loan in Pipeline tab and delete
'BIZ_Nav_SelectPipelineTab
'BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
'BIZ_Loan_DeleteLoan()

'Add field 1402 in field triggers for Send Initial Disclosures Alert and save
BIZ_LoanSetup_Alerts_EditAlert "Settings_Alerts"

'BIZ_Loan_AddNewBlankLoan()


BIZ_Forms_Open "Borrower Summary - Origination"

'Set test data in Borrower Summary origination along with DOB and Base income in 1003 Page 2
BIZ_BorrowerSummaryOrigination_SetBorrower "1490_AlertSettings"

'BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"

'BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1502_LoanAmount"

'Set base income for borrower in 1003 Page2
'BIZ_1003Page2_SetMonthlyIncomeExpensesData "Settings_Alerts_BaseIncome"

'Validate alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages", "Send Initial Disclosures"

'remove field trigger 1402 from "Send Initial Disclosures" Alert
BIZ_LoanSetup_Alerts_EditAlert "Alerts_RemoveField"

BIZ_Loan_Exit "True"
