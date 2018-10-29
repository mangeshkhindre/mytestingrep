'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3336 The objective of test case is to verify synced 'eDisclosure Stacking Templates' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3431 SettingsSync_DocsSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_DocsSetup, StackingTemplates, SettingsSync_eDiscStackTemp   
'@ Pre-conditions:  
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
		'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'eDisclosure Stacking Templates' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Select Settings-> Docs Setup -> eDisclosure Stacking Templates
	'2 Click on New icon in Environment1 and enter the template name
	'3 Click on Add
	'4 Drag document "1003" from New Documents section into the "Star eDisc Stacking Template" section.
	'5 Click in Ok button.
	'6 Click on Save icon
	'7 Select the created Template in Environment 1 and click sync to arrow button
	'8 Verify that the Template data in Environment 2 should match with Environment1
	'9 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 eDisclosure Stacking Templates module opens.
	'2 Data should be selected.
	'3 Update Stacking Templates window opens.
	'4 Document should be added and displayed in the grid.
	'5 Update Stacking Templates window closes
	'6 Data should be saved.
	'7 Template should be synced to Environment2.
	'8 Template data in Environment 2 should match with Environment1
	'9 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3336", "The objective of test case is to verify synced 'eDisclosure Stacking Templates' in Environment 1 should match with Environment 2", Null

'====== Select eDisclosure Stacking Templates Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "eDisclosure Stacking Templates"
Wait g_ShortWaitMedium

'====== Create new eDisclosure Stacking Template in Environment 1 ======
'====== Edit eDisclosure Stacking Template in Environment 1 ======
'====== Validate eDisclosure Stacking Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_CreateStackingTemplate", "Create eDisclosure Stacking Template in Environment 1", Null
strNewTemplate = Settings_Sync_DocsSetup_CreateStackingTemplate(1)
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_EditStackingTemplate", "Rename Template '"&strNewTemplate&"' and add document", Null
strDSTName = Settings_Sync_DocsSetup_EditStackingTemplate(strNewTemplate, "SettingsSync_eDiscStackTemp", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidateStackingTemplate", "Validate '"&strNewTemplate&"' is renamed", Null
Wait g_TinyWaitMedium
Settings_Sync_DocsSetup_ValidateStackingTemplate strNewTemplate, strDSTName, "SettingsSync_eDiscStackTemp", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate eDisclosure Stacking Template in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_ValidateStackingTemplate", "Validate '"&strDSTName&"' is synced to Environment 2 with data", Null
Settings_Sync_DocsSetup_ValidateStackingTemplate strNewTemplate, strDSTName, "SettingsSync_eDiscStackTemp", 0
Wait g_TinyWaitMedium

'====== Delete eDisclosure Stacking Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_DeleteDocument", "Delete eDisclosure Stacking Template '"&strDSTName&"' in environment 1", Null
Settings_Sync_DocsSetup_DeleteDocument strDSTName, 1
Wait g_TinyWaitMedium

'====== Delete eDisclosure Stacking Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_DeleteDocument", "Delete eDisclosure Stacking Template '"&strDSTName&"' in environment 2", Null
Settings_Sync_DocsSetup_DeleteDocument strDSTName, 0
Wait g_TinyWaitMedium
