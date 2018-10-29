'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase: PTAC-1156 - TC #8 - CBIZ-3873; Scenario #1 -Estimated escrow row calculation for Construction-Perm for ARM rate and 1st Amort date.
'@ Test Automation JIRA Task: PTAC-1648 ConstructionManagement_ConstructionPerm_EstimatedEscrow_Amortdate
'@ TestData:  
   '01 Forms_BorrowerSummaryOrigination,SetBorrwer,1352_ConstrPerm_ARM_EstEscrow
   '02 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrPerm_ARM_EstEscrow
   '03 Forms_BorrowerSummaryOrigination,SetTransactionDetails,1352_ConstrPerm_ARM_EstEscrow
   '04 Forms_RegZ-LE,SetARM,Shared_ConstrPerm_EstEscrow
   '05 Forms_AggregateAccountForm,SetData,Shared_ConstrPerm_EstEscrow
   '06 Forms_1003Page,SetMiandPiDetails,Shared_ConstrPerm_EstEscrow
   '07 Forms_2015Itemization,1000Section,Shared_ConstrPerm_EstEscrow
   '08 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1002
   '09 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1003
   '10 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1004
   '11 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1005
   '12 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1006
   '13 Forms_2015Itemization,SetFeeDetails,Shared_ConstrPerm_EstEscrow_1007
   '14 Forms_LoanEstimatePage, VerifyEstimatedEscrow,1352_ConstrPerm_EstEscrow_1156
'@ Pre-conditions:
'@ Description: Estimated escrow row calculation for Construction-Perm for ARM rate and 1st Amort date
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to LE page1, Verify that Estimated escrow 
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It opens the Borrower Summary Origination Form
   '4 The Loan is created.
   '5 Verified that Estimated escrow   
'***************************************************************************************************

FRM_Logger_ReportStepEvent	"Start Test Case : PTAC-1156","Test Case : TC 8 - CBIZ- 3873- Estimated escrow row calculation for Construction-Perm for ARM rate and 1st Amort date",Null

'Set data in Construction page
BIZ_forms_Open "Borrower Summary - Origination"
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_ARM_EstEscrow"
'BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "1352_ConstrPerm_ARM_EstEscrow"
BIZ_ConstructionManagement_SetLoanInfo "Shared_ConstrPerm_EstEscrow"

'Set data in RegZ-LE page
'BIZ_Forms_Open "RegZ - LE"
'BIZ_RegZ_LE_SetAdjustableRateMortgage "Shared_ConstrPerm_EstEscrow"
'
''Set AggregateEscrowAccount page
'BIZ_AggregateEscrowAccount_SetData "Shared_ConstrPerm_EstEscrow"
'
''Set data in 1003 Page 1
'BIZ_Forms_Open "1003 Page 1"
'BIZ_Common_1003Page1_SetMiandPiDetails "Shared_ConstrPerm_EstEscrow"
'
''Set data in 2015 Itemization form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate "Shared_ConstrPerm_EstEscrow"
'BIZ_2015Itemization_SetFeeDetails "1002","Shared_ConstrPerm_EstEscrow_1002"
'BIZ_2015Itemization_SetFeeDetails "1003","Shared_ConstrPerm_EstEscrow_1003"
'BIZ_2015Itemization_SetFeeDetails "1004","Shared_ConstrPerm_EstEscrow_1004"
'BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "Shared_ConstrPerm_EstEscrow"
'BIZ_2015Itemization_SetFeeDetails "1005","Shared_ConstrPerm_EstEscrow_1005"
'BIZ_2015Itemization_SetFeeDetails "1006","Shared_ConstrPerm_EstEscrow_1006"
'BIZ_2015Itemization_SetFeeDetails "1007","Shared_ConstrPerm_EstEscrow_1007"
'
'Validate the Escrow account amount in LE page under Projected Payments section
BIZ_Forms_Open "Loan Estimate Page 1"
Wait g_LongWaitMedium+10													'To Sync the object existancewe are passing the Wait time explicitly
BIZ_Forms_LoanEstimate_VerifyEstimatedEscrow "1352_ConstrPerm_EstEscrow_1156"

BIZ_Loan_Exit False
