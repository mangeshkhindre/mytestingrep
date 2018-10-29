'@**************************************************************************************************
'@ TestStory: PTAC-1529 Re-Enforcement_Dashboard
'@ TestCase: PTAC-1462 , Verify Dashboard functionality -E2E
'@ Test Automation JIRA Task: PTAC-1509 E2E_Dashboard_VerifyFunctionality
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-1462_VerifyDashboardE2E
   '2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1462_VerifyDashboardE2E
   '3 Forms_BorrowerSummaryOrigination, SetCreditInformation, PTAC-1462_VerifyDashboardE2E
   '4 Forms_BorrowerSummaryOrigination, SetProperty, PTAC-1462_VerifyDashboardE2E
   '5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1462_VerifyDashboardE2E
'@ Pre-conditions: 
   '1 User should be logged into Encompass with Admin Credentials
   '2 Under Pipeline > Create say 5 loans within a loan folder (e.g: TestDashboardFolder)
'@ Description: Create 5 loans under one folder, create snapshot and view 
'@ TestSteps:
   '1 create 5 loans under one folder
   '2 create one snapshot, with bar chart as filter and select that created loan folder
   '3 Create one view select the layout and verify
'@ ExpectedResult:
   '1 loans should be created
   '2 snapshot should be created with folder and with loan folder
   '3 view should be created with selected layout
'***************************************************************************************************

' Function Parameter Values
strPipelineView 	= 	"Super Administrator - Default View"
strRowID			=	"PTAC-1462_VerifyDashboardE2E"
strCreateLoanFolder	=	Parameter("strCreateLoanFolder")

' Create First Loan 
strLoan	=	CreateLoanWithBorrowerSummaryOriginationInfo (strPipelineView, strCreateLoanFolder, strRowID)
BIZ_Loan_Exit False

' Duplicating 4 Loans
BIZ_LoanSetup_DuplicateLoanInLoanFolder strCreateLoanFolder, "", "Loan Duplicate"
BIZ_LoanSetup_DuplicateLoanInLoanFolder strCreateLoanFolder, "", "Loan Duplicate"
BIZ_LoanSetup_DuplicateLoanInLoanFolder strCreateLoanFolder, "", "Loan Duplicate"
BIZ_LoanSetup_DuplicateLoanInLoanFolder strCreateLoanFolder, "", "Loan Duplicate"

Parameter("strLoan")	=	strLoan
