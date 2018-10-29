'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:
	'01 PTAC-169 Verify Creation of a new Escrow Record
	'02 PTAC-170 Verify Edit a Escrow Record
	'03 PTAC-171 Duplicate a Escrow Record
	'04 PTAC-172 Delete a Escrow Record
	'05 PTAC-175 Creation of a New Escrow fee details
	'06 PTAC-176 Edit of Escrow Fee Details
	'07 PTAC-178 Setting the Created Escrow as Default Check
	'08 PTAC-546 Verify Delete a Escrow Fee Details Record
	'09 PTAC-545 Verify Rename a Escrow Record
'@ Test Automation JIRA Task: PTAC-1010 Settings_TablesandFees_CreateEscrow_DefaultCheck 
'@ TestData:
    '01 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-178
    '02 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-178
    '03 Forms_BorrowerSummaryOrigination, SetProperty and PTAC-178
	'04 Forms_BorrowerSummaryOrigination, SetTransactionDetails and PTAC-178
	'05 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and PTAC-178  	                
    '06 Forms_1003, PageSetTitleDetails and PTAC-178
    '07 Forms_1003, 1003Page2 and PTAC-178 
	'08 Forms_1003, SetEmployment and PTAC-178 
    '09 Forms_2015Itemization,Set800Section and PTAC-178
    '10 Forms_RegZ-LE ,SetDisclosureInformation and  PTAC-178
    '11 Settings_TablesFees,EscrowFees and Escrow_TableDetails1
'@ Pre-conditions: 
	'01 Go to Settings window > Tables and Fees > Escrow
	'02 Create a Escrow Fee record 
'@ Description:  NA
'@ TestSteps:
   '01 Select the Escrow record from Grid under Escrow section
   '02 Click on Set AS button
   '03 Create a loan from Pipe line
   '04 Fill the Borrower summary - Origination
   '05 Enter all mandatory fields - purpose of loan, mortgage type, purchase price, Appraised value 
   '06 Select " 2015 Itemization" form
   '07 Go to 1102 Settlement closing fee section
   '08 select the Escrow fee field
   '09 Click on Edit icon
   '10 Check value of Escrow amount field is filled automatically with calculated value
   '11 Edit of Escrow Fee Details
   '12 Duplicate a Escrow Fee Details
   '13 Rename Escrow Record
   '14 Delete a Escrow Fee Details Record
'@ ExpectedResult:
   '01 Selected Escrow record  Created kept as Default  
   '10 Amount is auto populated based on Escrow Fee details range & Factor value of Sales Price
   '11 Edit of Escrow Fee Record 
   '12 Duplicated of Escrow Fee Record 
   '13 Escrow Record Renamed 
   '14 Deleted of Escrow Fee Record 
'********************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID  = "PTAC-178"
strRowID2 = "Escrow_TableDetails1"

FRM_Logger_ReportStepEvent "Scenario #3: Verifying functionality of Create, Edit, Duplicate and Delete of Escrow Record and Escrow Fee Details and Loan Re-Enforcement","Validate functionality of Create, Edit, Duplicate and Delete of Escrow Record and Escrow Fee Details and Loan Re-Enforcement", Null
FRM_Logger_ReportStepEvent "Test Case #1: Verifying functionality of Create of Escrow Record and Escrow Fee Details and Loan Re-Enforcement","Validate functionality of Create of Escrow Record and Escrow Fee Details and Loan Re-Enforcement", Null
'====== Navigate to Encompass->Settings and ====== Go to Tables and Fees->Escrow ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Escrow"

'====== Create Escrow Table with fees and Fee Details Verify ======
FRM_Logger_ReportInfoEvent "Start create a new Escrow Record and Escrow Fee details" ,"Started creating a new Escrow Record and Escrow Fee details", Null
strTableNameActual = BIZ_Settings_TablesandFees_CreateFeesRecord(strRowID2)
BIZ_Settings_TablesandFees_VerifyEscrowFeesDetails strTableNameActual,strRowID2
'====== Set Created Escrow as Default Close Settings ======
BIZ_TablesFees_SetTitleFeesAsDefault strTableNameActual
BIZ_Settings_ClickClose()

'================ Create Loan ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"  							
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_1003Page1_SetEmployment strRowID
BIZ_1003Page1_SetTitleDetails strRowID
BIZ_BorrowerSummaryOrigination_SetProperty_EstateWillBeHeldIn(strRowID)
BIZ_1003Page2_SetMonthlyIncomeExpensesData strRowID
BIZ_Forms_Open "2015 itemization"
BIZ_2015Itemization_Set800Section strRowID
'====== Validation of Escrow Table Default Check and Fee ======
BIZ_Itemization2015_1102EscrowFeeDefaultTableAndFeeValidation strRowID,strRowID2,strTableNameActual
BIZ_Loan_Exit False

'====== Go to Tables and Fees->Escrow ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Escrow"

'====== Edit of Escrow Fee Details ======
FRM_Logger_ReportStepEvent "Test Case #2: Verifying editing of Escrow Record and Escrow Fee Details","Validate editing of Escrow Record and Escrow Fee Details", Null
strEditRecord = BIZ_Settings_TablesandFees_EditEscrowRecord(strTableNameActual,strRowID2)

'====== Duplicate a Escrow Fee Details ======
FRM_Logger_ReportStepEvent "Test Case #3: Verifying duplicating of Escrow Record and Escrow Fee Details","Validate duplicating of Escrow Record and Escrow Fee Details", Null
strDuplicateEscrow = BIZ_Settings_TablesandFees_DuplicateEscrowRecord(strEditRecord,strRowID2)

'====== Verify Rename a Escrow Record ======
FRM_Logger_ReportStepEvent "Test Case #4: Verifying renaming of Escrow Record and Escrow Fee Details","Validate renaming of Escrow Record and Escrow Fee Details", Null
strRenameEscrow = BIZ_Settings_TablesandFees_RenameEscrowRecord(strDuplicateEscrow,strRowID2)

'====== Verify Delete a Escrow Fee Details Record ======
FRM_Logger_ReportStepEvent "Test Case #4: Verifying deletion of Escrow Record and Escrow Fee Details","Validate deletion of Escrow Record and Escrow Fee Details", Null
BIZ_Settings_TablesandFees_DeleteEscrowRecord strRenameEscrow

'====== Due to Record pre selection,we are closed settins and reopened ======
BIZ_Settings_ClickClose()
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Escrow"
BIZ_Settings_TablesandFees_DeleteEscrowRecord strEditRecord
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
