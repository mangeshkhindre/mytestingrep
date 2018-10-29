
'=========================================================
FRM_RT_SetupTest(Null)

BIZ_Login_UserLogin "admin_core2p"

'====== Create Loan Folder ======
'BIZ_Settings_CreateNewLoanFolder "Automation"

Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
'GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
'GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
'GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
'If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
'	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
'End If

'BIZ_Nav_Settings_Close

BIZ_OrganizationUsers_CreateUser "PTAC-1559"
BR_BusinessRules_Close
BR_Collateraltracking_NonAdminUser_SetCheckBox "PTAC-1559"
BIZ_Nav_Settings_Close

RunAction "BR_VerifyNewCarrier", oneIteration

RunAction "BR_VerifyNextFollowUpDate", oneIteration

BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)

'==============================================================

