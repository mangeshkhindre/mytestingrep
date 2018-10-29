'@**************************************************************************************************
'@ TestStory: PTAC-3409 ATR/QM Calculations
'@ TestCase: 
   '1 PTAC-3361 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Primary)
   '2 PTAC-3279 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Second Home)
   '3 PTAC-3280 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Investment)
'@ Test Automation JIRA Task: PTAC-3410 ATR-QMCalculations_NonOccupantCo-MortgagorPresentHousingExpense
'@ TestData: 
   '1 "Forms_BorrowerSummaryOrigination", "SetBorrower", strRowID
   '2 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", strRowID
   '3 "Forms_BorrowerSummaryOrigination", "SetBorrowerIncome", strRowID
   '4 "Forms_BorrowerSummaryOrigination", "TotalMonthlyPayment", strRowID
   '5 "Forms_BorrowerSummaryOrigination", "SetSSNVerification", strRowID
   '6 "Forms_1003page", "1003Page1", strRowID
   '7 "Forms_1003page", "1003Page2", strRowID
   '8 "Forms_VOL", "SetVOLData", strRowID
   '9 "Forms_1003page", "SetLiabilities", strRowID
   '10 "Forms_ATRQMManagement", "SetBorrowerInfo", strRowID
'@ Pre-conditions: Fixed For 17204 Banker, Server: http://eq1veabe30047.dco.elmae/Encompass$BE11173697	
'@ Description: Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense when Subject Property = Investment  
'@ TestSteps:
   '1 PTAC-3361 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Primary)
   '2 PTAC-3279 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Second Home)
   '3 PTAC-3280 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Investment)
'@ ExpectedResult:
   '1 PTAC-3361 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Primary)
   '2 PTAC-3279 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Second Home)
   '3 PTAC-3280 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Investment)
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3410","Script Name: ATR-QMCalculations_NonOccupantCo-MortgagorPresentHousingExpense", Null

'==== Login ====
BIZ_Login_UserLogin "admin_core2p" '@ Fixed For 17204 Banker, Server: http://eq1veabe30047.dco.elmae/Encompass$BE11173697	

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3361","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Primary)", Null
RunAction "ValidateQM.X376_Non-OccupantCo-Mortgagor_HousingExpense", OneIteration, "PTAC-3361", "PTAC-3361_Borrower2"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3279","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Second Home)", Null
BIZ_Nav_SelectHomeTab()
RunAction "ValidateQM.X376_Non-OccupantCo-Mortgagor_HousingExpense", OneIteration, "PTAC-3279", "PTAC-3279_Borrower2"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3280","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Investment)", Null
BIZ_Nav_SelectHomeTab()
RunAction "ValidateQM.X376_Non-OccupantCo-Mortgagor_HousingExpense", OneIteration, "PTAC-3280", "PTAC-3280_Borrower2"

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)
