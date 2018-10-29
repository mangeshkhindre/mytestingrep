'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3298 The objective of test case is to verify synced Post-Closing Conditions data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Conditions, SettingsSync_PostCloseCondition
'@ Description: The objective of test case is to verify synced Post-Closing Conditions data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1, Select Settings-> efolder Setup-> Post-Closing Conditions
	'2 In Environment1, Click on New icon.
	'3 Enter the data
	'4 Click on Save icon
	'5 Select template mentioned in test data column and click Sync to arrow button
	'6 In Environment2, select the synced template and click on edit icon. Verify that below data is reflecting:
	'	Name: Star Post-Closing Condition
	'	Description: Star Post-ClosingCondition Desc
	'	Click on Document button and select ""1003""
	'	Source: Escrow
	'	Recipient: Investor
	'	Days to Receive: 11
	'7 Delete the created record in both environments
'@ ExpectedResult:
	'1 Conditions module should be opened.
	'2 Post-Closing Conditions window should be opened
	'3 Data should be entered
	'4 Conditions should be saved and displayed in the grid.
	'5 Template should be synced
	'6 Below data should reflect:
	'	Name: Star Post-Closing Condition
	'	Description: Star Post-ClosingCondition Desc
	'	Click on Document button and select ""1003""
	'	Source: Escrow
	'	Recipient: Investor
	'	Days to Receive: 11
	'7 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3298", "The objective of test case is to verify synced Post-Closing Conditions data in Environment 2 should match with Environment 1", Null

'====== Select Post-Closing Conditions Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Post-Closing Conditions"
Wait g_ShortWaitMedium

'====== Create new Post-Closing Condition in Environment 1 ======
'====== Validate Post-Closing Condition Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Post-Closing Conditions ", "Create Post-Closing Conditions in environment 1", Null
Parameter("strPostCloTempName") = Settings_Sync_eFolder_CreatePostCloseCondition("SettingsSync_PostCloseCondition", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Post-Closing Conditions", "Validate new created Post-Closing Condition '"&Parameter("strPostCloTempName")&"' data in environment 1", Null
Settings_Sync_eFolder_ValidatePostCloseCondition Parameter("strPostCloTempName"), "SettingsSync_PostCloseCondition", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Post-Closing Condition Data in Environment 2 ======
Settings_Sync_eFolder_SelectDocument Parameter("strPostCloTempName"), 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Post-Closing Conditions", "Validate synced Post-Closing Condition '"&Parameter("strPostCloTempName")&"' data in environment 2", Null
Settings_Sync_eFolder_ValidatePostCloseCondition Parameter("strPostCloTempName"), "SettingsSync_PostCloseCondition", 0
Wait g_TinyWaitMedium
