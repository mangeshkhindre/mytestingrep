'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:
	'PTAC-180 Creation of New Title
	'PTAC-181 Verify edit of Title record once click on Edit icon
	'PTAC-182 Duplicate Title Record
	'PTAC-183 Delete Title record
	'PTAC-184 Rename Title record
	'PTAC-186 Verify Creation of a Title fee Details record
	'PTAC-187 Edit the Title Fee Details
	'PTAC-188 Delete the Title Fee Details
	'PTAC-190 Check auto population of title insurance value when Default Check for "purchase owner check" enabled
'@ Test Automation JIRA Task: PTAC-1011 Settings_TablesandFees_TitleInsurance_PurchaseDefaultCheck
'@ TestData:
	'01 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-190
	'02 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-190
	'03 Forms_BorrowerSummaryOrigination, SetProperty and PTAC-190
	'04 Forms_BorrowerSummaryOrigination, SetTransactionDetails and PTAC-190
	'05 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and PTAC-190  	                
	'06 Forms_1003, PageSetTitleDetails and PTAC-190
	'07 Forms_1003, 1003Page2 and PTAC-190 
	'08 Forms_1003, SetEmployment and PTAC-190 
	'09 Forms_2015Itemization,Set800Section and PTAC-190
	'10 Forms_RegZ-LE ,SetDisclosureInformation and  PTAC-190
	'11 Settings_TablesFees,EscrowFees and Title_TableDetails1
'@ Pre-conditions:
	'1. Go to Settings window > Tables and Fees > Title.
	'2. Title record with fee details for Purchase type should create. 
	'3. Create loan with borrower details 
'@ Description:  NA
'@ TestSteps:
	'1 Create the Title record - purchase from Grid under Title section
	'2 Click on Set AS button
	'3 Create a loan from Pipe line
	'4 Fill the Borrower summary - Origination
	'5 Enter all mandatory fields - purpose of loan, mortgage type, purchase price, Appraised value and save
	'6 Select " 2015 Itemization" form
	'7 Go to 1103  Owner Title insurance field
	'8 Click on Edit icon
	'9 Check value of Title insurance amount field is filled automatically with calculated value
    '10 Verify edit of Title record and Title Fees record  click on Edit icon
    '11 Duplicate Title Record
    '12 Rename Title record
    '13 Delete Title record    
'@ ExpectedResult:
	'1 Selected Title record kept as Default and Red mark color tick populate in Default column
	'2 Loan file is saved with all field values
	'3 Pop- up Message display as " Default- Title table" will be used for Calculation
	'7 Amount is auto populated based on Title Fee details range & Factor value of Sales Price with below formula
		'Sales Price/Purchase= 200000
		'nearest $100
		'with offset $ 10
		'factor= 0.04%(0.0004)
		'Base $350
		' Cal:(200000 * 0.004)+350 = 430
	'10 Title Fees Record and Title Record Edited
    '11 Title Record Duplicated
    '12 Title Record Renamed
    '13 Title Record and Title Fees Record Deleted
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID="PTAC-190"
strRowID2="Title_TableDetails1"

FRM_Logger_ReportStepEvent "Scenario #2: Verifying functionality of Create, Edit, Duplicate, Delete of New Title and Purchase Title Fee Default Check","Validate functionality of Create, Edit, Duplicate, Delete of New Title and Purchase Title Fee Default Check", Null
FRM_Logger_ReportStepEvent "Test Case #1: Verifying functionality of Create of New Title and Purchase Title Fee Default Check","Validate functionality of Create of New Title and Purchase Title Fee Default Check", Null

'====== Navigate to Encompass->Settings and  Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Title"

'====== Create Title Fee Record  and Set Created Escrow as Default Close Settings ======
strTitleFeeRec = BIZ_Settings_TablesandFees_CreateFeesRecord(strRowID2)
BIZ_Settings_TablesandFees_VerifyEscrowFeesDetails strTitleFeeRec,strRowID2
BIZ_TablesFees_SetTitleFeesAsDefault(strTitleFeeRec)
BIZ_Settings_TablesandFees_FeesRecord_ExistingRecordNameValidation(strRowID2)
BIZ_Settings_ClickClose()
       
'====== Create Loan ======
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

'====== Purchase Title Fee Default Check and 1103Owner TitleFee Validation  ======
BIZ_Itemization2015_1103PurchaseTitleFee_OwnerTitleInsuranceValidation strTitleFeeRec,strRowID,strRowID2
BIZ_Loan_Exit False

'====== 'Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Title"

'====== 'Edit of Title Fee Details ======
FRM_Logger_ReportStepEvent "Test Case #2: Verifying editing of Title Record","Validate editing of Title Record", Null
strEditRecord = BIZ_Settings_TablesandFees_EditEscrowRecord(strTitleFeeRec,strRowID2)

'====== 'Duplicate a Title Fee Details ======
FRM_Logger_ReportStepEvent "Test Case #3: Verifying duplicating of Title Record","Validate duplicating of Title Record", Null
strDuplicateEscrow = BIZ_Settings_TablesandFees_DuplicateEscrowRecord(strEditRecord,strRowID2)

'====== 'Verify Rename a Title Record ======
FRM_Logger_ReportStepEvent "Test Case #4: Verifying renaming of Title Record","Validate renaming of Title Record", Null
strRenameEscrow = BIZ_Settings_TablesandFees_RenameEscrowRecord(strDuplicateEscrow,strRowID2)

'====== 'Verify Delete a Title Fee Details Record ======
FRM_Logger_ReportStepEvent "Test Case #5: Verifying deltion of Title Record","Validate deletion of Title Record", Null
BIZ_Settings_TablesandFees_DeleteEscrowRecord strRenameEscrow

'====== 'Due to Record pre selection,we are closed settins and reopened ======
BIZ_Settings_ClickClose()
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Title"
BIZ_Settings_TablesandFees_DeleteEscrowRecord strEditRecord
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
