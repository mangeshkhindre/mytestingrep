'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3296 The objective of test case is to verify synced Conditions data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Conditions, SettingsSync_Condition
'@ Description: The objective of test case is to verify synced Conditions data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 In the Environment1, Select Settings-> efolder Setup-> Conditions
	'2 In Environment1, Click on New icon.
	'3 Enter the data
	'4 Click on save icon
	'5 Select template mentioned in test data column and click Sync to arrow button
	'6 In Environment2, select the synced template and click on edit icon. Verify that below data is reflecting:
	'	Name: Star Condition
	'	Description: Star Condition Desc
	'7 Click on Document button and select ""1003""
	'	Category: Assets
	'	Prior To: Docs
	'	Owner: Archiver
	'	Days to Receive: 11
	'8 Delete the created record in both environments
'@ ExpectedResult:
	'1 Conditions should be opened.
	'2 Underwriting Conditions window should be opened.
	'3 Data should be entered
	'4 Conditions should be saved and displayed in the grid.
	'5 Template should be synced
	'6 Below data should reflect:
	'	Name: Star Condition
	'	Description: Star Condition Desc
	'	Click on Document button and select ""1003""
	'	Category: Assets
	'	Prior To: Docs
	'	Owner: Archiver
	'	Days to Receive: 11
	'7 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3296", "The objective of test case is to verify synced Conditions data in Environment 2 should match with Environment 1", Null

'====== Select Conditions Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Conditions"
Wait g_ShortWaitMedium

'====== Create new Condition in Environment 1 ======
'====== Validate Condition Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Conditions ", "Create Conditions in environment 1", Null
Parameter("strTemplateName") = Settings_Sync_eFolder_CreateCondition("SettingsSync_Condition", 1)
FRM_Logger_ReportInfoEvent "Conditions", "Validate new created Condition '"&Parameter("strTemplateName")&"' data in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_ValidateConditionData Parameter("strTemplateName"), "SettingsSync_Condition", 1

'====== Click on Sync arrow button ======
'====== Validate Condition Data in Environment 2 ======
Settings_Sync_eFolder_SelectDocument Parameter("strTemplateName"), 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Conditions", "Validate synced Condition '"&Parameter("strTemplateName")&"' data in environment 2", Null
Settings_Sync_eFolder_ValidateConditionData Parameter("strTemplateName"), "SettingsSync_Condition", 0
Wait g_TinyWaitMedium
