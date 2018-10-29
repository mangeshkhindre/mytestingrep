'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3304 The objective of test case is to verify synced Additional Services in Environment 2 should match with Environment1
'@ Test Automation JIRA Task: PTAC-3433 SettingsSync_AdditionalServices_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 AdditionalServices, StatusTemplates, SettingsSync_Company 
	'2 AdditionalServices, StatusTemplates,SettingsSync_TPO  
	'3 AdditionalServices, StatusTemplates,SettingsSync_EmailTemplate
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced Additional Services in Environment 2 should match with Environment1
'@ TestSteps:
	'1 In Environment1, Select Settings->Additional Services-> Company Status Online
	'2 Click on new icon in Company Status Online Template tab in Environment1 and enter the data and click on Save
	'3 Select Template in Environment 1 and click sync to arrow button
	'4 Verify that the synced Template data in Environment 2 should match with Environment1
	'5 Click on new icon in TPO Status Online Template tab in Environment1 and enter the data
	'6 Click on Save
	'7 Select Template in Environment 1 and click sync to arrow button
	'8 Verify that the synced Template data in Environment 2 should match with Environment1
	'9 Click on new icon in Email Template tab in Environment1 and enter the data
	'10 Click on Save
	'11 Select Template in Environment 1 and click sync to arrow button
	'12 Verify that the synced Template data in Environment 2 should match with Environment1
	'13 Delete the created records in both environments
'@ ExpectedResult:
	'1 The Company Status Online should be open
	'2 Data should be saved and displayed in the grid.
	'3 Template should be synced to Environment2.
	'4 Synced Template data in Environment 2 should match with Environment1
	'5 Data should be saved and displayed in the grid.
	'6 Template should be synced to Environment2.
	'7 Synced Template data in Environment 2 should match with Environment1
	'8 Data should be saved and displayed in the grid
	'9 Template should be synced to Environment2.
	'10 Synced Template data in Environment 2 should match with Environment1
	'11Records should be deleted in both environments
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3433", "Script Name - SettingsSync_AdditionalServices_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Additional Services in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Additional Services"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3304", "The objective of test case is to verify synced Additional Services in Environment 2 should match with Environment1", Null

'====== Select Company Status Online Templates Tab ======
Wait g_TinyWaitSmall
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain").SwfTab("swfname:=tabSetup","index:=1"), "Company Status Online Templates"
Wait g_ShortWaitMedium

'====== Create new Company Status Online Template in Environment 1 ======
'====== Validate Company Status Online Template Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Company Status Online Template ", "Create Company Status Online Template in environment 1", Null
strName = Settings_Sync_AdditionalServices_CreateStatusTemplates("SettingsSync_Company", 1)
FRM_Logger_ReportInfoEvent "Company Status Online Template ", "Validate new created Company Status Online Template  '"&strName&"' data in environment 1", Null
Settings_Sync_AdditionalServices_ValidateStatusTemplates strName, "SettingsSync_Company", 1
Wait g_TinyWaitSmall

'====== Click on Sync arrow button ======
'====== Validate Company Status Online Template Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Company Status Online Template ", "Validate new created Company Status Online Template  '"&strName&"' data in environment 2", Null
Settings_Sync_AdditionalServices_ValidateStatusTemplates strName, "SettingsSync_Company", 0
Wait g_TinyWaitSmall

'====== Delete Company Status Online Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 1", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strName, 1
Wait g_TinyWaitSmall

'====== Delete Company Status Online Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 2", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strName, 0
Wait g_ShortWaitMedium

'====== Select TPO Status Online Templates Tab ======
FRM_Logger_ReportInfoEvent "Navigate", "Navigate to 'TPO Status Online Templates' ", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain").SwfTab("swfname:=tabSetup","index:=1"), "TPO Status Online Templates"
Wait g_ShortWaitMedium

'====== Create new TPO Status Online Template in Environment 1 ======
'====== Validate TPO Status Online Template Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "TPO Status Online Template ", "Create TPO Status Online Template in environment 1", Null
strName = Settings_Sync_AdditionalServices_CreateStatusTemplates("SettingsSync_TPO", 1)
FRM_Logger_ReportInfoEvent "TPO Status Online Template ", "Validate new created TPO Status Online Template  '"&strName&"' data in environment 1", Null
Settings_Sync_AdditionalServices_ValidateStatusTemplates strName, "SettingsSync_TPO", 1
Wait g_TinyWaitSmall

'====== Click on Sync arrow button ======
'====== Validate TPO Status Online Template Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "TPO Status Online Template ", "Validate new created TPO Status Online Template  '"&strName&"' data in environment 2", Null
Settings_Sync_AdditionalServices_ValidateStatusTemplates strName, "SettingsSync_TPO", 0
Wait g_TinyWaitSmall

'====== Delete TPO Status Online Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 1", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strName, 1
Wait g_TinyWaitSmall

'====== Delete TPO Status Online Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 2", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strName, 0
Wait g_ShortWaitMedium

'====== Select Email Templates Tab ======
FRM_Logger_ReportInfoEvent "Navigate", "Navigate to 'Email Templates' ", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain").SwfTab("swfname:=tabSetup","index:=1"), "Email Templates"
Wait g_ShortWaitMedium

'====== Create new Email Templates in environment 1 ======
'====== Validate Email Templates in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_CreateEmailTemplate", "Create Email Template in Environment 1", Null
strTemplateName = Settings_Sync_AdditionalServices_CreateEmailTemplate("SettingsSync_EmailTemplate", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_ValidateEmailTemplate", "Validate Email Template in Environment 1", Null
Settings_Sync_AdditionalServices_ValidateEmailTemplate strTemplateName, "SettingsSync_EmailTemplate", 1
Wait g_TinyWaitSmall

'====== Click on Sync arrow button ======
'====== Validate Email Template Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_ValidateEmailTemplate", "Validate Email Template data in Environment 2", Null
Settings_Sync_AdditionalServices_ValidateEmailTemplate strTemplateName, "SettingsSync_EmailTemplate", 0
Wait g_TinyWaitSmall

'====== Delete Email Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 1", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strTemplateName, 1
Wait g_TinyWaitSmall

'====== Delete Email Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_AdditionalServices_DeleteStatusTemplates", "Delete Template '"&strName&"' in environment 2", Null
Settings_Sync_AdditionalServices_DeleteStatusTemplates strTemplateName, 0
Wait g_ShortWaitMedium

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
