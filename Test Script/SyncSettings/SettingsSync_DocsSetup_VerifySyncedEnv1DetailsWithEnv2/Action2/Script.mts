'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3335 The objective of test case is to verify synced 'Closing Doc Plan codes' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3431 SettingsSync_DocsSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login	
	'3 Settings_DocsSetup, EDisclosurePlanCodes, SettingsSync_DocPlanCodes
'@ Pre-conditions: 
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 If the test data is already exists, then delete from sync tool, then it will display under dropdown, later you can see the record and add it then Sync it.
'@ Description: The objective of test case is to verify synced 'Closing Doc Plan codes' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Select Settings-> Docs Setup -> Closing Doc Plan codes
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

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3335", "The objective of test case is to verify synced 'Closing Doc Plan codes' in Environment 1 should match with Environment 2", Null

'====== Select Closing Doc Plan Codes Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Closing Doc Plan Codes"
Wait g_ShortWaitMedium

'====== PreCondition - Delete Closing Doc Plan Codes in both environment, If already exists in list ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "PreCondition - Delete Closing Doc Plan Codes, If already exists in list in environment 1", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_DocPlanCodes", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "PreCondition - Delete Closing Doc Plan Codes, If already exists in list in environment 2", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_DocPlanCodes", 0
Wait g_TinyWaitMedium

'====== Add new Closing Doc Plan Codes in environment 1 ======
'====== Validate new added Closing Doc Plan Codes in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_AddPlanCode", "Add new Closing Doc Plan Codes in environment 1", Null
Settings_Sync_DocsSetup_AddPlanCode "SettingsSync_DocPlanCodes", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidatePlanCode", "Validate new added Closing Doc Plan Codes in environment 1", Null
Settings_Sync_DocsSetup_ValidatePlanCode "SettingsSync_DocPlanCodes", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate new added Closing Doc Plan Codes in environment 2 ======
Settings_Sync_DocsSetup_SelectPlanCode "SettingsSync_DocPlanCodes", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidatePlanCode", "Validate SettingsSync_DocPlanCodes is synced to environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_DocsSetup_ValidatePlanCode "SettingsSync_DocPlanCodes", 0

'====== Delete Closing Doc Plan Codes in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "Delete Closing Doc Plan Codes in environment 1", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_DocPlanCodes", 1
Wait g_TinyWaitMedium

'====== Delete Closing Doc Plan Codes in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_Delete", "Delete Closing Doc Plan Codes in environment 2", Null
Settings_Sync_DocsSetup_Delete "SettingsSync_DocPlanCodes", 0
Wait g_TinyWaitMedium
