'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   'PTAC-564 - Test #3 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, No I.O.
   'PTAC-565 - Test #2 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O.
   'PTAC-566 - Test #1 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, No I.O.
   'PTAC-567 - Test #4 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 60 mths
   'PTAC-568 - Test #5 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 6 mths
   'PTAC-569 - Test #6 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 6 mths
   'PTAC-570 - Test #8 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 6 mths, Balloon & MI
   'PTAC-571 - Test #9 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 36 mths, Balloon & MI
   'PTAC-572 - Test #10 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 60 mths, Balloon & MI
   'PTAC-574 - Test #7 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O., Balloon & MI
'@ Test Automation JIRA Task: PTAC-1381 ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate
'@ TestData:
   '01 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13MoNoInterest
   '02 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12MoNoInterest
   '03 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9MoNoInterest
   '04 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9Mo60Interest
   '05 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo6MInterest
   '06 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13Mo6MInterest
   '07 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo6MInterest
   '08 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_9Mo6MInterest_withMortage
   '09 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_12Mo36MInterest240Ballons_withMortage
   '10 ConstructionManagement,SetConstructionMortPeriod and ConstructionManagement_13Mo60MInterest240Ballons_withMortage
'@ Pre-conditions: 
'@ Description: Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE.
'@ TestSteps: Updated in Action Level
'@ Expected Results: Updated in Action Level 
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case-PTAC-1381","Scrpit Name - ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'PTAC-564--Test #3 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, No I.O.
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-564", "Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, No I.O.---ConstructionManagement_ConstructionPerm_NoInterest_13Months", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_13MoNoInterest"

'PTAC-565--Test #2 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O.
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-565", "Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O.-ConstructionManagement_ConstructionPerm_NoInterest_12Months", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_12MoNoInterest"

'PTAC-566--Test #1 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, No I.O.
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-566", "Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, No I.O.-ConstructionManagement_ConstructionPerm_NoInterest_9Months", Null    
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_9MoNoInterest"

'PTAC-567--Test #4 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 60 mths
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-567", "Test #4 (CBIZ-3706): Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration, "ConstructionManagement_9Mo60Interest"

'PTAC-568--Test #5 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 6 mths
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-568", "Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 6 mths", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_12Mo6MInterest"

'PTAC-569--Test #6 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 6 mths
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-569", "Test #6 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 6 mths", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration, "ConstructionManagement_13Mo6MInterest"

'PTAC-570--Test #8 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 6 mths, Balloon & MI
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-570", "Test #8 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 9 Months, I.O. = 6 mths, Balloon & MI", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration, "ConstructionManagement_9Mo6MInterest_withMortage"

'PTAC-571--Test #9 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 36 mths, Balloon & MI
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-571", "Test #9 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, I.O. = 36 mths, Balloon & MI", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_12Mo36MInterest240Ballons_withMortage"

'PTAC-572--Test #10 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 60 mths, Balloon & MI
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-572", "Test #10 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 13 Months, I.O. = 60 mths, Balloon & MI", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration,"ConstructionManagement_13Mo60MInterest240Ballons_withMortage"

'PTAC-574--Test #7 (CBIZ-3706): Const.-Perm, F2F w/Step Rate, Const.Period = 12 Months, No I.O., Balloon & MI
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-574", "Test #7 (CBIZ-3706): Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE", Null
RunAction "ConstructionManagement_ConstructionPerm_AdjustablePayment_StepRate_Validate", oneIteration, "ConstructionManagement_12MoNoInterest180Ballons_withMortage"

'
'===== PTAC-563-Test #2 (CBIZ-3993): Construction to Perm Loans - Adjustable Interest Rate (AIR) Table Logic - STEP RATE=====	
RunAction "ConstructionManagement_ConstructionPerm__NOInterest_09MOnths_5InterestRate_001", oneIteration

