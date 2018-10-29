'@**************************************************************************************************
'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1439: Projected Payment Table-Fixed Loan Type
'@ Test Automation JIRA Task: PTAC-1688 ProjectedPaymentTable_FixedLoanType

'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1566 Projected Payment Table-Fixed Loan_Interest only
'@ Test Automation JIRA Task: PTAC-1734 ProjectedPaymentTable_FixedLoanTypeInterestOnly

'@ TestData: 
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo","PTAC-1439"
   '2 "Forms_BorrowerSummaryOrigination", "SetBorrower","PTAC-1439"
   '3 "Forms_BorrowerSummaryOrigination", "SetCreditInformation","PTAC-1439"
   '4 "Forms_BorrowerSummaryOrigination", "SetProperty","PTAC-1439"
   '5 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails","PTAC-1439"
   '6 "Forms_BorrowerSummaryOrigination", "SetSSNVerification_Borrower","PTAC-1439"
'@ Pre-conditions: 
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary
'@ Description:  
'@ TestSteps:
   '1 validate different values in LE Page1 & Amortization Schedule Pop-up Are Matched
'@ ExpectedResult:
   '1 different values in LE Page1 & Amortization Schedule Pop-up Are Matched should match
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Test Case #1: Verify Projected Payment Table for Conventional Loans; Purchase; Fixed without Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; Fixed without Interest Only", Null

strRowID	=	"PTAC-1439"
'===== Creating Loan With Fixed loan Type ===== 
FRM_Logger_ReportInfoEvent "Start create new loan for Conventional Loans; Purchase; Fixed without Interest Only","Started creating new loan for Conventional Loans; Purchase; Fixed without Interest Only", Null

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
'===== Enters the details in the Header section =====
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID

'===== Enters the details in the Borrower section =====
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID

'===== Enters the details in the Credit information section =====
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID

'===== Enters the details in the Set Property section =====
BIZ_BorrowerSummaryOrigination_SetProperty strRowID

'===== Enters the details in the Transaction section =====
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID

'===== Enters the details in the SSN Verification Borrower section =====
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
'BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table Fixed without Interest Only","Validating Projected Payment Table Fixed without Interest Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_ProjectedPaymentTable_FixedLoanType strRowID


'====================================== Start Test Case#2 ===========================
FRM_Logger_ReportStepEvent "Test Case #2: Verify Projected Payment Table for Conventional Loans; Purchase; Fixed with Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; Fixed with Interest Only", Null
FRM_Logger_ReportInfoEvent "Start convert existing loan to Conventional Loans; Purchase; Fixed with Interest Only","Started converting existing loan to Conventional Loans; Purchase; Fixed with Interest Only", Null

strRowID1	=	"PTAC-1566"
'@ Transaction section
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID1
 
'@ Enters the details in 2015 Itemization section and click on escrowed checkbox
ArrCheckBox = array("Escrowed")
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section strRowID1
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1004",ArrCheckBox
BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table Fixed with Interest Only","Validating Projected Payment Table Fixed with Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
ProjectedPaymentTable_FixedLoanTypeInterestOnly strRowID1

'========= Loan Exist====
BIZ_Loan_Exit False
