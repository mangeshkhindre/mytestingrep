'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1083 HP File Started 2 - Complete Borrower summary Origination
'@ Test Automation JIRA Task:  PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_HappyPath  
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_HappyPath
	'3 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_HappyPath
	'4 Form rowerSummaryOrigination, SetCreditInformation, E2E_HappyPath
 	'5 Forms_BorrowerSummaryOrigination, SetProperty, E2E_HappyPath
	'6 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_HappyPath
    '7 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_HappyPath
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
    '1 Click Forms tab
	'2 Select borrower Summary origination
	'3 Fill all the fields as per test data
'@ ExpectedResult:  Should be able to fill the fields in borrower summary origination
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1083","HP File Started 2 - Complete Borrower summary Origination", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_HappyPath"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_HappyPath"

'Enters the SSN number
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower "E2E_HappyPath"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_HappyPath"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_HappyPath"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_HappyPath"

'Enter Details in Credit Scores Section
BIZ_BorrowerSummaryOrigination_SetCreditScores "E2E_HappyPath"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null
