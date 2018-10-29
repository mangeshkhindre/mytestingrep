'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-3198 The objective of test case is to verify synced Borrower Custom Fields data in Environment 2 should match with Environment1
	'2 PTAC-3199 The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
	'3 PTAC-3201 The objective of test case is to verify synced Borrower Contact Status data in Environment 2 should match with Environment1
	'4 PTAC-3202 The objective of test case is to verify synced Business Categories data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3436 SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_ContactSetUp, CustomFields, SettingSync_BorrData
	'4 Settings_ContactSetUp, CustomFields, SettingSync_BizData
	'5 Settings_ContactSetUp, CustomFields, SettingSync_CatData
	'6 Settings_ContactSetUp, CustomFields, SettingSync_Status
'@ Pre-conditions:  Login into Settings Sync Tool with Environment1 and Environment2 credentials.
'		Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'1 The objective of test case is to verify synced Borrower Custom Fields data in Environment 2 should match with Environment1
	'2 The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
	'3 The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
	'4 The objective of test case is to verify synced Business Categories data in Environment 2 should match with Environment1
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3436", "Script Name - SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2", Null

RunAction "SettingsSync_BorrCustomFields_VerifySyncedEnv1DetailWithEnv2_001", oneIteration

RunAction "SettingsSync_BusinessCustomFields_VerifySyncedEnv1DetailWithEnv2_002", oneIteration

'====== Select Contact Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Contact Setup"
Wait g_ShortWaitMedium

RunAction "SettingsSync_BorrowerContactStatus_VerifySyncedEnv1DetailWithEnv2_003", oneIteration

RunAction "SettingsSync_BusinessCategories_VerifySyncedEnv1DetailWithEnv2_004", oneIteration

''====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
