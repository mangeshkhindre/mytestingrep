'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC - 3293 The objective of test case is to verify synced Documents Status data in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3435 SettingsSync_eFolderSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 eFolder_Tab, Document, SettingsSync_Documents
'@ Description: The objective of test case is to verify synced Documents Status data in Environment 2 should match with Environment1
'@ TestSteps:
	'1. Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 In the Environment1, Select Settings-> eFolder Setup-> Documents
	'3 In Environment1, Click on New icon.
	'4 Enter the data mentioned in Test Data Column
	'5 Select Document mentioned in test data column and click Sync to arrow button
	'6 In Environment2, select the synced Document and click on Edit icon
	'7 Verify that below data is present:
	'	Name: StarDoc
	'	Description: Star Doc Desc
	'	Type dropdown: Standard Form
	'	Source: 1003
	'	Days to Receive: 11
	'8 Delete the created record in both environments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Documents window should be opened.
	'3 Document window should be opened
	'4 Data should be entered
	'5 Document should be synced to Environment2
	'6 Document window should be opened
	'7 Below data should be present:
	'	Name: StarDoc
	'	Description: Star Doc Desc
	'	Type dropdown: Standard Form
	'	Source: 1003
	'	Days to Receive: 11
	'8 Record should be deleted in both environments
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3293", "The objective of test case is to verify synced Documents Status data in Environment 2 should match with Environment 1", Null

'====== Select Documents Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Documents"
Wait g_ShortWaitMedium

'====== Create new Document in Environment 1 ======
'====== Validate Document Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Documents ", "Create Document in environment 1", Null
strDocName = Settings_Sync_eFolder_CreateDocuments("SettingsSync_Documents", 1)
FRM_Logger_ReportInfoEvent "Documents", "Validate new created Document '"&strDocName&"' data in environment 1", Null
Settings_Sync_eFolder_ValidateDocuments strDocName, "SettingsSync_Documents", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Document is synced to Env 2 ======
Settings_Sync_eFolder_SelectDocument strDocName, 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_SelectDocument", "Validate Document '"&strDocName&"' is synced to Env 2", Null
booDocExist = Settings_Sync_eFolder_SelectDocument(strDocName, 0)
Wait g_TinyWaitMedium
FRM_VerifyEqual booDocExist, True, "Document '"&strDocName&"' is synced to Env 2", "Document '"&strDocName&"' exists in Env 2"
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_ValidateDocuments", "Validate synced Document '"&strDocName&"' data in environment 2", Null
Settings_Sync_eFolder_ValidateDocuments strDocName, "SettingsSync_Documents", 0
Wait g_TinyWaitMedium

'====== Delete document in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document '"&strDocName&"' in environment 1", Null
Settings_Sync_eFolder_DeleteDocument strDocName, 1
Wait g_TinyWaitMedium

'====== Delete document in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_eFolder_DeleteDocument", "Delete Document '"&strDocName&"' in environment 2", Null
Settings_Sync_eFolder_DeleteDocument strDocName, 0
Wait g_TinyWaitMedium
