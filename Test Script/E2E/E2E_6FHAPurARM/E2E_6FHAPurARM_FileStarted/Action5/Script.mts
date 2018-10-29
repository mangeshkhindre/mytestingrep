'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-1866 File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-2011 E2E_6FHAPURARM_Filestarted
'@ TestData: 
    '01 Forms_RegZ-LE, SetDisclosureInformation, E2E_FHAPURARM
    '02 Forms_VOD, SetVODData, E2E_FHAPURARM
    '03 Forms_VOL, SetVOLData, E2E_FHAPURARM
    '04 Forms_1003page, SetEmployment, E2E_FHAPURARM
    '05 Forms_1003page, SetTitleDetails, E2E_FHAPURARM
    '06 Forms_1003page, 1003Page1, E2E_FHAPURARM
    '07 Forms_1003page, 1003Page2, E2E_FHAPURARM
    '08 Forms_1003page, 1003Page3, E2E_FHAPURARM
    '09 Forms_1003page, Declarations, E2E_FHAPURARM
    '10 Forms_1003page, SetLoanOriginator, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 click on forms 1003 page 1. (Some fields will be populated from Borrower summary origination). 
	'2 Fill the fields as in Test data.
	'3 Click 1003 page 2 and enter the values as in test data.
	'4 Click 1003 page 3 and enter the values as in test data.
	'5 Click on forms and select REGZE-LE form.
	'6 Fill specified fields in FNMA streamlined form.
'@ ExpectedResult:
	'1 Should be able to enter all the values in their respective fields.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1866","Test case Name - File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_FHAPURARM"

'Enter the Mailing address & no units
BIZ_1003Page1_SetData "E2E_FHAPURARM"

'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_FHAPURARM"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_FHAPURARM"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_FHAPURARM"

'Enter the Automobiles Owned Details
BIZ_1003Page2_SetAutomobilesOwned "E2E_FHAPURARM" 

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHAPURARM1"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHAPURARM2"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHAPURARM3"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHAPURARM4"

'Enter the VOL Details for Borrower
BIZ_1003Page2_SetVOLData "E2E_FHAPURARM5"

'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_FHAPURARM"

'Enter the Borrower Details
BIZ_1003Page3_SetBorrower "E2E_FHAPURARM"

'Enter Loan originator Details
BIZ_1003Page3_SetLoanOriginator "E2E_FHAPURARM"
 
'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_FHAPURARM"

'Set the Interest Only Details
BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_FHAPURARM"

'Set the ARM Details
BIZ_RegZ_LE_SetAdjustableRateMortgage "E2E_FHAPURARM"

'Set the Details in the AIR Table
BIZ_RegZ_LE_SetAIRTableInfomration "E2E_FHAPURARM"

'Clicks on ARM Index
BIZ_RegZ_LE_GetARMIndex()

'Enter the Late Charge Information  Details
BIZ_RegZ_LE_SetLateChargeInformation "E2E_FHAPURARM"

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
