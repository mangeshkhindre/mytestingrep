'@**************************************************************************************************
'@ TestStory: PTAC-1352
'@ TestCase:
   '1 PTAC-672 TC 10 - CBIZ- 3873- CD page 4 Escrow calcs for Construction loans
   '2 PTAC-763 TC 11 - CBIZ- 3873- CD page 4 Escrow calcs for Construction-Perm loans  
   '3 PTAC-1338 'TC 13 - CBIZ- 3873- CD page 4 Escrow calcs for Construction-Perm loans with Escrow 1st payment date = 1st payment date 
'@ Test Automation JIRA Task: PTAC-1645 ConstructionManagement_ConstructionLoans_CDP4_Escrow
'@ Pre-conditions: 
'@ Description: "ConstructionManagement ConstructionLoans CDP4 Escrow Amount validation in Loan disclosures section
'@ TestSteps:
   '1 Log into Encompass as Admin/password
'@ ExpectedResult:
   '1 Admin should be able to login successfully 
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case-PTAC-1645","Script Name : ConstructionManagement_ConstructionLoans_CDP4_Escrow", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-763","TC 11 - CBIZ- 3873- CD page 4 Escrow calcs for Construction-Perm loans", Null

'Navigate to BSO form and set data
'Go to Pipeline>>NewLoanButton>>Forms
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Borrower Summary - Origination"

'Set Basic Borrower info in borrower section
BIZ_Common_BorrowerSummaryOrigination_SetBorrower SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_763"

'SetTransaction details in transaction section
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_763"

'Set property details in  property section
BIZ_Common_BorrowerSummaryOrigination_SetProperty SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to BSO form and set data
BIZ_ConstructionManagement_SetLoanInfo "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to 1003 page1 and set Mortgage insurance details
BIZ_1003Page1_SetMiandPiDetails "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to Aggrgate EscrowAccont page and Set Escrow Payment Basis
BIZ_Forms_AggregateEscrowAccount_SetData  "1352_ConstrPerm_Fixed_CD4_763" 

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
BIZ_Forms_Open "2015 Itemization"
BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to 2015 Itemization 
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_SetFeeDetails "1002","1352_ConstrPerm_Fixed_CD4_763_1002"
BIZ_2015Itemization_SetFeeDetails "1003","1352_ConstrPerm_Fixed_CD4_763_1003"
BIZ_2015Itemization_SetFeeDetails "1004","1352_ConstrPerm_Fixed_CD4_763_1004"
BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "1352_ConstrPerm_Fixed_CD4_763"
BIZ_2015Itemization_SetFeeDetails "1005","1352_ConstrPerm_Fixed_CD4_763_1005"
BIZ_2015Itemization_SetFeeDetails "1006","1352_ConstrPerm_Fixed_CD4_763_1006"
BIZ_2015Itemization_SetFeeDetails "1007","1352_ConstrPerm_Fixed_CD4_763_1007"

'Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
BIZ_Forms_Open "1003 Page 2"
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_763","Insurance"
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_763","RETaxes"

'Navigate to CD page 1 and verify Escrow amount in Projected Payment Table
BIZ_Forms_Open "Closing Disclosure Page 1"
'BIZ_Common_ClosingDisclosurePage1_VerifyEscrowAmtPPTable "1352_ConstrPerm_Fixed_CD4_763"
VerifyEscrowAmtPPTable "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to CD page 1 and Set closing date
BIZ_ClosingDisclosurePage1_SetClosingInformation "1352_ConstrPerm_Fixed_CD4_763"

'Navigate to CD page4 and Verify Loan Disclosure Escrow
BIZ_Forms_Open "Closing Disclosure Page 4"
'BIZ_Forms_ClosingDisclosurePage_VerifyLoanDisclosureEscrow "1352_ConstrPerm_Fixed_CD4_763"
VerifyLoanDisclosureEscrow "1352_ConstrPerm_Fixed_CD4_763"
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-1338","TC 13 - CBIZ- 3873- CD page 4 Escrow calcs for Construction-Perm loans with Escrow 1st payment date = 1st payment date", Null

