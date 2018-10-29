'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table
'@ TestCase: PTAC-2002 Verify loan term fields data when loan purpose is Other
'@ Test Automation JIRA Task: PTAC-2664 LoanTermTables_VerifyLoanTermFieldsData_LoanPurposeOther
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-2002 
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails and PTAC-2002
   '3 Forms_LoanEstimatePage, LoanTermsTable and PTAC-2002
'@ Pre-conditions: 
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary  
'@ Description:  
'@ TestSteps:
   '1 Create Loan with basic data with loan purpose as other
   '2 Enter Loan Amount In LE Page1
   '3 Verify The Same Loan Amount Should be in CD Page 1
'@ ExpectedResult:
   '1 Should be Able to create loan with basic details with loan purpose as other
   '2 Loan Amount In LE Page1 should be entered
   '3 Same Loan Amount Should be in CD Page 1
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2002", "Verify loan term fields data when loan purpose is Other", Null
strRowID	=	"PTAC-2002"
'Set data in Borrower summary origination form and Set data
BIZ_Forms_Open "Borrower Summary - Origination"
'===== Enters the details in the Borrower section =====
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
'===== Enters the details in the Transaction section =====
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_Forms_Open "Loan Estimate Page 1"
LoanTermTables_SetLoanTermsCustomize_LoanAmountToYes strRowID
LoanTermTables_VerifyLoanAmountSection_BulletsVerify strRowID
LoanTermTables_LoanAmountValEnterInLEPage1_ValidateInCDPage1 strRowID

