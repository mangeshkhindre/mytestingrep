'@**************************************************************************************************
'@ TestStory: PTAC-1633 Re-Enforcement Tables & Fees
'@ TestCase:
    '1 PTAC-1614 Verify MI data in Amortization schedule for Conventional  loan
'@ Test Automation JIRA Task: PTAC-1629 Settings_TablesandFees_MIData_ConventionalLoan
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination  SetHeadInfo and PTAC-1614
    '2 Forms_BorrowerSummaryOrigination  SetBorrower and PTAC-1614
    '3 Forms_BorrowerSummaryOrigination  SetProperty and PTAC-1614
    '4 Forms_BorrowerSummaryOrigination  SetTransactionDetails and PTAC-1614
    '5 Forms_BorrowerSummaryOrigination  SetSSNVerificationBorrower and PTAC-1614                      
    '6 Forms_1003 PageSetTitleDetails and PTAC-1614

    '7 Forms_1003 1003Page2 and PTAC-1614 
    '8 Forms_1003 SetEmployment and PTAC-1614 
    '9 Settings_TablesFees,MITable and "CBIZ2974_MITable2"
'@ Pre-conditions: 
   '1 Login into the Encompass with Admin user.   
'@ Description:  NA
'@ TestSteps:
    '1 Go to settings->Tables and Fees
    '2 Go to conventional Tab,Click New button.
    '3 Click create button. Add the fields and values as per test data,Click ok button
    '4 Close Settings
    '5 Go to Pipeline tab, Create a new blank loan as per test data(Loan Type Conventional)
    '6 Go to 1003 Page 1 and click on MIP/FF icon
    '7 Click Get MI.Verify that MI table created in MI Fee table is applied and click get MI button under monthly mortgage insurance section and auto populate the calculated amount in MIP/FF field
    '8 Go to Tools,select Amortization schedule and verify the data in MI Column     
   '9 Edit MI Table Record
   '10 Create Duplicate MI Record
   '11 Delete MI Record  
   
'@ ExpectedResult:
    '3 The entry should be added and new MI Fee should be created
    '4 Settings Closed
    '5 A New Conventional type Loan is created  and details populated in the 'Borrower Summary Origination' form.
    '6 MIP fee calculation pop up message should be open.
    '7 Fees should be applied and  System is able to populate calculated amount with out selection of record .
     'Calculation:
     '(Loan amount * 1st Premium)/100)
     'E.g (150000*2)/100=3000
    '8 Values should be populated as below
        'For 1st 24 months-84.17
        'For 25th to 48th-168.33
    '9 MI Record Edited
   '10 Duplicate MI Record Created
   '11 MI Record Deleted        
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

strRowID = "PTAC-1614"
strRowID1 = "MItable_Conv1" 
strRowID2 = "MItable_Conv2"  

FRM_Logger_ReportStepEvent "Test Scenario #1: Verify Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for Conventional Loan" ,"Validate Create, Edit, Dulpicate, Delete of single record in MI Table and Re-Enforcement for Conventional Loan", Null
FRM_Logger_ReportStepEvent "Test Case #1: Create new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for Conventional Loan" ,"Creating new scenario MI table having single record and Verify MI Data in MIP/FF field and Amortization schedule for Conventional Loan", Null

'====== Navigate to Encompass->Settings and Go to Tables and Fees->MI Tablec ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"

FRM_Logger_ReportInfoEvent "Start create new scenario MI table having single record for Conventional Loan" ,"Started carating new scenario MI table having single record for Conventional Loan", Null    
strConventionalTab = BIZ_TablesAndFees_SelectMITableConvTab (strRowID1,"CONVENTIONAL")
strScenarioName = BIZ_TablesAndFees_CreateMITableSecnario(strRowID1,"CONVENTIONAL")
BIZ_TablesAndFees_Verify_MIScenarioData strScenarioName,strRowID1
BIZ_Settings_ClickClose()

'====== 'Create Conventional Loan' ======
FRM_Logger_ReportInfoEvent "Start creat new Conventional Loan" ,"Started creating new Conventional Loan", Null
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

