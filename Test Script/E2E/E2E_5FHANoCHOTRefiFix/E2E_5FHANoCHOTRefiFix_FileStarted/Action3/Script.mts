'@**************************************************************************************************
'@ TestStory: PTAC-2445 PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1487 FHANOCHOTREFIFIX File started 2 Fill Borrower summary form
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo and E2E_FHANoCHOTRefiFix   
   '2 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_FHANoCHOTRefiFix
   '3 Forms_BorrowerSummaryOrigination, SetCoBorrower and E2E_FHANoCHOTRefiFix
   '4 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and E2E_FHANoCHOTRefiFix
   '5 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_FHANoCHOTRefiFix
   '6 Forms_BorrowerSummaryOrigination, SetProperty and E2E_FHANoCHOTRefiFix
   '7 Forms_BorrowerSummaryOrigination, SetTransactionDetails and E2E_FHANoCHOTRefiFix
   '8 Forms_BorrowerSummaryOrigination, SetCreditInformation and E2E_FHANoCHOTRefiFix
   '9 Forms_BorrowerSummaryOrigination, SetIncome and E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description: Fill Borrower origination summary
'@ TestSteps: In borrower Summary origination page fill all the fields as per test data
'@ ExpectedResult: Should be able to fill the fields in borrower summary origination
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1487","FHANOCHOTREFIFIX File started 2 Fill Borrower summary form", Null

'Enters the details in the Header section
BIZ_BorrowerSummaryOrigination_SetHeadInfo "E2E_FHANoCHOTRefiFix"

'Enters the details in the Borrower section
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHANoCHOTRefiFix"

'Enters the details in the Co-Borrower section
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_FHANoCHOTRefiFix"

'Enters the details in the Credit information section
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_FHANoCHOTRefiFix"

'Enters the details in the Set Property section
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHANoCHOTRefiFix"

'Enters the details in the Transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_FHANoCHOTRefiFix"

FRM_Logger_ReportInfoEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", Null
