'@**************************************************************************************************
'@ TestStory: PTAC-1633 Re-Enforcement Tables & Fees
'@ TestCase:
	'1 PTAC-1620 Verify MI data in Amortization schedule for Other loan
'@ Test Automation JIRA Task: PTAC-1637 E2E_Settings_TablesAndFees_MIData_OtherLoan
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination  SetHeadInfo and PTAC-1620
    '2 Forms_BorrowerSummaryOrigination  SetBorrower and PTAC-1620
    '3 Forms_BorrowerSummaryOrigination  SetProperty and PTAC-1620
	'4 Forms_BorrowerSummaryOrigination  SetTransactionDetails and PTAC-1620
	'5 Forms_BorrowerSummaryOrigination  SetSSNVerificationBorrower and PTAC-1620  	                
    '6 Forms_1003 PageSetTitleDetails and PTAC-1620
    '7 Forms_1003 1003Page2 and PTAC-1620 
	'8 Forms_1003 SetEmployment and PTAC-1620 
    '9 Settings_TablesFees,MITable and "CBIZ2974_MITable2"
'@ Pre-conditions: 
   '1 Login into the Encompass with Admin user.   
'@ Description:  NA
'@ TestSteps:
	'1 Go to settings->Tables and Fees
	'2 Go to Other Tab,Click New button.
	'3 Click create button. Add the fields and values as per test data,Click ok button
	'4 Close Settings
	'5 Go to Pipeline tab, Create a new blank loan as per test data(Loan Type Other)
	'6 Go to 1003 Page 1 and click on MIP/FF icon
	'7 Click Get MI.Verify that MI table created in MI Fee table is applied.
	'8 Go to Tools,select Amortization schedule and verify the data in MI Column      
'@ ExpectedResult:
	'3 The entry should be added and new MI Fee should be created
	'4 Settings Closed
	'5 A New Other type Loan is created  and details populated in the 'Borrower Summary Origination' form.
	'6 MIP fee calculation pop up message should be open.
	'7 Fees should be applied.
	'8 Values should be populated as below
		'For 1st 24 months-84.17
		'For 25th to 48th-168.33       
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID="PTAC-1620"
strRowID2="MItable_Other"

FRM_Logger_ReportStepEvent "Test Scenario #4: Verify Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for Other Loan" ,"Validate Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for Other Loan", Null
FRM_Logger_ReportStepEvent "Test Case #1: Create new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for Other Loan" ,"Creating new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for Other Loan", Null
'====== Navigate to Encompass->Settings and Go to Tables and Fees->MI Tablec ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"

'====== 'Go to Tables and Fees->MI Scenario ======
FRM_Logger_ReportInfoEvent "Start create new scenario MI table having single record for Other Loan" ,"Started carating new scenario MI table having single record for Other Loan", Null	
BIZ_TablesAndFees_SelectMITableConvTab strRowID2,"Other"
strScenarioName=BIZ_TablesAndFees_CreateMITableSecnario(strRowID2,"Other")
BIZ_TablesAndFees_Verify_MIScenarioData strScenarioName,strRowID2
BIZ_Settings_ClickClose()

'====== 'Create Conventional Loan' ======
FRM_Logger_ReportInfoEvent "Start creat new FHA Loan" ,"Started creating new Other Loan", Null
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
BIZ_TableandFees_SelectMIDetailPage_GetMIPDetails strRowID2,strScenarioName
BIZ_TablesAndFees_SetMIPFundingGuaranteeValue(strRowID2)
BIZ_TableandFees_MIFF_AmountAutoPopulate_Verify_ConventionalLoanRecord strRowID2
BIZ_TableandFees_MIFF_AmountAutoPopulate_ConventionalLoanAmountValidation strRowID,strRowID2
'====== 'Validate  MI data in Amortization schedule ==============================
FRM_Logger_ReportInfoEvent "Verify MI data in Amortization Schedule for Other Loan" ,"Validate MI data in Amortization Schedule for Other Loan", Null
BIZ_Tools_ShowInOrder()
BIZ_Tools_Open("Amortization Schedule")
BIZ_Settings_TablesandFees_AmortizationSchedule_VerifyMIValues(strRowID2)
'BIZ_BIZ_Loan_Save
BIZ_Loan_Exit False

'====== Create Edit MITable Record for FHa tab ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"
BIZ_TablesAndFees_SelectMITableConvTab strRowID2,"Other"

'======  Edit MITable Record for Other tab ======
FRM_Logger_ReportStepEvent "Test Case #2 Start Edit MI Table Record and validate" ,"Started Editing MI Table Record and validating", Null	
strEdittedScenario = BIZ_TablesAndFees_EditMITableData (strScenarioName , strRowID2)
BIZ_TablesAndFees_Verify_MIScenarioData strEdittedScenario,strRowID2

'====== Create Duplicate MITable Record for Other tab ======
FRM_Logger_ReportStepEvent "Test Case #3 Start duplicate MI Table Record and validate" ,"Started duplicating MI Table Record and validating", Null
strDuplicateScenario = BIZ_TablesAndFees_DuplicateMITableData (strEdittedScenario, strRowID2)
BIZ_TablesAndFees_Verify_MIScenarioData strDuplicateScenario,strRowID2

'====== Delete MI Table Record for Other tab ======
FRM_Logger_ReportStepEvent "Test Case #4 Start delete MI Table Record and validate" ,"Started deleting MI Table Record and validating", Null
BIZ_TablesAndFees_DeleteMITableRecord  strDuplicateScenario
BIZ_TablesAndFees_DeleteMITableRecord  strEdittedScenario
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

