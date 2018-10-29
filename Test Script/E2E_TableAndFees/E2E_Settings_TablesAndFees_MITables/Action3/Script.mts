'@**************************************************************************************************
'@ TestStory: PTAC-1633 Re-Enforcement Tables & Fees
'@ TestCase:
	'1 PTAC-1616 Verify MI data in Amortization schedule for FHA loan
'@ Test Automation JIRA Task: PTAC-1631 E2E_Settings_TablesandFees_MIData_FHALoan
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination  SetHeadInfo and PTAC-1616
    '2 Forms_BorrowerSummaryOrigination  SetBorrower and PTAC-1616
    '3 Forms_BorrowerSummaryOrigination  SetProperty and PTAC-1616
	'4 Forms_BorrowerSummaryOrigination  SetTransactionDetails and PTAC-1616
	'5 Forms_BorrowerSummaryOrigination  SetSSNVerificationBorrower and PTAC-1616  	                
    '6 Forms_1003 PageSetTitleDetails and PTAC-1616
    '7 Forms_1003 1003Page2 and PTAC-1616 
	'8 Forms_1003 SetEmployment and PTAC-1616 
    '9 Settings_TablesFees,MITable and "PTAC-1616_2"
'@ Pre-conditions: 
   '1 Login into the Encompass with Admin user.   
'@ Description:  NA
'@ TestSteps:
	'1 Go to settings->Tables and Fees
	'2 Go to FHA Tab,Click New button.
	'3 Click create button. Add the fields and values as per test data,Click ok button
	'4 Close Settings
	'5 Go to Pipeline tab, Create a new blank loan as per test data(Loan Type FHA)
	'6 Go to 1003 Page 1 and click on MIP/FF icon
	'7 Click Get MI.Verify that MI table created in MI Fee table is applied.
	'8 Go to Tools,select Amortization schedule and verify the data in MI Column  
 '9 Check the values auto populated for below fields
		'1st Premium @ 2.0%
		'1st MI % = .550 @ 120 months
		'2nd MI %= .250 @ 240 months
		'Cancel @ 50%
   '10 Edit MI Scenario Record Under FHA Tab
   '11 Duplicate MI Scenario Record Under FHA Tab
   '12 Delete MI Scenario Record Under FHA Tab	
'@ ExpectedResult:
	'3 The entry should be added and new MI Fee should be created
	'4 Settings Closed
	'5 A New FHA type Loan is created  and details populated in the 'Borrower Summary Origination' form.
	'6 MIP fee calculation pop up message should be open.
	'7 Fees should be applied.
	'8 Values should be populated as below
		'For 1st 24 months-84.17
		'For 25th to 48th-168.33   
	'9 System auto populates the calculated MI values under below fields and total amount in MIP/FF field
		'Calculation:
		'(Loan amount * 1st Premium)/100)
     	'E.g (150000*2)/100=3000
   '10 MI Scenario Record Edited 	
   '11 MI Scenario Record Duplicated
   '12 MI Scenario Record Deleted 		
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID="PTAC-1616"
strRowID1="MItable_FHA"  

FRM_Logger_ReportStepEvent "Test Scenario #2: Verify Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for FHA Loan" ,"Validate Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for FHA Loan", Null
FRM_Logger_ReportStepEvent "Test Case #1: Create new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for FHA Loan" ,"Creating new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for FHA Loan", Null
'====== Navigate to Encompass->Settings and Go to Tables and Fees->MI Tablec ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"

FRM_Logger_ReportInfoEvent "Start create new scenario MI table having single record for FHA Loan" ,"Started carating new scenario MI table having single record for FHA Loan", Null	
BIZ_TablesAndFees_SelectMITableConvTab strRowID1,"FHA"
strScenarioName=BIZ_TablesAndFees_CreateMITableSecnario(strRowID1,"FHA")
BIZ_Settings_ClickClose()

'====== 'Create Conventional Loan' ======
FRM_Logger_ReportInfoEvent "Start creat new FHA Loan" ,"Started creating new FHA Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"  							
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_1003Page1_SetEmployment strRowID
BIZ_1003Page1_SetTitleDetails strRowID
BIZ_BorrowerSummaryOrigination_SetProperty_EstateWillBeHeldIn strRowID

'====== 'Validate auto populate the calculated amount in MIP/FF field and GuaranteeFee Calculation  ===================
FRM_Logger_ReportInfoEvent "Verify MI Fee table is applied and auto populate the calculated amount in MIP/FF field" ,"Validate MI Fee table is applied and auto populate the calculated amount in MIP/FF field", Null
BIZ_TableandFees_SelectMIDetailPage_GetMIPDetails strRowID1,strScenarioName
BIZ_TablesAndFees_Verify_MIPFundingGuaranteeValue()
BIZ_TableandFees_MIFF_AmountAutoPopulate_Verify_ConventionalLoanRecord strRowID1
BIZ_TableandFees_MIFF_AmountAutoPopulate_ConventionalLoanAmountValidation strRowID,strRowID1
'====== 'Validate  MI data in Amortization schedule ==============================
FRM_Logger_ReportInfoEvent "Verify MI data in Amortization Schedule for FHA Loan" ,"Validate MI data in Amortization Schedule for FHA Loan", Null
BIZ_Tools_ShowInOrder()
BIZ_Tools_Open("Amortization Schedule")
BIZ_TablesandFees_AmortizationSchedule_VerifyFHAMIValues strRowID1
'BIZ_BIZ_Loan_Save
BIZ_Loan_Exit False

'====== Create Edit MITable Record for FHa tab ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"
BIZ_TablesAndFees_SelectMITableConvTab strRowID1,"FHA"

FRM_Logger_ReportStepEvent "Test Case #2 Start Edit MI Table Record and validate" ,"Started Editing MI Table Record and validating", Null	
strEdittedScenario = BIZ_TablesAndFees_EditMITableData (strScenarioName , strRowID1)

'====== Create Duplicate MITable Record for FHA tab ======
FRM_Logger_ReportStepEvent "Test Case #3 Start duplicate MI Table Record and validate" ,"Started duplicating MI Table Record and validating", Null
strDuplicateScenario = BIZ_TablesAndFees_DuplicateMITableData (strEdittedScenario, strRowID1)

'====== Delete MI Table Record for FHA tab ======
FRM_Logger_ReportStepEvent "Test Case #4 Start delete MI Table Record and validate" ,"Started deleting MI Table Record and validating", Null
BIZ_TablesAndFees_DeleteMITableRecord  strDuplicateScenario
BIZ_TablesAndFees_DeleteMITableRecord  strEdittedScenario
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
