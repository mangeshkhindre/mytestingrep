'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1489 FHANOCHOTREFIFIX File started 4 Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData: 
   '01 Forms_RegZ-LE, SetDisclosureInformation and E2E_FHANoCHOTRefiFix
   '02 Forms_VOD, SetVODData and E2E_FHANoCHOTRefiFix
   '03 Forms_VOL, SetVOLData and E2E_FHANoCHOTRefiFix
   '04 Forms_1003page, SetEmployment and E2E_FHANoCHOTRefiFix
   '05 Forms_1003page, SetTitleDetails and E2E_FHANoCHOTRefiFix
   '06 Forms_1003page, 1003Page1 and E2E_FHANoCHOTRefiFix
   '07 Forms_1003page, 1003Page2 and E2E_FHANoCHOTRefiFix
   '08 Forms_1003page, 1003Page3 and E2E_FHANoCHOTRefiFix
   '09 Forms_1003page, Declarations and E2E_FHANoCHOTRefiFix
   '10 Forms_1003page, SetLoanOriginator and E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms 1003 page 1 (Some fields will be populated from Borrower summary origination) Fill the fields as in Test data
   '2 Click 1003 page 2 and enter the values as in test data
   '3 Click 1003 page 3 and enter the values as in test data
   '4 Click on forms and select REGZE-LE form
'@ ExpectedResult: Should be able to enter all the values in their respective fields
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1489","FHANOCHOTREFIFIX File started 4 Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Retrieve the Loan Number 
LoanNumber = BIZ_Loan_GetLoanNumber()

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_FHANoCHOTRefiFix"

'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_FHANoCHOTRefiFix"

BIZ_1003Page1_SetData  "E2E_FHANoCHOTRefiFix"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_FHANoCHOTRefiFix"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_FHANoCHOTRefiFix"

'Enter the Automobiles Owned Details
BIZ_1003Page2_SetAutomobilesOwned "E2E_FHANoCHOTRefiFix" 

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHANoCHOTRefiFix1"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHANoCHOTRefiFix2"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHANoCHOTRefiFix3"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHANoCHOTRefiFix4"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHANoCHOTRefiFix5"

'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_FHANoCHOTRefiFix"

'Enter the Borrower Details
BIZ_1003Page3_SetBorrower "E2E_FHANoCHOTRefiFix"

'Enter Loan originator Details
BIZ_1003Page3_SetLoanOriginator "E2E_FHANoCHOTRefiFix"

'set New Liabilities for the Loan
BIZ_VOM_SetNewLiabilities  "E2E_FHANoCHOTRefiFix"

'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_FHANoCHOTRefiFix"

'Set the Interest Only Details
BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_FHANoCHOTRefiFix"

'Enter the details in Freddie Mac Additional Data information
BIZ_RegZ_LE_SetConstructionMortgage  "E2E_FHANoCHOTRefiFix"

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null