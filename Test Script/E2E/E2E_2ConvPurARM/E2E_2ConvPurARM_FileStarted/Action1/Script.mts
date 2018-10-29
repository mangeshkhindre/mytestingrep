'***************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase: 
    '1 PTAC-312 File started 1-Assign Loan Officer to New Loan
    '2 PTAC-313 File started 2-Borrower origination summary.
    '3 PTAC-314 File started 3-Order Credit Report
    '4 PTAC-315 File started 4-Complete 1003 Form
    '5 PTAC-663 File started 5-Sent/sign e-consent
    '6 PTAC-316 File started 6-Get Rate Lock request and LO comp plan and Float.
    '7 PTAC-317 File started 7-Get Rate Locked
    '8 PTAC-662 File started 8-Clear alert of Lock Confirmation
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'01 Global_Data, Login, E2E_markuslo
	'02 Global_Data, Login, E2E_Secondary
	'03 Global_Data, WebSite, E2E_CONVPURARM_Borrower
	'04 Global_Data, WebSite, E2E_CONVPURARM_CoBorrower
	'05 Loans, LoanTemplate, E2E_LoanOfficer
	'06 Loans, LoanTemplate, E2E_CONVPURARM
	'07 Forms_VOD, SetVODData, E2E_CONVPURARM
	'08 Forms_VOL, SetVOLData, E2E_CONVPURARM
	'09 Forms_1003page, SetEmployment, E2E_CONVPURARM
	'10 Forms_1003page, SetTitleDetails, E2E_CONVPURARM
	'11 Forms_1003page, 1003Page1, E2E_CONVPURARM
	'12 Forms_1003page, 1003Page2, E2E_CONVPURARM
	'13 Forms_1003page, 1003Page3, E2E_CONVPURARM
	'14 Forms_1003page, Declarations, E2E_CONVPURARM
	'15 Forms_1003page, SetLoanOriginator, E2E_CONVPURARM
	'16 Forms_FreddieMacAdditionalData, LendorInformation, E2E_CONVPURARM
	'17 Forms_RegZ-LE, SetLateCharge, E2E_CONVPURARM
	'18 Forms_RegZ-LE, SetAIR, E2E_CONVPURARM
	'19 Forms_RegZ-LE, SetARM, E2E_CONVPURARM
	'20 Forms_RegZ-LE, InterestOnly, E2E_CONVPURAR
	'21 Forms_RegZ-LE, SetDisclosureInformation, E2E_CONVPURARM
	'22 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_CONVPURARM  
	'23 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVPURARM
	'24 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_CONVPURARM
	'25 Form rowerSummaryOrigination, SetCreditInformation, E2E_CONVPURARM
 	'26 Forms_BorrowerSummaryOrigination, SetProperty, E2E_CONVPURARM
	'27 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_CONVPURARM
    '28 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_CONVPURARM
    '29 Forms_BorrowerSummaryOrigination, SetIncome, E2E_CONVPURARM
	'30 Tools_LockRequestForm, SetRateLockRequest, E2E_CONVPURARM
	'31 Tools_LockRequestForm, SetRateLockRequest, E2E_CONVPURARM
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-989","Script Name: E2E_2CONVPURARM_Filestarted", Null

'====== Creates the new blank Loan ======
RunAction "FileStarted_AssignLoanOfficerToLoan_001", oneIteration

'====== Fills the Borrower Summary Details ======
RunAction "Filestarted_FillBorrowerSummary_002", oneIteration

'====== Gets the Credit Order Report ======
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'====== Enters the details in 1003 Form for the Loan ======
RunAction "Filestarted_Complete1003Form_004", oneIteration

'====== Performs the eConsent on the Loan ======
RunAction "Filestarted_SentSignEConsent_005", oneIteration

'====== Locks the Loan ======
RunAction "Filestarted_RateLockLOcompplanFloat_006", oneIteration

'====== Gets the Rate Locked  ======
RunAction "Filestarted_GetRateLocked_007", oneIteration

'====== Clears the Alert ======
RunAction "Filestarted_ClearAlert_008", oneIteration

GUI_Dialog_Encompass_YesX 60, ""

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_CONVPURARM"
End If

'===== Exists the Loan Details =====
BIZ_Loan_Exit True

'===== Logs out of Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)  