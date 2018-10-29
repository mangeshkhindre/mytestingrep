'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-2970 CONVCASHOUTREFIFIX File Started 3 - Complete 1003 forms
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData: 
   '1 Forms_1003page, 1003Page1 and E2E_CONVCASHOUTREFFIX
   '2 Forms_1003page, SetEmployment  and E2E_CONVCASHOUTREFFIX
   '3 Forms_RegZ-LE, SetConstruction and E2E_CONVCASHOUTREFFIX
   '4 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_CONVCASHOUTREFFIX
   '5 Forms_VOD, SetVODData and  E2E_CONVCASHOUTREFFIX
   '6 Forms_RegZ-LE, InterestOnly and E2E_CONVCASHOUTREFFIX
   '7 Forms_RegZ-LE, SetConstruction and E2E_CONVCASHOUTREFFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 click on forms 1003 page 1.
	   'Some fields will be populated from Borrower summary.
    '2 Click on forms and select REGZE-LE form.
'@ ExpectedResult:
   '1 Should be able to enter all the values in their respective fields.
   '2 Should be able to enter value.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2970"," CONVCASHOUTREFIFIX File Started 3 - Complete 1003 forms", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CONVCASHOUTREFFIX"

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_CONVCASHOUTREFFIX"

'Enter the VOD Details
BIZ_1003Page2_SetVODData "E2E_CONVCASHOUTREFFIX"

BIZ_RegZ_LE_SetInterestOnlyInformation  "E2E_CONVCASHOUTREFFIX"

BIZ_RegZ_LE_SetLateChargeInformation "E2E_CONVCASHOUTREFFIX"

BIZ_RegZ_LE_SetConstructionMortgage  "E2E_CONVCASHOUTREFFIX"

'Saves the Loan Details 
BIZ_Loan_Save()

'As the Save function is not generating the loan number, we are clicking on the save twice
BIZ_Loan_Save()

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
