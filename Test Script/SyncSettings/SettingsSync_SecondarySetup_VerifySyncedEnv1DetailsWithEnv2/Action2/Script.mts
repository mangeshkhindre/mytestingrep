'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3055 The objective of test case is to verify synced 'Secondary Lock Fields' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '01 Login into Environment1 Encompass
   '02 Select Settings->Secondary Setup-> Secondary Lock fields
   '03 Create data as below on clicking new icon in respective tab:
      'Base Price: Basedata1
      'Profitability: Profitability1 
      'Lock Type: Lock Type1 
      'Base Rate: Base Rate1 
      'Base ARM Margin: Base Margin1
   '04 Click on Save icon
   '05 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
      'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '06 Select Settings->Secondary Setup-> Secondary Lock fields
   '07 In the Base Price tab in Environment1 and click sync to arrow button
   '08 Select the Profitability tab in Environment1 and click sync to arrow button
   '09 Select the Lock Type tab in Environment1 and click sync to arrow button
   '10 Select the Base Rate tab in Environment1 and click sync to arrow button
   '11 Select the Base ARM Margin tab in Environment1 and click sync to arrow button
   '12 Delete the created record in Encompass
'@ ExpectedResult:
   '01 Admin should be able to login
   '02 Secondary Lock fields screen should display
   '03 Data should be entered
   '04 Data should be saved
   '05 Settings Sync tool should be displayed with two environment details.
   '06 It opens the 'Base Price' tab
   '07 "Basedata1" should be synced to Environment2.
   '08 "Profitability1" should be synced to Environment2
   '09 "Lock Type1" should be synced to Environment2
   '10 "Base Rate1" should be synced to Environment2
   '11 "Base ARM Margin1" should be synced to Environment2
   '12 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3055","The objective of test case is to verify synced 'Secondary Lock Fields' data in Environment 2 should match with Environment 1", Null

Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Base Price Validation","Started Base Price Validation", Null
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields", "Base Price", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields", "Base Price", 0

FRM_Logger_ReportInfoEvent "Profitability Validation","Started Profitability Validation", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields", "Profitability", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Profitability", 0

FRM_Logger_ReportInfoEvent "Lock Type Validation","Started Lock Type Validation", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Lock Type", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Lock Type", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Base Rate Validation","Started Base Rate Validation", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Base Rate", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Base Rate", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Base ARM Margin Validation","Started Base ARM Marginn Validation", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields", "Base ARM Margin", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidateSecondaryLockFields "Secondary_Lock_Fields","Base ARM Margin", 0
