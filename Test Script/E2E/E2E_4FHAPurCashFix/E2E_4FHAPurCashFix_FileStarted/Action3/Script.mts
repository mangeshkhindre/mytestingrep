'@******************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: File started 2-Borrower origination summary.
'@ Test Automation JIRA Task:  PTAC-3150 E2E_2FHAPURCASHFIX_Filestarted
'@ TestData: 
	'01 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHAPURCASHFIX  
	'02 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURCASHFIX
	'03 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_FHAPURCASHFIX
	'04 Form rowerSummaryOrigination, SetCreditInformation, E2E_FHAPURCASHFIX
 	'05 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHAPURCASHFIX
	'06 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHAPURCASHFIX
    '07 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHAPURCASHFIX"
    '08 Forms_BorrowerSummaryOrigination, SetIncome, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
	'1 Click Forms tab.
	'2 Select borrower Summary origination.
	'3 Fill all the fields as per test data.
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-313","TestCase Name - Borrower origination summary", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_FHAPURCASHFIX"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURCASHFIX"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_FHAPURCASHFIX"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHAPURCASHFIX"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null