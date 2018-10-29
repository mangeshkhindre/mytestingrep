'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
   '1 PTAC-1895 The objective of test case is to verify synced Persona data in Environment 2 should match with Environment 1
   '2 PTAC-1897 The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1
   '3 PTAC-2078 The objective of test case is to verify synced Role data in Environment 2 should match with Environment 1
   '4 PTAC-2079 The objective of test case is to verify synced Milestone data in Environment 2 should match with Environment 1
   '5 PTAC-2080 The objective of test case is to verify synced Milestone Template data in Environment 2 should match with Environment 1
   '6 PTAC-2081 The objective of test case is to verify synced Org data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 CompanyUserSetup, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps: Updated in Action Level
'@ ExpectedResult: Updated in Action Level
'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3439","Script Name - SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open the admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"

''====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Company/User Setup"

''The objective of test case is to verify synced Persona data in Environment 2 should match with Environment 1
'RunAction "SettingsSync_CompanyUserSetUp_Personas_001", oneIteration

'The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1
RunAction "SettingsSync_CompanyUserSetup_UserGroups_002", oneIteration

'The objective of test case is to verify synced Role data in Environment 2 should match with Environment 1
RunAction "SettingsSync_CompanyUserSetup_Roles_003", oneIteration

'The objective of test case is to verify synced Milestone data in Environment 2 should match with Environment 1
RunAction "SettingsSync_CompanyUserSetup_MileStones_004", oneIteration

'The objective of test case is to verify synced Milestone Template data in Environment 2 should match with Environment 1
RunAction "SettingsSync_CompanyUserSetUp_MileStonesTemplates_005", oneIteration, Parameter("SettingsSync_CompanyUserSetup_MileStones_004", "strMileStoneName")

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
