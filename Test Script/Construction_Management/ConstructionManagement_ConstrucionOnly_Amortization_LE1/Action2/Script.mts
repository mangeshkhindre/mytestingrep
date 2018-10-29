FRM_Logger_ReportStepEvent "Start Test Case- CBIZ-5596", "TC 1 - CBIZ-4696 - Construction Loans - Loan Product (LE1.X5) logic for Amortization Type - Fixed Rate", Null

'====== Set Borrower details in BSO form ======
BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "PTAC-1352_LEandCD_Amortization_Fixed"

'====== Set Disbursement period in RegZ_CD form ======
BIZ_RegZ_CD_SetData "PTAC-1352_LEandCD_Amortization_Fixed"

'====== Set Construction Period and Validate product for 6 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_6P"

'====== Set Construction Period and Validate product for 12 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_12P"

'====== Set Construction Period and Validate product for 14 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_13P"

'====== Set Construction Period and Validate product for 15 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_14P"

'====== Set Construction Period and Validate product for 24 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_24P"

'====== Set Construction Period and Validate product for 25 months in LE and CD form ======
ConstructionManagement_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_25P"

BIZ_Loan_Exit False


