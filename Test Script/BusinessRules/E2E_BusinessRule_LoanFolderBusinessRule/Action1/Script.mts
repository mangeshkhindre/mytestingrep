FRM_RT_SetupTest(Null)

strLoanFolder = "BR_LoanFolder"

'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"

'====== Pre Condition to Create Loan Folder and User ID with persona ======
BIZ_Settings_CreateNewLoanFolder strLoanFolder

'====== settings to Loan folder in 'User Groups' ======
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"

Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
GUI_List_Select objMainView.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objMainView.SwfTab("swfname:=tabControl1"),"Loans"
intRowIndex = GUI_List_GetRowIndex(objMainView.SwfListView("swfname:=listViewLoanFolders"), 0, strLoanFolder)
GUI_SwfList_SetCheckbox objMainView.SwfListView("swfname:=listViewLoanFolders"), strLoanFolder, micchecked
GUI_SwfObject_Click objMainView.SwfObject("swfname:=stdIconBtnSave")


'====== Create a new user ======
BIZ_OrganizationUsers_CreateUser "1533_LoanStatus"

Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objUsersAvaliable = objSettings.SwfObject("swfname:=gvUsers")
Set objScrollBar = objUsersAvaliable.SwfScrollBar("swfname:=vPanelScrollBar")
Set objUserDetails = objSettings.SwfWindow("swfname:=AddEditUserCEDialog")
Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "1533_LoanStatus")
Set objPersonaSettingsWnd = objUserDetails.SwfWindow("swfname:=PersonaSettingsMainForm")

strUserId = objData.Item("UserID")
GUI_List_ClickRow objUsersAvaliable, objScrollBar, 0, strUserId, True, False, False, "Double"
GUI_SwfObject_Click objUserDetails.SwfButton("swfname:=btnViewPersonaRights")
GUI_Object_WaitTillExistX objPersonaSettingsWnd,90
GUI_SwfTab_Click objPersonaSettingsWnd.SwfTab("swfname:=tabControl1"),"Pipeline"
GUI_SwfCheckbox_Set objPersonaSettingsWnd.SwfCheckBox("swfname:=cxbModify"),"ON"
If objPersonaSettingsWnd.Dialog("text:=Encompass").Exist(5) Then
'	strText=Dialog("text:=Encompass").Static("text:=.*create personalized security settings.*").GetROProperty("text")	
	If objPersonaSettingsWnd.Dialog("text:=Encompass").WinButton("text:=&Yes", "index:=0").Exist(2) Then
		objPersonaSettingsWnd.Dialog("text:=Encompass").Activate
		objPersonaSettingsWnd.Dialog("text:=Encompass").WinButton("text:=&Yes", "index:=0").Click
		FRM_Logger_ReportInfoEvent "Encompass Dialog box click", "Clicked Yes button on Dialog box having text '"&strText&"'", null
	End If
End If	

GUI_SwfTreeView_SetCheckBoxItemStates objPersonaSettingsWnd.SwfTreeView("swfname:=treeViewTabs","index:=0"), "Move Loans", True
GUI_SwfTreeView_Select objPersonaSettingsWnd.SwfTreeView("swfname:=treeViewTabs","index:=0"), "Move Loans"
GUI_SwfTreeView_SetCheckBoxItemStates objPersonaSettingsWnd.SwfWindow("swfname:=MoveLoanFolderDlg").SwfTreeView("swfname:=tvMoveFrom"), "My Pipeline", True
GUI_SwfTreeView_SetCheckBoxItemStates objPersonaSettingsWnd.SwfWindow("swfname:=MoveLoanFolderDlg").SwfTreeView("swfname:=tvMoveTo"), strLoanFolder , True
GUI_SwfButton_Click objPersonaSettingsWnd.SwfWindow("swfname:=MoveLoanFolderDlg").SwfButton("swfname:=btnOK")
GUI_SwfButton_Click objPersonaSettingsWnd.SwfButton("swfname:=btnClose")
GUI_Dialog_Encompass_Yes ""
objUserDetails.SwfButton("swfname:=okBtn").Object.PerformClick
BIZ_Nav_Settings_Close

RunAction "PTAC-1424-1266-VerifyLoanFolderBR", oneIteration, strLoanFolder

RunAction "PTAC-1426-1427-VerifyLoanFolderBR", oneIteration, strLoanFolder

'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"

BIZ_Nav_SelectPipelineTab
BIZ_Pipeline_SelectLoanFolder strLoanFolder
intNumberOfLoans = CINT(BIZ_Pipeline_GetNumberOfLoansInPipeline)
For i = 0 To intNumberOfLoans - 1
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),0,True,True,False,"Single"
		BIZ_Loan_DeleteLoan
Next	
BIZ_Settings_DeleteLoanFolder strLoanFolder
BIZ_Nav_Settings_Close
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
