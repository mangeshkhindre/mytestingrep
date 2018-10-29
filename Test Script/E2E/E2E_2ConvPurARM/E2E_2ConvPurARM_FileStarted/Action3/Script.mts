'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-313 File started 2-Borrower origination summary.
'@ Test Automation JIRA Task:  PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_CONVPURARM  
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVPURARM
	'3 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_CONVPURARM
	'4 Form rowerSummaryOrigination, SetCreditInformation, E2E_CONVPURARM
 	'5 Forms_BorrowerSummaryOrigination, SetProperty, E2E_CONVPURARM
	'6 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_CONVPURARM
    '7 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_CONVPURARM"
    '8 Forms_BorrowerSummaryOrigination, SetIncome, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
	'1 Click Forms tab.
	'2 Select borrower Summary origination.
	'3 Fill all the fields as per test data.
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-313","File started 2-Borrower origination summary", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_CONVPURARM"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CONVPURARM"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_CONVPURARM"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_CONVPURARM"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CONVPURARM"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_CONVPURARM"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null