'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table 
'@ TestCase : 
		'1 PTAC-1256 Loan Terms for construction only loans
		'2 PTAC-1997 Verify loan term fields data when loan purpose is Construction-Perm
'@ Test Automation JIRA Task: PTAC-3530 LoanTermsTable_ConstructionLoans_LoanTerms_Override_Validate
'@ TestData: 
    '1 Forms_BorrowerSummarOrigination, SetTransactionDetails, PTAC-1874_LoanTermsTable_1847
    '2 Forms_BorrowerSummarOrigination, SetProperty, PTAC-1874_LoanTermsTable_1847
    '3 LoanTermsTable, VerifyLoanTermsTable, PTAC-1874_LoanTermsTable_1847
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
    '01 Log in to Encopmass with Admin user credentials
    '02 Then select the “ pipeline” tab.
    '03 Click on the new loan icon. 
    '04 Fill the borrower summary origination as per test data
    '05 Click on the 'Forms' tab and select the 'Loan Estimation Page 1
    '06 Go to 'Loan Terms' header .
    '07 Go to  'Can this amount increase after closing?' column , and verify 'Monthly Principal and Interest' drop down
    '08 Click on the 'Forms' tab and select the 'Loan Estimation Page 1' .
    '09 Go to 'Loan Terms' header in form and check the checkbox 'Customize'
    '10 Under 'Can this amount increase after closing?' column , make 'Monthly Principal and Interest' drop down 'Yes'.
    '11 Fill the borrower summary origination as per test data
    '12 Click on the 'Forms' tab and select the 'Loan Estimation Page 1' .
    '13 Go to 'Loan Terms' header . 
    '14 Go to  'Can this amount increase after closing?' column , and verify 'Monthly Principal and Interest' drop down. 
    '15 Click on the 'Forms' tab and select the 'Loan Estimation Page 1' .
    '16 Go to 'Loan Terms' header in form and check the checkbox 'Customize'
    '17 Under 'Can this amount increase after closing?' column , make 'Monthly Principal and Interest' drop down 'Yes'
'@ ExpectedResult:
    '01 User is logged in to the Encompass
    '02 User is able to select pipeline tab
    '03 Data should be save in borrower summary origination 
    '04 After step2  'Customize' checkbox is  unchecked.
    '05 Loan Term Table opens up the following field and makes them non-editable.
        'Loan Amount' - No
        'Interest Rate - N'
        'Monthly Principal and Interest'- No
    '06 After step 2 'Customize' checkbox is  checked
    '07 Loan Term Table opLoan Term Table opens up the following field and makes them editableens up the following field and_
        '_makes them editable Yes/No dropdown for 'Can this amount increase after closing?''Loan Amount' , 'Interest Rate' _
	    '_and 'Monthly Principal & interest' are not made editable.
    '08 After step 3, the bullet 'See AP table on Page 2 ' should not exist In 'Monthly Principal and Interest' row.
    '09 Data should be save in borrower summary origination 
    '10 Data should be save in borrower summary origination 
    '11 After step2  'Customize' checkbox is  unchecked.
    '12 Loan Term Table opens up the following field and makes them non-editable.
 	 	'Loan Amount' - No
        'Interest Rate - No
        'Monthly Principal and Interest'- No
    '13 After step 2 'Customize' checkbox is  checked.
    '14 Loan Term Table opens up the following field and makes them editable.Yes/No dropdown for 'Can this amount increase after closing?'
    '15 After step 3, the bullet 'See AP table on Page 2 ' is visible In 'Monthly Principal and Interest' row.
 '**************************************************************************************************

'FRM_Logger_ReportStepEvent "Start Test Case-PTAC-1256", "Loan Terms for 'Construction only' and 'ConstructionToPermanent' loans", Null
'
''Verify Loan terms for ConstructionOnly Loan
'FRM_Logger_ReportInfoEvent "Verify Loan terms for Loan Purpose 'ConstructionOnly'","Loan Purpose selection 'ConstructionOnly'",Null	
''Set data in Borrower summary origination form and Set data
'BIZ_Forms_Open "Borrower Summary - Origination"
'BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1873_LoanTerms_ConstrOnly"	
''Verify Loan terms for Construction Loans
'LoanTermsTable_ConstrandConstrPerm_LoanTerms_Verify "1873_LoanTerms_ConstrOnly","ConstructionOnly"	
''Exit Loan
'BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1997", "Verify loan term fields data when loan purpose is Construction-Perm", Null
'Verify Loan terms for ConstructionToPermanent Loan
FRM_Logger_ReportInfoEvent "Verify Loan terms for Loan Purpose 'ConstructionToPermanent'","Loan Purpose selection 'ConstructionToPermanent'",Null	
'Create  blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_BorrowerSummaryOrigination_SetBorrower "1873_LoanTerms_ConstrPerm"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1873_LoanTerms_ConstrPerm"	
'Verify Loan terms for Construction Loans
LoanTermsTable_ConstrandConstrPerm_LoanTerms_Verify "1873_LoanTerms_ConstrPerm","ConstructionToPermanent"	

