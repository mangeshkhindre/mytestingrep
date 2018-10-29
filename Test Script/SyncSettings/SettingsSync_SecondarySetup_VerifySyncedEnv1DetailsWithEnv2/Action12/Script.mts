'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3063 The objective of test case is to verify synced 'Trade Management Setup' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '01 Login into Environment1 encompass
   '02 Select Settings->Secondary Setup-> Trade Management Setup
   '03 Enter the data.
   '04 Click on Save icon
   '05 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '  Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '07 Select Settings->Secondary Setup-> Trade Management Setup
   '08 Select the "Apple" in Environment1 and click sync to arrow button.
   '09 Select the "Beta"  in Environment1 and click sync to arrow button.
   '10 Select the "Gamma"  in Environment1 and click sync to arrow button.
   '11 Select the "Blue"  in Environment1 and click sync to arrow button.
   '12 Delete the created record in Encompass in Env1
'@ ExpectedResult:
   '01 Admin should be login successfully
   '02 Trade Management Setup screen should display
   '03 Data should be entered.
   '04 Data should be saved.
   '05 Settings Sync tool should be displayed with two environment details.
   '06 Trade Management Setup screen displays
   '08 "Apple" should be synced to Environment2.
   '09 "Beta" should be synced to Environment2.
   '10 "Gamma"should be synced to Environment2.
   '11 "Blue" should be synced to Environment2.
   '12 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3063","The objective of test case is to verify synced 'Trade Management Setup' data in Environment 2 should match with Environment 1", Null

Dim objSetUp
Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Navigate to Trade Management Setup","Start Navigate to Trade Management Setup", Null
GUI_swfTab_Click objSetUp.SwfTab("swfname:=tabCtrlMain"), "Trade Management Setup"

FRM_Logger_ReportInfoEvent "Validation of Commitment Type","Start Validation of Commitment Type in Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Commitment Type", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Validation of Commitment Type","Start Validation of Commitment Type in Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Commitment Type", 0

FRM_Logger_ReportInfoEvent "Validation of Trade Description","Start Validation of Trade Description in Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Trade Description", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "Validation of Trade Description","Start Validation of Trade Description in Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Trade Description", 0

FRM_Logger_ReportInfoEvent "Validation of Security Type","Start Validation of Security Type in Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Security Type", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Validation of Security Type","Start Validation of Security Type in Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Security Type", 0

FRM_Logger_ReportInfoEvent "Validation of Security Term","Start Validation of Security Term in Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Security Term", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Validation of Security Term","Start Validation of Security Term in Env2", Null
SettingsSync_SecondarySetup_AdminTools_ValidationTradeManagementSetup "Trade_Management_Setup", "Security Term", 0

Set objSetUp = Nothing
