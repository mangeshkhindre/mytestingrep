'@**************************************************************************************************
'@ TestStory: PTAC 1873 Loan Terms table
'@ TestCase: 
   '1 PTAC-1398 Calculation for Loan Terms data
   '2 PTAC-1305 Output form for Loan Terms table
'@ Test Automation JIRA Task: PTAC-1874 LoanTermsTable_LoanTerms_CalcandOutputForms_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower, 1398_LoanTermsTable
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails, 1398_LoanTermsTable
   '3 LoanTermsTable,VerifyLoanTermsTable, 1398_LoanTermsTable
'@ Pre-conditions: 
'@ Description: Verify and Validate Create, Duplicate, Delete, Rename, Edit functonality of Escrow record 
'@ TestSteps:
   '1 Create a new loan(Fixed), Set basic fields as per test data
   '2 Go to RegZ LE form, Under Rate Adjustment Mortgage header in Rate Adjustment table ,input field as below
   '3 Go to LE Page 1 form, Loan Terms  section
   '4 Click on ' Forms' tab and select  'Loan estimation 1'
   '5 Go to Loan Terms section
   '6 Click on ' Forms' tab and select  'Closing Disclosure 1'
   '7 Go to Loan Terms section
'@ ExpectedResult:
   '01 Loan is created.
   '02 System should populate Max Life Int. Rate[2625] = 3.25
   '03 Customize check box unchecked available beside 'Loan Terms' section header
   '04 Under 'Can this amount increase after closing?' column ,in 'Interest Rate' row Second bullet is-Can go dropdown as high as $<Max.
	  'Life interest rate[NEWHUD.X555]=3.25]> in year <1>
   '05 'Customize' check box unchecked available beside 'Loan Terms' section header
   '06 'Can this amount increase after closing?' section available
   '07 'Does the loan have these features?' section available
   '08 'Customize' check box unchecked available beside 'Loan Terms' section header
   '09 'Can this amount increase after closing?' section available
   '10 'Does the loan have these features?' section available
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test - PTAC-1398", "Calculation of Max Interest Rate for ARM Loan in Loan Terms Table", Null

'Set data in Borrower summary origination form 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1398_LoanTermsTable"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "1398_LoanTermsTable"
LoanTermTable_LoanTerms_LoanAmount_Bullet_Validate "1398_LoanTermsTable"

'====== Verify Loan term drop down sections UI ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1305","Validate section 'Does the loan have these features?'",Null

LoanTermsTable_LoanTerms_OutputForms_Validate "1398_LoanTermsTable","Loan Estimate Page 1"
LoanTermsTable_LoanTerms_OutputForms_Validate "1398_LoanTermsTable","Closing Disclosure Page 1"
