'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3300 The objective of test case is to verify synced HTML Email Templates data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, EmailTemplate, SettingsSync_EmailTemplate
'@ Description: The objective of test case is to verify synced HTML Email Templates data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1,Select Settings-> efolder Setup-> HTML Email Templates
	'2 In Environment1, Click on New icon.
	'3 Enter the data
	'4 Click on Save icon
	'5 Select the Template mentioned in test data column and click Sync to arrow button
	'6 Click on Yes button
	'7 In Environment2, select the synced template and click on edit icon. Verify that below data is reflecting:
	'	Template Type: Document Requests
	'	Description: Star HTML Email Template
	'	Type"" Star HTML Email Template Testing"" in message body
	'8 Delete the created record in both environments
'@ ExpectedResult:
	'1 HTML Email Templates module should be opened.
	'2 Email Templates Details window should be opened
	'3 Data should be entered
	'4 Template should be saved.
	'5 Settings Synchronization popup opens
	'6 Template should be synced
	'7 Below data should reflect:
	'	Template Type: Document Requests
	'	Description: Star HTML Email Template
	'	Type"" Star HTML Email Template Testing"" in message body
	'8 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3300", "The objective of test case is to verify synced HTML Email Templates data in Environment 2 should match with Environment1", Null

'====== Select HTML Email Templates Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Html Email Templates"
Wait g_ShortWaitMedium

'====== Create new HTML Email Templates in environment 1 ======
'====== Validate HTML Email Templates in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_CreateHTMLEmailTemplate", "Create HTML Email Template in Environment 1", Null
strTemplateName = Settings_Sync_eFolder_CreateHTMLEmailTemplate("SettingsSync_EmailTemplate", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateHTMLEmailTemplate", "Validate HTML Email Template in Environment 1", Null
Settings_Sync_eFolder_ValidateHTMLEmailTemplate strTemplateName, "SettingsSync_EmailTemplate", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate HTML Email Template Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateHTMLEmailTemplate", "Validate HTML Email Template data in Environment 2", Null
Settings_Sync_eFolder_ValidateHTMLEmailTemplate strTemplateName, "SettingsSync_EmailTemplate", 0
Wait g_TinyWaitMedium

'====== Delete HTML Email Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete HTML Email Template '"&strTemplateName&"' in Environment 1", Null
Settings_Sync_eFolder_DeleteDocument strTemplateName, 1
Wait g_TinyWaitMedium

'====== Delete HTML Email Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete HTML Email Template '"&strTemplateName&"' in Environment 2", Null
Settings_Sync_eFolder_DeleteDocument strTemplateName, 0
Wait g_TinyWaitMedium
