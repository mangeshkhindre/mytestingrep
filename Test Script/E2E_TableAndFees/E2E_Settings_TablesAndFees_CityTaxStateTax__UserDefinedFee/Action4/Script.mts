'@******************************************************************************************
'@ TestStory:PTAC-899 Tables and fees
'@ TestCase:
   '1 PTAC-236 Verify creation of New State Tax record
   '2 PTAC-237 Verify Edit of State Tax record
   '3 PTAC-238 Verify Delete of State Tax record
   '4 PTAC-239 Verify State tax amount field (1205)value auto populated based on selction of State tax record
'@ Test Automation JIRA Task: PTAC-1037 Settings_TablesandFees_StateTax_Check
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
    '11 Settings_TablesFees, TaxRecord and State_Tax_Record
'@ Pre-conditions:
	'1 Go to Settings window > Tables and Fees >  State tax 
	'2 Created State Tax record. 
	'3 Create a loan till 1003 Page3
'@ Description:  NA
'@ TestSteps:
   '1 Create State Tax record
   '2 Close Settings window.
   '3 Create a loan with 1003 Page 3
   '4 Go to 2015 Itemization Form
   '5 Go to Govt. Recording and Transfer charges
   '6 Click Lookup Value icon in 1205 line.
   '7 Select a State Tax.
   '8 Click Select button after population of already created State tax records
   '9 Check the value populated automatically based on formula in State Tax record
   '10 Edit State Tax Record
   '11 Delete State tax Record
'@ ExpectedResult: 
   '1 State Tax Record Created
   '9 system should create new tax record
   'System populates selected State Tax name
   'Amount ($751/-)in separate fields
   'purchase Price- 300000
   'Rate %= 0.25%
   'Additional Flat Rate - 1
   'then State tax is $751
   '10 State Tax Record Edited
   '11 State tax Record Deleted
'********************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID="PTAC-239"
strRowID2="State_Tax_Record"
strTaxType="StateTax"

FRM_Logger_ReportStepEvent "Scenario #2 : Verify the functionality of Create, Edit, Delete for State Tax Record and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of State Tax Record and Loan Re-Enforcement",Null
FRM_Logger_ReportStepEvent "Test Case #1 : Verify the functionality of Create Record for State Tax and Loan Re-Enforcement" ,"Validate Creation, Editing, Deletion of State Tax Record and Loan Re-Enforcement",Null

'====== Navigate to Encompass->Settings ==='Go to Tables and Fees->Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "State Tax"
'====== 'Create State Tax Record of Purchase  ======
strTaxRecord=BIZ_Settings_TablesandFees_TaxRecord_Creation (strRowID2, strTaxType) 
BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Create"
BIZ_Settings_ClickClose()

'====== 'Create a new Loan ======  
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

'====== 'StateTax Amount Validation ======   
BIZ_Settings_TablesandFees_SelectTaxRecord strTaxRecord,strTaxType
BIZ_Settings_TablesandFees_TaxAmountValidation strTaxRecord,strRowID,strRowID2,strTaxType

'====== 'Close Loan Form ======
BIZ_Loan_Exit False

''====== Navigate to Encompass->Settings and Go to Tables and Fees->State Tax ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "State Tax"

'====== 'Edit State Tax Record ======
FRM_Logger_ReportStepEvent "Test Case #2 : Verify the functionality of Edit Record for State Tax","Validate Editing of State Tax Record",Null
BIZ_Settings_TablesAndFees_TaxRecord_Edit strRowID2,strTaxRecord,strTaxType
BIZ_Settings_TablesandFees_ValidateTaxRecord strRowID2, strTaxType,strTaxRecord,"Edit"

'====== 'Delete State Tax Record ======
FRM_Logger_ReportStepEvent "Test Case #3 : Verify the functionality of Delete Record for State Tax","Validate Deletion of State Tax Record",Null
BIZ_Settings_TablesAndFees_TaxRecord_Delete strTaxRecord,strTaxType
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