'====== 'Validate auto populate the calculated amount in MIP/FF field and GuaranteeFee Calculation  ===================
FRM_Logger_ReportInfoEvent "Verify MI Fee table is applied and auto populate the calculated amount in MIP/FF field" ,"Validate MI Fee table is applied and auto populate the calculated amount in MIP/FF field", Null
BIZ_TableandFees_SelectMIDetailPage_GetMIPDetails strRowID1,strScenarioName
BIZ_TableandFees_MIFF_AmountAutoPopulate_Verify_ConventionalLoanRecord strRowID1
BIZ_TableandFees_MIFF_AmountAutoPopulate_ConventionalLoanAmountValidation strRowID,strRowID1

'====== 'Validate  MI data in Amortization schedule ==============================
FRM_Logger_ReportInfoEvent "Verify MI data in Amortization Schedule for Conventional Loan" ,"Validate MI data in Amortization Schedule for Conventional Loan", Null
BIZ_Tools_ShowInOrder()
BIZ_Tools_Open("Amortization Schedule")
BIZ_Settings_TablesandFees_AmortizationSchedule_VerifyMIValues(strRowID1)
BIZ_Loan_Save
BIZ_Loan_SaveLoanNumber()
BIZ_Loan_Exit False


'====== ================='Go to Tables and Fees->MI Tablec Create new scenario MI table having multiple record======
FRM_Logger_ReportStepEvent "Test Case #2: Create new scenario MI table having multiple record and Verify MI Data in MIP/FF field and Amortization schedule for Conventional Loan" ,"Creating new scenario MI table having multiple record and Verify MI Data in MIP/FF field and Amortization schedule for Conventional Loan", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"
strConventionalTab1 = BIZ_TablesAndFees_SelectMITableConvTab (strRowID2,"CONVENTIONAL")

strScenarioName1   = BIZ_TablesAndFees_CreateMITableSecnario(strRowID2,"CONVENTIONAL")
BIZ_TablesAndFees_Verify_MIScenarioData strScenarioName1,strRowID2
BIZ_Settings_ClickClose()

'==========Open Existing Loan============
strLoanNumber=BIZ_Loan_GetLoanNumber
BIZ_Loan_OpenByLoanNumber strLoanNumber

'====== 'Validate auto populate the calculated amount in MIP/FF field and GuaranteeFee Calculation  ===================
FRM_Logger_ReportInfoEvent "Verify MI Fee table is applied and auto populate the calculated amount in MIP/FF field" ,"Validate MI Fee table is applied and auto populate the calculated amount in MIP/FF field", Null
BIZ_TableandFees_SelectMIDetailPage_GetMIPDetails strRowID2,strScenarioName1
BIZ_TableandFees_MIFF_AmountAutoPopulate_Verify_ConventionalLoanRecord strRowID2
BIZ_TableandFees_MIFF_AmountAutoPopulate_ConventionalLoanAmountValidation strRowID,strRowID2
BIZ_Loan_Exit False

'========Create Edit MITable Record for conventional tab ======
FRM_Logger_ReportStepEvent "Test Case #3 Start Edit MI Table Record and validate" ,"Started Editing MI Table Record and validating", Null    
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "MI Tables"
BIZ_TablesAndFees_SelectMIConventionalTab(strConventionalTab)
strEdittedScenario = BIZ_TablesAndFees_EditMITableData (strScenarioName , strRowID1)
BIZ_TablesAndFees_Verify_MIScenarioData strEdittedScenario, strRowID1 

'====== Create Duplicate MITable Record for conventional tab ======
FRM_Logger_ReportStepEvent "Test Case #4 Start duplicate MI Table Record and validate" ,"Started duplicating MI Table Record and validating", Null
strDuplicateScenario = BIZ_TablesAndFees_DuplicateMITableData (strEdittedScenario, strRowID1)
BIZ_TablesAndFees_Verify_MIScenarioData strDuplicateScenario,strRowID1 

'====== 'Delete MI Table Records ======
FRM_Logger_ReportStepEvent "Test Case #5 Start delete MI Table Record and validate" ,"Started deleting MI Table Record and validating", Null
BIZ_TablesAndFees_DeleteMITableRecord  strEdittedScenario
BIZ_TablesAndFees_DeleteMITableRecord  strDuplicateScenario
BIZ_TablesAndFees_DeleteMIConventionalTab(strConventionalTab)
BIZ_TablesAndFees_SelectMIConventionalTab(strConventionalTab1)
BIZ_TablesAndFees_DeleteMITableRecord  strScenarioName1
BIZ_TablesAndFees_DeleteMIConventionalTab(strConventionalTab1)
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

