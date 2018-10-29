'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-2809 The objective of test case is to verify synced Escrow Fee details in Environment 1 should match with Environment 2
	'2 PTAC-2810 The objective of test case is to verify synced Title details in Environment 1 should match with Environment 2
	'3 PTAC-3330 The objective of test case is to verify synced 'City Tax' in Environment 1 should match with Environment 2
	'4 PTAC-3331 The objective of test case is to verify synced 'State Tax' in Environment 1 should match with Environment 2
	'5 PTAC-3332 The objective of test case is to verify synced 'User Defined Fee' in Environment 1 should match with Environment 2
	'6 PTAC-3328 The objective of test case is to verify synced 'HELOC Table' in Environment 1 should match with Environment 2
	'7 PTAC-3425 The objective of test case is to verify synced 'Conventional' data in Environment 2 should match with Environment 1
	'8 PTAC-3426 The objective of test case is to verify synced 'FHA' data in Environment 2 should match with Environment 1
	'9 PTAC-3427 The objective of test case is to verify synced 'VA' data in Environment 2 should match with Environment 1
	'10 PTAC-3428 The objective of test case is to verify synced 'Other' data in Environment 2 should match with Environment 1
	'11 PTAC-3329 The objective of test case is to verify synced 'FHA County Limits' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, TaxRecord, SettingsSync_CityTax
	'4 Settings_TablesFees, EscrowFees, SettingsSync_EscrowFee
	'5 Settings_TablesFees, HelocTable, SettingsSync_Heloc
	'6 Settings_TablesFees, MITable, SettingsSync_ConvMI
	'7 Settings_TablesFees, MITable, SettingsSync_FHAMI
	'8 Settings_TablesFees, MITable, SettingsSync_OtherMI
	'9 Settings_TablesFees, MITable, SettingsSync_VAMI
	'10 Settings_TablesFees, TaxRecord, SettingsSync_StateTax
	'11 Settings_TablesFees, EscrowFees, SettingsSync_TitleFee
	'12 Settings_TablesFees, TaxRecord, SettingsSync_UserDefinedFee
	'13 Settings_TablesFees, FHACountyLimits, SettingsSync_FHACounty
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced Escrow Fee details in Environment 1 should match with Environment 2
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3432", "Script Name - SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Tables and Fees in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Tables and Fees"

RunAction "SettingsSync_Escrow_VerifySyncedEnv1DetailsWithEnv2_001", OneIteration

RunAction "SettingsSync_Title_VerifySyncedEnv1DetailsWithEnv2_002", OneIteration

RunAction "SettingsSync_CityTax_VerifySyncedEnv1DetailsWithEnv2_003", OneIteration

RunAction "SettingsSync_StateTax_VerifySyncedEnv1DetailsWithEnv2_004", OneIteration

RunAction "SettingsSync_UserDefineFee_VerifySyncedEnv1DetailsWithEnv2_005", OneIteration

RunAction "SettingsSync_HelocTable_VerifySyncedEnv1DetailsWithEnv2_006", OneIteration

RunAction "SettingsSync_MITable_Conventional_VerifySyncedEnv1DetailsWithEnv2_007", OneIteration

RunAction "SettingsSync_MITable_FHA_VerifySyncedEnv1DetailsWithEnv2_008", oneIteration

RunAction "SettingsSync_MITable_VA_VerifySyncedEnv1DetailsWithEnv2_009", oneIteration

RunAction "SettingsSync_MITable_Other_VerifySyncedEnv1DetailsWithEnv2_010", oneIteration

RunAction "SettingsSync_FHACounty_VerifySyncedEnv1DetailsWithEnv2_011", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
