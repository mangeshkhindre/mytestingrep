'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase: 
  '1 PTAC-1863 - File started 1-Assign Loan Officer to New Loan
  '2 PTAC-1864 - File started 2-Borrower origination summary
  '3 PTAC-1865 - File started 3-Order Credit Report
  '4 PTAC-1866 - File started 4-Complete 1003 Form
  '5 PTAC-1867 - File started 5-Sent/sign e-consent
  '6 PTAC-1868 - File started 6-Get Rate Lock request and LO comp plan and Float
  '7 PTAC-1869 - File started 7-Get Rate Locked by Secondary locking user
  '8 PTAC-1870 - File started 8-Clear alert
'@ Test Automation JIRA Task: PTAC- 2011 E2E_6FHAPURARM_Filestarted
'@ TestData:
    '01 Global_Data, Login, E2E_FHAPURARM_LO
    '02 Global_Data, Login, E2E_integration
    '03 Global_Data, WebSite, E2E_HappyPath
    '04 Global_Data, Login, E2E_FHAPURARM
    '05 Global_Data, Website, E2E_FHAPURARM
    '06 Loans, LoanTemplate, E2E_LoanOfficer
    '07 Loans, LoanTemplate, E2E_FHAPURARM
    '08 Forms_RegZ-LE, SetDisclosureInformation, E2E_FHAPURARM
    '09 Forms_VOD, SetVODData, E2E_FHAPURARM
    '10 Forms_VOL, SetVOLData, E2E_FHAPURARM
    '11 Forms_1003page, SetEmployment, E2E_FHAPURARM
    '12 Tools_LockRequestForm, SetRateLockRequest, E2E_FHAPURARM
    '13 Forms_1003page, SetTitleDetails, E2E_FHAPURARM
    '14 Forms_1003page, 1003Page1, E2E_FHAPURARM
    '15 Forms_1003page, 1003Page2, E2E_FHAPURARM
    '16 Forms_1003page, 1003Page3, E2E_FHAPURARM
    '17 Forms_1003page, Declarations, E2E_FHAPURARM
    '18 Forms_1003page, SetLoanOriginator, E2E_FHAPURARM
    '19 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHAPURARM   
    '20 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURARM
    '21 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_FHAPURARM
    '22 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_FHAPURARM
    '23 Form rowerSummaryOrigination, SetCreditInformation, E2E_FHAPURARM
    '24 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHAPURARM
    '25 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHAPURARM
    '26 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHAPURARM
    '27 Forms_BorrowerSummaryOrigination, SetIncome, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Create a new loan and Assign Loan Officer to Loan
   'Fill Borrower Summary
   'Credit Order Report
   'Complete 1003 Form
   'Sent Sign eConsent
   'Get Rate Lock request and LO comp plan and Float
   'Get Rate Locked by Secondary locking user
   'Clear Alert
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC- 2011","Script Name: E2E_6FHAPURARM_Filestarted", Null

'====== File Started 1-Assign Loan Officer To Loan ======
RunAction "FileStarted_AssignLoanOfficerToLoan_001", oneIteration

'====== File Started 2-Fill Borrower Summary ======
RunAction "Filestarted_FillBorrowerSummary_002", oneIteration

'===== File started 3-Order Credit Report =====
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'===== File started 4-Complete 1003 Form =====
RunAction "Filestarted_Complete1003Form_004", oneIteration

'===== File started 5-Sent/sign e-consent =====
RunAction "Filestarted_SentSignEConsent_005", oneIteration

'===== File started 6-Get Rate Lock request and LO comp plan and Float =====
RunAction "Filestarted_RateLockLOcompplanFloat_006", oneIteration

'===== File started 7-Get Rate Locked by Secondary locking user =====
RunAction "Filestarted_GetRateLocked_007", oneIteration

'===== File started 8-Clear Alert =====
RunAction "Filestarted_ClearAlert_008", oneIteration

FRM_RT_TearDownTest(Null)
