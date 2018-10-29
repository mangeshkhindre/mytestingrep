'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3198 The objective of test case is to verify synced Borrower Custom Fields data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3436 SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_ContactSetUp, CustomFields, SettingSync_BorrData
'@ Pre-conditions: Login into Settings Sync Tool with Environment1, Select Settings-> Contacts Setup-> Borrower Custom Fields
'@ Description: The objective of test case is to verify synced Borrower Custom Fields data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 Enter the data and click on Save
	'2 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'3 In the Environment1, Select Settings-> Contacts -> Business Contacts-Custom Letters
	'4 Select the custom Field 41 and Field 43 checkboxes in Environment1 and click sync to arrow button
	'5 Verify that the synced custom Fields data in Environment 2 should match with Environment1
	'6 Delete the created record in both environments
'@ ExpectedResult:
	'1 Data should be Saved
	'2 Settings Sync tool should be displayed with two environment details.
	'3 Business Contact should open 
	'4 Custom Fields 41 and 43 should be synced to Environment2.
	'5 Synced custom Fields data in Environment 2 should match with Environment1
	'6 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3198", "The objective of test case is to verify synced Borrower Custom Fields data in Environment 2 should match with Environment1", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"
		
'====== Go to Settings/'Contact Setup'/Borrower Custom Fields ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Borrower Custom Fields"

'====== Set data in Page3 in Borrower Custom Fields ======
'====== Close the setting window ======
FRM_Logger_ReportInfoEvent "BIZ_Settings_CustomFields_SetPageData", "Set data in Page3 in Borrower Custom Fields", Null
BIZ_Settings_CustomFields_SetPageData "SettingSync_BorrData", "Page 3"
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

'====== Select Borrower Custom Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Borrower Custom Fields"
Wait g_ShortWaitMedium

'====== Check the checkbox in Borrower Custom Field ======
'====== Validate Fields in Environment 1 with data ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_CustomFields_SetData", "Check the checkboxes in Borrower Custom Field", Null
Settings_Sync_ContactSetup_CustomFields_SetData "SettingSync_BorrData", 1, "Page 3"
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_BorrowerCustomFields_ValidateData", "Validate Field data in Environment 1", Null
Settings_Sync_ContactSetup_BorrowerCustomFields_ValidateData "SettingSync_BorrData", 1

'====== Click on Sync arrow button ======
'====== Validate Fields are synced to Environment 2 with data ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_BorrowerCustomFields_ValidateData", "Validate Fields are synced to Environment 2 with data ", Null
Settings_Sync_ContactSetup_BorrowerCustomFields_ValidateData "SettingSync_BorrData", 0

'====== Logout from Setting Sync Tool ======
BIZ_Login_SyncLogout()
Wait g_ShortWaitMedium
