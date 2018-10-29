


'@**************************************************************************************************
'@ TestStory: PTAC-1352	
'@ TestCase:
'  PTAC-573-Test #1 (CBIZ-3993): Construction to Perm Loans - Adjustable Interest Rate (AIR) Table Logic - STEP RATE	
'@ Test Automation JIRA Task: PTAC-1437
'@ TestData:
'   ConstructionManagement,SetConstructionMortPeriod,ConstructionManagement_9MoNoInterest_with5InterestMonths
'@ Pre-conditions: 
'@ Description: Validate the Adjustable Interest Rate does not display in the following scenario:F19 = Construction-Perm, F608 - Fixed Rate, F1677 (Construction Rate) > than F3 (Permanent Rate)
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 On Reg-Z Form, validate the Adjustable Interest Rate (AIR) table section
   '6 In RegZ-LE form, Change F1177 (Int. Only) value and verify in the Adjustable Interest Rate (AIR) Table section
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4  The Loan is created.
   '5 It should display the Adjustable Interest Rate (AIR) Table section as following:
      'Index + Margin' text is changed to 'Interest Rate Adjustments'
      'LE2.X96 & F689 are removed and replaced with new Field (field # TBD) = 1
      'Initial Interest Rate = 5% (F1677)
      'Min/Max Interest Rate has Min = 5% and Max = 9%
      'Change Frequency:
      'Beginning of = 20th mth (Note: CD4.X46)
      'Subsequent Changes' text and corresponding field/text are not displayed
      'Limits on Interest Rate Changes:
      'First Change = 4% (F3-F1677)
      'Subsequent Changes and related field are not displayed
   '6 It should display as below, Beginning of = 21st mth
   
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case---PTAC-888","Scrpit Name - ConstructionManagement_ConstructionPerm__NoInterest_PeriodsRepeatfrom12_5InterestRate", Null

'Naviagte to My pipeline >>Construction Management
'BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"

BIZ_Forms_Open "Construction Management"

' Create loan with loan info and borrower details 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstnMgmt_12MoNoInterest_5InterestMo"
'BIZ_BorrowerSummaryOrigination_SetBorrower "1352_ConstnMgmt_12MoNoInterest_5InterestMo"

' Navigate to RegZ-LE form and set data 
'BIZ_Forms_Open "RegZ - LE"
'BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstnMgmt_12MoNoInterest_5InterestMo"

' Save Loan 
'BIZ_Loan_Save()

' Validation oF AIR Table 
BIZ_Forms_Open "RegZ - LE"
BIZ_ConstructionManagement_AdjustableInterestRateTable_Validate  "1352_ConstnMgmt_12MoNoInterest_5InterestMo",True

' Validation oF Beginning of Interest frequency in AIR Table
BIZ_ConstructionManagement_AIRTable_InterestFrequencyBeginning_Validate "1352_ConstnMgmt_12MoNoInterest_5InterestMo"

' Exit Loan 
BIZ_Loan_Exit False


