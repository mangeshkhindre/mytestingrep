'@******************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:PTAC-191
'@ Test Automation JIRA Task: PTAC-1012 Settings_TableAndFees_TitleInsuranceValue_DefaultCheckRefinance
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination  SetHeadInfo,SetBorrower,SetProperty,SetTransactionDetails,SetCreditInformation,SetSSNVerificationBorrower PTAC-191
	'2 Forms_1003 PageSetTitleDetails,1003Page2,SetEmployment PTAC-191
	'3 Forms_2015Itemization","Set800Section PTAC-191
	'4 Forms_RegZ-LE",SetDisclosureInformation PTAC-191
	'5 Settings_TablesFees,TitleFees,CBIZ2974_TitleFees7
'@ Pre-conditions: 
   '1 Go to Settings window > Tables and Fees > Title.
   '2 Title record with fee details for Refinance type should create 
   '3 Create loan with borrower details 
'@ Description:  NA
'@ TestSteps:
   '1 Select the Title record - Refinance from Grid under Title section
   '2 Click on Set AS button
   '3 Create a loan from Pipe line
   '4 Fill the Borrower summary - Origination
   '5 Enter all mandatory fields - purpose of loan, mortgage type, purchase price, Appraised value and save
   '6 Select " 2015 Itemization" form
   '7 Go to 1103  Owner Title insurance field
   '8 Click on Edit icon
   '9 Check value of Title insurance amount field is filled automatically with calculated value		
'@ ExpectedResult:
   '1 Selected Title record kept as Default and Red mark color tick populate in Default column
   '2 Loan file is saved with all field values
   '3 Pop- up Message display as " Default- Title table" will be used for Calculation
   '4 Amount is auto populated based on Title Fee details range & Factor value of Sales Price with below formula
	 'Title Table: "Refinance Owner 
	 'Sales Price/Purchase= 200000
	 'nearest $100
	 'with offset $ 10
	 'factor= 0.04%(0.0004)
	 'Base $350
	 'Cal:(200000 * 0.004)+350 = 430
'********************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

strRowID="PTAC-191"
strRowID2="PTAC-191_1"

FRM_Logger_ReportStepEvent "Scenario #1: Verifying auto Popup of Title Insurance value when Default Check for 'Refinance Owner Check' enabled" ,"Validating auto Popup of Title Insurance value when Default Check for 'Refinance Owner Check' enabled", Null
'====== Navigate to Encompass->Settings and 'Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Title"
'====== 'Create Create Title Fees Refinance  ======
strTitleFeeRec=BIZ_TablesFees_CreateTitleFees(strRowID2)

'====== 'Set Created Title Fee set as Default and  Close Settings ====== 
BIZ_TablesFees_SetTitleFeesAsDefault(strTitleFeeRec)
BIZ_Settings_ClickClose()

'====== 'Create Loan ======
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
	
'====== 'Ttile of Refinance Default Check and Fee Validation  ======
BIZ_Itemization2015_1103RefinanceTitleFee_OwnerTitleInsuranceValidation strTitleFeeRec,strRowID,strRowID2 
BIZ_Loan_Exit False

'====== Navigate to Encompass->Settings and 'Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Title"
'====== 'Delete  Created Title Fees Refinance  ======
BIZ_Settings_TablesandFees_DeleteEscrowRecord strTitleFeeRec
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
