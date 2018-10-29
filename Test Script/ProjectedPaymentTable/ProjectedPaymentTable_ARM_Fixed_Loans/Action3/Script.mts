'@**************************************************************************************************
'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1578 Projected Payment Table-ARM Loan_Balloon and MI Termination
'@ Test Automation JIRA Task: PTAC-2808 ProjectedPaymentTable_ARMLoan_BalloonAndMITermination

'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1583 Projected Payment Table-ARM Loan_InterestOnly_Balloon and MI Termination
'@ Test Automation JIRA Task: PTAC-2821 ProjectedPaymentTable_ARMLoan_InterestOnlyBalloonAndMITermination

'@ TestData:
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo","PTAC-1578"
   '2 "Forms_BorrowerSummaryOrigination", "SetBorrower","PTAC-1578"
   '3 "Forms_BorrowerSummaryOrigination", "SetCreditInformation","PTAC-1578"
   '4 "Forms_BorrowerSummaryOrigination", "SetProperty","PTAC-1578"
   '5 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails","PTAC-1578"
   '6 "Forms_BorrowerSummaryOrigination", "SetSSNVerification_Borrower","PTAC-1578"
   '7 "Forms_RegZ_LE", "SetARM", "PTAC-1578"
   '8 "Dialog_MIP", "SetFeeDetails", "PTAC-1578"
   '9 "Forms_2015Itemization", "Set1000Section", "PTAC-1578"
   '10 "Forms_LoanEstimatePage", "ProjectedPayments", "PTAC-1578"
'@ Pre-conditions: 
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary
'@ Description:  
'@ TestSteps:
   '1 Go to Pipeline tab
   '2 Create a new blank loan as per test data.
   '3 Go to '1003  page-1' form ,Types of Mortgage and Terms of Loan Click on edit field value beside MIP/FF
   '4 Go to RegZ form, 'Adjustable Rate Mortgage' 
   '5 Escrows - 2015 Itemization Form Click on the open icon of 1004 (Note: Fee 1004 inputted and 'Escrowed' checkbox selected)
   '6 Go to LE page-1 form, 'Projected Payments' section
'@ ExpectedResult:
   '1 A New Conventional type Loan is created with Loan number and details populated  in the 'Borrower Summary Origination' form.
   '2 Data Values Should be populated in LE Page1
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Test Case #3: Verify Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination without Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination without Interest Only", Null
strRowID	=	"PTAC-1578"
strRowID1	=	"PTAC-1583"

'===== Creating Loan With ARM loan Type ===== 
FRM_Logger_ReportInfoEvent "Start create new loan for Conventional Loans; Purchase; ARM Balloon and MI Termination without Interest Only","Started creating new loan for Conventional Loans; Purchase; ARM Balloon and MI Termination without Interest Only", Null
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

'@ Setting 1003 Page Details
BIZ_Forms_Open "1003 Page 1"
BIZ_1003Page1_ClickEditIconFor1045()
BIZ_MIPDialog_SetDetails strRowID
Set objLoan	=	SwfWindow("swfname:=MainForm").Page("micClass:=Page","index:=0")
GUI_SwfButton_Click objLoan.SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn")

'@ Navigate to RegZ-LE page
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage strRowID

'@ 1000 Section Details
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section strRowID
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1004", Array("Escrowed")
'BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table for ARM Balloon and MI Termination without Interest Only","Validating Projected Payment Table for ARM Balloon and MI Termination without Interest Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_ProjectedPayment_ARMLoanType_BalloonAndMITermination_InterestOnly_Validation strRowID


'====================================== Start Test Case#2 ===========================
FRM_Logger_ReportStepEvent "Test Case #4: Verify Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", Null
FRM_Logger_ReportInfoEvent "Start convert existing loan to Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only","Started converting existing loan to Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", Null

strRowID1	=	"PTAC-1583"
'@ Transaction section
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID1
BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table ARM Balloon and MI Termination with Interest Only","Validating Projected Payment Table ARM Balloon and MI Termination with Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_ProjectedPayment_ARMLoanType_BalloonAndMITermination_InterestOnly_Validation strRowID1

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Loan_Exit False
