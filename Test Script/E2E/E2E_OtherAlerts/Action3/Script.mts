'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata
	'Tools_DisclosureTracking.xls "SetComplianceTimeline" "OtherAlerts_data"
''@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add a new blank loan
	'2 Set data on Borrower Summary Origination form 
	'3 set data on RegZ-CD form
	'4 go to Tools->Disclosure Tracking
	'5 set the Application date
	'6 verify that eConsent Not Yet Received and Send Initial Disclosures alerts are triggered
	'7 'Exit the loan
'@ ExpectedResult: 
'********************************************************************************************
'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'Set data on Borrower Summary Origination form 
BIZ_BorrowerSummaryOrigination_SetBorrower "OtherAlerts_Borrower"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "OtherAlerts_TransactionDetails"
BIZ_BorrowerSummaryOrigination_SetProperty "OtherAlerts_Property"
'set data on RegZ-CD form
BIZ_RegZ_CD_SetData "OtherAlerts_Setdata"
'go to Tools->Disclosure Tracking
BIZ_Tools_Open "Disclosure Tracking"
'set the Application date
BIZ_DisclosureTrackingTool_SetComplianceTimeline "OtherAlerts_data"
Set objAlerts = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
'verify that eConsent Not Yet Received and Send Initial Disclosures alerts are triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "eConsent Not Yet Received"), "Verify Alert", "Verify that the alert triggered is eConsent Not Yet Received"
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Send Initial Disclosures"), "Verify Alert", "Verify that the alert triggered is Send Initial Disclosures"
'Exit the loan
BIZ_Loan_Exit(False)