'Navigate to BSO form and set data
'Navigate to BSO form and set data
'Go to Pipeline>>NewLoanButton>>Forms
'BIZ_Forms_Open "Borrower Summary - Origination"

'Set Basic Borrower info in borrower section
'BIZ_Common_BorrowerSummaryOrigination_SetBorrower SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_1338"

'SetTransaction details in transaction section
'BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_1338"

'Set property details in  property section
'BIZ_Common_BorrowerSummaryOrigination_SetProperty SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_1338"

'BIZ_ConstructionManagement_SetLoanInfo "1352_ConstrPerm_Fixed_CD4_1338"

'Navigate to 1003 page1 and set Mortgage insurance details
'BIZ_1003Page1_SetMiandPiDetails "1352_ConstrPerm_Fixed_CD4_1338"

'Navigate to Aggrgate EscrowAccont page and Set Escrow Payment Basis
'BIZ_Forms_AggregateEscrowAccount_SetData  "1352_ConstrPerm_Fixed_CD4_1338" 

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate "1352_ConstrPerm_Fixed_CD4_1338"

'Navigate to 2015 Itemization  and set fee details
'BIZ_Forms_Open "2015 Itemization"
'BIZ_2015Itemization_SetFeeDetails "1002","1352_ConstrPerm_Fixed_CD4_1338_1002"
'BIZ_2015Itemization_SetFeeDetails "1003","1352_ConstrPerm_Fixed_CD4_1338_1003"
'BIZ_2015Itemization_SetFeeDetails "1004","1352_ConstrPerm_Fixed_CD4_1338_1004"
'BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "1352_ConstrPerm_Fixed_CD4_1338"
'BIZ_2015Itemization_SetFeeDetails "1005","1352_ConstrPerm_Fixed_CD4_1338_1005"
'BIZ_2015Itemization_SetFeeDetails "1006","1352_ConstrPerm_Fixed_CD4_1338_1006"
'BIZ_2015Itemization_SetFeeDetails "1007","1352_ConstrPerm_Fixed_CD4_1338_1007"

'Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
'BIZ_Forms_Open "1003 Page 2"
'BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_1338","Insurance"
'BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_1338","RETaxes"

'Navigate to CD page 1 and Set closing date	
BIZ_ClosingDisclosurePage1_SetClosingInformation "1352_ConstrPerm_Fixed_CD4_1338"

'Navigate to CD page4 and Verify Loan Disclosure Escrow
BIZ_Forms_Open "Closing Disclosure Page 4"
VerifyLoanDisclosureEscrow "1352_ConstrPerm_Fixed_CD4_1338"

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-672","TC 10 - CBIZ- 3873- CD page 4 Escrow calcs for Construction loans", Null

'Navigate to BSO form and set data
'Go to Pipeline>>NewLoanButton>>Forms
'BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Borrower Summary - Origination"

'Set Basic Borrower info in borrower section
'BIZ_Common_BorrowerSummaryOrigination_SetBorrower SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_672"
BIZ_Forms_Open "Borrower Summary - Origination"
'SetTransaction details in transaction section
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_672"

'Set property details in  property section
'BIZ_Common_BorrowerSummaryOrigination_SetProperty SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_672"

BIZ_ConstructionManagement_SetLoanInfo "1352_ConstrPerm_Fixed_CD4_672"

'Navigate to 1003 page1 and set Mortgage insurance details
BIZ_1003Page1_SetMiandPiDetails "1352_ConstrPerm_Fixed_CD4_672"

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
BIZ_Forms_Open "2015 Itemization"
BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate "1352_ConstrPerm_Fixed_CD4_672"

'Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
BIZ_Forms_Open "1003 Page 2"
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_672","Insurance"
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_672","RETaxes"

