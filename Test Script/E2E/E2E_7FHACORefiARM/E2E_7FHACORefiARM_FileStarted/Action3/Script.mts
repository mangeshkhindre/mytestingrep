'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2293 FHACOREFIARM File started - 2 Fill Borrower summary form
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHACORefiARM  
   '2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHACORefiARM
   '3 Forms_BorrowerSummaryOrigination, SetCoBorrower, E2E_FHACORefiARM
   '4 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHACORefiARM
   '5 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHACORefiARM
   '6 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHACORefiARM
   '7 Forms_BorrowerSummaryOrigination, SetCreditInformation, E2E_FHACORefiARM"
   '8 Forms_BorrowerSummaryOrigination, SetIncome, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps:
   '1 In borrower Summary origination page fill all the fields as per test data
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2293","FHACOREFIARM File started - 2 Fill Borrower summary form", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_FHACORefiARM"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHACORefiARM"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_FHACORefiARM"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_FHACORefiARM"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHACORefiARM"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_FHACORefiARM"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null