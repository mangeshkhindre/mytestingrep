'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table
'@ TestCase:
   '1 PTAC-1349 Verify Bullet for Loan Terms table with option "Can this amount increase after closing is Yes"
'@ Test Automation JIRA Task: PTAC-3599 LoanTermsTable_Purchase_Fixed_ARM_InterestOnly_LoanTerms_Validate
'@ TestData:
	'1 
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Create a new loan(Fixed), Set basic fields as per test data
   '2 Go to LE Page 1 form, Loan Terms tables section
   '3 Create a new loan(Fixed-Intrest), Set basic fields
   '4 Go to LE Page 1 form,  LE  Loan Terms tables
   '5 Create a new loan(ARM), Set basic fields
   '6  Go to LE Page 1 form,  LE  Loan Terms tables
'@ ExpectedResult:
   '1 "Customize" checkbox is unchecked default
   '2 Fields in Loan Terms table under "Can this amount increase after closing"? section are in disable mode
  		'a. Loan Amount
		'b. Interest Rate
        'c. Monthly Principal & Interest rate are in disable mode
   '3 "Customise" checkbox is unchecked default
   '4  Fields in Loan Terms table under "Can this amount increase after closing"? section
   		'a. Loan Amount – No
        'b. Interest Rate – No
        'c. Monthly Principal & Interest – Yes and associated bullet are visible.in disable mode
   '5 First bullet - Adjusts every year <interest only months(from borrower page/12> and starting in <interest only months(from borrower page/12>
   '6 "Customise" checkbox is unchecked default
   '7 Fields in Loan Terms table under "Can this amount increase after closing"? section
        'a. Loan Amount – No
        'b. Interest Rate – Yes 
   '8 Bullet associated with Interest Rate are-First Bullet-Adjust every year <interest only months(from borrower page/12> and starting in <interest only months(from borrower page/12>
   '9 First bullet - Adjusts every year <interest only months(from borrower page/12> and starting in <interest only months(from borrower page/12
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test- PTAC-1349","Verify Bullet for Loan Terms table with option 'Can this amount increase after closing is Yes'", Null
'====== Run Action to validate Loan terms table-Can this Amount increase after closing section for Fixed type loan ======
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTermsTable_AmortizationType_Set "1873_LoanTerms_Fixed", "Fixed"
LoanTermsTable_LoanTerms_CanThisAmtSection_Validate "1873_LoanTerms_Fixed", "Fixed"

'====== Run Action to validate Loan terms table-Can this Amount increase after closing section for Fixed Interest type loan ====== 
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTermsTable_AmortizationType_Set "1873_LoanTerms_Fixed_InterestOnly", "FixedInterest"
LoanTermsTable_LoanTerms_CanThisAmtSection_Validate "1873_LoanTerms_Fixed_InterestOnly", "FixedInterest"
'RunAction "LoanTermsTable_CanThisAmtSection_Validate", oneIteration, "1873_LoanTerms_Fixed_InterestOnly", "FixedInterest"

'====== Run Action to validate Loan terms table-Can this Amount increase after closing section for ARM Interest type loan ====== 
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTermsTable_AmortizationType_Set "1873_LoanTerms_ARM_InterestOnly", "ARMInterest"
LoanTermsTable_LoanTerms_CanThisAmtSection_Validate "1873_LoanTerms_ARM_InterestOnly", "ARMInterest"
'RunAction "LoanTermsTable_CanThisAmtSection_Validate", oneIteration, "1873_LoanTerms_ARM_InterestOnly", "ARMInterest"
