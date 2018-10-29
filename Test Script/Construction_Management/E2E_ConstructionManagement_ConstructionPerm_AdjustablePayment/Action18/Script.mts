'@**************************************************************************************************
'@ TestStory: PTAC-1352		
'@ TestCase:
'  PTAC-563-Test #2 (CBIZ-3993): Construction to Perm Loans - Adjustable Interest Rate (AIR) Table Logic - STEP RATE	
'@ Test Automation JIRA Task: PTAC-1437
'@ TestData:
'   ConstructionManagement,SetConstructionMortPeriod,1352_ConstrMgmt_9MoNoInterest_5MoInterest
'@ Pre-conditions: 
'@ Description: Validate the Adjustable Interest Rate displays in Construction to Perm, Fixed to Fixed scenario when F1677 (Construction Rate) < than F3 (Permanent Rate)
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to Reg-Z Form, and navigate to 'Adjustable Interest Rate (AIR) table section and validate the fields
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created successfully
   '5 The Adjustable Interest Rate (AIR) Table section is displayed with the following:
      'Interest Rate Adjustments : 1
      'Initial Interest Rate = 5% (F1677)
      'Min/Max Interest Rate has Min = 5% and Max = 9%
      'Change Frequency:
      'Beginning of = 10th mth (Note: CD4.X46)
      'Limits on Interest Rate Changes:
      'First Change = 4% (F3-F1677)
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case---PTAC-563","Scrpit Name - ConstructionManagement_ConstructionPerm_NOInterest_09MOnths_5InterestRate", Null

' Naviagte to Pipeline and Construction Management form 
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"

' Create loan with loan info and borrower details 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrMgmt_9MoNoInterest_5MoInterest"
BIZ_BorrowerSummaryOrigination_SetBorrower "1352_ConstrMgmt_9MoNoInterest_5MoInterest"

' Navigate to RegZ-LE form and set data 
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrMgmt_9MoNoInterest_5MoInterest"

' Save Loan 
'BIZ_Loan_Save()

' Validation oF AIR Table
BIZ_ConstructionManagement_AdjustableInterestRateTable_Validate "1352_ConstrMgmt_9MoNoInterest_5MoInterest",False

' Exit Loan  
'BIZ_Loan_Exit True
