'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC - 3293 The objective of test case is to verify synced Documents Status data in Environment 2 should match with Environment1
	'2 PTAC - 3294 The objective of test case is to verify synced Document Export Templates data in Environment 2 should match with Environment1
	'3 PTAC - 3296 The objective of test case is to verify synced Conditions data in Environment 2 should match with Environment 1
	'4 PTAC - 3298 The objective of test case is to verify synced Post-Closing Conditions data in Environment 2 should match with Environment1
	'5 PTAC - 3300 The objective of test case is to verify synced HTML Email Templates data in Environment 2 should match with Environment1
	'6 PTAC - 3299 The objective of test case is to verify synced Post-Closing Conditions Set data in Environment 2 should match with Environment1
	'7 PTAC - 3297 The objective of test case is to verify synced Conditions Set data in Environment 2 should match with Environment1
	'8 PTAC - 3295 The objective of test case is to verify synced Document Stacking Templates data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Document, SettingsSync_Documents
	'4 eFolder_Tab, Document, SettingsSync_DocExpoTemp
	'5 eFolder_Tab, Conditions, SettingsSync_Condition
	'6 eFolder_Tab, Conditions, SettingsSync_PostCloseCondition
	'7 eFolder_Tab, EmailTemplate, SettingsSync_EmailTemplate
	'8 eFolder_Tab, Conditions, SettingsSync_PostCloseConditionSets
	'9 eFolder_Tab, Conditions, SettingsSync_ConditionSet
	'10 eFolder_Tab, Document, SettingsSync_DocStackTemp
'@ Pre-conditions:  Login into Settings Sync Tool with Environment1 and Environment2 credentials.
'		Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'1 The objective of test case is to verify synced Documents Status data in Environment 2 should match with Environment1
	'2 The objective of test case is to verify synced Document Export Templates data in Environment 2 should match with Environment1
	'3 The objective of test case is to verify synced Conditions data in Environment 2 should match with Environment 1
	'4 The objective of test case is to verify synced Post-Closing Conditions data in Environment 2 should match with Environment1
	'5 The objective of test case is to verify synced HTML Email Templates data in Environment 2 should match with Environment1
	'6 The objective of test case is to verify synced Post-Closing Conditions Set data in Environment 2 should match with Environment1
	'7 The objective of test case is to verify synced Conditions Set data in Environment 2 should match with Environment1
	'8 The objective of test case is to verify synced Document Stacking Templates data in Environment 2 should match with Environment1
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3435", "Script Name - SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select eFolder Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "eFolder Setup"

RunAction "SettingsSync_Documents_VerifySyncedEnv1DetailWithEnv2_001", OneIteration

RunAction "SettingsSync_DocExportTemplate_VerifySyncedEnv1DetailWithEnv2_002", OneIteration

RunAction "SettingsSync_Conditions_VerifySyncedEnv1DetailWithEnv2_003", OneIteration, strTempName

RunAction "SettingsSync_ConditionSets_VerifySyncedEnv1DetailWithEnv2_004", oneIteration, strTempName

'====== Delete Condition in Environment 1 ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Conditions"
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Condition '"&strTempName&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strTempName, 1

'====== Delete Condition in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Condition '"&strTempName&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strTempName, 0

RunAction "SettingsSync_PostClosingConditions_VerifySyncedEnv1DetailWithEnv2_005", oneIteration, strPostTempName

RunAction "SettingsSync_PostClosingConditionSets_VerifySyncedEnv1DetailWithEnv2_006", oneIteration, strPostTempName

'====== Delete Post-Closing Condition in Environment 1 ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Post-Closing Conditions"
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Post-Closing Condition '"&strPostTempName&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strPostTempName, 1

'====== Delete Post-Closing Condition in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Post-Closing Condition '"&strPostTempName&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strPostTempName, 0

RunAction "SettingsSync_HTMLEmailTemplate_VerifySyncedEnv1DetailWithEnv2_007", oneIteration

RunAction "SettingsSync_DocumentStakingTemplates_VerifySyncedEnv1DetailWithEnv2_008", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
