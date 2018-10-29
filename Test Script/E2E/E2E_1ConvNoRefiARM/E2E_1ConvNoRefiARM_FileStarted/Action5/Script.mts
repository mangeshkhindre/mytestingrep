'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1207 CONVNOCASHREFIARM - File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: 
	'01 Forms_RegZ-LE, SetDisclosureInformation and E2E_ConvNoRefiARM
	'02 Forms_VOD, SetVODData and E2E_ConvNoRefiARM
	'03 Forms_VOL, SetVOLData and E2E_ConvNoRefiARM
	'04 Forms_1003page, SetEmployment and E2E_ConvNoRefiARM
	'05 Forms_1003page, SetTitleDetails and E2E_ConvNoRefiARM
	'06 Forms_1003page, 1003Page1 and E2E_ConvNoRefiARM
	'07 Forms_1003page, 1003Page2 and E2E_ConvNoRefiARM
	'08 Forms_1003page, 1003Page3 and E2E_ConvNoRefiARM
	'09 Forms_1003page, Declarations and E2E_ConvNoRefiARM
	'10 Forms_1003page, SetLoanOriginator and E2E_ConvNoRefiARM
	'11 Forms_RegZ-LE, InterestOnly and E2E_ConvNoRefiARM
    '12 Forms_RegZ-LE, SetConstruction and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 click on forms 1003 page 1
	   'Some fields will be populated from Borrower summary origination
	   'Fill the fields as in Test data
	'2 Click 1003 page 2 and enter the values as in test data
	'3 Click 1003 page 3 and enter the values as in test data
	'4 Fill specified fields in REGZE-LE form
'@ ExpectedResult: Should be able to enter all the values in their respective fields	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1207","CONVNOCASHREFIARM - File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Retrieve the Loan Number 
LoanNumber = BIZ_Loan_GetLoanNumber()

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_ConvNoRefiARM"

'Enter Refinance Loan Details
BIZ_1003Page1_SetData "E2E_ConvNoRefiARM"

BIZ_1003Page1_SetTitleDetails "E2E_ConvNoRefiARM"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_ConvNoRefiARM"

BIZ_1003Page2_SetLiabilities "E2E_ConvNoRefiARM"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_ConvNoRefiARM"

'Enter the Automobiles Owned Details
BIZ_1003Page2_SetAutomobilesOwned "E2E_ConvNoRefiARM"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_ConvNoRefiARM1"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_ConvNoRefiARM2"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_ConvNoRefiARM3"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_ConvNoRefiARM4"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_ConvNoRefiARM5"

'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_ConvNoRefiARM"

'Enter the Borrower Details
BIZ_1003Page3_SetBorrower "E2E_ConvNoRefiARM"

 BIZ_1003Page3_SetLoanOriginator "E2E_ConvNoRefiARM"
 
'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_ConvNoRefiARM"

'Set the Interest Only Details
BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_ConvNoRefiARM"

'Set the ARM Details
BIZ_RegZ_LE_SetAdjustableRateMortgage "E2E_ConvNoRefiARM"

'Set the Details in the AIR Table
BIZ_RegZ_LE_SetAIRTableInfomration "E2E_ConvNoRefiARM"

'Clicks on ARM Index
BIZ_RegZ_LE_GetARMIndex()

'Enter the Late Charge Information  Details
BIZ_RegZ_LE_SetLateChargeInformation "E2E_ConvNoRefiARM"

'Enter the details in Freddie Mac Additional Data information
BIZ_RegZ_LE_SetConstructionMortgage  "E2E_ConvNoRefiARM"