'Navigate to 2015 Itemization  and set fee details
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_SetFeeDetails "1002","1352_ConstrPerm_Fixed_CD4_672_1002"
BIZ_2015Itemization_SetFeeDetails "1003","1352_ConstrPerm_Fixed_CD4_672_1003"
BIZ_2015Itemization_SetFeeDetails "1004","1352_ConstrPerm_Fixed_CD4_672_1004"
BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "1352_ConstrPerm_Fixed_CD4_672"
BIZ_2015Itemization_SetFeeDetails "1005","1352_ConstrPerm_Fixed_CD4_672_1005"
BIZ_2015Itemization_SetFeeDetails "1006","1352_ConstrPerm_Fixed_CD4_672_1006"
BIZ_2015Itemization_SetFeeDetails "1007","1352_ConstrPerm_Fixed_CD4_672_1007"

'Navigate to LE page 1 and verify Escrow amount in Projected Payment Table
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_Forms_LoanEstimate_VerifyEstimatedEscrow "1352_ConstrPerm_Fixed_CD4_672"

'Navigate to CD page 1 and Set closing date
BIZ_ClosingDisclosurePage1_SetClosingInformation "1352_ConstrPerm_Fixed_CD4_672"

'Navigate to CD page4 and Verify Loan Disclosure Escrow
BIZ_Forms_Open "Closing Disclosure Page 4"
VerifyLoanDisclosureEscrow "1352_ConstrPerm_Fixed_CD4_672"

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-1449","TC 12 - CBIZ- 3873- CD page 4 Escrow calcs for Construction-Perm loans with Escrow 1st payment date <> 1st payment date", Null

BIZ_Forms_Open "Borrower Summary - Origination"
'SetTransaction details in transaction section
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "1352_ConstrPerm_Fixed_CD4_1449"

BIZ_ConstructionManagement_SetLoanInfo "1352_ConstrPerm_Fixed_CD4_1449"

'Navigate to Aggrgate EscrowAccont page and Set Escrow Payment Basis
BIZ_Forms_AggregateEscrowAccount_SetData  "1352_ConstrPerm_Fixed_CD4_1449" 

'Navigate to 1003 page1 and set Mortgage insurance details
BIZ_Forms_Open "1003 Page 1"
BIZ_Common_1003Page1_SetMiandPiDetails "1352_ConstrPerm_Fixed_CD4_1449"

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
BIZ_Forms_Open "2015 Itemization"
BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate "1352_ConstrPerm_Fixed_CD4_1449"

'Navigate to RegZ-CD and Set DueDate
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetLoanInformation "1352_ConstrPerm_Fixed_CD4_1449"

'Navigate to 2015 Itemization  and set fee details
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_SetFeeDetails "903","1352_ConstrPerm_Fixed_CD4_1449_903"
BIZ_2015Itemization_SetFeeDetails "1002","1352_ConstrPerm_Fixed_CD4_1449_1002"
BIZ_2015Itemization_SetFeeDetails "1003","1352_ConstrPerm_Fixed_CD4_1449_1003"
BIZ_2015Itemization_SetFeeDetails "1004","1352_ConstrPerm_Fixed_CD4_1449_1004"
BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "1352_ConstrPerm_Fixed_CD4_1449"
BIZ_2015Itemization_SetFeeDetails "1005","1352_ConstrPerm_Fixed_CD4_1449_1005"
BIZ_2015Itemization_SetFeeDetails "1006","1352_ConstrPerm_Fixed_CD4_1449_1006"
BIZ_2015Itemization_SetFeeDetails "1007","1352_ConstrPerm_Fixed_CD4_1449_1007"

'Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
BIZ_Forms_Open "1003 Page 2"
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "1352_ConstrPerm_Fixed_CD4_1449","Insurance"

'Navigate to CD page4 and Verify Loan Disclosure Escrow
BIZ_Forms_Open "Closing Disclosure Page 4"
VerifyLoanDisclosureEscrow "1352_ConstrPerm_Fixed_CD4_1449"

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
