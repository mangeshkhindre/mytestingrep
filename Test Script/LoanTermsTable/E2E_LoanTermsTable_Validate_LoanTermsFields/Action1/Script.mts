'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table
'@ TestCase : 
	'01 PTAC-1859 Verify loan term fields data when loan purpose is purchase with Data template integration
	'02 PTAC-1847 Verify Loan term tables for Loan purpose is Purchase 
	'03 PTAC-1303 Bullet for Loan Terms table with Fixed Interst Only Loan 
	'04 PTAC-1349 Verify Bullet for Loan Terms table with option"Can this amount increase after closing is Yes"
	'05 PTAC-1398 Calculation for Loan Terms data
    '06 PTAC-1305 Output form for Loan Terms table
	'07 PTAC-1304 Verify Loan term drop down sections UI
	'08 PTAC-1858 Verify loan term fields data when loan purpose is Cash-Out Refinance 
	'09 PTAC-1960 Verify loan term fields data when loan purpose is No-cashout refinance with Data template integration
	'10 PTAC-1256 Loan Terms for construction only loans
	'11 PTAC-1997 Verify loan term fields data when loan purpose is Construction-Perm	
	'12 PTAC-1257 Loan Term Table Override
	'13 PTAC-2002 Verify loan term fields data when loan purpose is Other.
'@ Test Automation JIRA Task: PTAC-2009 LoanTermsTable_PurchaseCashOutRefinance_LECDValidate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower and 1873_LoanTerms_DataTemplate
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1873_LoanTerms_DataTemplate
   '3 Forms_BorrowerSummaryOrigination, SetBorrower and 1873_LoanTerms_CashOutRefinance
   '4 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1873_LoanTerms_CashOutRefinance
'@ Pre-conditions: 
'@ Description: 
   '1 Verify loan term fields data when loan purpose is purchase with Data template integration
   '2 Verify loan term fields data when loan purpose is Cash-Out Refinance
'@ TestSteps:
   '1 Login into the Encompass with Admin user.
   '2 Go to settings->Loan templates->Data template Create data template as per test data
   '3 select customized checkbox in loan estimate Page and change the data as per test data
   '4 select customized checkbox in closing Disclosure Page1 and change the data as per test data
   '5 close the settings and go to pipeline click new loan icon Go to loan menu bar and select append data template
   '6 "Go to LE page 1 and verify the values
   '7 Go to CD page 1 and verify the values
   '8 Login into the Encompass with Admin user
   '9 Enter the loan data as given in the test data column.
   '10 Go to LE page 1 and verify the value
   '11 Go to CD page 1 and verify the values
'@ ExpectedResult:
   '1 User should be able to login successfully.
   '2 Loan data should be filled
   '3 Loan data should be filled
   '4 Loan data should be filled
   '5 Loan data should be filled automatically based on template
   '6 under loan terms section below fields data should be available and cross check with borrower Origination summary
   '7 Loan Amount --> Field ID: 1109 in borrower origination summary Interest Rate --> Field ID: 3 in borrower origination summary Monthly Principal & interest --> Field ID: 5 in borrower origination summary
   '8 under loan terms section below fields data should be available and cross check with borrower Origination summary
   '9 Loan Amount --> Field ID: 1109 in borrower origination summary Interest Rate --> Field ID: 3 in borrower origination summary Monthly Principal & interest --> Field ID: 5 in borrower origination summary
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2009","Script name: LoanTermsTable_PurchaseCashOutRefinance_LoanTerms_LECDValidate", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== RunAction to Create Purchase Loan from data Template and validate Loan terms in LE and CD Page 1 ====== 
RunAction "LoanTermsTable_DataTemplate_PurchaseLoan_LoanTerms_LECD_Validate_001", oneIteration

'====== RunAction to validate "Term" field in LE Page 1 ====== 
RunAction "LoanTermsTable_PurchaseLoan_VerifyTermField", oneIteration,"PTAC-1874_LoanTermsTable_1847"

'====== Run Action to validate bullets in Loan terms table for Fixed Interest type loan ======
RunAction "LoanTermsTable_FixedInterestLoan_VerifyBullet", oneIteration

'====== Run Action to validate 'Can this amount' section ======
RunAction "LoanTermsTable_CanThisAmtSection_Validate", oneIteration

'====== Run Action to validate 'Max Interest Rate for ARM loan' and 'Does the loan have these features?' section======
RunAction "LoanTermsTable_MaxInterestRate", oneIteration

'====== RunAction to verify Loan Term Section in CD Page 1 ======
RunAction "LoanTermsTable_LoanTermSectionInCDPage1",OneIteration

'====== RunAction to Create CashOut Refinance Loan and validate Loan terms in LE and CD Page 1 ======
RunAction "LoanTermsTable_CashoutRefinanceLoan_LoanTerms_LECD_Validate_002",OneIteration

'====== RunAction to Create No-CashOut Refinance Loan and validate Loan terms in LE and CD Page 1 ======
RunAction "LoanTermsTable_DataTemplate_NoCashoutRefinance_LECD_Validate", oneIteration

'====== RunAction to verify the Loan terms for construction Loans ======
RunAction "LoanTermsTable_ConstructionLoans_Verify",OneIteration

'====== RunAction to verify the Loan terms override ======
RunAction "LoanTermsTable_LoanTerms_Override",OneIteration

'====== RunAction to verify the Loan terms for 'Other' loans ======
RunAction "LoanTermsTable_OtherLoan_Verify",OneIteration

BIZ_Loan_Exit False
'====== logOut Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
