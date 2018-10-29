'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3297 The objective of test case is to verify synced Conditions Set data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Conditions, SettingsSync_ConditionSet
'@ Description: The objective of test case is to verify synced Conditions Set data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 In the Environment1, Select Settings-> efolder Setup-> Condition Sets
	'3 In Environment1, Click on New icon.
	'4 Enter the data
	'5 From "All conditions", select "Star Condition" and click Add button
	'6 Click on Save icon
	'7 Select the set mentioned in test data column and click Sync to arrow button
	'8 In Environment2, select the synced set and click on edit icon. Verify that below data is reflecting:
	'	Name: Star Condition set
	'	Description: Star Condition set Desc
	'	""Star Condition"" is present in ""Select Conditions"" section
	'9 Delete the created record in both environments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Conditions Sets module should be opened.
	'3 Create/Edit Underwriting Conditions details window should be opened.
	'4 Data should be entered
	'5 Condition should get added in "Select Conditions" section.
	'6 Conditions should be saved and displayed in the grid.
	'7 Set should be synced
	'8 Below data should reflect:
	'	Name: Star Condition set
	'	Description: Star Condition set Desc
	'	""Star Condition"" should be present in ""Select Conditions"" section.
	'9 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3297", "The objective of test case is to verify synced Conditions Set data in Environment 2 should match with Environment1", Null

'====== Select Conditions Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Condition Sets"
Wait g_ShortWaitMedium

'====== Create new Condition Set in Environment 1 ======
'====== Validate Condition Set Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Condition Set ", "Create Condition Set in environment 1", Null
strConditionSetName = Settings_Sync_eFolder_CreateConditionSet("SettingsSync_ConditionSet", Parameter("strTempName"), 1)
FRM_Logger_ReportInfoEvent "Condition Set", "Validate new created Condition Set '"&strConditionSetName&"' data in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_ValidateConditionSetData strConditionSetName, "SettingsSync_ConditionSet", Parameter("strTempName"), 1

'====== Click on Sync arrow button ======
'====== Validate Condition Set Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Condition Sets", "Validate synced Condition Set '"&strConditionSetName&"' data in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_ValidateConditionSetData strConditionSetName, "SettingsSync_ConditionSet", Parameter("strTempName"), 0

'====== Delete Condition Set in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Condition Set '"&strConditionSetName&"' in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_DeleteDocument strConditionSetName, 1

'====== Delete Condition Set in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Condition Set '"&strConditionSetName&"' in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_DeleteDocument strConditionSetName, 0
