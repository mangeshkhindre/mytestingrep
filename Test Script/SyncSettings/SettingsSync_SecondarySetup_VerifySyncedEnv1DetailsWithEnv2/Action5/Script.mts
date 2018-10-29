'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3058 The objective of test case is to verify synced 'Adjustment Templates' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '  Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 Select Settings->Secondary Setup-> Adjustment Templates
   '3 Click on new icon in Environment1 and enter the data
   '4 Save the data
   '5 Select template in Environment 1 and click sync to arrow button
   '6 Verify that the Template data in Environment 2 should match with Environment1
   '7 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Adjustment Templates screen displays
   '3 Data should be entered
   '4 Data should be saved and displayed in the grid.
   '5 Template should be synced to Environment2.
   '6 Template data in Environment 2 should match with Environment1
   '7 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3058","The objective of test case is to verify synced 'Adjustment Templates' data in Environment 2 should match with Environment 1", Null

Dim objSetUp
Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Navigate to Adjustment Templates","Start Navigate to Adjustment Templates", Null
GUI_swfTab_Click objSetUp.SwfTab("swfname:=tabCtrlMain"), "Adjustment Template"

FRM_Logger_ReportInfoEvent "Adjustment Template","Adjustment TemplateCreation Started", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_CreateTemplate "Adjustment_Template", "Adjustment Template", 1

FRM_Logger_ReportInfoEvent "Valdiation Adjustment Template","Adjustment Template Validation Started for Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_ValidateTemplate "Adjustment_Template", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Valdiation Adjustment Template","Adjustment Template Validation Started for Env2", Null
SettingsSync_SecondarySetup_ValidateTemplate "Adjustment_Template", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Deletion Adjustment Template","Adjustment Template Deletion Started for Env1", Null
SettingsSync_SecondarySetup_DeleteTemplate "Adjustment_Template", 1
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Deletion Adjustment Template","Adjustment Template Deletion Started for Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_DeleteTemplate "Adjustment_Template", 0

Set objSetUp = Nothing
