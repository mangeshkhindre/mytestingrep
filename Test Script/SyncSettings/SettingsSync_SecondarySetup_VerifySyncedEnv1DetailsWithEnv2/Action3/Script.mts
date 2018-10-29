'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3056 The objective of test case is to verify synced 'Lock Request Additional Fields' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Environment1 Encompass
   '2 Select Settings->Secondary Setup-> Lock Request Additional Fields
   '3 Create data as below on clicking new icon in respective tab: Lock Request Form: 4008, Loan Snapshot: 1177
   '4 Click on Save icon
   '5 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
      'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, 
      'Enter the login credentials and click "Login" button
   '6 Select Settings->Secondary Setup-> Lock Request Additional Fields
   '7 Select the Lock Request Form tab in Environment1, and Select the "4008" record then click sync to arrow button
   '8 Select the Loan Snapshot tab in Environment1 and Select the "1177" record then click sync to arrow button.
   '9 Delete the created record in Encompass Env1
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Lock Request Additional Fields screen should display
   '3 Data should be entered
   '4 Data should be saved
   '5 Settings Sync tool should be displayed with two environment details.
   '6 It opens the 'Lock Request Form' tab
   '7 "4008" record should be synced to Environment2.
   '8 "1177" record should be synced to Environment2.
   '9 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3056","The objective of test case is to verify synced 'Secondary Lock Fields' data in Environment 2 should match with Environment 1", Null

FRM_Logger_ReportInfoEvent "Lock Request Form","Validate the Lock request Form", Null
SettingsSync_SecondarySetup_AdminTools_ValidateLockRequestAdditionalFields "Lock_Request_Additional_Fields", "Lock Request Form", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
SettingsSync_SecondarySetup_AdminTools_ValidateLockRequestAdditionalFields "Lock_Request_Additional_Fields", "Lock Request Form", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Loan Snapshot","Validate the Loan Snapshot", Null
SettingsSync_SecondarySetup_AdminTools_ValidateLockRequestAdditionalFields "Lock_Request_Additional_Fields","Loan Snapshot", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
SettingsSync_SecondarySetup_AdminTools_ValidateLockRequestAdditionalFields "Lock_Request_Additional_Fields","Loan Snapshot", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Lock Request Form Deletion","Delete the Lock Request Form in Env1", Null
SettingsSync_SecondarySetup_AdminTools_DeleteLockRequestAdditionalFields "Lock_Request_Additional_Fields", "Lock Request Form", 1
FRM_Logger_ReportInfoEvent "Lock Request Form Deletion","Delete the Lock Request Form in Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeleteLockRequestAdditionalFields "Lock_Request_Additional_Fields", "Lock Request Form", 0

FRM_Logger_ReportInfoEvent "Loan Snapshot Deletion","Delete the Loan Snapshot in Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeleteLockRequestAdditionalFields "Lock_Request_Additional_Fields","Loan Snapshot", 1
FRM_Logger_ReportInfoEvent "Loan Snapshot Deletion","Delete the Loan Snapshot in Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeleteLockRequestAdditionalFields "Lock_Request_Additional_Fields","Loan Snapshot", 0
