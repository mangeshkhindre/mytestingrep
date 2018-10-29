'@**************************************************************************************************
'@ TestStory: PTAC-1873
'@ TestCase: PTAC-1303 Bullet for Loan Terms table with Fixed Interst Only Loan   
'@ Test Automation JIRA Task: PTAC-2055
'@ TestData: Forms_BorrowerSummaryOrigination,SetBorrower,PTAC_LoanTermsTable_FixedInterest
			'Forms_BorrowerSummaryOrigination,SetTransactionDetails,PTAC_LoanTermsTable_FixedInterest
			'LoanTermsTable,VerifyLoanTermsTable,PTAC_LoanTermsTable_FixedInterest
			'LoanTermsTable,VerifyLoanTermsTable,PTAC-1873_LoanTermsTable_InterestOnly10
			'LoanTermsTable,VerifyLoanTermsTable,PTAC-1873_LoanTermsTable_InterestOnly15
			'LoanTermsTable,VerifyLoanTermsTable,PTAC-1873_LoanTermsTable_InterestOnly24
			'LoanTermsTable,VerifyLoanTermsTable,PTAC-1873_LoanTermsTable_InterestOnly30
			'LoanTermsTable,VerifyLoanTermsTable,PTAC-1873_LoanTermsTable_InterestOnly12
'@ Pre-conditions: 
'@ Description:  Create a purchase loan with Fixed Interest only period(in months) and validate loanterms in Loan Estimate Page 1
'@ TestSteps:
	'1 Create a new loan, Set basic fields as test data
	'2 Go to LE Page 1 form - > LE Loan Terms tables
	'3 Go to LE Page 1 form, LE Loan Terms tables
	'4 Select "Customize" checkbox
	'5 Under 'Can this amount increase after closing?' column, make 'Monthly Principal and interest ' drop down to yes
	'6 Go to 'Borrower Summary-Origination' And provide 'Interest Only'[1177]
	'7 Click on save icon
	'8  1 Go to 'Borrower Summary-Origination' And provide 'Interest Only'[1177] 
	  '2 Click on save icon.
	  '3 Go to LE Page 1 form, LE Loan Terms tables
	  '4 Go to Can this amount increase after closing?' column, in 'Monthly Principal and interest ' row
	'9  1 Go to 'Borrower Summary-Origination' And provide 'Interest Only'
	  '2 Click on save icon.
	  '3 Go to LE Page 1 form, LE Loan Terms tables
	  '4 Go to 'Can this amount increase after closing?' column, in 'Monthly Principal and interest ' row
	'10 1 Go to 'Borrower Summary-Origination' And provide 'Interest Only'
	  '2 Click on save icon.
	  '3 Go to LE Page 1 form, LE Loan Terms tables
	  '4 Go to 'Can this amount increase after closing?' column, in 'Monthly Principal and interest ' row
	'11 1 Go to 'Borrower Summary-Origination' And provide 'Interest Only'
	  '2 Click on save icon.
	  '3 Go to LE Page 1 form, LE Loan Terms tables
	  '4 Go to 'Can this amount increase after closing?' column, in 'Monthly Principal and interest ' row
	'12 1 Go to 'Borrower Summary-Origination' And provide 'Interest Only'
	  '2 Click on save icon.
	  '3 Go to LE Page 1 form, LE Loan Terms tables
	 ' 4 Go to 'Can this amount increase after closing?' column, in 'Monthly Principal and interest ' row
