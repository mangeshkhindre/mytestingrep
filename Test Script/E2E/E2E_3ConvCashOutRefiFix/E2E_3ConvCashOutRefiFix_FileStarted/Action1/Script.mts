'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase: 
	'1 PTAC-2932 CONVCASHOUTREFIFIX File Started 1 - Import a TPO loan file in Encompass
	'2 PTAC-2969 CONVCASHOUTREFIFIX File Started 2 - Order Credit Report
	'3 PTAC-2970 CONVCASHOUTREFIFIX File Started 3 - Complete 1003 forms
	'4 PTAC-2971 CONVCASHOUTREFIFIX File started 4 - Get EPPS pricing with LO comp plan and float
	'5 PTAC-2972 CONVCASHOUTREFIFIX File started 5 - Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData:
   '01 Global_Data, Login, E2E_Carollo
   '02 Loans, LoanTemplate, E2E_LoanOfficer
   '03 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_CONVCASHOUTREFFIX
   '04 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVCASHOUTREFFIX
   '05 Forms_BorrowerSummaryOrigination, SetProperty, E2E_CONVCASHOUTREFFIX
   '06 Forms_BorrowerSummaryOrigination, SetCreditScores, E2E_CONVCASHOUTREFFIX
   '07 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_CONVCASHOUTREFFIX
   '08 Forms_1003page, 1003Page1 and E2E_CONVCASHOUTREFFIX
   '09 Forms_1003page, SetEmployment  and E2E_CONVCASHOUTREFFIX
   '10 Forms_RegZ-LE, SetConstruction and E2E_CONVCASHOUTREFFIX
   '11 Forms_BorrowerSummaryOrigination, SetBorrower AND E2E_CONVCASHOUTREFFIX
   '12 Forms_VOD, SetVODData and  E2E_CONVCASHOUTREFFIX
   '13 Tools_LockRequestForm, SetRateLockRequest, E2E_CONVCASHOUTREFFIX	
   '14 Global_Data, WebSite, E2E_CONVCASHOUTREFIFIX_CoBorrower
   '15 Global_Data, WebSite, E2E_CONVCASHOUTREFIFIX_Borrower
   '16 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_CONVCASHOUTREFFIX
   '17 Forms_RegZ-LE, InterestOnly and E2E_CONVCASHOUTREFFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Assign new loan to Loan office
    '2 File started 3-Order Credit Report
    '3 Complete 1003 Form
    '4 Get EPPS pricing with LO comp plan and float
    '5 Sent/sign e-consent
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3371","Script Name: E2E_3CONVCASHOUTREFIFIX_FileStarted", Null

'====== PTAC-2932 - File started 1 - Assign new loan to Loan officer ======
RunAction "FileStarted_AssignNewLoanToLoanOfficer_001", oneIteration

'====== PTAC-2969 - File started 2 - Order Credit Report ======
RunAction "FileStarted_CreditOrderReport_002", oneIteration

'====== PTAC-2970 - File started 3 - Complete 1003 Form ======
RunAction "FileStarted_Complete1003Form_003", oneIteration

'====== PTAC-2971 - Filestarted 4 - Get EPPS pricing with LO comp plan and float ======
RunAction "FileStarted_GetEPPS PricingWithLOCompPlanFloat_004", oneIteration

'====== PTAC-2972 - File started 5 - Sent/sign e-consent ======
RunAction "FileStarted_SentSignEConsent_005", oneIteration

FRM_RT_TearDownTest(Null) 
