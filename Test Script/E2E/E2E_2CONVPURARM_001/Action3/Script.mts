'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: "Forms_BorrowerSummaryOrigin"
'@ Pre-conditions: 
'@ Description:  Fill Borrower origination summary
'@ TestSteps:
'1.Click Forms tab.
'2.Select borrower Summary origination.
'3.Fill all the fields as per test data.
'@ ExpectedResult: 
'Should be able to fill the fields in borrower summary origination.
'********************************************************************************************
BIZ_BorrowerSummaryOrigination_SetHeadInfo "Core2p_Integration"
       
BIZ_BorrowerSummaryOrigination_SetBorrower "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetCreditInformation "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetProperty "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "Core2p_Integration"

BIZ_BorrowerSummaryOrigination_SetCreditScores "Core2p_Integration"

FRM_Logger_ReportPassEvent "Fill Borrower Summary Details", "Borrower Summary Details are entered for the Loan", null

