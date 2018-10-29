'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase:
   '1 PTAC-2261 - File started 1-Assign Loan Officer to New Loan 
   '2 PTAC-2262 - File started 2-Borrower origination summary
   '3 PTAC-2263 - File started 3-Order Credit Report
   '4 PTAC-2264 - File started 4-Complete 1003 Form
   '5 PTAC-2393 - File started 5-Add VOL for subject property and attach to VOM
   '6 PTAC-2265 - File started 6-Sent/sign e-consent 
   '7 PTAC-2266 - File started 7-Get Rate Lock request and LO comp plan and Float
   '8 PTAC-2267 - File started 8-Get Rate Locked by Secondary locking user
   '9 PTAC-2268 - File started 9-clear alert 
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_Filestarted
'@ TestData:
	'01 Global_Data, Login and E2E_Tracy
	'02 Forms_BorrowerSummaryOrigination, SetHeadInfo and VANoCORefiARM  
    '03 Forms_BorrowerSummaryOrigination, SetBorrower and VANoCORefiARM  
    '04 Forms_BorrowerSummaryOrigination, SetCoBorrower and VANoCORefiARM 
    '05 Forms_BorrowerSummaryOrigination, SetCreditInformation and VANoCORefiARM 
    '06 Forms_BorrowerSummaryOrigination, SetProperty and VANoCORefiARM 
    '07 Forms_BorrowerSummaryOrigination, SetTransactionDetails and VANoCORefiARM 
    '08 Forms_BorrowerSummaryOrigination, SetCreditInformation and VANoCORefiARM 
    '09 Forms_BorrowerSummaryOrigination, SetIncome and VANoCORefiARM
	'10 Forms_1003page, SetEmployment and E2E_VANoCORefiARM
    '11 Forms_1003page, SetTitleDetails and E2E_VANoCORefiARM
    '12 Forms_1003page, 1003Page1 and E2E_VANoCORefiARM 
    '13 Forms_1003page, 1003Page2 and E2E_VANoCORefiARM 
    '14 Forms_VOD, SetVODData and E2E_VANoCORefiARM
    '15 Forms_VOL, SetVOLData and E2E_VANoCORefiARM1
    '16 Forms_VOL, SetVOLData and E2E_VANoCORefiARM2
    '17 Forms_VOL, SetVOLData and E2E_VANoCORefiARM3
    '18 Forms_VOL, SetVOLData and E2E_VANoCORefiARM4
    '19 Forms_VOL, SetVOLData and E2E_VANoCORefiARM5
    '20 Forms_1003page, Declarations and E2E_VANoCORefiARM
    '21 Forms_1003page, 1003Page3 and E2E_VANoCORefiARM
    '22 Forms_1003page, SetLoanOriginator and E2E_VANoCORefiARM
    '23 Forms_RegZ-LE, SetDisclosureInformation and E2E_VANoCORefiARM
    '24 Forms_RegZ-LE, SetARM and E2E_VANoCORefiARM
    '25 Forms_RegZ-LE, InterestOnly and E2E_VANoCORefiARM
    '26 Forms_RegZ-LE, SetAIR and E2E_VANoCORefiARM
    '27 Forms_RegZ-LE, SetLateCharge and E2E_VANoCORefiARM
	'28 Forms_VOL, SetVOLData, strRowID
	'29 Global_Data, WebSite and E2E_VANoCORefiARM_Borrower
    '30 Global_Data, WebSite and E2E_VANoCORefiARM_CoBorrower
    '31 Global_Data, Login and E2E_Secondary
    '32 Tools_LockRequestForm, SetRateLockRequest and E2E_VANoCORefiARM
	'33 Global_Data, Login and E2E_Tracy	
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Assign Loan Officer to New Loan 
   '2 Borrower origination summary
   '3 Order Credit Report
   '4 Complete 1003 Form
   '5 Add VOL for subject property and attach to VOM
   '6 Sent/sign e-consent 
   '7 Get Rate Lock request and LO comp plan and Float
   '8 Get Rate Locked by Secondary locking user
   '9 Clear alert 
'@ ExpectedResult:
   'FileStarted is completed for the LoanNumber
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2803","Script Name: E2E_9VANoCORefiARM_FileStarted", Null

'====== PTAC-2261 File started 1- Assign Loan Officer to New Loan ======
RunAction "FileStarted_AssignLoanOfficerToNewLoan_001", oneIteration

'====== PTAC-2262 File started 2- Borrower origination summary ======
RunAction "FileStarted_BorrowerSummary_002", oneIteration

'====== PTAC-2263 File started 3- Order Credit Report ======
RunAction "FileStarted_OrderCreditReport_003", oneIteration

'====== PTAC-2264 File started 4- Complete 1003 Form ======
RunAction "FileStarted_Complete1003Form_004", oneIteration

'====== PTAC-2393 File started 5 - Add VOL for subject property and attach to VOM ======
RunAction "FileStarted_AddVOLAndVOM_005", oneIteration

'====== PTAC-2265 File started 6- Sent/sign e-consent ======
RunAction "FileStarted_SendAndSignEconsent_006", oneIteration

'====== PTAC-2266 File started 7- Get Rate Lock request and LO comp plan and Float ======
RunAction "FileStarted_RateLockRequestLOCompPlan_007", oneIteration

'====== PTAC-2267 File started 8- Get Rate Locked by Secondary locking user ======
RunAction "FileStarted_RateLockedBySecondaryLockingUser_008", oneIteration

'====== PTAC-2268 File started 9- clear alert ======
RunAction "FileStarted_ClearAlert_009", oneIteration

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_VANoCORefiARM"
End If

'===== Exit the Loan Details =====
BIZ_Loan_Exit True

'===== Logout From Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)