'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3295 The objective of test case is to verify synced Document Stacking Templates data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Document, SettingsSync_DocStackTemp
'@ Description: The objective of test case is to verify synced Document Stacking Templates data in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In the Environment1, Select Settings-> efolder Setup-> Document Stacking Templates
	'2 In Environment1, Click on New icon.
	'3 Double click to rename the title
	'4 Click on new icon present in Documents section
	'5 Select "1008 Transmittal Summary" and click the arrow button.
	'6 Click on Ok button.
	'7 Click on save icon
	'8 Select template mentioned in test data column and click Sync to arrow button
	'9 In Environment2, select the synced template and verify that below data is reflecting:
	'	select Export Zip option
	'	Annotations Export: All
	'10 Delete the created record in both environments
'@ ExpectedResult:
	'1 Document Stacking Templates should be opened.
	'2 Document Stacking Templates should be created.
	'3 Template should be renamed.
	'4 Update Document Stacking Templates window should be opened.
	'5 "1008 Transmittal Summary"should be moved to "Star DST" section.
	'6 Update Document Stacking Templates window should be closed.
	'7 Data should be saved
	'8 Template should be synced
	'9 1008 Transmittal Summary should be present in Documents section.
	'10 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3295", "The objective of test case is to verify synced Document Stacking Templates data in Environment 2 should match with Environment 1", Null

'====== Select Document Stacking Templates Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Document Stacking Templates"
Wait g_ShortWaitMedium

'====== Create new Document Stacking Template in Environment 1 ======
'====== Edit Document Stacking Template in Environment 1 ======
'====== Validate Document Stacking Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_CreateDocStackTemplate", "Create Document Stacking Template in Environment 1", Null
strNewTemplate = Settings_Sync_eFolder_CreateDocStackTemplate(1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_EditDocExportTemplate", "Rename Document Stacking Template '"&strNewTemplate&"' and add data", Null
strDSTName = Settings_Sync_eFolder_EditDocStackingTemplate(strNewTemplate, "SettingsSync_DocStackTemp", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateDocStackingTemplate", "Validate '"&strNewTemplate&"' renamed to '"&strDSTName&"'", Null
Settings_Sync_eFolder_ValidateDocStackingTemplate strNewTemplate, strDSTName, "SettingsSync_DocStackTemp", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Document Stacking Template in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateDocExportTemplate", "Validate '"&strDSTName&"' is synced to Environment 2 with data", Null
Settings_Sync_eFolder_ValidateDocStackingTemplate strNewTemplate, strDSTName, "SettingsSync_DocStackTemp", 0
Wait g_TinyWaitMedium

'====== Delete Document Stacking Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document Stacking Template '"&strDSTName&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strDSTName, 1
Wait g_TinyWaitMedium

'====== Delete Document Stacking Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document Stacking Template '"&strDSTName&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strDSTName, 0
Wait g_TinyWaitMedium
