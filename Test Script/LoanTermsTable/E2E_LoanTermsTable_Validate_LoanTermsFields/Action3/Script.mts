'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms table
'@ TestCase : PTAC-1858 Verify loan term fields data when loan purpose is Cash-Out Refinance 
'@ Test Automation JIRA Task: PTAC-2009 LoanTermsTable_PurchaseCashOutRefinance_LoanTerms_LECDValidate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower and 1873_LoanTerms_CashOutRefinance
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1873_LoanTerms_CashOutRefinance
'@ Pre-conditions: 
'@ Description: Verify loan term fields data when loan purpose is Cash-Out Refinance
'@ TestSteps:
   '1 Login into the Encompass with Admin user
   '2 Enter the loan data as given in the test data column.
   '3 Go to LE page 1 and verify the value
   '4 Go to CD page 1 and verify the values
'@ ExpectedResult:
   '1 User should be able to login successfully.
   '2 Loan data should be filled
   '3 under loan terms section below fields data should be available and cross check with borrower Origination summarY
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Iterest Rate --> Field ID: 3 in borrower origination summary
	  'Mnthly Principal & interest --> Field ID: 5 in borrower origination summary
   '4 under loan terms section below fields data should be available and cross check with borrower Origination summarY
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Interest Rate --> Field ID: 3 in borrower origination summary
	  'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
'***************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-1858","Verify loan term fields data when loan purpose is Cash-Out Refinance", Null

Dim objPage,strLoanAmount,strInterestRate,strMonthlyPrinandInt,arrLoanTermsTable
'Create  blank loan
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"

'Create a Cash out refinance loan
'BIZ_BorrowerSummaryOrigination_SetBorrower "1873_LoanTerms_CashOutRefinance"
'Set data in Borrower summary origination form 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1873_LoanTerms_CashOutRefinance"

Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

strLoanAmount 		 = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_1109","index:=0"), "value")
strInterestRate      = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_3"), "value")
strMonthlyPrinandInt = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_5"),"value")

Set objPage = Nothing

arrLoanTermsTable = Array(strLoanAmount,strInterestRate,strMonthlyPrinandInt)

'Get loan terms values from Borrower summary Origination and validate in LE and CD Page 1
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Loan Estimate Page 1",arrLoanTermsTable
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Closing Disclosure Page 1",arrLoanTermsTable

'Exit Loan and Navigate to Home Tab
BIZ_Loan_Exit False
'BIZ_Nav_SelectHomeTab()
