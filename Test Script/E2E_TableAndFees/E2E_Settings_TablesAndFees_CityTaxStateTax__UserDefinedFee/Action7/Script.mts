'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:
	'1 PTAC-230 Verify creation of New City Tax record
	'2 PTAC-231 Verify Edit of City Tax record
	'3 PTAC-232 Verify Delete of City Tax record
	'4 PTAC-233 Verify City tax amount field (1204)auto populated based on selction of City tax record
'@ Test Automation JIRA Task: PTAC-1052 ,Settings_TablesandFees_CityTax_Check
'@ TestData:
	'1 Forms_BorrowerSummaryOrigination,  SetHeadInfo and PTAC-233
    '2 Forms_BorrowerSummaryOrigination,  SetBorrower and PTAC-233
    '3 Forms_BorrowerSummaryOrigination,  SetProperty and PTAC-233
	'4 Forms_BorrowerSummaryOrigination,  SetTransactionDetails and PTAC-233
	'5 Forms_BorrowerSummaryOrigination,  SetSSNVerificationBorrower and PTAC-233  	                
    '6 Forms_1003, PageSetTitleDetails and PTAC-233
    '7 Forms_1003, 1003Page2 and PTAC-233 
	'8 Forms_1003, SetEmployment and PTAC-233 
    '9 Forms_2015Itemization,Set800Section and PTAC-233
    '10 Forms_RegZ-LE ,SetDisclosureInformation and  PTAC-233
    '11 Settings_TablesFees,TaxRecord and City_Tax_Record
'@ Pre-conditions:
	'1 Go to Settings window > Tables and Fees >  City tax 
	'2 Created City Tax record 
	'3 Create a loan till 1003 Page3
'@ Description: NA
'@ TestSteps:
   '1 Create City Tax record
   '2 Close Settings window
   '3 Create a loan with 1003 Page 3
   '4 Go to 2015 Itemization Form
   '5 Go to Govt. Recording and Transfer charges
   '6 Click Lookup Value icon in 1204 line
   '7 Select a City Tax
   '8 Click Select button after population of already created City tax records
   '9 Check the value populated automatically based on formula in City Tax record
   '10 Edit of City Tax record
   '11 State Tax Record Delete
'@ ExpectedResult: 
   '9 System populates selected city Tax name
	   'Amount ($751/-)in separate fields
	   'purchase Price- 300000
	   'Rate %= 0.25%
	   'Additional Flat Rate - 1
	   'City tax is 751/-
   '10  State Tax Record Edited and Verified
   '11 State Tax Record Deleted and Verified
 '***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

strRowID="PTAC-233"
strRowID2="City_Tax_Record"
strTaxType="CityTax"

FRM_Logger_ReportStepEvent "Scenario #1 : Verify the functionality of Create, Edit, Delete for City Tax Record and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of City Tax Record and Loan Re-Enforcement",Null
FRM_Logger_ReportStepEvent "Test Case #1 : Verify the functionality of Create Record for City Tax and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of City Tax Record and Loan Re-Enforcement",Null
'====== Navigate to Encompass->Settings and '====== 'Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "City Tax"
'=========== Create City Record =======================
strTaxRecord=BIZ_Settings_TablesandFees_TaxRecord_Creation (strRowID2, strTaxType)
BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Create"
BIZ_Settings_ClickClose()

'=============================== 'Create Loan ======================
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

'====== 'City tax amount field (1204)auto populated based on selction of City tax record  ======
BIZ_Settings_TablesandFees_SelectTaxRecord strTaxRecord,strTaxType
BIZ_Settings_TablesandFees_TaxAmountValidation strTaxRecord,strRowID,strRowID2,strTaxType

'====== Close Loan Form ======
BIZ_Loan_Exit False

''====== Navigate to Encompass->Settings and '====== 'Go to Tables and Fees->State Tax ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "City Tax"

'====== Edit City Tax Record ======
FRM_Logger_ReportStepEvent "Test Case #2 : Verify the functionality of Edit Record for City Tax","Validate Editing of City Tax Record",Null
BIZ_Settings_TablesAndFees_TaxRecord_Edit strRowID2,strTaxRecord,strTaxType
BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Edit"

'====== Delete City Tax Record ======
FRM_Logger_ReportStepEvent "Test Case #3 : Verify the functionality of Delete Record for City Tax","Validate Deletion of City Tax Record",Null
BIZ_Settings_TablesAndFees_TaxRecord_Delete strTaxRecord,strTaxType
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