'===== PTAC-573-Test #1 (CBIZ-3993): Construction to Perm Loans - Adjustable Interest Rate (AIR) Table Logic - STEP RATE =====	
RunAction "ConstructionManagement_ConstructionPerm__NOInterest_09MOnths_7InterestRate_002", oneIteration

'===== PTAC-888-Test #3 (CBIZ-3993): Construction to Perm Loans - Adjustable Interest Rate (AIR) Table Logic - STEP RATE =====	
RunAction "ConstructionManagement_ConstructionPerm__NoInterest_PeriodsRepeatfrom12_5InterestRate_003", oneIteration

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-783","TC_7 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

'Navigate to Pipeline>>Cretae New Blank loan
BIZ_Pipeline_SelectLoanFolder "My Pipeline"
BIZ_Loan_AddNewBlankLoan()

'Create Construction Permanent Loan 
BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A783"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A783"
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A783" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A783"
BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A783"

'Set Construction period  and validate MPI Bullet 3 in LEPage1 and CD page 1 For Adjustable Rate amortization type
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A783","Loan Estimate Page 1","Period","AdjustableRate"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A783","Closing Disclosure Page 1","Period" ,"AdjustableRate"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "1352_ConstrPerm_LEandCD_A783"
BIZ_ConstructionManagement_LoanTermsTable_DiffFrequencyPeriod_MPI_BulletsValidate "1352_ConstrPerm_LEandCD_A783Validate","Loan Estimate Page 1","Bullet3"
BIZ_ConstructionManagement_LoanTermsTable_DiffFrequencyPeriod_MPI_BulletsValidate "1352_ConstrPerm_LEandCD_A783Validate","Closing Disclosure Page 1","Bullet3"
'BIZ_Forms_Open "RegZ - LE"
'Set objData = FRM_DS_GetTestData("Forms_RegZ-LE", "SetConstruction", "1352_ConstrPerm_LEandCD_A783")
'GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=l_1176"), FRM_DS_GetValue(objData, "1176_Period")
'BIZ_Loan_Save
BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-784","TC_6 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

'Navigate to Pipeline>>Cretae New Blank loan
BIZ_Pipeline_SelectLoanFolder "My Pipeline"
BIZ_Loan_AddNewBlankLoan()

'Create Construction Permanent Loan(ARM) 
BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A784"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A784"
BIZ_RegZ_LE_SetAdjustableRateMortgage "1352_ConstrPerm_LEandCD_A784"
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A784" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A784"
BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A784"

'Validate the Bullet 2 in Loan Terms Table Monthly Pricipal and Interest Section for ARM Interest loan
BIZ_ConstructionManagement_ARMLoan_LoanTermsTable_Bullet2Validate "1352_ConstrPerm_LEandCD_A784Validate","RegZ - LE","Loan Estimate Page 1"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-792","TC_8 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "1352_ConstrPerm_LEandCD_A792"

'Validate the Bullet 4 in MPI section of Loan terms Table
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet4Validate "1352_ConstrPerm_LEandCD_A792Validate","Loan Estimate Page 1"

'Validate the Bullet 4 in MPI section of Loan terms Table
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet4Validate "1352_ConstrPerm_LEandCD_A792Validate","Closing Disclosure Page 1"

BIZ_Loan_Exit False

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-902","TC_4 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

'Navigate to Pipeline>>New loan>>Borrower Summary Origination 
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "1003 Page 1"

'Create the Construction Permanent laon
BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A902"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A902"
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A902" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A902"
BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A902"

'Verify the MPI Bullet 4 in LEpage 1
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet4Validate "1352_ConstrPerm_LEandCD_A902Validate","Loan Estimate Page 1"

'Verify the MPI Bullet 4 in CDpage 1
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet4Validate "1352_ConstrPerm_LEandCD_A902Validate","Closing Disclosure Page 1"

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-798","TC_1 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

'Navigate to Pipeline>>New loan>>Borrower Summary Origination
'BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "1003 Page 1"

