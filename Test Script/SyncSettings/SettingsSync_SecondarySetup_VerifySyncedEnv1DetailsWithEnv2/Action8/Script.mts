'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3060 The objective of test case is to verify synced 'Funding Templates' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '  Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 Select Settings->Secondary Setup-> Funding Templates
   '3 Click on New button in Environment 1
   '4 Select ""2015 Itemization"" option and click Ok button
   '5 Enter data as per the Test Data column
   '6 Save the data
   '7 Select template in Environment 1 and click sync to arrow button
   '8 Verify that the Template data in Environment 2 should match with Environment1
   '9 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Funding Templates screen displays
   '3 Funding Template popup opens
   '4 Funding Template details screen displays
   '5 Data should be entered
   '6 Data should be saved and displayed in the grid.
   '7 Template should be synced to Environment2.
   '8 Template data in Environment 2 should match with Environment1
   '9 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3060","The objective of test case is to verify synced 'Funding Templates' data in Environment 2 should match with Environment 1", Null
Dim objSetUp
Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Navigate to Funding Templates","Start Navigate to Funding Templates", Null
GUI_swfTab_Click objSetUp.SwfTab("swfname:=tabCtrlMain"), "Funding Templates"

FRM_Logger_ReportInfoEvent "Funding Template","Funding TemplateCreation Started", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_CreateTemplate "Funding_Templates", "Funding Templates", 1

FRM_Logger_ReportInfoEvent "Valdiation Funding Template","Funding Template Validation Started for Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_ValidateTemplate "Funding_Templates", 1

'====== Click on Sync arrow button ======
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "Valdiation Funding Template","Funding Template Validation Started for Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_ValidateTemplate "Funding_Templates", 0

FRM_Logger_ReportInfoEvent "Deletion Funding Template","Funding Template Deletion Started for Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_DeleteTemplate "Funding_Templates", 1

FRM_Logger_ReportInfoEvent "Deletion Funding Template","Funding Template Deletion Started for Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_DeleteTemplate "Funding_Templates", 0

Set objSetUp = Nothing
