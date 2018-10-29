'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
	'1 PTAC-1195 CONVNOCASHREFIARM - File started 1 - Assign new loan to Loan officer
	'2 PTAC-1199 CONVNOCASHREFIARM - File started 2 - Enter Borrower Summary
	'3 PTAC-1205 CONVNOCASHREFIARM - File started 3 - Order Credit Report
	'4 PTAC-1207 CONVNOCASHREFIARM - File started 4 - Complete 1003 Form
	'5 PTAC-1260 CONVNOCASHREFIARM - File started 5 - Add VOL for subject property and attach to VOM
	'6 PTAC-1261 CONVNOCASHREFIARM - File started 6 - Get EPPS pricing with LO comp plan and float
	'7 PTAC-1262 CONVNOCASHREFIARM - File started 7 - Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData:
    '01 Global_Data, Login and E2E_carollo
    '02 Loans, LoanTemplate and E2E_LoanOfficer
    '03 Loans, LoanTemplate and E2E_ConvNoRefiARM
    '04 Forms_BorrowerSummaryOrigination, SetHeadInfo and  E2E_ConvNoRefiARM  
    '05 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_ConvNoRefiARM
    '06 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_ConvNoRefiARM
    '07 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_ConvNoRefiARM
    '08 Forms_BorrowerSummaryOrigination, SetProperty and E2E_ConvNoRefiARM
    '09 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_ConvNoRefiARM
    '10 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_ConvNoRefiARM"
    '11 Forms_BorrowerSummaryOrigination, SetIncome and E2E_ConvNoRefiARM"
    '12 Forms_RegZ-LE, SetDisclosureInformation and E2E_ConvNoRefiARM
	'13 Forms_VOD, SetVODData and E2E_ConvNoRefiARM
	'14 Forms_VOL, SetVOLData and E2E_ConvNoRefiARM
	'15 Forms_1003page, SetEmployment and E2E_ConvNoRefiARM
	'16 Forms_1003page, SetTitleDetails and E2E_ConvNoRefiARM
	'17 Forms_1003page, 1003Page1 and E2E_ConvNoRefiARM
	'18 Forms_1003page, 1003Page2 and E2E_ConvNoRefiARM
	'19 Forms_1003page, 1003Page3 and E2E_ConvNoRefiARM
	'20 Forms_1003page, Declarations and E2E_ConvNoRefiARM
	'21 Forms_1003page, SetLoanOriginator and E2E_ConvNoRefiARM
	'22 Forms_RegZ-LE, InterestOnly and E2E_ConvNoRefiARM
    '23 Forms_RegZ-LE, SetConstruction and E2E_ConvNoRefiARM
    '24 Forms_VOL, SetVOLData and E2E_ConvNoRefiARM
    '25 Tools_LockRequestForm, SetRateLockRequest and E2E_ConvNoRefiARM
    '26 Tools_LockRequestForm, SetManageBorrowers and E2E_ConvNoRefiARM
    '27 Global_Data, WebSite, E2E_ConvNoRefiARM_CoBorrower
	'28 Global_Data, WebSite, E2E_ConvNoRefiARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Assign new loan to Loan office
    '2 Enter Borrower Summary
    '3 File started 3-Order Credit Report
    '4 Complete 1003 Form
    '5 Add VOL for subject property and attach to VOM
    '6 Get EPPS pricing with LO comp plan and float
    '7 Sent/sign e-consent
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1666","Script Name: E2E_1ConvNoRefiARM_FileStarted", Null

'====== PTAC-1195 - File started 1 - Assign new loan to Loan officer ======
RunAction "FileStarted_AssignNewLoantoLoanOfficer_001", oneIteration

'====== PTAC-1199 - File started 2 - Enter Borrower Summary ======
RunAction "Filestarted_EnterBorrowerSummary_002", oneIteration

'====== PTAC-1205 - File started 3 - Order Credit Report ======
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'====== PTAC-1207 - File started 4 - Complete 1003 Form ======
RunAction "Filestarted_Complete1003Form_004", oneIteration

'====== PTAC-1260 - File started 5 - Add VOL for subject property and attach to VOM ======
RunAction "Filestarted_AddVOLSubjectPropertyNAttachtoVOM_005", oneIteration

'====== PTAC-1261 - Filestarted 6 - Get EPPS pricing with LO comp plan and float ======
RunAction "Filestarted_GetEPPSpricingwithLOcompplanFloat_006", oneIteration

'====== PTAC-1262 - File started 7 - Sent/sign e-consent ======
RunAction "Filestarted_SentSignEConsent_007", oneIteration

FRM_RT_TearDownTest(Null)  