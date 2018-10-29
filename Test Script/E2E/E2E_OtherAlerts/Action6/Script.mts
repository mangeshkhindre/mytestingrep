'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata
	'Setttings_CompanyUserSetup.xls "OrganizationUsers_CreateUser" "sven_officer"
	'Global_Data.xls "Login" "sven_officer"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 go to Company/User Setup->Organization/Users
	'2 delete the user sven_officer
	'3 create a new user sven_officer
	'4 Close the settings
	'5 Add a new blank loan
	'6 set data on Borrower Summary Origination
	'7 Set data on RegZ-CD
	'8 Click on the Log tab
	'9 Select the Qualification milestone
	'10 Assign the previously created loan officer
	'11 Click the eFolder button
	'12 Click Add document button
	'13 Click the Comments tab
	'14 Clcik the Add icon
	'15 Enter comments
	'16 Check the checkbox for Send update Alert
	'17 Select Loan Officer
	'18 Close the add document window
	'19 Save the loan
	'20 Retrieve the loan number
	'21 Exit the loan
	'22 logout of Encompass
	'23 Login to Encompass as sven_officer
	'24 go to pipeline tab
	'25 Re-enter the saved loan
	'26 Verify that the eFolder update alert is triggered
	'27 logout of Encompass
	'28 Login to Encompass as admin
'@ ExpectedResult: 
'********************************************************************************************
'go to Company/User Setup->Organization/Users
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
'delete the user sven_officer
BIZ_OrganizationUsers_DeleteExistingUser "sven_officer"
'create a new user sven_officer
BIZ_OrganizationUsers_CreateUser "sven_officer"
'Close the settings
BIZ_Nav_Settings_Close()
'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View", "My Pipeline"
'set data on Borrower Summary Origination
BIZ_BorrowerSummaryOrigination_SetBorrower "OtherAlerts_Borrower"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "OtherAlerts_TransactionDetails"
BIZ_BorrowerSummaryOrigination_SetProperty "OtherAlerts_Property"
'Set data on RegZ-CD
BIZ_RegZ_CD_SetData "OtherAlerts_Setdata"
'Click on the Log tab
GUI_SwfObject_SelectTab SwfWindow("swfname:=MainForm").SwfObject("swfname:=tabsLog"), "Log"
'Select the Qualification milestone
boolExist = GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, "Qualification", False, False, False, "Single")
If Not boolExist Then
	GUI_List_ClickRow  SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, "Qualification Expected", False, False, False, "Single"
End If
'Assign the previously created loan officer
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfScrollBar("swfname:=vPanelScrollBar"), 0, "sven_officer", True, False, False, "Double"
'Click the eFolder button
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=eFolderBtn")
'Click Add document button
GUI_SwfObject_Click SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=btnNew")
GUI_SwfButton_Click SwfWindow("swfname:=eFolderDialog").SwfWindow("swfname:=AddDocumentDialog").SwfButton("swfname:=btnOK")
'Click the Comments tab
GUI_SwfTab_Click SwfWindow("swfname:=DocumentDetailsDialog").SwfTab("swfname:=tabTracking"), "Comments"
'Click the Add icon
GUI_SwfObject_Click SwfWindow("swfname:=DocumentDetailsDialog").SwfButton("swfname:=btnAdd")
'Enter comments
GUI_SwfEditor_Type SwfWindow("swfname:=DocumentDetailsDialog").SwfWindow("swfname:=CommentEntryDialog").SwfEditor("swfname:=txtComments"), "sample comments"
'Check the checkbox for Send update Alert
GUI_SwfCheckBox_Set SwfWindow("swfname:=DocumentDetailsDialog").SwfWindow("swfname:=CommentEntryDialog").SwfCheckBox("swfname:=chkForRole"), "ON"
'Select Laon Officer
GUI_SwfComboBox_Select SwfWindow("swfname:=DocumentDetailsDialog").SwfWindow("swfname:=CommentEntryDialog").SwfComboBox("swfname:=cboForRole"), "Loan Officer"
'Close the add document window
GUI_SwfButton_Click SwfWindow("swfname:=DocumentDetailsDialog").SwfWindow("swfname:=CommentEntryDialog").SwfButton("swfname:=btnOK")
GUI_SwfButton_Click SwfWindow("swfname:=DocumentDetailsDialog").SwfButton("swfname:=btnClose")
GUI_SwfButton_Click SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnClose")
'save the loan
BIZ_Loan_Save()
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff"), 5) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")
End If
'Retrieve the loan number
strLoanNumber = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfLabel("swfname:=lblLoanNumber"), "text")
'Exit the loan
BIZ_Loan_Exit(False)
'logout of Encompass
BIZ_Login_UserLogout()
'Login to Encompass as sven_officer
BIZ_Login_UserLogin "sven_officer"
'Go to pipeline tab
BIZ_Nav_SelectPipelineTab()
GUI_SwfComboBox_Select SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboFolder"), "My Pipeline"
'Re-enter the saved loan
BIZ_Loan_OpenByLoanNumber strLoanNumber
wait 5
Set objAlerts = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
'Verify that the eFolder update alert is triggered
FRM_VerifyTrue GUI_List_TextExists(objAlerts, 0, "eFolder update - sample comments"), "Verify Alert", "Verify that the alert triggered is eFolder update - sample comments"
BIZ_Loan_Exit(False)
'logout of Encompass
BIZ_Login_UserLogout()
'Login to Encompass as Admin
BIZ_Login_UserLogin "sven_admin"









