'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-315 File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'01 Forms_VOD, SetVODData, E2E_CONVPURARM
	'02 Forms_VOL, SetVOLData, E2E_CONVPURARM
	'03 Forms_1003page, SetEmployment, E2E_CONVPURARM
	'04 Forms_1003page, SetTitleDetails, E2E_CONVPURARM
	'05 Forms_1003page, 1003Page1, E2E_CONVPURARM
	'06 Forms_1003page, 1003Page2, E2E_CONVPURARM
	'07 Forms_1003page, 1003Page3, E2E_CONVPURARM
	'08 Forms_1003page, Declarations, E2E_CONVPURARM
	'09 Forms_1003page, SetLoanOriginator, E2E_CONVPURARM
	'10 Forms_FreddieMacAdditionalData, LendorInformation, E2E_CONVPURARM
	'11 Forms_RegZ-LE, SetLateCharge, E2E_CONVPURARM
	'12 Forms_RegZ-LE, SetAIR, E2E_CONVPURARM
	'13 Forms_RegZ-LE, SetARM, E2E_CONVPURARM
	'14 Forms_RegZ-LE, InterestOnly, E2E_CONVPURAR
	'15 Forms_RegZ-LE, SetDisclosureInformation, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 click on forms 1003 page 1.
	   '(Some fields will be populated from Borrower summary origination).
	   'Fill the fields as in Test data.
	'2 Click 1003 page 2 and enter the values as in test data.
	'3 Click 1003 page 3 and enter the values as in test data.
	'4 Fill specified fields in REGZE-LE form
'@ ExpectedResult:
	'1 Should be able to enter all the values in their respective fields.
	'2 After adding assets in page 2, verify if the value is 75,000 in Total bank deposits,subtotal liquid asstes value and net worth.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case :PTAC-315","File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Retrieve the Loan Number 
LoanNumber = BIZ_Loan_GetLoanNumber()

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_CONVPURARM"

'Enter the Mailing address & no units
BIZ_1003Page1_SetData "E2E_CONVPURARM"

'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_CONVPURARM"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_CONVPURARM"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_CONVPURARM"

'Enter the Automobiles Owned Details
BIZ_1003Page2_SetAutomobilesOwned "E2E_CONVPURARM" 

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_CONVPURARM1"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_CONVPURARM2"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_CONVPURARM3"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_CONVPURARM4"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_CONVPURARM5"

'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_CONVPURARM"

'Enter the Borrower Details
BIZ_1003Page3_SetBorrower "E2E_CONVPURARM"

'Enter Loan originator Details
BIZ_1003Page3_SetLoanOriginator "E2E_CONVPURARM"
 
'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_CONVPURARM"

'Set the Interest Only Details
BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_CONVPURARM"

'Set the ARM Details
BIZ_RegZ_LE_SetAdjustableRateMortgage "E2E_CONVPURARM"

'Set the Details in the AIR Table
BIZ_RegZ_LE_SetAIRTableInfomration "E2E_CONVPURARM"

'Clicks on ARM Index
BIZ_RegZ_LE_GetARMIndex()

'Enter the Late Charge Information  Details
BIZ_RegZ_LE_SetLateChargeInformation "E2E_CONVPURARM"

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
