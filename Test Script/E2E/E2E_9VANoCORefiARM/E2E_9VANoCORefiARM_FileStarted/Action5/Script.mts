'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2264 File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_FileStarted
'@ TestData: 
   '01 Forms_1003page, SetEmployment and E2E_VANoCORefiARM
   '02 Forms_1003page, SetTitleDetails and E2E_VANoCORefiARM
   '03 Forms_1003page, 1003Page1 and E2E_VANoCORefiARM 
   '04 Forms_1003page, 1003Page2 and E2E_VANoCORefiARM 
   '05 Forms_VOD, SetVODData and E2E_VANoCORefiARM
   '06 Forms_VOL, SetVOLData and E2E_VANoCORefiARM1
   '07 Forms_VOL, SetVOLData and E2E_VANoCORefiARM2
   '08 Forms_VOL, SetVOLData and E2E_VANoCORefiARM3
   '09 Forms_VOL, SetVOLData and E2E_VANoCORefiARM4
   '10 Forms_VOL, SetVOLData and E2E_VANoCORefiARM5
   '11 Forms_1003page, Declarations and E2E_VANoCORefiARM
   '12 Forms_1003page, 1003Page3 and E2E_VANoCORefiARM
   '13 Forms_1003page, SetLoanOriginator and E2E_VANoCORefiARM
   '14 Forms_RegZ-LE, SetDisclosureInformation and E2E_VANoCORefiARM
   '15 Forms_RegZ-LE, SetARM and E2E_VANoCORefiARM
   '16 Forms_RegZ-LE, InterestOnly and E2E_VANoCORefiARM
   '17 Forms_RegZ-LE, SetAIR and E2E_VANoCORefiARM
   '18 Forms_RegZ-LE, SetLateCharge and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms 1003 page 1.(Some fields will be populated from Borrower summary
   '2 Click on forms 1003 page 1.(Some fields will be populated from Borrower summary origination).Fill the fields as in Test data
   '3 Click 1003 page 2 and enter the values
   '4 Click 1003 page 3 and enter the values as in test data
   '5 Click on forms and select REGZ-LE form
'@ ExpectedResult: 
   '1 Should be able to enter all the values in their respective fields
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2264","File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()
BIZ_Loan_Save()
'Enter the Mailing Address & no units and Refinance Loan section
BIZ_1003Page1_SetData "E2E_VANoCORefiARM"
'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_VANoCORefiARM"
'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_VANoCORefiARM"
'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_VANoCORefiARM"
'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_VANoCORefiARM"
'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_VANoCORefiARM1"
'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_VANoCORefiARM2"
'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_VANoCORefiARM3"
'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_VANoCORefiARM4"
'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_VANoCORefiARM5"
'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_VANoCORefiARM"
'Information for government monitoring
BIZ_1003Page3_SetBorrower "E2E_VANoCORefiARM"
'Enter Loan originator Details
BIZ_1003Page3_SetLoanOriginator "E2E_VANoCORefiARM"
'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_VANoCORefiARM"
'Set the Interest Only Details
BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_VANoCORefiARM"
'Set the ARM Details
BIZ_RegZ_LE_SetAdjustableRateMortgage "E2E_VANoCORefiARM"
'Set the Details in the AIR Table
BIZ_RegZ_LE_SetAIRTableInfomration "E2E_VANoCORefiARM"
'Clicks on ARM Index
BIZ_RegZ_LE_GetARMIndex()
'Enter the Late Charge Information  Details
BIZ_RegZ_LE_SetLateChargeInformation "E2E_VANoCORefiARM"
'Save the Loan Details 
BIZ_Loan_Save()