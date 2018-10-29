'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3302 -  verify synced TPO Fees data in Environment 2 should match with Environment1
   '2 PTAC-3303	-  verify synced TPO Custom fields in Environment 2 should match with Environment1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3434 SettingsSync_ExternalCompanySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:
   '1 Settings_CompanySettings,TPOFees and PTAC-3302
   '2 Settings_CompanySettings,TPOFees and PTAC-3303
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select External Company Setup
'@ Description: SettingsSync_ExternalCompanySetup_VerifySyncedEnv1DetailsWithEnv2 
'@ TestSteps:  Updated in Action Level
'@ ExpectedResult: Updated in Action Level

'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3434","Script Name -SettingsSync_ExternalCompanySetup_VerifySyncedEnv1DetailsWithEnv2", Null

BIZ_Login_OpenAdminTool()

'====== Login to the Encompass as admin ======
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_adminloginEnv1","Sync_adminloginEnv2"

'====== Select Reports in Settings Toolbar ======
Wait g_LongWaitMedium
Biz_SyncSettings_SelectSettingsToolBarItem "External Company Setup"

'Verify synced TPO Fees data in Environment 2 should match with Environment1
RunAction "SettingsSync_ExternalCompanySetup_ValidateTpoFees_001", oneIteration
'Verify synced TPO Custom fields in Environment 2 should match with Environment1
RunAction "SyncSettings_BusinessRules_ValidateTPOCustomFields_002", oneIteration

'BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)

