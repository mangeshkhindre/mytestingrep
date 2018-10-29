'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
	'1 PTAC-3196 TC 1 - CBIZ-7310 - Construction-To-Perm loan without any MI and Escrow payment
'@ Test Automation JIRA Task:  PTAC-3585 ConstructionManagement_ConstrPerm_WithoutMIAndEscrow_ProjPayment_Validate
'@ TestData:
	'1 Forms_BorrowerSummaryOrigination,SetBorrower,1352_ConstrMgmt_EscrowMI78
	'2 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrMgmt_EscrowMI78
	'3 Forms_BorrowerSummaryOrigination,SetTransaction,1352_ConstrMgmt_EscrowMI78
	'4 Forms_RegZ-CD,SetLoanInformation,1352_ConstrMgmt_EscrowMI78
	'5 ConstructionManangement,SetLoanInfo,1352_ConstrMgmt_EscrowMI78
	'6 Forms_ClosingDisclosurePage,ProjectedPayments,1352_ConstrMgmt_EscrowMI78_3196
	'7 Forms_LoanEstimatePage,ProjectedPayments,1352_ConstrMgmt_EscrowMI78_3196
	'8 ConstructionManangement,SetConstructionMortPeriod,1352_ConstrMgmt_EscrowMI78_LE_PDF_3196
	'9 ConstructionManangement,SetConstructionMortPeriod,1352_ConstrMgmt_EscrowMI78_CD_PDF_3196
'@ Pre-condition
'@ Description: Construction To Permanent Loan,Without MI and Escrow and validate Projected Payment Table
'@ TestSteps:
	'1 Log into Encompass as Admin/password
	'2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
	'3 Click on New Bank Loan button
	'4 Enter the data mentioned in Test Data column, save.
	'5 Navigate to RegZ-LE form and Enter data
	'6 Navigate to 1003 page 1 form and click on Edit field of (field id 1045), Enter data pop up
	'7 Navigate to 2015 Itemization form and Enter data pop up, save
	'8 Navigate to Aggregate Escrow form and Enter data
	'9 On Aggregate Escrow form, click on Setup,enter test data 
	'10 Navigate to LE page 1 and check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72 ,Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'11 Click on Print button and Preview the LE PDF file.. check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72 Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'12 Navigate to CD page 1 and check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X38,Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
	'13 Click on Print button and Preview the CD PDF file.. check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X3 and Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
'@ ExpectedResult:
	'1 Admin should be able to login successfully
	'2 New Loan pop up displayed
	'3 It navigates to Loan tab
	'4 The Loan is created 
	'5 Values should be entered and loan should be saved successfully.
	'6 Values should be entered and loan should be saved successfully.
	'7 Values should be entered and loan should be saved successfully.
	'8 Values should be entered and loan should be saved successfully.
	'9 All fields should show “0”, Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72,Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'10 All fields should show “0”, Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72,Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'11 All fields should show “0”,Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X38,Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
	'12 All fields should show “0”,Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X38,Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3585","ConstructionManagement_ConstrPerm_WithoutMIAndEscrow_ProjPayment_Validate", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3196","TC 1 - CBIZ-7310 - Construction-To-Perm loan without any MI and Escrow payment", Null

'====== Navigate to the Pipeline>>Construction Management ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"

'====== Set input data in Comstruction Management Page/Form ======
BIZ_BorrowerSummaryOrigination_SetBorrower "1352_ConstrMgmt_EscrowMI78"
BIZ_BorrowerSummaryOrigination_SetProperty "1352_ConstrMgmt_EscrowMI78"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1352_ConstrMgmt_EscrowMI78"

'====== Set Disbursement Date in RegZ-CD Form ======
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetLoanInformation "1352_ConstrMgmt_EscrowMI78"

'====== Set ARM data in RegZ-lE Form or Construction Management form ======
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrMgmt_EscrowMI78"

'====== Save loan ======
BIZ_Loan_Save()

'====== Navigate to LaonEstimate Page 1 and validate the Projected payment Table =======
BIZ_Forms_LoanEstimatePage1_ProjectedPaymentTable_Validate "1352_ConstrMgmt_EscrowMI78_3196"

'====== Open Print Preview and validate Projected payment Table field values ======
BIZ_ConstructionManagement_LEandCDPage1_ProjectedPayment_PDF_Validate "1352_ConstrMgmt_EscrowMI78_LE_PDF_3196","1352_ConstrMgmt_EscrowMI78_3196"