'Create the Construction Permanent laon
BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A798"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A798"
BIZ_Forms_Open "Construction Management"
'BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A798" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A798"
'BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A798"

'Set multiple period and validate the MPI Bullet 2 in LEpage 1
BIZ_ConstructionManagement_LoanTermsTable_DiffFrequencyPeriod_MPI_BulletsValidate "1352_ConstrPerm_LEandCD_A798Validate","Loan Estimate Page 1","Bullet1"

'Set Est loan and validate the MPI Bullet 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A798Validate","BFullLoan"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet1Validate "1352_ConstrPerm_LEandCD_A798Validate","Loan Estimate Page 1"

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-714","TC_3 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

'BIZ_Pipeline_SelectLoanFolder "My Pipeline"
'BIZ_Loan_AddNewBlankLoan()

'Create Construction Permanent Loan 
'BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A714"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A714"
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A714" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A714"
'BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A714"

'Set Est loan type and validate MPI Bullet 3 in LEPage1 and CD page 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A714Validate","AHalfLoan"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A714Validate", "Loan Estimate Page 1","EstLoan","FixedRate"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A714Validate", "Closing Disclosure Page 1","EstLoan","FixedRate"

'Set Est loan type and validate MPI Bullet 3 in LEPage1 and CD page 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A714Validate","BFullLoan"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A714Validate", "Loan Estimate Page 1","EstLoan","FixedRate"

'Set Period < 12 and validate MPI Bullet 3 in LEPage1 and CD page 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A714Validate","PeriodE12"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A714Validate","Loan Estimate Page 1","Period","FixedRate"

'Set Period = 12 and validate MPI Bullet 3 in LEPage1 and CD page 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A714Validate","InterestOnly"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet3Validate "1352_ConstrPerm_LEandCD_A714Validate","Loan Estimate Page 1","InterestOnly",""

BIZ_Loan_Exit False

'BIZ_Loan_Exit False
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-794","TC_2 Core: Construction-to-Perm Loans - Loan Terms table: Monthly Principal & Interest section", Null

BIZ_Pipeline_SelectLoanFolder "My Pipeline"
BIZ_Loan_AddNewBlankLoan()

'Create Construction Perm loan
BIZ_1003Page1_SetData "1352_ConstrPerm_LEandCD_A794"
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_LEandCD_A794"
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_SetBasicInfoDetails "1352_ConstrPerm_LEandCD_A794" 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_LEandCD_A794"
BIZ_ConstructionManagement_SetProjectDataDetails "1352_ConstrPerm_LEandCD_A794"

'Verify Bullets exist or not in LoanTerms table in MPI section
CM_LoanTermsTable_LEPage1_BulletVerify()

'Set Interest rate and validate the MPI Bullet 2 in LEpage 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A794Validate","InterestRate"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet2Validate "1352_ConstrPerm_LEandCD_A794Validate","Loan Estimate Page 1","InterestRate"

'Set multiple period and validate the MPI Bullet 2 in LEpage 1
BIZ_ConstructionManagement_LoanTermsTable_DiffFrequencyPeriod_MPI_BulletsValidate "1352_ConstrPerm_LEandCD_A794Validate","Loan Estimate Page 1","Bullet2"

'Set Est loan type and validate the MPI Bullet 2 in LEpage 1
BIZ_ConstructionManagement_RegZLE_SetInputData_ForLEpage1Validate "1352_ConstrPerm_LEandCD_A794Validate","BFullLoan"
BIZ_ConstructionManagement_LoanTermsTable_MPI_Bullet2Validate "1352_ConstrPerm_LEandCD_A794Validate","Loan Estimate Page 1","EstLoan"

BIZ_Loan_Exit False

BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "PTAC-1352_Purchase_LEandCD"
BIZ_2015Itemization_Set800Section "PTAC-1352_LoanTerms_LEandCD"

