'@**************************************************************************************************
'@ TestStory: 
'@ TestCase:
   '1 	
   '2 PTAC-171 Duplicate a Escrow Record
   '3 PTAC-172 Delete a Escrow Record
   '4 PTAC-545 Verify Rename a Escrow Record
   '5 PTAC-170 Verify Edit a Escrow Record
'@ Test Automation JIRA Task: 
'@ TestData: Settings_TablesFees, EscrowFees and Escrow_Table_Record
'@ Pre-conditions: 
'@ Description: Verify and Validate Create, Duplicate, Delete, Rename, Edit functonality of Escrow record 
'@ TestSteps:
   '1 Verify Creation of a new Escrow Record
   '2 Duplicate a Escrow Record
   '3 Delete a Escrow Record
   '4 Verify Rename a Escrow Record
   '5 Verify Edit a Escrow Record
'@ ExpectedResult:
   '1 New Escrow record to be created that populates in Escrow grid
   '2 Duplicate of newly created Esrow to be created that populates in Escrow grid
   '3 Newly created Escrow record to be deleted shouldn't exists in Escrow grid
   '4 Rename the newly created Escrow record ,that populates in Escrow grid
   '5 System should able to edit the existing created Escrow record
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case-CBIZ-5599", "TC 1 - CBIZ-4696 - Construction Loans - Loan Product (LE1.X5) logic for Amortization Type - Fixed Rate", Null

'====== Set Borrower details in BSO form ======
BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "PTAC-1352_LEandCD_Amortization_ARM"

'====== Set Disbursement period in RegZ_CD form ======
BIZ_RegZ_CD_SetData "PTAC-1352_LEandCD_Amortization"

'====== Set Construction Period and Validate product for 6 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_6P"

'====== Set Construction Period and Validate product for 12 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_12P"

'====== Set Construction Period and Validate product for 14 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_13P"

'====== Set Construction Period and Validate product for 14 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_14P"

'====== Set Construction Period and Validate product for 15 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_15P"

'====== Set Construction Period and Validate product for 17 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_17P"

'====== Set Construction Period and Validate product for 24 months in LE and CD form ======
ConstructionManagement_ARM_LEandCD_SetConstructionPeriod_ValidateProduct "PTAC-1352_LEandCD_Amortization_24P"


BIZ_Loan_Exit False
