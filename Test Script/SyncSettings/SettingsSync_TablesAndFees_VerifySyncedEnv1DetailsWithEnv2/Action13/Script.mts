'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3329 The objective of test case is to verify synced 'FHA County Limits' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, FHACountyLimits, SettingsSync_FHACounty
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'FHA County Limits' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> FHA County Limits
	'2 In Environment1, double-click a county and edit the data.
	'3 Select the county and click Sync to arrow button.
	'4 In Environment2, double-click the sync county and verify that data should match with the Environment1 county.
'@ ExpectedResult:
	'1 FHA County Limits module should open
	'2 Data should be saved.
	'3 Data should be synced to Environment2.
	'4 Data should match with the Environment1 county.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3329", "The objective of test case is to verify synced 'FHA County Limits' in Environment 1 should match with Environment 2", Null

'====== Select FHA County Limit Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "FHA County Limits"
Wait g_ShortWaitMedium

'====== Edit FHA County in Environment 1 ======
'====== Validate FHA County Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "FHA County", "Edit FHA County Limit in environment 1", Null
Settings_Sync_TablesAndFees_EditFHACounty "SettingsSync_FHACounty", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "FHA County", "Validate Edit FHA County data in environment 1", Null
Settings_Sync_TablesAndFees_ValidateFHACounty "SettingsSync_FHACounty", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate FHA County Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "FHA County", "Validate Edit FHA County data in environment 2", Null
Settings_Sync_TablesAndFees_ValidateFHACounty "SettingsSync_FHACounty", 0