' Validate the Interest rate in LE Page 1 for Purchase type loan 		
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-906","TC #5 - CBIZ-3713; NEW Interest Rate Field - Field 19 does not = Construction to Perm - Loan Estimate (LE)", Null
BIZ_ConstructionManagement_Purchase_InterestRateValidate  "RegZ - LE","Loan Estimate Page 1","PTAC-1352_Purchase_LEandCD" 

' Validate the Interest rate in CD Page 1 for Purchase type loan 	
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-907","TC #6 - CBIZ-3713; NEW Interest Rate Field - Field 19 does not = Construction to Perm - Closing Disclosure (CD)", Null
BIZ_ConstructionManagement_Purchase_InterestRateValidate  "RegZ - CD","Closing Disclosure Page 1","PTAC-1352_Purchase_LEandCD" 

' Validate the Monthly Principal and Interest in LE Page 1 for Purchase type loan 
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-911","TC #10 - CBIZ-3713; Payment Amount [4085] using the New Interest Rate field - Field 19 does not = Construction to Perm - Closing Disclosure (CD)", Null
BIZ_ConstructionManagement_Purchase_MonthlyPrincipalandInterestValidate  "RegZ - CD","Closing Disclosure Page 1","PTAC-1352_Purchase_LEandCD" 

' Validate the Monthly Principal and Interest in LE Page 1 for Purchase type loan 
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-928","TC #9 - CBIZ-3713; Payment Amount [4085] using the New Interest Rate field - Field 19 does not = Construction to Perm - Loan Estimate (LE)", Null
BIZ_ConstructionManagement_Purchase_MonthlyPrincipalandInterestValidate  "RegZ - LE","Loan Estimate Page 1","PTAC-1352_Purchase_LEandCD"

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("title:=.*"), "PTAC-1352_ConstructionPerm_LEandCD"

' Validate the Interest rate and MPI in CD Page 1 for Construction type loan 	
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-915","TC #3 - CBIZ-3713; NEW Interest Rate Field - Field 19 = Construction to Perm AND Field 4084 is NOT TRUE - Closing Disclosure (CD)", Null
BIZ_ConstructionManagement_ConstructionPerm_InterestRateandMPI_Validate  "RegZ - CD","Closing Disclosure Page 1","PTAC-1352_ConstructionPerm_LEandCD" 

' Validate the Interest rate and MPI in LE Page 1 for Construction type loan 
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-926","TC #4 - CBIZ-3713; NEW Interest Rate Field - Field 19 = Construction to Perm AND Field 4084 is NOT TRUE - Loan Estimate (LE)", Null
BIZ_ConstructionManagement_ConstructionPerm_InterestRateandMPI_Validate  "RegZ - LE","Loan Estimate Page 1","PTAC-1352_ConstructionPerm_LEandCD" 

' Validate the Interest rate and MPI in CD Page 1 for Construction type loan(Full and Half) 
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-943","TC #7 - CBIZ-3713; Payment Amount [4085] using the New Interest Rate field - Field 19 = Construction to Perm AND Field 4084 is NOT TRUE- Closing Disclosure (CD)", Null
BIZ_ConstructionManagement_ConstructionPerm_FullandHalfLoan_MPI_Validate  "RegZ - CD","Closing Disclosure Page 1","PTAC-1352_ConstructionPerm_LEandCD"  

'Validate the Interest rate and MPI in LE Page 1 for Construction type loan(Full and Half) 
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-944","TC #8 - CBIZ-3713; Payment Amount [4085] using the New Interest Rate field - Field 19 = Construction to Perm AND Field 4084 is NOT TRUE- Loan Estimate (LE)", Null
BIZ_ConstructionManagement_ConstructionPerm_FullandHalfLoan_MPI_Validate  "RegZ - LE","Loan Estimate Page 1","PTAC-1352_ConstructionPerm_LEandCD" 


BIZ_Loan_Exit False
 

'====== To logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)

