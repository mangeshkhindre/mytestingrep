'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3202 The objective of test case is to verify synced Business Categories data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3436 SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_ContactSetUp, CustomFields, SettingSync_Category
'@ Pre-conditions:  Login into Settings Sync Tool with Environment1 and Environment2 credentials.
'		Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced Business Categories data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1, Select Settings-> Contacts Setup-> Business Categories
	'2 Click on new icon in Environment 1 and enter Category name
	'3 Select the Category and click sync to arrow button
	'4 Verify both the names in both the Instances
	'5 Delete the created record in both environments
'@ ExpectedResult:
	'1 Business Categories should open 
	'2 Category should be created
	'3 Category should be synced to Environment2.
	'4 The name should be same in both  Instances
	'5 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3202", "The objective of test case is to verify synced Business Categories data in Environment 2 should match with Environment1", Null

'====== Select Business Categories Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Business Categories"
Wait g_ShortWaitMedium

'====== Create new Business Categories ======
'====== ValidateBusiness Categories in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_CreateNewStatusOrCategory", "Create new Business Categories", Null
strName = Settings_Sync_ContactSetup_CreateNewStatusOrCategory("SettingSync_Category", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_ValidateStatusOrCategory", "Validate Business Categories in Environment 1", Null
Settings_Sync_ContactSetup_ValidateStatusOrCategory strName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Fields are synced to Environment 2 with data ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_ValidateStatusOrCategory", "Validate Business Categories is synced to Environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_ValidateStatusOrCategory strName, 0

'====== Delete Business Categories in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_DeleteStatusOrCategory", "Delete Business Categories '"&strName&"' in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_DeleteStatusOrCategory strName, 1

'====== Delete Business Categories in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_DeleteStatusOrCategory", "Delete Business Categories '"&strName&"' in Environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_DeleteStatusOrCategory strName, 0
