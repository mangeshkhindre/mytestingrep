'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2295 FHACOREFIARM File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   '01 Forms_VOD, SetVODData, E2E_FHACORefiARM
   '02 Forms_VOL, SetVOLData, E2E_FHACORefiARM
   '03 Forms_1003page, SetEmployment, E2E_FHACORefiARM
   '04 Forms_1003page, SetTitleDetails, E2E_FHACORefiARM
   '05 Forms_1003page, 1003Page1, E2E_FHACORefiARM
   '06 Forms_1003page, 1003Page2, E2E_FHACORefiARM
   '07 Forms_1003page, 1003Page3, E2E_FHACORefiARM
   '08 Forms_1003page, Declarations, E2E_FHACORefiARM
   '09 Forms_1003page, SetLoanOriginator, E2E_FHACORefiARM
   '10 Forms_FreddieMacAdditionalData, LendorInformation, E2E_FHACORefiARM
   '11 Forms_RegZ-LE, SetLateCharge, E2E_FHACORefiARM
   '12 Forms_RegZ-LE, SetAIR, E2E_FHACORefiARM
   '13 Forms_RegZ-LE, SetARM, E2E_FHACORefiARM
   '14 Forms_RegZ-LE, InterestOnly, E2E_CONVPURAR
   '15 Forms_RegZ-LE, SetDisclosureInformation, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms 1003 page 1
	  '(Some fields will be populated from Borrower summary origination)
	  'Fill the fields as in Test data.
   '2 Click 1003 page 2 and enter the values as in test data
   '3 Click 1003 page 3 and enter the values as in test data
   '4 Click on forms and select REGZE-LE form
'@ ExpectedResult:
   '1 Should be able to enter all the values in their respective fields
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2295","FHACOREFIARM File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_FHACORefiARM"

'Enter the Mailing address & no units
BIZ_1003Page1_SetData "E2E_FHACORefiARM"

'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_FHACORefiARM"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_FHACORefiARM"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_FHACORefiARM"

'Enter the Automobiles Owned Details
BIZ_1003Page2_SetAutomobilesOwned "E2E_FHACORefiARM" 

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHACORefiARM1"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHACORefiARM2"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHACORefiARM3"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHACORefiARM4"
BIZ_1003Page2_SetLiabilities "E2E_FHACORefiARM"

'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_FHACORefiARM"
BIZ_VOM_SetNewLiabilities "E2E_FHACORefiARM"

'Enter Loan originator Details
BIZ_1003Page3_SetLoanOriginator "E2E_FHACORefiARM"

'Enter the Borrower Details in 1003Page 3
BIZ_1003Page3_SetBorrower "E2E_FHACORefiARM"
BIZ_RegZ_LE_SetConstructionMortgage "E2E_FHACORefiARM"

BIZ_RegZ_LE_SetLateChargeInformation  "E2E_FHACORefiARM"

'Save the Loan Details 
BIZ_Loan_SaveLoanNumber()

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
