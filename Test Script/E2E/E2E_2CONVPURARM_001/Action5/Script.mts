'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: "Forms_RegZ-LE", "Forms_FNMAStreamlined", "Forms_1003Page", "Forms_VOD"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
' 1.click on forms 1003 page 1.
' 	(Some fields will be populated from Borrower summary origination).
' 	Fill the fields as in Test data.
' 2.Click 1003 page 2 and enter the values as in test data.
' 3.Click 1003 page 3 and enter the values as in test data.
' 4.Fill specified fields in REGZE-LE form
' 5.Fill specified fields in FNMA streamlined form.
'@ ExpectedResult:
' 1. Should be able to enter all the values in their respective fields.
' 2. After adding assets in page 2, verify if the value is 75,000 in Total bank deposits,subtotal liquid asstes value and net worth.

'********************************************************************************************
'====== Go to Loan Page ======

BIZ_Nav_SelectLoanTab()

BIZ_Loan_SaveLoanNumber()

LoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_1003Page1_SetEmployment "Core2p_Integration"

BIZ_1003Page1_SetTitleDetails "Core2p_Integration"

BIZ_1003Page2_SetMonthlyIncomeExpensesData "Core2p_Integration"

BIZ_1003Page2_SetVODData "Core2p_Integration"

BIZ_1003Page3_SetDeclarations "Shared_Declarations1"

BIZ_Forms_Open "RegZ - LE"

BIZ_RegZ_LE_SetInterestOnlyInformation  "Core2p_Integration"

BIZ_RegZ_LE_SetAdjustableRateMortgage "Core2p_Integration"

BIZ_RegZ_LE_SetAIRTableInfomration "Core2p_Integration"

BIZ_FNMAStreamlined_SetData "Core2p_Integration"

FRM_Logger_ReportPassEvent "Fill 1003 Details", "1003 Details are entered for the Loan", null
