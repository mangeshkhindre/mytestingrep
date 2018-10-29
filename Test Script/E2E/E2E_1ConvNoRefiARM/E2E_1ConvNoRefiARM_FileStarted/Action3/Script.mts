'@******************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1199 CONVNOCASHREFIARM File started - 2 Enter Borrower Summary
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo and  E2E_ConvNoRefiARM  
   '2 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_ConvNoRefiARM
   '3 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_ConvNoRefiARM
   '4 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_ConvNoRefiARM
   '5 Forms_BorrowerSummaryOrigination, SetProperty and E2E_ConvNoRefiARM
   '6 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_ConvNoRefiARM
   '7 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_ConvNoRefiARM
   '8 Forms_BorrowerSummaryOrigination, SetIncome and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
   '1 In borrower Summary origination page fill all the fields as per test data.
   '2 Click on save loan.
   '3 Click 'ok in this window.
'@ ExpectedResult: 
   '1 Should be able to fill the fields in borrower summary origination.
   '2 Milestone log change window will open.
   '3 Window pop up will close.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1199","CONVNOCASHREFIARM File started - 2 Enter Borrower Summary", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_ConvNoRefiARM"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_ConvNoRefiARM"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_ConvNoRefiARM"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_ConvNoRefiARM"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_ConvNoRefiARM"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_ConvNoRefiARM"

'Enter Details in Borrower Section
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_ConvNoRefiARM"

'Enter Details in Credit Scores Section
BIZ_BorrowerSummaryOrigination_SetCreditScores "E2E_ConvNoRefiARM"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null