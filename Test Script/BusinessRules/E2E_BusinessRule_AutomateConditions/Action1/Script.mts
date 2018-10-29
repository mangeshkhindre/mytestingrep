
FRM_RT_SetupTest(null)	

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If

BIZ_Nav_Settings_Close

RunAction "BR_AutomatedConditions", oneIteration, "1"

RunAction "BR_AutomatedConditions", oneIteration, "2"

RunAction "BR_AutomatedConditions", oneIteration, "3"

RunAction "BR_AutomatedConditions", oneIteration, "4"

RunAction "BR_AutomatedConditions", oneIteration, "5"

RunAction "BR_AutomatedConditions", oneIteration, "6"

RunAction "BR_AutomatedConditions", oneIteration, "7"

RunAction "BR_AutomatedConditions", oneIteration, "8"

RunAction "BR_AutomatedConditions", oneIteration, "9"
 @@ hightlight id_;_65782_;_script infofile_;_ZIP::ssf28.xml_;_
RunAction "BR_AutomatedConditions", oneIteration, "10"

'======== Logout from Encompass ========   
BIZ_Login_UserLogout

FRM_RT_TeardownTest (Null)
