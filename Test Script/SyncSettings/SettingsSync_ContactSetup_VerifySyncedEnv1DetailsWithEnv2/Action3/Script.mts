'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3199 The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3436 SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_ContactSetUp, CustomFields, SettingSync_BizData
	'4 Settings_ContactSetUp, CustomFields, SettingSync_CatData
'@ Pre-conditions: Login into Settings Sync Tool with Environment1, Select Settings-> Contacts Setup-> Borrower Custom Fields
'@ Description: The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 Enter the data and click on Save
	'2 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'3 In the Environment1, Select Settings-> Contacts -> Business Custom Fields
	'4 Select the custom Field 21, Field 23 and and Field 1 checkboxes in Environment1 and click sync to arrow button
	'5 Verify that the synced custom Fields data in Environment 2 should match with Environment1
	'6 Delete the created record in both environments
'@ ExpectedResult:
	'1 Data should be Saved
	'2 Settings Sync tool should be displayed with two environment details.
	'3 Business Custom fields should open 
	'4 Custom Field 21, Field 23 and and Field 1 should be synced to Environment2.
	'5 Synced custom Fields data in Environment 2 should match with Environment1
	'6 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3199", "The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"
		
'====== Go to Settings/'Contact Setup'/Business Custom Fields ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Business Custom Fields"
Wait g_TinyWaitMedium

'====== Set data in Page2 in Business Custom Fields ======
'====== Set data in Custom Category Fields in Business Custom Fields ======
'====== Close the setting window ======
FRM_Logger_ReportInfoEvent "BIZ_Settings_CustomFields_SetPageData", "Set data in Page2 in Business Custom Fields", Null
BIZ_Settings_CustomFields_SetPageData "SettingSync_BizData", "Page 2"
Wait g_TinyWaitMedium
BIZ_Settings_CustomFields_SetPageData "SettingSync_CatData", "Custom Category Fields"
Wait g_TinyWaitMedium
BIZ_Settings_ClickClose()

'====== Logout from the Encompass ======
BIZ_Login_UserLogout()  

'====== Open the admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Contact Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Contact Setup"
Wait g_TinyWaitSmall

'====== Select Business Custom Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Business Custom Fields"
Wait g_ShortWaitMedium

'====== Check the checkbox in Business Custom Field ======
'====== Validate Fields in Environment 1 with data ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_CustomFields_SetData", "Check the checkboxes in Business Custom Field", Null
Settings_Sync_ContactSetup_CustomFields_SetData "SettingSync_BizData", 1, "Page 2"
Wait g_TinyWaitSmall
Settings_Sync_ContactSetup_CustomFields_SetData "SettingSync_CatData", 1, "Custom Category Fields"
Wait g_TinyWaitSmall
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData", "Validate Field data in Environment 1", Null
Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData "SettingSync_BizData", 1, "Page 2"
Wait g_TinyWaitSmall
Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData "SettingSync_CatData", 1, "Custom Category Fields"

'====== Click on Sync arrow button ======
'====== Validate Fields are synced to Environment 2 with data ======
Wait g_TinyWaitSmall
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData", "Validate Field are synced to Environment 2 with data", Null
Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData "SettingSync_BizData", 0, "Page 2"
Wait g_TinyWaitSmall
Settings_Sync_ContactSetup_BusinessCustomFields_ValidateData "SettingSync_CatData", 0, "Custom Category Fields"
