'@**************************************************************************************************
'@ TestStory: PTAC-3004
'@ TestCase: 
   '1 PTAC-2920 -Section 32: (UI changes) when doc signing date 1887 is in 2017 
   '2 PTAC-2916 -Section 32: (UI changes)when Application date today in 2017   
'@ Test Automation JIRA Task: PTAC-3141 Section32_UIChanges_DocSigningDate2017
'@ TestData: 
   '1 "Section32", "UIChanges", ,"PTAC-2917_ApplicationDate2016"
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "PTAC-2917_ApplicationDate2016"   
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "PTAC-2918_ApplicationDate2017" 
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "PTAC-2920_ApplicationDate2016"   
   '1 "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "PTAC-2916_ApplicationDate2017"    
'@ Pre-conditions: None
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with valid credentials
   '2 Navigate to Pipeline tab and click on create New loan of application date as 12/01/2016
   '3 On New Loan page, enter details on Borrower Summary page
   '4 Enter 1887 doc signing date as 01/16/2017
   '6 Navigate to Section 32 HOEPA and verify the bold text 
   '7 Change the Application Date(F745) = before 2017
   '8 Navigate to Section 32 HOEPA and verify the bold text     
'@ ExpectedResult:
   '1 Encompass should be opened successfully.
   '2 User should be able to Go to Pipeline tab.On the "New Loan" window, user should be able to select "New Blank loan" option
   '3 Loan should be saved successfully
   '4 Closing date is saved
   '5 Bold text should match with below text.
   	  'For a loan amount of $20,579 or more total points and fees cannot exceed 5% of the total loan amount; 
      'For Loan amounts less than $20,579 the total points and fees cannot exceed the lesser of 8% of the total loan amount or $1,029; 
      'The dollar amounts used in this test may be adjusted each year, effective January 1.
   '6 Bold text should match with below text.
      'For a loan amount of $20,350 or more total points and fees cannot exceed 5% of the total loan amount;
      'For Loan amounts less than $20,350 the total points and fees cannot exceed the lesser of 8% of the total loan amount or $1,017
      'The dollar amounts used in this test may be adjusted each year, effective January 1.      
'***************************************************************************************************

FRM_RT_SetupTest(Null)
	
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3004","Script Name - E2E_Section32_UIChanges", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Section32_Admin"

'======Verify Section32 Hoepa(Prerequesite) ======
BIZ_Section32_UIChanges_Section32PreValidation "PTAC-2917_ApplicationDate2016"

'======(UI changes) when Doc Signing Date in 2017 and Application date in 2016 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2920","Section 32: (UI changes) when Doc signing date(1887) is in 2017", Null
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-2920_ApplicationDate2016"
BIZ_Section32_LoanCreation "PTAC-2917_ApplicationDate2016"
BIZ_RegZ_CD_SetData "PTAC-2920_DocSigningDate"
'BIZ_Loan_Save()
BIZ_Forms_Open "Section 32 HOEPA"
BIZ_Section32_UIChanges_Section32_ClosingDateAndApplicationDatePostValidation "PTAC-2917_ApplicationDate2016"

'======(UI changes) when Closing Date in 2017 and Application date in 2016 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2916","Section 32: (UI changes)when Application date is before 2017", Null
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-2917_ApplicationDate2016"
'BIZ_Section32_LoanCreation "PTAC-2917_ApplicationDate2016"
'BIZ_Loan_Save()
BIZ_Forms_Open "Section 32 HOEPA"
Wait g_LongWaitMedium				' Explicit wait used to handle sync issues
BIZ_Section32_UIChanges_Section32_ApplicationDatePostValidation "PTAC-2917_ApplicationDate2016"

'======(UI changes) when Estimated Closing Date in 2017 and Application date in 2016 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2924","Section 32: (UI changes)when Estimated Closing Date is in 2017 and Application date in 2016", Null
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-2917_ApplicationDate2016_1"
BIZ_Forms_Open "Section 32 HOEPA"
BIZ_Section32_UIChanges_Section32_ClosingDateAndApplicationDatePostValidation "PTAC-2917_ApplicationDate2016"

'======(UI changes) when Closing Date in 2017 and Application date in 2017 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2918","Section 32: (UI changes)when Closing Date in 2017 and Application date in 2017", Null
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-2918_ApplicationDate2017"
BIZ_Loan_Save()
BIZ_Forms_Open "Section 32 HOEPA"
BIZ_Section32_UIChanges_Section32_ClosingDateAndApplicationDatePostValidation "PTAC-2917_ApplicationDate2016"

BIZ_Loan_Exit(False)

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
