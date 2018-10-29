'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3294 The objective of test case is to verify synced Document Export Templates data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Document, SettingsSync_DocExpoTemp
'@ Description: The objective of test case is to verify synced Document Export Templates data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 In the Environment1, Select Settings-> efolder Setup-> Document Export Templates
	'3 In Environment1, Click on New icon.
	'4 Double click to rename the title
	'5 Enter the data mentioned in Test Data Column and click on save icon
	'6 Select template mentioned in test data column and click Sync to arrow button
	'7 Click on Yes button
	'8 In Environment2, select the synced template and verify that below data is reflecting:
	'	select Export Zip option
	'	Annotations Export: All
	'9 Delete the created record in both environments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Document Export Templates should open
	'3 Document Export Templates should be created
	'4 Template should be renamed.
	'5 Template should be saved
	'6 Settings Synchronization popup opens
	'7 Template should be synced
	'8 Below data should reflect:
	'	select Export Zip option
	'	Annotations Export: All
	'9 Record should be deleted in both environments
'***************************************************************************************************


FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3294", "The objective of test case is to verify synced Document Export Templates data in Environment 2 should match with Environment 1", Null

'====== Select Document Export Template Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Document Export Templates"
Wait g_ShortWaitMedium

'====== Create new Document Export Template in Environment 1 ======
'====== Edit Document Export Template in Environment 1 ======
'====== Validate Document Export Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_CreateDocExportTemplate", "Create Document Export Template in Environment 1", Null
strNewTemplate = Settings_Sync_eFolder_CreateDocExportTemplate(1)
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_EditDocExportTemplate", "Rename Document Export Template '"&strNewTemplate&"' and add data", Null
strDETName = Settings_Sync_eFolder_EditDocExportTemplate(strNewTemplate, "SettingsSync_DocExpoTemp", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateDocExportTemplate", "Validate '"&strNewTemplate&"' renamed to '"&strDETName&"'", Null
Wait g_TinyWaitMedium
Settings_Sync_eFolder_ValidateDocExportTemplate strNewTemplate, strDETName, "SettingsSync_DocExpoTemp", 1 

'====== Click on Sync arrow button ======
'====== Validate Document Export Template in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateDocExportTemplate", "Validate '"&strDETName&"' is synced to Environment 2 with data", Null
Settings_Sync_eFolder_ValidateDocExportTemplate strNewTemplate, strDETName, "SettingsSync_DocExpoTemp", 0
Wait g_TinyWaitMedium

'====== Delete Document Export Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document Export Template '"&strDETName&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strDETName, 1
Wait g_TinyWaitMedium

'====== Delete Document Export Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document Export Template '"&strDETName&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strDETName, 0
Wait g_TinyWaitMedium
