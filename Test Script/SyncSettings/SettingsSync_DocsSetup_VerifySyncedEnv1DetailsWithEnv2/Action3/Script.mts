'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3334 The objective of test case is to verify synced 'eDisclosure Plan codes' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3431 SettingsSync_DocsSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_DocsSetup, EDisclosurePlanCodes, SettingsSync_EDiscPlanCodes
'@ Pre-conditions:  
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 If the test data is already exists, then delete from sync tool, then it will display under dropdown, later you can see the record and add it then Sync it.
'@ Description: The objective of test case is to verify synced 'eDisclosure Plan codes' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Select Settings-> Docs Setup -> eDisclosures Plancodes
	'2 Click on New icon in Environment1 and select the data
	'3 Click on Add
	'4 Click on Yes button
	'5 Select the created Plancode in Environment 1 and click sync to arrow button
	'6 Click on Yes button.
	'7 Verify that the Plancode data in Environment 2 should match with Environment1
	'8 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 eDisclosures Plancodes module opens.
	'2 Data should be selected.
	'3 Popup opens 
	'4 Data should be added and displayed in the grid.
	'5 Settings Synchronization popup opens.
	'6 Plancode should be synced to Environment2.
	'7 Plancode data in Environment 2 should match with Environment1
	'8 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3334", "The objective of test case is to verify synced 'eDisclosure Plan codes' in Environment 1 should match with Environment 2", Null

'====== Select EDisclosure Plan Codes Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "EDisclosure Plan Codes"
Wait g_ShortWaitMedium

'====== PreCondition - Delete EDisclosure Plan Code, If already exists in list in both environment ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "PreCondition - Delete EDisclosure Plan Code, If already exists in list in environment 1", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_EDiscPlanCodes", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "PreCondition - Delete EDisclosure Plan Code, If already exists in list in environment 2", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_EDiscPlanCodes", 0
Wait g_TinyWaitMedium

'====== Add new EDisclosure Plan Code in environment 1 ======
'====== Validate new added EDisclosure Plan Code in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_AddPlanCode", "Add new EDisclosure Plan Code in environment 1", Null
Settings_Sync_DocsSetup_AddPlanCode "SettingsSync_EDiscPlanCodes", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidatePlanCode", "Validate new added EDisclosure Plan Code in environment 1", Null
Settings_Sync_DocsSetup_ValidatePlanCode "SettingsSync_EDiscPlanCodes", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate new added EDisclosure Plan Code in environment 2 ======
Settings_Sync_DocsSetup_SelectPlanCode "SettingsSync_EDiscPlanCodes", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidatePlanCode", "Validate EDisclosure Plan Code is synced to environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_DocsSetup_ValidatePlanCode "SettingsSync_EDiscPlanCodes", 0

'====== Delete EDisclosure Plan Code in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "Delete EDisclosure Plan Code in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_DocsSetup_Delete "SettingsSync_EDiscPlanCodes", 1

'====== Delete EDisclosure Plan Code in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "Delete EDisclosure Plan Code in environment 2", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_EDiscPlanCodes", 0
Wait g_TinyWaitMedium
