'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3201 The objective of test case is to verify synced Borrower Contact Status data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3436 SettingsSync_ContactSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_ContactSetUp, CustomFields, SettingSync_Status
'@ Pre-conditions:  Login into Settings Sync Tool with Environment1 and Environment2 credentials.
'		Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced Business Custom Field data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1, Select Settings-> Contacts Setup-> Borrower Contact Status
	'2 In the Environment1, Click on new icon in Environment 1 and enter status
	'3 Select the status and click sync to arrow button
	'4 Verify both the names in both the Instances
	'5 Delete the created record in both environments
'@ ExpectedResult:
	'1 Borrower Contact Status should open 
	'2 Status should be created
	'3 Status should be synced to Environment2.
	'4 The name should be same in both Instances
	'5 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3201", "The objective of test case is to verify synced Borrower Contact Status data in Environment 2 should match with Environment1", Null

'====== Select Borrower Custom Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Borrower Contact Status"
Wait g_ShortWaitMedium

'====== Create new Borrower Status ======
'====== Validate Borrower Contact Status in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_CreateNewStatusOrCategory", "Create new Borrower Contact Status", Null
strName = Settings_Sync_ContactSetup_CreateNewStatusOrCategory("SettingSync_Status", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_ValidateStatusOrCategory", "Validate Borrower Contact Status in Environment 1", Null
Settings_Sync_ContactSetup_ValidateStatusOrCategory strName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Fields are synced to Environment 2 with data ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_ValidateStatusOrCategory", "Validate Borrower Contact Status is synced to Environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_ValidateStatusOrCategory strName, 0

'====== Delete Borrower Contact Status in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_DeleteStatusOrCategory", "Delete Borrower Contact Status '"&strName&"' in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_DeleteStatusOrCategory strName, 1

'====== Delete Borrower Contact Status in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_ContactSetup_DeleteStatusOrCategory", "Delete Borrower Contact Status '"&strName&"' in Environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_ContactSetup_DeleteStatusOrCategory strName, 0
