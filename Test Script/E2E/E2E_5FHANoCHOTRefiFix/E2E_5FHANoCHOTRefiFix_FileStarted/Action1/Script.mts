'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
   '1 PTAC-1486 FHANOCHOTREFIFIX File started 1 Assign new loan to Loan officer
   '2 PTAC-1487 FHANOCHOTREFIFIX File started 2 Fill Borrower summary form
   '3 PTAC-1488 FHANOCHOTREFIFIX File started 3 Order Credit Report
   '4 PTAC-1489 FHANOCHOTREFIFIX File started 4 Complete 1003 Form
   '5 PTAC-1699 FHANOCHOTREFIFIX File started 5 Complete FHA management Form
   '6 PTAC-1513 FHANOCHOTREFIFIX File started 6 Get EPPS pricing with LO comp plan and float
   '7 PTAC-1518 - FHANOCHOTREFIFIX File started 7 Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData:
   '1 Global_Data, Login and E2E_FHANoCHOTRefiFix
   '2 Loans, LoanTemplate and E2E_LoanOfficer
   '3 Loans, LoanTemplate and E2E_FHANoCHOTRefiFix
   '4 Forms_RegZ-LE, SetDisclosureInformation and E2E_FHANoCHOTRefiFix
   '5 Forms_VOD, SetVODData and E2E_FHANoCHOTRefiFix
   '6 Forms_VOL, SetVOLData and E2E_FHANoCHOTRefiFix
   '7 Forms_1003page, SetEmployment and E2E_FHANoCHOTRefiFix
   '8 Forms_1003page, SetTitleDetails and E2E_FHANoCHOTRefiFix
   '9 Forms_1003page, 1003Page1 and E2E_FHANoCHOTRefiFix
   '10 Forms_1003page, 1003Page2 and E2E_FHANoCHOTRefiFix
   '11 Forms_1003page, 1003Page3 and E2E_FHANoCHOTRefiFix
   '12 Forms_1003page, Declarations and E2E_FHANoCHOTRefiFix
   '13 Forms_1003page, SetLoanOriginator and E2E_FHANoCHOTRefiFix
   '14 Forms_FHAManagement, BasicInfo, E2E_5FHANoCHOTRefiFix
   '15 Forms_FNMAStreamlined, FNMAStreamlined, E2E_5FHANoCHOTRefiFix	
   '16 Forms_BorrowerSummaryOrigination, SetHeadInfo and E2E_FHANoCHOTRefiFix   
   '17 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_FHANoCHOTRefiFix
   '18 Forms_BorrowerSummaryOrigination, SetCoBorrower and E2E_FHANoCHOTRefiFix
   '19 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_FHANoCHOTRefiFix
   '20 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_FHANoCHOTRefiFix
   '21 Forms_BorrowerSummaryOrigination, SetProperty and E2E_FHANoCHOTRefiFix
   '22 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_FHANoCHOTRefiFix
   '23 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_FHANoCHOTRefiFix
   '24 Forms_BorrowerSummaryOrigination, SetIncome and E2E_FHANoCHOTRefiFix
   '25 Global_Data, WebSite and E2E_FHANoCHOTRefiFix_Borrower
   '26 Global_Data, WebSite and E2E_FHANoCHOTRefiFix_CoBorrower
   '27 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_FHANoCHOTRefiFix_CoBorrower
   '28 sTools_LockRequestForm, SetRateLockRequest and E2E_FHANoCHOTRefiFixs
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Create a new loan and Assign LOan Officer to Loan
   '2 Fill Borrower Summary
   '3 Credit Order Report
   '4 Complete 1003 Form
   '5 Sent Sign eConsent
   '6 e-Disclosures
   '7 Rate Lock LO compplan Float
   '8 Get Rate Locked
   '9 Clear Alert
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2446","Script Name: E2E_5FHANoCHOTRefiFix_FileStarted", Null

'====== PTAC-1486 - Assign LOan Officer to Loan ======
RunAction "FileStarted_AssignLoanOfficerToLoan_001", oneIteration

'====== PTAC-1487 - Fill Borrower Summary ======
RunAction "Filestarted_FillBorrowerSummary_002", oneIteration

'====== PTAC-1488 - Credit Order Report ======
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'====== PTAC-1489 - Complete 1003 Form ======
RunAction "Filestarted_Complete1003Form_004", oneIteration

'====== PTAC-1699 - Complete FHA management Form ======m
RunAction "FileStarted_CompleteFHAManagementForm_005", oneIteration

'====== PTAC-1513 - Get EPPS pricing with LO comp plan and float ======
RunAction "Filestarted_GetEPPSPricingWithLOCompPlanAndFloat_006", oneIteration

'====== PTAC-1518 - Sent/sign e-consent ======
RunAction "Filestarted_SentSignEConsent_007", oneIteration

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_FHANoCHOTRefiFix"
End If

'===== Exists the Loan Details =====
BIZ_Loan_Exit True

'===== Logs out of Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)