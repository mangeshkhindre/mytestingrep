'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3424 The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3572 SettingsSync_Dashboard_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Dashboard, SnapShots, SettingSync_Snapshot
	'4 Dashboard, SnapShots, SettingSync_View	
'@ Pre-conditions: 
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Select Settings-> Dashboard -> Dashboard View
	'2 Click on New icon in Environment1.
	'3 Enter View name.
	'4 Enter the data
	'5 Click on save icon
	'6 Select the created template in Environment 1 and click sync to arrow button
	'7 Click on Ok button.
	'8 Click on Ok button.
	'9 Verify that the View and snapshots data in Environment 2 should match with Environment1
	'10 Delete the created record in both environments
'@ ExpectedResult:
	'1 Dashboard View module opens.
	'2 Templates should create.
	'3 Name should be entered.
	'4 Data should be entered.
	'5 Snapshot should be saved.
	'6 File System Setting pop-up opens
	'7 File System Setting pop-up opens to sync snapshot A
	'8 File System Setting pop-up opens to sync snapshot B
	'9 View and snapshots should be synced to Environment2.
	'10 View and snapshots data in Environment 2 should match with Environment1
	'11 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3424", "The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1", Null

'====== Select Dashboard Snapshot Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Dashboard Snapshot"
Wait g_ShortWaitMedium

FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_CreateNewTemplate", "PreCondition - Atleast 2 snapshots (SnapshotA, SnapshotB) should be present in Environment1 which are not present in Environment2.", Null
Dim strSnapShotName1, boolExist, strDesc, strSnapShotName2
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_CreateNewTemplate", "Create First Dashboard Snapshot ", Null
strSnapShotName1 = Settings_Sync_Dashboard_CreateNewTemplate("SettingSync_Snapshot", 1)
Wait g_ShortWaitMedium
boolExist = Settings_Sync_Dashboard_SelectTemplate(strSnapShotName1, 1)
Wait g_ShortWaitMedium
FRM_VerifyEqual boolExist, True, "First Dashboard Snapshot '"&strSnapShotName1&"' is created", "First Dashboard Snapshot '"&strSnapShotName1&"' is present in list."
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetSnapshotTabData", "Set data in Snapshot tab for first Dashboard Snapshot", Null
Settings_Sync_Dashboard_SetSnapshotTabData "SettingSync_Snapshot", 1
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFoldersTabData", "Set data in Folders tab for first Dashboard Snapshot", Null
Settings_Sync_Dashboard_SetFoldersTabData "SettingSync_Snapshot", 1
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFitersData", "Set data in Filters tab for first Dashboard Snapshot", Null
strDesc = Settings_Sync_Dashboard_SetFiltersData("SettingSync_Snapshot", 1)
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_CreateNewTemplate", "Create Second Dashboard Snapshot ", Null
strSnapShotName2 = Settings_Sync_Dashboard_CreateNewTemplate("SettingSync_Snapshot", 1)
Wait g_ShortWaitMedium
'GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=1")
boolExist = Settings_Sync_Dashboard_SelectTemplate(strSnapShotName2, 1)
FRM_VerifyEqual boolExist, True, "Second Dashboard Snapshot '"&strSnapShotName2&"' is created", "Second Dashboard Snapshot '"&strSnapShotName2&"' is present in list."
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetSnapshotTabData", "Set data in Snapshot tab for Second Dashboard Snapshot", Null
Settings_Sync_Dashboard_SetSnapshotTabData "SettingSync_Snapshot", 1
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFoldersTabData", "Set data in Folders tab for Second Dashboard Snapshot", Null
Settings_Sync_Dashboard_SetFoldersTabData "SettingSync_Snapshot", 1
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFitersData", "Set data in Filters tab for Second Dashboard Snapshot", Null
strDesc = Settings_Sync_Dashboard_SetFiltersData("SettingSync_Snapshot", 1)
Wait g_ShortWaitMedium
'====== Select Dashboard View Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Dashboard View"
Wait g_ShortWaitMedium

'====== Create new Dashboard View in Environment 1 ======
'====== Validate Dashboard View in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_CreateNewTemplate", "Create new Dashboard View in Environment 1", Null
strView = Settings_Sync_Dashboard_CreateNewTemplate("SettingSync_View", 1)
Wait g_ShortWaitMedium
boolExist = Settings_Sync_Dashboard_SelectTemplate(strView, 1)
FRM_VerifyEqual boolExist, True, "'"&strView&"' is created", "'"&strView&"' is present in list."
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetDashboardViewData", "Set data for Dashboard View in Environment 1", Null
Settings_Sync_Dashboard_SetDashboardViewData "SettingSync_View", strSnapShotName1, strSnapShotName2, 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateDashboardViewData", "Validate data for Dashboard View in Environment 1", Null
Settings_Sync_Dashboard_ValidateDashboardViewData "SettingSync_View", strSnapShotName1, strSnapShotName2, 1
Wait g_ShortWaitMedium
'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Validate Synced Dashboard View", "Validate '"&strView&"' is synced to Environment 2", Null
boolExist = Settings_Sync_Dashboard_SelectTemplate(strView, 0)
FRM_VerifyEqual boolExist, True, "'"&strView&"' is created", "'"&strView&"' is present in list."
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateDashboardViewData", "Validate data for Dashboard View in Environment 2", Null
Settings_Sync_Dashboard_ValidateDashboardViewData "SettingSync_View", strSnapShotName1, strSnapShotName2, 0

'====== Delete Dashboard View in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard View '"&strView&"' in Environment 1", Null
Settings_Sync_Dashboard_DeleteTemplate strView, 1

'====== Delete Dashboard View in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard View '"&strView&"' in Environment 2", Null
Settings_Sync_Dashboard_DeleteTemplate strView, 0

'====== Select Dashboard Snapshot Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Dashboard Snapshot"
Wait g_ShortWaitMedium

'====== Delete Dashboard Snapshot ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard Snapshot '"&strSnapShotName1&"' ", Null
Settings_Sync_Dashboard_DeleteTemplate strSnapShotName1, 1

'====== Delete Dashboard Snapshot ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard Snapshot '"&strSnapShotName1&"' ", Null
Settings_Sync_Dashboard_DeleteTemplate strSnapShotName2, 1
