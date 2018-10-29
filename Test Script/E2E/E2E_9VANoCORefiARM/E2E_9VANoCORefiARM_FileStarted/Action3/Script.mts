'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2262 File started 2-Borrower origination summary.
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_Filestarted
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo and VANoCORefiARM  
   '2 Forms_BorrowerSummaryOrigination, SetBorrower and VANoCORefiARM  
   '3 Forms_BorrowerSummaryOrigination, SetCoBorrower and VANoCORefiARM 
   '4 Forms_BorrowerSummaryOrigination, SetCreditInformation and VANoCORefiARM 
   '5 Forms_BorrowerSummaryOrigination, SetProperty and VANoCORefiARM 
   '6 Forms_BorrowerSummaryOrigination, SetTransactionDetails and VANoCORefiARM 
   '7 Forms_BorrowerSummaryOrigination, SetCreditInformation and VANoCORefiARM 
   '8 Forms_BorrowerSummaryOrigination, SetIncome and VANoCORefiARM 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click Forms tab.Select borrower Summary origination.Fill all the fields as per test data
'@ ExpectedResult: 
   '1 Should be able to fill the fields in borrower summary origination
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2262","File started 2-Borrower origination summary.",Null

BIZ_BorrowerSummaryOrigination_SetHeadInfo "Shared_ProjectedPayment_ARMType"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_VANoCORefiARM"

'Enter the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_VANoCORefiARM"

'Enter the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_VANoCORefiARM"

'Enter the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_VANoCORefiARM"

'Enter the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_VANoCORefiARM"