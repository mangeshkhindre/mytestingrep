'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2148 File started 2-Borrower origination summary.
'@ Test Automation JIRA Task:  PTAC-2408 - E2E_8VAPURARM_FileStarted
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo and E2E_VAPURARM  
   '2 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_VAPURARM
   '3 Forms_BorrowerSummaryOrigination, SetCoBorrower and E2E_VAPURARM
   '4 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_VAPURARM
   '5 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_VAPURARM
   '6 Forms_BorrowerSummaryOrigination, SetProperty and E2E_VAPURARM
   '7 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_VAPURARM
   '8 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_VAPURARM
   '9 Forms_BorrowerSummaryOrigination, SetIncome and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
   '1 Click Forms tab.
   '2 Select borrower Summary origination.
   '3 Fill all the fields as per test data.
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2148","File started 2-Borrower origination summary", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_VAPURARM"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_VAPURARM"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_VAPURARM"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_VAPURARM"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_VAPURARM"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_VAPURARM"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null