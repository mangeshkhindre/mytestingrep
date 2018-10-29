'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table 
'@ TestCase : PTAC-1257 Loan Term Table Override
'@ Test Automation JIRA Task: PTAC-3530 LoanTermsTable_ConstructionLoans_LoanTerms_Override_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower, 1873_LoanTerms_Override
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails, 1873_LoanTerms_Override
   '3 LoanTermsTable, VerifyLoanTermsTable, 1873_LoanTerms_Override_Fixed
   '4 LoanTermsTable, VerifyLoanTermsTable, 1873_LoanTerms_Override_ARM
   '5 Forms_RegZ_LE, SetARM, 1873_LoanTerms_Override
   '6 LoanTermsTable, VerifyLoanTermsTable, 1873_LoanTerms_Override_ARM_Verify
   '7 LoanTermsTable, VerifyLoanTermsTable, 1873_LoanTerms_Override_Fixed_IntOnly
'@ Pre-conditions: 
'@ Description: Loan Term Table Loan Terms Override
'@ TestSteps:
   '1 Create a new loan, Set basic fields
   '2 Go to LE Page 1 form,  LE  Loan Terms tables
   '3 Create a new loan, Set basic fields
   '4 Go to LE Page 1 form,  LE  Loan Terms tables.
   '5 Go to reg-LE and enter data as per test data in Adjustable rate mortgage
   '6 Create a new loan, Set basic fields
   '7 Go to LE Page 1 form,  LE  Loan Terms tables.
'@ ExpectedResult:
   '1 Customize checkbox is unchecked default
   '2 Fields in Loan Terms table under "Can this amount increase after closing"? in disable mode and default to No Loan amount Int rate Monthly P &I
   '3 Customize" checkbox is unchecked default.
   '4 Under 'Can this amount increase after closing?' 'Interest Rate' and 'Monthly Principal & Interest'  drop down's are grayed out as 'yes' and appropriate  bullets are editable
   '5 Fields in Loan Terms table by default containing the calculated value based on the current loan file data
   '6 "Customize" checkbox is unchecked default
   '7 Under 'Can this amount increase after closing?' 'Interest Rate' and 'Monthly Principal & Interest'  drop down's are grayed out as 'yes'
   '8 "Customize" checkbox is unchecked default
   '9 Loan amount- gray-out- No
   '10 Interest Rate- Gray-out- NO
   '11 Monthly Principal & Interest'  drop down's are grayed out with option as 'yes' 
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case- PTAC-1257", "Loan Term Table Override", Null

'Set data in Borrower summary origination form 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1873_LoanTerms_Override"

'Verify override functionality of Loan terms for Construction-Fixed,ARM,FixedInterest Only loans
LoanTermsTable_LoanTerms_Override_Validate "1873_LoanTerms_Override_Fixed","Fixed"
LoanTermsTable_LoanTerms_Override_Validate "1873_LoanTerms_Override_ARM","ARM"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "1873_LoanTerms_Override"
LoanTermsTable_LoanTerms_Override_Validate "1873_LoanTerms_Override_ARM_Verify","ARMTerms"
LoanTermsTable_LoanTerms_Override_Validate "1873_LoanTerms_Override_Fixed_IntOnly","FixedInterest"

BIZ_Loan_Save()

'Exit Loan
'BIZ_Loan_Exit False

