'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add a new blank loan
	'2 Set data on Borrower Summary Origination form 
	'3 set data on RegZ-CD form
	'4 go to Tools->Secondary Registration
	'5 go to the Regitration tab
	'6 Click Add Registration button
	'7 Enter Registration data
	'8 Verfiy that the Registration expires alert is triggered 
	'9 Exit the loan
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
'go to Tools->Secondary Registration
BIZ_Tools_Open "Secondary Registration"
'go to the Regitration tab
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlCurrent"), "Registration"
'Click Add Registration button
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=Button19")
'Enter Registration data
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=AddRegistrationDialog").SwfEdit("swfname:=txtDate","swfname path:=txtDate;dtCreatedDate;AddRegistrationDialog"), Date
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=AddRegistrationDialog").SwfEdit("swfname:=txtDate","swfname path:=txtDate;dtExpiredDate;AddRegistrationDialog"), Date + 1
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=AddRegistrationDialog").SwfButton("swfname:=okBtn")
Set objAlerts = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
'Verfiy that the Registration expires alert is triggered 
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Registration expires"), "Verify Alert", "Verify that the alert triggered is Registration expires"
'Exit the loan
BIZ_Loan_Exit(False)






