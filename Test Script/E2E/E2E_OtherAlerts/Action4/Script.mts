'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata
	'Tools_ShippingDetail.xls "SetShippingDetail" "OtherAlerts_data"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add a new blank loan
	'2 Set data on Borrower Summary Origination form 
	'3 set data on RegZ-CD form
	'4 go to Tools->Shipping Detail
	'5 Set data on Shipping detail page
	'6 Verify that the Investor delivery due alert is triggered
	'7 Exit the loan
'@ ExpectedResult: 
'********************************************************************************************
'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'set data on Borrower Sumary Origination form
BIZ_BorrowerSummaryOrigination_SetBorrower "OtherAlerts_Borrower"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "OtherAlerts_TransactionDetails"
BIZ_BorrowerSummaryOrigination_SetProperty "OtherAlerts_Property"
'Set dta on RegZ-CD form
BIZ_RegZ_CD_SetData "OtherAlerts_Setdata"
'go to Tools->Shipping Detail
BIZ_Tools_Open "Shipping Detail"
'Set data on Shipping detail page
BIZ_ShippingDetail_SetShippingDetail "OtherAlerts_data"
Set objAlerts = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
'Verify that the Investor delivery due alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Investor delivery due"), "Verify Alert", "Verify that the alert triggered is Investor delivery due"
'Exit the loan
BIZ_Loan_Exit(False)






