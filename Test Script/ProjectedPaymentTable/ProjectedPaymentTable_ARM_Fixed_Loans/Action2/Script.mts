'@**************************************************************************************************
'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1485 Projected Payment Table-ARM Loan Type
'@ Test Automation JIRA Task: PTAC-2800 ProjectedPaymentTable_ARMLoanType

'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1577 Projected Payment Table-ARM Loan_Interest Only
'@ Test Automation JIRA Task: PTAC-2806 ProjectedPaymentTable_ARMLoan_InterestOnly

'@ TestData: 
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo","PTAC-1485"
   '2 "Forms_BorrowerSummaryOrigination", "SetBorrower","PTAC-1485"
   '3 "Forms_BorrowerSummaryOrigination", "SetCreditInformation","PTAC-1485"
   '4 "Forms_BorrowerSummaryOrigination", "SetProperty","PTAC-1485"
   '5 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails","PTAC-1485"
   '6 "Forms_BorrowerSummaryOrigination", "SetSSNVerification_Borrower","PTAC-1485"
   '7 Forms_RegZ_LE, SetARM, PTAC-1485
'@ Pre-conditions: 
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary
'@ Description:  
'@ TestSteps:
   '1 Go to Pipeline tab
   '2 Create a new blank loan as per test data.
   '3 Go to RegZ form, 'Adjustable Rate Mortgage' 
   '4 Go to LE page-1 form, 'Projected Payments' section
'@ ExpectedResult:
   '1 A New Conventional type Loan is created with Loan number and details populated  in the 'Borrower Summary Origination' form.
   '2 Data Values Should be populated in LE Page1
   
   '@ Test Automation JIRA Task: PTAC-2806 ProjectedPaymentTable_ARMLoan_InterestOnly
   '1 A New Conventional type Loan is created with Loan number and details populated  in the 'Borrower Summary Origination' form.
   '2 New field data should be added
   '3 Data Values Should be populated in LE Page1
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Test Case #1: Verify Projected Payment Table for Conventional Loans; Purchase; ARM without Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM without Interest Only", Null

strRowID	=	"PTAC-1485"
'===== Creating Loan With ARM loan Type ===== 
FRM_Logger_ReportInfoEvent "Start create new loan for Conventional Loans; Purchase; ARM without Interest Only","Started creating new loan for Conventional Loans; Purchase; ARM without Interest Only", Null

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
'@ Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
'@ Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
'@ Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
'@ Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
'@ Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
'@ SSN Verification Borrower section 
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
'@ Navigate to RegZ-LE page
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage strRowID
'BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table ARM without Interest Only","Validating Projected Payment Table ARM without Interest Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_ProjectedPayment_ARMLoanType_InterestOnly_Validation strRowID


'====================================== Start Test Case#2 ===========================
FRM_Logger_ReportStepEvent "Test Case #2: Verify Projected Payment Table for Conventional Loans; Purchase; ARM with Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM with Interest Only", Null
FRM_Logger_ReportInfoEvent "Start convert existing loan to Conventional Loans; Purchase; ARM with Interest Only","Started converting existing loan to Conventional Loans; Purchase; ARM with Interest Only", Null

strRowID1	=	"PTAC-1577"
ArrCheckBox = 	array("Escrowed")
'@ Transaction section
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID1
 
'@ Enters the details in 2015 Itemization section and click on escrowed checkbox
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section strRowID1
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1004", ArrCheckBox
BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table ARM with Interest Only","Validating Projected Payment Table ARM with Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_ProjectedPayment_ARMLoanType_InterestOnly_Validation strRowID1
'========= Loan Exist====
BIZ_Loan_Exit False
