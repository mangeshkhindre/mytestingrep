'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-1864 File started 2-Borrower origination summary
'@ Test Automation JIRA Task: PTAC-2011 E2E_6FHAPURARM_Filestarted 
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHAPURARM   
    '2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURARM
    '3 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_FHAPURARM
    '4 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_FHAPURARM
    '5 Form rowerSummaryOrigination, SetCreditInformation, E2E_FHAPURARM
    '6 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHAPURARM
    '7 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHAPURARM
    '8 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHAPURARM
    '9 Forms_BorrowerSummaryOrigination, SetIncome, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
	'1 Click Forms tab
	'2 Select borrower Summary origination
	'3 Fill all the fields as per test data
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1864","File started 2-Borrower origination summary", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_FHAPURARM"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURARM"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_FHAPURARM"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_FHAPURARM"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHAPURARM"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_FHAPURARM"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null