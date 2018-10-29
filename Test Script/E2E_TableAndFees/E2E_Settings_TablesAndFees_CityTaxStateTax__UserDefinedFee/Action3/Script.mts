'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:
    '1 PTAC-242 : Creating User Defined Fee Record 
    '2 PTAC-243 : Editting User Defined Fee Record
    '3 PTAC-244 : Deleting User Defined Fee Record
	'4 PTAC-245 : Verify User Defined Fee amount field (1206)value auto populated based on selction of User Defined Fee record
'@ Test Automation JIRA Task: PTAC-1039 Settings_TablesandFees_UserDefineFee_Check  
'@ TestData:
	'01 Forms_BorrowerSummaryOrigination,  SetHeadInfo and PTAC-245
    '02 Forms_BorrowerSummaryOrigination,  SetBorrower and PTAC-245
    '03 Forms_BorrowerSummaryOrigination,  SetProperty and PTAC-245
	'04 Forms_BorrowerSummaryOrigination,  SetTransactionDetails and PTAC-245
	'05 Forms_BorrowerSummaryOrigination,  SetSSNVerificationBorrower and PTAC-245  	                
    '06 Forms_1003, PageSetTitleDetails and PTAC-245
    '07 Forms_1003, 1003Page2 and PTAC-245 
	'08 Forms_1003, SetEmployment and PTAC-245 
    '09 Forms_2015Itemization, Set800Section and PTAC-245
    '10 Forms_RegZ-LE, SetDisclosureInformation and  PTAC-245
	'11 Settings_TablesFees, UserDefinedFee and  UserDefinedDataRowID  
'@ Pre-conditions:
	'1 Go to Settings window > Tables and Fees > User Defined Fee
	'2 Created User Defined Fee record 
	'3 Create a loan till 1003 Page3 	
'@ Description: Verify User Defined Fee amount field (1206)value auto populated based on selction of User Defined Fee record
'@ TestSteps:
	'1 Create User defined Fee record
	'2 Close Settings window.
	'3 Create a loan with 1003 Page 3
	'4 Go to 2015 Itemization Form
	'5 Go to Govt. Recording and Transfer charges
	'6 Click Lookup Value icon in 1204 line
	'7 Select a user define fee record
	'8 Check the value populated automatically based on formula in User defined Fee record
	'9 Editting User Defined Fee Record
	'10 Deleting User Defined Fee Record
'@ ExpectedResult:
	'8 System populates selected User Defined Fee name and Amount ($751/-)in 2 separate fields
	   'purchase Price- 300000
	   'Rate %= 0.25%
	   'Additional Flat Rate - 1
       'then User Defined Fee amount is 751/-
    '9  Edited and Verifed User Defined Fee Record
    '10 Delete and Verifed User Defined Fee Record     
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #3 : Verify the functionality of Create, Edit, Delete for User Define Fee Record and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of User Define Fee Record and Loan Re-Enforcement",Null
FRM_Logger_ReportStepEvent "Test Case #1 : Verify the functionality of Create Record for User Define Fee and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of User Define Fee Record and Loan Re-Enforcement",Null

strTaxType="UserDefinedFee"
strRowID="PTAC-245"
strRowID2="UserDefinedFee_Record"

'====== Go to Settings/'Tables and Fees'/User Defined Fee 
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "User Defined Fee"

strTaxRecord=BIZ_Settings_TablesandFees_TaxRecord_Creation(strRowID2,strTaxType)
BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Create"
BIZ_Settings_ClickClose()

'===============Create Loan=======================
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

'====== 'User Defined Fee amount field (1206)value auto populated based on selction of User Defined Fee record  ======
 BIZ_Settings_TablesandFees_SelectTaxRecord strTaxRecord,strTaxType
 BIZ_Settings_TablesandFees_TaxAmountValidation strTaxRecord,strRowID,strRowID2,strTaxType

'====== Close Loan Form ======
 BIZ_Loan_Exit False

'====== Navigate to Encompass->Settings and 'Go to Tables and Fees->User Defined Fee ======
 BIZ_Nav_OpenMenuItem "Encompass;Settings..."
 BIZ_Nav_HierarchyTree "Tables and Fees", "User Defined Fee"
 
 '====== Edit User Defined Fee Record ======
 FRM_Logger_ReportStepEvent "Test Case #2: Verify the functionality of Edit Record for User Defined Fee","Validate Editing of User Defined Fee Record",Null
 BIZ_Settings_TablesAndFees_TaxRecord_Edit strRowID2,strTaxRecord,strTaxType
 BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Edit"
 
 '====== Delete User Defined Fee Record ======
 FRM_Logger_ReportStepEvent "Test Case #3: Verify the functionality of Delete Record for User Defined Fee","Validate Deletion of User Defined Fee Record",Null
 BIZ_Settings_TablesAndFees_TaxRecord_Delete strTaxRecord,strTaxType
 BIZ_Settings_ClickClose()
 
 '===== To logout from Encompass =====
BIZ_Login_UserLogout()
