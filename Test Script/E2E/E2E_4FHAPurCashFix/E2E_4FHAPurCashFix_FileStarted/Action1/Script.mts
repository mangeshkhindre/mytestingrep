'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
   '1 PTAC-2993 FHAPURCHASEFIX - File Started 1-Import TPO loan file in Encompass 
   '2 PTAC-3006 FHAPURCHASEFIX - File Started 2-Order Credit Report 
   '3 PTAC-3007 FHAPURCHASEFIX - File Started 3-Complete 1003 forms 
   '4 PTAC-3008 FHAPURCHASEFIX - File Started 5-Get EPPS pricing with LO comp plan and float 
   '5 PTAC-3009 FHAPURCHASEFIX - File Started 4-Sent/sign e-consent 
   '6 PTAC-3077 FHAPURCHASEFIX - File Started 6-Get Rate Lock request 
   '7 PTAC-3078 FHAPURCHASEFIX - File Started 7-Get Rate Locked by Secondary locking user 
   '8 PTAC-3079 FHAPURCHASEFIX - File Started 8-clear alert 
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData: 
   '01 Global_Data, Login, E2E_markuslo
   '02 Global_Data, Login, E2E_Secondary
   '03 Global_Data, WebSite, E2E_FHAPURCASHFIX_Borrower
   '04 Loans, LoanTemplate, E2E_LoanOfficer
   '05 Loans, LoanTemplate, E2E_FHAPURCASHFIX
   '06 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHAPURCASHFIX
   '07 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURCASHFIX
   '08 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHAPURCASHFIX
   '09 Forms_BorrowerSummaryOrigination, SetCreditScores, E2E_FHAPURCASHFIX
   '10 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHAPURCASHFIX
   '11 Forms_1003page, 1003Page1, E2E_FHAPURCASHFIX
   '12 Forms_1003page, SetEmployment, E2E_FHAPURCASHFIX
   '13 Tools_LockRequestForm, SetRateLockRequest, E2E_FHAPURCASHFIX
   '14 Forms_RegZ-LE, SetConstruction, E2E_FHAPURCASHFIX
   '15 Global_Data, WebSite and E2E_FHAPURCASHFIX_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Create a new loan and Assign LOan Officer to Loan
   '2 Fill Borrower Summary
   '3 Credit Order Report
   '4 Complete 1003 Form
   '5 Sent Sign eConsent
   '6 e Disclosures
   '7 Rate Lock LO compplan Float
   '8 Get Rate Locked
   '9 Clear Alert
'@ ExpectedResult: Loan should be created
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3150","Script Name: E2E_4FHAPURCASHFIX_Filestarted", Null

'========Creates the new blank Loan ========
RunAction "FileStarted_ImportTPOLoanFileInEncompass_001", oneIteration

'====== Gets the Credit Order Report ========
RunAction "FileStarted_OrderCreditReport_002", oneIteration

'====== Enters the details in 1003 Form for the Loan ======
RunAction "FileStarted_Complete1003Forms_003", oneIteration

'====== Performs the eConsent on the Loan ======
RunAction "FileStarted_SentSignEconsent_004", oneIteration

'====== Performs the EPPS Pricing ======
RunAction "FileStarted_GetEPPSPricingwithLOCompPlanAndFloat_005and006", oneIteration

'====== Gets the Rate Locked  ======
RunAction "FileStarted_GetRateLockedBySecondaryLockUser_007", oneIteration
'====== Clears the Alert ======
RunAction "FileStarted_ClearAlert_008", oneIteration

GUI_Dialog_Encompass_YesX 60, ""

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_FHAPURCASHFIX"
End If

'===== Exists the Loan Details =====
BIZ_Loan_Exit True

'===== Logs out of Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)  


