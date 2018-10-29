'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3299 The objective of test case is to verify synced Post-Closing Conditions Set data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Conditions, SettingsSync_PostCloseConditionSets
'@ Description: The objective of test case is to verify synced Post-Closing Conditions Set data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1,Select Settings-> efolder Setup-> Post-Closing Condition Sets
	'2 In Environment1, Click on New icon.
	'3 Enter the data
	'4 From ""All conditions"", select ""Star Post-Closing Condition"" and click Add button
	'5 Click on Save icon
	'6 Select the set mentioned in test data column and click Sync to arrow button
	'7 In Environment2, select the synced set and click on edit icon. Verify that below data is reflecting:
	'	Name: Star Post-ClosingCondition set
	'	Description: Star Post-Closing Condition set Desc
	'	""Star Post-Closing Condition"" is present in ""Select Conditions"" section
	'8 Delete the created record in both environments
'@ ExpectedResult:
	'1 Post-Closing Conditions Sets module should be opened.
	'2 Create/Edit Post-Closing Conditions details window should be opened
	'3 Data should be entered
	'4 Condition should get added in "Select Conditions" section.
	'5 Post-Closing Conditions set should be saved and displayed in the grid
	'6 Condition Set should be synced 
	'7 Below data should reflect:
	'	Name: Star Post-ClosingCondition set
	'	Description: Star Post-Closing Condition set Desc
	'	""Star Post-Closing Condition"" should be present in ""Select Conditions"" section
	'8 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3299", "The objective of test case is to verify synced Post-Closing Conditions Set data in Environment 2 should match with Environment1", Null

'====== Select Post-Closing Condition Sets Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Post-Closing Condition Sets"
Wait g_ShortWaitMedium

'====== Create new Post-Closing Condition Set in Environment 1 ======
'====== Validate Post-Closing Condition Set Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Post-Closing Condition Sets ", "Create Post-Closing Conditions Sets in environment 1", Null
strPostCloTemplate = Settings_Sync_eFolder_CreateConditionSet("SettingsSync_PostCloseConditionSets", Parameter("strPostTempName"), 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Post-Closing Conditions Sets", "Validate new created Post-Closing Condition Set '"&strPostCloTemplate&"' data in environment 1", Null
Settings_Sync_eFolder_ValidateConditionSetData strPostCloTemplate, "SettingsSync_PostCloseConditionSets", Parameter("strPostTempName"), 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Post-Closing Condition Set Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Post-Closing Conditions Sets", "Validate synced Post-Closing Condition Set '"&strPostCloTemplate&"' data in environment 2", Null
Settings_Sync_eFolder_ValidateConditionSetData strPostCloTemplate, "SettingsSync_PostCloseConditionSets", Parameter("strPostTempName"), 0
Wait g_TinyWaitMedium

'====== Delete Condition Set in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Post-Closing Condition Set '"&strPostCloTemplate&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strPostCloTemplate, 1
Wait g_TinyWaitMedium

'====== Delete Condition Set in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Post-Closing Condition Set '"&strPostCloTemplate&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strPostCloTemplate, 0
Wait g_TinyWaitMedium
