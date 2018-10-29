'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase:
	'1 PTAC-3335 The objective of test case is to verify synced 'Closing Doc Plan codes' in Environment 1 should match with Environment 2
	'2 PTAC-3337 The objective of test case is to verify synced 'Closing Doc Stacking Templates' in Environment 1 should match with Environment 2
	'3 PTAC-3334 The objective of test case is to verify synced 'eDisclosure Plan codes' in Environment 1 should match with Environment 2
	'4 PTAC-3336 The objective of test case is to verify synced 'eDisclosure Stacking Templates' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3431 SettingsSync_DocsSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_DocsSetup, StackingTemplates, SettingsSync_eDiscStackTemp
	'4 Settings_DocsSetup, EDisclosurePlanCodes, SettingsSync_EDiscPlanCodes
	'5 Settings_DocsSetup, EDisclosurePlanCodes, SettingsSync_DocPlanCodes
	'6 Settings_DocsSetup, StackingTemplates, SettingsSync_ClosDocStackTemp 
'@ Pre-conditions: Login into Settings Sync Tool with Environment1 and Environment2 credentials.
'		Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'1 The objective of test case is to verify synced 'Closing Doc Plan codes' in Environment 1 should match with Environment 2
	'2 The objective of test case is to verify synced 'Closing Doc Stacking Templates' in Environment 1 should match with Environment 2
	'3 The objective of test case is to verify synced 'eDisclosure Plan codes' in Environment 1 should match with Environment 2
	'4 The objective of test case is to verify synced 'eDisclosure Stacking Templates' in Environment 1 should match with Environment 2
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3431", "Script Name - SettingsSync_DocsSetup_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Docs Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Docs Setup"

RunAction "SettingsSync_EDisclosurePlanCodes_VerifySyncedEnv1DetailWithEnv2", oneIteration

RunAction "SettingsSync_ClosingDocPlanCodes_VerifySyncedEnv1DetailWithEnv2", oneIteration

RunAction "SettingsSync_eDiscStackingTemplates_VerifySyncedEnv1DetailWithEnv2", oneIteration

RunAction "SettingsSync_ClosingDocStackingTemplates_VerifySyncedEnv1DetailWithEnv2", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)



	



