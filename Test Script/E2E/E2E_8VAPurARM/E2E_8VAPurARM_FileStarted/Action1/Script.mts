'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
   '1 PTAC-2147-File started 1-Assign Loan Officer to New Loan
   '2 PTAC-2148-File started 2-Borrower origination summary
   '3 PTAC-2149-File started 3-Order Credit Report
   '4 PTAC-2150-File started 4-Complete 1003 Form
   '5 PTAC-2151-File started 5-Sent/sign e-consent
   '6 PTAC-2152-File started 6-Get Rate Lock request and LO comp plan and Float
   '7 PTAC-2154-File started 7-Get Rate Locked by Secondary locking user
   '8 PTAC-2156-File started 8-clear alerts
'@ Test Automation JIRA Task:PTAC-2408 E2E_8VAPURARM_Filestarted
'@ TestData:
   '01 Global_Data,Login and E2E_Carollo
   '02 Loans,LoanTemplate and E2E_LoanOfficer
   '03 Loans,LoanTemplate and E2E_VAPURARM
   '04 Forms_BorrowerSummaryOrigination, SetHeadInfo and E2E_VAPURARM  
   '05 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_VAPURARM
   '06 Forms_BorrowerSummaryOrigination, SetCoBorrower and  E2E_VAPURARM
   '07 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_VAPURARM
   '08 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_VAPURARM
   '09 Forms_BorrowerSummaryOrigination, SetProperty and E2E_VAPURARM
   '10 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_VAPURARM
   '11 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_VAPURARM
   '12 Forms_BorrowerSummaryOrigination, SetIncome and E2E_VAPURARM
   '13 Forms_RegZ-LE,SetDisclosureInformation and E2E_VAPURARM
   '14 Forms_VOD,SetVODData andE2E_VAPURARM
   '15 Forms_VOL,SetVOLData, E2E_VAPURARM
   '16 Forms_1003page,SetEmployment and E2E_VAPURARM
   '17 Forms_1003page,SetTitleDetails and E2E_VAPURARM
   '18 Forms_1003page,1003Page1 and E2E_VAPURARM
   '19 Forms_1003page,1003Page2 and E2E_VAPURARM
   '20 Forms_1003page,1003Page3  and E2E_VAPURARM
   '21 Forms_1003page,Declarations  and E2E_VAPURARM
   '22 Forms_1003page,SetLoanOriginator and E2E_VAPURARM
   '23 Tools_LockRequestForm, SetRateLockRequest and E2E_VAPURARM
   '24 Global_Data, Login and E2E_Secondary
   '25 Global_Data, Website and E2E_VAPURARM_Borrower
   '26 Global_Data, Website and E2E_VAPURARMCoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Create a new loan and Assign LOan Officer to Loan
   '2 Fill Borrower Summary
   '3 Credit Order Report
   '4 Complete 1003 Form
   '5 Sent Sign eConsent
   '6 Get Rate Lock request and LO comp plan and Float
   '7 Get Rate Locked by Secondary locking user
   '8 Clear Alert
'@ ExpectedResult:Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2408","Script Name: E2E_8VAPURARM_Filestarted", Null

'====== PTAC-2147-File started 1-Assign Loan Officer to New Loan ======
RunAction "FileStarted_AssignLoanOfficerToLoan_001", oneIteration

'====== PTAC-2148-File started 2-Borrower origination summary ======
RunAction "Filestarted_FillBorrowerSummary_002", oneIteration

'====== PTAC-2149-File started 3-Order Credit Report ======
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'====== PTAC-2150-File started 4-Complete 1003 Form ======
RunAction "Filestarted_Complete1003Form_004", oneIteration

'====== PTAC-2151-File started 5-Sent/sign e-consent ======
RunAction "Filestarted_SentSignEConsent_005", oneIteration

'====== PTAC-2152-File started 6-Get Rate Lock request and LO comp plan and Float ======
RunAction "Filestarted_RateLockLOcompplanFloat_006", oneIteration

'====== PTAC-2154-File started 7-Get Rate Locked by Secondary locking user ======
RunAction "Filestarted_GetRateLocked_007", oneIteration

'====== PTAC-2156-File started 8-clear alerts ======
RunAction "Filestarted_ClearAlert_008", oneIteration

FRM_RT_TearDownTest(Null)