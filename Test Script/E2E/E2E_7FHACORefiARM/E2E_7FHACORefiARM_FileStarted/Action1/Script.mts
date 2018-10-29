'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
   '1 PTAC-2292 - FHACOREFIARM File started 1 Assign new loan to Loan officer
   '2 PTAC-2293 - FHACOREFIARM File started - 2 Fill Borrower summary form
   '3 PTAC-2294 - FHACOREFIARM File started 3-Order Credit Report
   '4 PTAC-2295 - FHACOREFIARM File started 4-Complete 1003 Form
   '5 PTAC-2385 - FHACOREFIARM File started 5 - Complete FHA management Form
   '6 PTAC-2391 - FHACOREFIARM File started 6- Get EPPS pricing with LO comp plan and fl
   '7 PTAC-2392 - FHACOREFIARM File started 7-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   '01 Global_Data, Forms_RegZ-LE, Forms_FNMAStreamlined, Forms_1003Page, Forms_VOD, Forms_BorrowerSummaryOrigin
   '02 Global_Data, Login, E2E_markuslo
   '03 Loans,LoanTemplate, E2E_LoanOfficer
   '04 Loans,LoanTemplate, E2E_FHACORefiARM
   '05 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHACORefiARM  
   '06 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHACORefiARM
   '07 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_FHACORefiARM
   '08 Form rowerSummaryOrigination, SetCreditInformation, E2E_FHACORefiARM
   '09 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHACORefiARM
   '10 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHACORefiARM
   '11 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHACORefiARM"
   '12 Forms_BorrowerSummaryOrigination, SetIncome, E2E_FHACORefiARM
   '13 Forms_VOD, SetVODData, E2E_FHACORefiARM
   '14 Forms_VOL, SetVOLData, E2E_FHACORefiARM
   '15 Forms_1003page, SetEmployment, E2E_FHACORefiARM
   '16 Forms_1003page, SetTitleDetails, E2E_FHACORefiARM
   '17 Forms_1003page, 1003Page1, E2E_FHACORefiARM
   '18 Forms_1003page, 1003Page2, E2E_FHACORefiARM
   '19 Forms_1003page, 1003Page3, E2E_FHACORefiARM
   '20 Forms_1003page, Declarations, E2E_FHACORefiARM
   '21 Forms_1003page, SetLoanOriginator, E2E_FHACORefiARM
   '22 Forms_FreddieMacAdditionalData, LendorInformation, E2E_FHACORefiARM
   '23 Forms_RegZ-LE, SetLateCharge, E2E_FHACORefiARM
   '24 Forms_RegZ-LE, SetAIR, E2E_FHACORefiARM
   '25 Forms_RegZ-LE, SetARM, E2E_FHACORefiARM
   '26 Forms_RegZ-LE, InterestOnly, E2E_CONVPURAR
   '27 Forms_RegZ-LE, SetDisclosureInformation, E2E_FHACORefiARM
   '28 Global_Data, Login, E2E_Secondary
   '29 Tools_LockRequestForm, SetRateLockRequest, E2E_FHACORefiARM
   '30 Tools_LockRequestForm, SetRateLockRequest and E2E_FHACORefiARM
   '31 Global_Data, WebSite, E2E_FHACORefiARM_Borrower
   '32 Global_Data, WebSite, E2E_FHACORefiARM_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Create a new loan and Assign Loan Officer to Loan
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

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2713","Script Name - E2E_7FHACORefiARM_FileStarted", Null

'======PTAC-2292 - FHACOREFIARM File started 1 Assign new loan to Loan officer==
RunAction "FileStarted_AssignLoanOfficerToLoan_001", oneIteration

'====PTAC-2293 - FHACOREFIARM File started - 2 Fill Borrower summary form====
RunAction "Filestarted_FillBorrowerSummary_002", oneIteration

'====PTAC-2294 - FHACOREFIARM File started 3-Order Credit Report====
RunAction "Filestarted_CreditOrderReport_003", oneIteration

'====PTAC-2295 - FHACOREFIARM File started 4-Complete 1003 Form====
RunAction "Filestarted_Complete1003Form_004", oneIteration

'====PTAC-2385 - FHACOREFIARM File started 5 - Complete FHA management Form===
RunAction "Filestarted_CompleteFHAManagementForm_005", oneIteration

'====PTAC-2391 - FHACOREFIARM File started 6- Get EPPS pricing with LO comp plan and float==
Runaction "Filestarted_GetEPPSpricingwithLOcompPlanandFloat_006", oneIteration

'====PTAC-2392 - FHACOREFIARM File started 7-Sent/sign e-consent===
RunAction "Filestarted_SentSignEConsent_007", oneIteration

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_FHACORefiARM"
End If

'===== Exit From Loan Details =====
BIZ_Loan_Exit True
'===== Logout From Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null) 
