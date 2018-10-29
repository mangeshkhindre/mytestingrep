'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1087 HP File started 4-Complete 1003 Form
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: 
    '1 Forms_1003page, SetEmployment, E2E_HappyPath
    '2 Forms_1003page, SetTitleDetails, E2E_HappyPath
    '3 Forms_1003page, 1003Page1, E2E_HappyPath
    '4 Forms_1003page, 1003Page2, E2E_HappyPath
    '5 Forms_VOD, SetVODData, E2E_HappyPath
    '6 Forms_1003page, Declarations, E2E_HappyPath
    '7 Forms_1003page, 1003Page3, E2E_HappyPath
    '8 Forms_1003page, SetLoanOriginator, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on forms and  1003 page 1
	'2 Fill the fields as in Test data
	'3 Click 1003 page 2 and enter the values as in test data
	'4 Click 1003 page 3 and enter the values as in test data
	'5 Click on Save icon
'@ ExpectedResult: 
	'1 All the data should be saved 
	'2 All the data should be saved 
	'3 All data should be saved
	'5 Loan should be saved
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1087","HP File started 4-Complete 1003 Form", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Retrieve the Loan Number 
LoanNumber = BIZ_Loan_GetLoanNumber()

'Updates the Loan Number in the E2E Property file
UTIL_Prop_SetValue FRM_RT_E2EPropFilePath(), "LoanNo", LoanNumber

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_HappyPath"

'Enter the Title Details
BIZ_1003Page1_SetTitleDetails "E2E_HappyPath"

'Enter the Property Details
BIZ_1003Page1_SetData "E2E_HappyPath"

'Enter the Monthly Expenses Details
BIZ_1003Page2_SetMonthlyIncomeExpensesData "E2E_HappyPath"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_HappyPath"

Wait g_TinyWaitMedium

wait(9)
'Set the Declaration Details 
BIZ_1003Page3_SetDeclarations "E2E_HappyPath"

'Enter the Borrower Details
BIZ_1003Page3_SetBorrower "E2E_HappyPath"

BIZ_1003Page3_SetLoanOriginator  "E2E_HappyPath"

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
