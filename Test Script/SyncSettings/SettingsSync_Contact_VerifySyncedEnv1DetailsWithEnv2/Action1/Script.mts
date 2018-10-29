'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
   '1 PTAC-3195 The objective of test case is to verify synced Business Contacts-Custom Letters in Environment 2 should match with Environment 1
   '2 PTAC-3197 The objective of test case is to verify synced Business Contacts-Custom Letters(2nd tab) in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3437 SettingsSync_Contact_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 CompanyUserSetup, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps: Updated in Action Level
'@ ExpectedResult: Updated in Action Level
'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3437","Script Name - SettingsSync_Contact_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open the admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitSmall

'====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Contacts"
Wait g_LongWaitSmall

'The objective of test case is to verify synced Business Contacts-Custom Letters in Environment 2 should match with Environment 1
RunAction "SettingsSync_Contacts_CustomLetters1_001", oneIteration

'The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1
RunAction "SettingsSync_Contacts_CustomLetters2_002", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
