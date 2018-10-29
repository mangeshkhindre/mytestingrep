'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-3423 The objective of test case is to verify synced 'Dashboard Snapshot' data in Environment 2 should match with Environment 1
	'2 PTAC-3424 The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3572 SettingsSync_Dashboard_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Dashboard, SnapShots, SettingSync_Snapshot
	'4 Dashboard, SnapShots, SettingSync_View
'@ Pre-conditions: 
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'1 The objective of test case is to verify synced 'Dashboard Snapshot' data in Environment 2 should match with Environment 1
	'2 The objective of test case is to verify synced 'Dashboard View' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'Updated at action level
'@ ExpectedResult:
	'Updated at action level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3572", "Script Name - SettingsSync_Dashboard_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Dashboard in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Dashboard"

RunAction "SettingsSync_DashboardSnapshot_VerifySyncedEnv1DetailWithEnv2", oneIteration

RunAction "SettingsSync_DashboardView_VerifySyncedEnv1DetailWithEnv2", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
