'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_BorrowerSummaryorigination.xls "SetCreditInformation" "OtherAlerts_CreditInformation"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata"
	'Forms_TransmittalSummary.xls "SetProperty" "OtherAlerts_Property"
	'Forms_TransmittalSummary.xls "SetUnderwritingInfo" "OtherAlerts_UnderwritingInfo"
	'Tools_LockRequestForm.xls "SetRequest" "OtherAlerts_Request"
	'Tools_LockRequestForm.xls "SetProperty" "OtherAlerts_Property"
	'Tools_LockRequestForm.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Tools_LockRequestForm.xls "SetRateLockRequest" "OtherAlerts_RateLockRequest"
''@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add a new blank loan
	'2 Set data on Borrower summary Origination form
	'3 save the loan
	'4 Retrieve the loan number
	'5 Set data on RegZ CD form
	'6 set data on Transmittal Summary form
	'7 GoTo to Tools->Lock Request form
	'8 Set data on Lock request form
	'9 save the loan
	'10 Click on submit request
	'11 Re-enter the loan
	'12 Verify that Lock requested alert is triggered
	'13 go to Tools->Secondary Registration
	'14 open the requested lock request record
	'15 click on Deny lock button, enter comments and click OK
	'16 verify that lock denied alert is triggered
	'17 go to Tools->Secondary Registration
	'18 open the denied lock record
	'19 click on Revise lock button
	'20 Enter data
	'21 Click on Lock and confirm button
	'22 verify that lock confirmed alert is triggered
	'23 Edit data on the borrower summary origination form
	'24 verify that Key pricing fields alert is triggered
	'25 Exit the loan
'@ ExpectedResult: 
'********************************************************************************************
'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'Set data on Borrower summary Origination form
BIZ_BorrowerSummaryOrigination_SetBorrower "OtherAlerts_Borrower"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "OtherAlerts_TransactionDetails"
BIZ_BorrowerSummaryOrigination_SetProperty "OtherAlerts_Property"
BIZ_BorrowerSummaryOrigination_SetCreditInformation "OtherAlerts_CreditInformation"
'save the loan
BIZ_Loan_Save()
'Retrieve the loan number
strLoanNumber = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_364"), "value")
'Set data on RegZ CD form
BIZ_RegZ_CD_SetData "OtherAlerts_Setdata"
'set data on Transmittal Summary form
BIZ_TransmittalSummary_SetProperty "OtherAlerts_Property"
BIZ_TransmittalSummary_SetUnderwritingInfo "OtherAlerts_UnderwritingInfo"
'GoTo to Tools->Lock Request form
BIZ_Tools_Open "Lock Request Form"
'Set data on Lock request form
BIZ_LockRequestForm_SetRequest "OtherAlerts_Request"
BIZ_LockRequestForm_SetProperty "OtherAlerts_Property"
BIZ_LockRequestForm_SetTransactionDetails "OtherAlerts_TransactionDetails"
BIZ_LockRequestForm_SetRateLockRequest "OtherAlerts_RateLockRequest"
'save the loan
BIZ_Loan_Save()
'Click on Submit request
BIZ_LockRequestForm_SubmitRequest "ExitLoan"
GUI_Dialog_Encompass_NoX 10, ""
GUI_Dialog_Encompass_NoX 10, "" 
'Reenter the loan
BIZ_Loan_OpenByLoanNumber strLoanNumber
Set objAlerts = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
'Verify that Lock requested alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Lock requested by Admin User"), "Verify Alert", "Verify that the alert triggered is Lock requested by Admin User"
'go to Tools->Secondary Registration
BIZ_Tools_Open "Secondary Registration"
'open the requested lock request record
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridSnapshot"), 0, True, False, False, "Double"
'click on Deny lock button, enter comments and click OK
GUI_SwfButton_click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfButton("swfname:=btnDeny")
GUI_SwfEditor_Type SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfWindow("swfname:=DenialCommentsForm").SwfEditor("swfname:=textBoxComments"), "Deny lock"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfWindow("swfname:=DenialCommentsForm").SwfButton("swfname:=btnOK")
'verify that lock denied alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Lock denied by Admin User"), "Verify Alert", "Verify that the alert triggered is Lock denied by Admin User"
'go to Tools->Secondary Registration
BIZ_Tools_Open "Secondary Registration"
'open the denied lock record
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridSnapshot"), 0, True, False, False, "Double"
'click on Revise lock button
GUI_SwfButton_click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfButton("swfname:=btnRevise")
'enter data
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfEdit("swfname:=txtDate", "swfname path:=txtDate;txtBuyLockDate;pnlBuysideLock;pnlBuySideLockPricingField;.*"), Date
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfEdit("swfname:=txtDate", "swfname path:=txtDate;txtBuyExpireDate;pnlBuySideLockExpDate;.*"), Date+1
'clcik on lock and confirm button
GUI_SwfButton_click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfButton("swfname:=btnLockConfirm")
GUI_SwfButton_click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").SwfWindow("swfname:=LockSnapshotCompareForm").SwfButton("swfname:=btnConfirm")
GUI_DialogObject_Encompass_OKX  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=BuySellForm").Dialog("text:=Encompass"), 5, "successfully confirmed" 
'verify that lock confirmed alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Lock confirmed by Admin User"), "Verify Alert", "Verify that the alert triggered is Lock confirmed by Admin User"
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Lock expires"), "Verify Alert", "Verify that the alert triggered is Lock expires"
'Edit data on the borrower summary origination form
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "OtherAlerts_TransactionDetails_Step20"
'verify that Key pricing fields alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "Key Pricing Fields"), "Verify Alert", "Verify that the alert triggered is Key Pricing Fields"
'Exit the loan
BIZ_Loan_Exit(False)



