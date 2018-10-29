'@************************************************************************************************** 
'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1567 Projected Payment Table-Fixed Loan_Balloon and MI Termination
'@ Test Automation JIRA Task: PTAC-1784 ProjectedPaymentTable_FixedLoanBalloonAndMITermination

'@ TestStory: PTAC-1684 Projected Payment Table
'@ TestCase: PTAC-1582 Projected Payment Table-Fixed Loan_Balloon and MI Termination with InterestOnly

'@ TestData: 
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo","PTAC-1567"
   '2 "Forms_BorrowerSummaryOrigination", "SetBorrower","PTAC-1567"
   '3 "Forms_BorrowerSummaryOrigination", "SetCreditInformation","PTAC-1567"
   '4 "Forms_BorrowerSummaryOrigination", "SetProperty","PTAC-1567"
   '5 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails","PTAC-1567"
   '6 "Forms_BorrowerSummaryOrigination", "SetSSNVerification_Borrower","PTAC-1567"
   '7 "Forms_2015Itemization", "Set1000Section", PTAC-1567
'@ Pre-conditions: 
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary
'@ Description:  
'@ TestSteps:
   '1 validate different values in LE Page1 & Amortization Schedule Pop-up Are Matched
'@ ExpectedResult:
   '1 different values in LE Page1 & Amortization Schedule Pop-up Are Matched should match
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Test Case #3: Verify Projected Payment Table for Conventional Loans; Purchase; Fixed Balloon and MI Termination without Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination without Interest Only", Null

strRowID	=	"PTAC-1567"
'===== Creating Loan With Fixed loan Type ===== 
FRM_Logger_ReportInfoEvent "Start create new loan for Conventional Loans; Purchase; Fixed Balloon and MI Termination without Interest Only","Started creating new loan for Conventional Loans; Purchase; Fixed Balloon and MI Termination without Interest Only", Null

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
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table for Fixed Balloon and MI Termination without Interest Only","Validating Projected Payment Table for Fixed Balloon and MI Termination without Interest Only", Null
ProjectedPayment_FixedLoan_BalloonandMI_Termination(strRowID)

'====================================== Start Test Case#2 ===========================
FRM_Logger_ReportStepEvent "Test Case #4: Verify Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", "Validate Projected Payment Table for Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", Null
FRM_Logger_ReportInfoEvent "Start convert existing loan to Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only","Started converting existing loan to Conventional Loans; Purchase; ARM Balloon and MI Termination with Interest Only", Null

strRowID1	=	"PTAC-1582"
'@ Transaction section
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID1

BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section strRowID1

'===== click on escrowed checkbox =====
Set objLoan	=	SwfWindow("swfname:=MainForm").Page("micClass:=Page","index:=0")
BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objLoan,"1004",Array("Escrowed")

BIZ_Forms_Open "1003 Page 1"
BIZ_1003Page1_ClickEditIconFor1045()
BIZ_MIPDialog_SetDetails strRowID1
GUI_SwfButton_Click objLoan.SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn")
BIZ_Loan_Save()

'===== Compare the values from LE page1 and Amortization Schedule Pop-up =====
FRM_Logger_ReportInfoEvent "Verifying Projected Payment Table ARM Balloon and MI Termination with Interest Only","Validating Projected Payment Table ARM Balloon and MI Termination with Only", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_Validation_ProjectedPaymentTable_FromLEPage1()

''===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Loan_Exit False
