'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-3423 The objective of test case is to verify synced 'Dashboard Snapshot' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3572 SettingsSync_Dashboard_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Dashboard, SnapShots, SettingSync_Snapshot
'@ Pre-conditions: 
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'1 The objective of test case is to verify synced 'Dashboard Snapshot' data in Environment 2 should match with Environment 1
	'2 The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Select Settings-> Dashboard -> Dashboard Snapshot
	'2 Click on New icon in Environment1.
	'3 Enter Snapshot name.
	'4 Enter the data
	'5 Click on save icon
	'6 Select the created template in Environment 1 and click sync to arrow button
	'7 Click on Ok button.
	'8 Verify that the Template data in Environment 2 should match with Environment1
	'9 Delete the created record in both environments
'@ ExpectedResult:
	'1 Dashboard Snapshot module opens.
	'2 Templates should create.
	'3 Name should be entered.
	'4 Data should be entered.
	'5 Snapshot should be saved.
	'6 File System Setting pop-up opens
	'7 Template should be synced to Environment2.
	'8 Template data in Environment 2 should match with Environment1
	'9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3423", "The objective of test case is to verify synced 'Dashboard Snapshot' data in Environment 2 should match with Environment 1", Null

'====== Select Dashboard Snapshot Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Dashboard Snapshot"
Wait g_ShortWaitMedium

Dim strSnapShotName, boolExist, strDesc
'====== Create new Dashboard Snapshot in Environment 1 ======
'====== Validate Dashboard Snapshot in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_CreateNewTemplate", "Create new Dashboard Snapshot in Environment 1", Null
strSnapShotName = Settings_Sync_Dashboard_CreateNewTemplate("SettingSync_Snapshot", 1)
boolExist 		= Settings_Sync_Dashboard_SelectTemplate(strSnapShotName, 1)
FRM_VerifyEqual boolExist, True, "'"&strSnapShotName&"' is created", "'"&strSnapShotName&"' is present in list."
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetSnapshotTabData", "Set data in Snapshot tab in Environment 1", Null
Settings_Sync_Dashboard_SetSnapshotTabData "SettingSync_Snapshot", 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateSnapshotTabData", "Validate data in Snapshot tab in Environment 1", Null
Settings_Sync_Dashboard_ValidateSnapshotTabData "SettingSync_Snapshot", 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFoldersTabData", "Set data in Folders tab in Environment 1", Null
Settings_Sync_Dashboard_SetFoldersTabData "SettingSync_Snapshot", 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateFoldersTab", "Validate data in Folders tab in Environment 1", Null
Settings_Sync_Dashboard_ValidateFoldersTab "SettingSync_Snapshot", 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_SetFitersData", "Set data in Filters tab in Environment 1", Null
strDesc = Settings_Sync_Dashboard_SetFiltersData("SettingSync_Snapshot", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFiltersTab", "Validate data in Filters tab in Environment 1", Null
Settings_Sync_Reports_ValidateFiltersTab "SettingSync_Snapshot", strDesc, 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Validate Synced Snapshot", "Validate '"&strSnapShotName&"' is synced to Environment 2", Null
boolExist = Settings_Sync_Dashboard_SelectTemplate(strSnapShotName, 0)
FRM_VerifyEqual boolExist, True, "'"&strSnapShotName&"' is synced", "'"&strSnapShotName&"' is synced to Environment 2"

'====== Validate data in Snapshot tab in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateSnapshotTabData", "Validate data in Snapshot tab in Environment 2", Null
Settings_Sync_Dashboard_ValidateSnapshotTabData "SettingSync_Snapshot", 0

'====== Validate data in Folders tab in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_ValidateFoldersTab", "Validate data in Folders tab in Environment 2", Null
Settings_Sync_Dashboard_ValidateFoldersTab "SettingSync_Snapshot", 0

'====== Validate data in Filters tab in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFiltersTab", "Validate data in Filters tab in Environment 2", Null
Settings_Sync_Reports_ValidateFiltersTab "SettingSync_Snapshot", strDesc, 0

'====== Delete Dashboard Snapshot in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard Snapshot '"&strSnapShotName&"' in Environment 1", Null
Settings_Sync_Dashboard_DeleteTemplate strSnapShotName, 1

'====== Delete Dashboard Snapshot in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Dashboard_DeleteTemplate", "Delete Dashboard Snapshot '"&strSnapShotName&"' in Environment 2", Null
Settings_Sync_Dashboard_DeleteTemplate strSnapShotName, 0