'====== Navigate to Closing Disclosure Page1 ======
BIZ_Forms_ClosingDisclosurePage1_ProjectedPaymentTable_Validate "1352_ConstrMgmt_EscrowMI78_3196"

'====== Open Print Preview and validate Projected payment Table field values ======
BIZ_ConstructionManagement_LEandCDPage1_ProjectedPayment_PDF_Validate "1352_ConstrMgmt_EscrowMI78_CD_PDF_3196","1352_ConstrMgmt_EscrowMI78_3196"

'====== RunAction for Purchase Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case :  PTAC-3228","TC 5 - CBIZ-7310 - Construction-To-Perm loan with MI and stopped at 78%, Escrow payment, and the escrow payment is started from 1st Amort date (HUD69)", Null
RunAction "ConstructionManangement_IstAmortDate_MIandEscrowValidation_SetData", oneIteration, "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3228"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate", oneIteration,  "1352_ConstrMgmt_EscrowMI78_3228", "1352_ConstrMgmt_EscrowMI78_LE_PDF_3228", "1352_ConstrMgmt_EscrowMI78_CD_PDF_3228"

'====== RunAction for Construction Perm Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3210","TC 4 - CBIZ-7310 - Construction-To-Perm loan with MI and Escrow payment, and the escrow payment is started from 1st Amort date (HUD69)", Null
RunAction "ConstructionManangement_IstAmortDate_MIandEscrowValidation_SetData", oneIteration, "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3210"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate", oneIteration, "1352_ConstrMgmt_EscrowMI78_3210", "1352_ConstrMgmt_EscrowMI78_LE_PDF_3210", "1352_ConstrMgmt_EscrowMI78_CD_PDF_3210"

'====== RunAction for Purchase Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3229","TC 6 - CBIZ-7310 - Non Construction-To-Perm loan with ARM (e.g Purchase), Escrow payment and MI but MI is stopped at 78%", Null
RunAction "ConstructionManangement_MIandEscrowValidation_SetData", oneIteration, "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3229", "Purchase"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate",OneIteration,"1352_ConstrMgmt_EscrowMI78_3229","1352_ConstrMgmt_EscrowMI78_LE_PDF_3229","1352_ConstrMgmt_EscrowMI78_CD_PDF_3229"

'====== RunAction for Construction Perm Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3207","TC 3 - CBIZ-7310 - Construction-To-Perm loan with MI and stopped at 78%, Escrow payment", Null
RunAction "ConstructionManangement_MIandEscrowValidation_SetData", oneIteration, "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3207", "ConstructionToPerm"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate",OneIteration,"1352_ConstrMgmt_EscrowMI78_3207","1352_ConstrMgmt_EscrowMI78_LE_PDF_3207","1352_ConstrMgmt_EscrowMI78_CD_PDF_3207"

'====== RunAction for Purchase Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3230","TC 7 - CBIZ-7310 - Balloon loan with ARM (e.g Purchase), Escrow payment, MI payment", Null
RunAction "ConstructionManangement_MIandEscrowValidation_1stPaymentDate_SetData", oneIteration, "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3230", "Purchase"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate",OneIteration,"1352_ConstrMgmt_EscrowMI78_3230","1352_ConstrMgmt_EscrowMI78_LE_PDF_3230","1352_ConstrMgmt_EscrowMI78_CD_PDF_3230"

'====== RunAction for Construction Perm Loan with ARM,EscrowPayment and MI is cancelled at 78%,Aggregate Escrow Account-First Payment Date ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3204","TC 2 - CBIZ-7310 - Construction-To-Perm loan with MI and Escrow payment, and the escrow payment is started from 1st payment date", Null
RunAction "ConstructionManangement_MIandEscrowValidation_1stPaymentDate_SetData", oneIteration,  "1352_ConstrMgmt_EscrowMI78", "1352_ConstrMgmt_EscrowMI78_3204", "ConstructionToPerm"
RunAction "ConstructionManagement_IstAmortDate_LEandCDPage1_ProjectedPaymentTable_PDF_Validate",OneIteration,"1352_ConstrMgmt_EscrowMI78_3204","1352_ConstrMgmt_EscrowMI78_LE_PDF_3204","1352_ConstrMgmt_EscrowMI78_CD_PDF_3204"

'====== Exit Loan ======
BIZ_Loan_Exit False

'====== Logout Encompass =======
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)