'@ ExpectedResult:
   '1 "Customize" checkbox is unchecked by default
   '2 Fields in Loan Terms table under "Can this amount increase after closing"? are in disable mode	
   '3 Loan Terms table open up for the following fields and make them editable:'**Yes/No dropdown for “Can this amount increase after		 
   '4 There should be three bullet associated with 'Monthly Principal and interest  
   '5 Loan Amount (field 2)/Interest Rate (field 3) and Monthly Principal & Interest (field 5) are not made editable
   '6 1 First bullet 'Adjust once in..' associated with 'Monthly Principal and Interest' is now visible.
	 '2 LE1.X21 should be 'months' 
		 'If field '1177'(Interest Only) is less than '12' then LE1.X21()= 'months'.
		 'If field '1177' is greater than or equal to '12' then LE1.X21= 'Year' 
	 '3 LE1.X22 should be '11'
		 'If field '1177' is less than '24' but not '12' then LE1.X22='[1177+1]
		 'If field '1177' is greater than or equal to '24' then LE1.X22='1177/12' (rounded up to the next higher integer if there is a decimal) 
	'7 In first bullet-Adjust once in [ LE1.X21='Months'][ LE1.X22='16']
	   'In Second bullet-[LE1.X23='Can go' or 'goes'] as high as $[LE1.X24='641'] in [LE1.X88='Months'] [LE1.X25='16']
	   'In third bullet-includes only interest and no principal until [LE1.X89='Months'] [LE1.X26='16']
	'8 In first bullet-Adjust once in [ LE1.X21='Year'][ LE1.X22='3']
	  'In Second bullet-[LE1.X23='Can go' or 'goes'as high as $[LE1.X24=647'] in [LE1.X88='Year'] [LE1.X25='3']
	  'In third bullet-includes only interest and no principal until [LE1.X89='Year'] [LE1.X26='3']
	'9 In first bullet-Adjust once in [ LE1.X21='Year'][ LE1.X22='3']
	  'In Second bullet-[LE1.X23='Can go' or 'goes'as high as $[LE1.X24=651'] in [LE1.X88='Year'] [LE1.X25='3']
	  'In third bullet-includes only interest and no principal until [LE1.X89='Year'] [LE1.X26='3']
	'10 In first bullet-Adjust once in [ LE1.X21='Year'][ LE1.X22='2']
	   'In Second bullet-[LE1.X23='Can go' or 'goes' as high as $[LE1.X24='639'] in [LE1.X88='Year'] [LE1.X25='2']
	   'In third bullet-includes only interest and no principal until [LE1.X89='Year'] [LE1.X26='2']
'**********************************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1303", "Verify Bullet in Loan Terms table with Fixed Interst Only Loan", Null

BIZ_Forms_Open "Borrower Summary - Origination"

'====== Create loan by setting values in borrower section and transaction details section in BSO page ======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC_LoanTermsTable_FixedInterest"

BIZ_Forms_Open "Loan Estimate Page 1"

'====== Verify loan terms in loan terms table ======
LoanTermsTable_SetCustomizeCheckBox_LoanTerms_Validate "PTAC_LoanTermsTable_FixedInterest"

'====== Validate Monthly Principal and Interest Bullets for Interest Only 10 Months ======
BIZ_LoanTermsTable_FixedInterest_MonthlyPrincipalInterestBullets_Validate "PTAC-1873_LoanTermsTable_InterestOnly10","Borrower Summary - Origination","Loan Estimate Page 1"

'====== Validate Monthly Principal and Interest Bullets for Interest Only 15 Months ======
BIZ_LoanTermsTable_FixedInterest_MonthlyPrincipalInterestBullets_Validate "PTAC-1873_LoanTermsTable_InterestOnly15","Borrower Summary - Origination","Loan Estimate Page 1"

'====== Validate Monthly Principal and Interest Bullets for Interest Only 24 Months ======
BIZ_LoanTermsTable_FixedInterest_MonthlyPrincipalInterestBullets_Validate "PTAC-1873_LoanTermsTable_InterestOnly24","Borrower Summary - Origination","Loan Estimate Page 1"

'====== Validate Monthly Principal and Interest Bullets for Interest Only 30 Months ======
BIZ_LoanTermsTable_FixedInterest_MonthlyPrincipalInterestBullets_Validate "PTAC-1873_LoanTermsTable_InterestOnly30","Borrower Summary - Origination","Loan Estimate Page 1"

'====== Validate Monthly Principal and Interest Bullets for Interest Only 12 Months ======
BIZ_LoanTermsTable_FixedInterest_MonthlyPrincipalInterestBullets_Validate "PTAC-1873_LoanTermsTable_InterestOnly12","Borrower Summary - Origination","Loan Estimate Page 1"

'Go to LE Page 1 and click on 'Customize' checkbox
'in order to run next script successfully
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckbox("html id:=__cid_CheckBox16_Ctrl"), "OFF"  
GUI_Dialog_Encompass_Click "4","All custom data","Yes"
