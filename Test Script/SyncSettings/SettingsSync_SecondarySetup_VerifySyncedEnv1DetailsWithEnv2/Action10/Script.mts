'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3062 The objective of test case is to verify synced 'Servicing' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Environment1 encompass
   '2 Select Settings->Secondary Setup-> Servicing
   '3 Click on new icon and select "Heloc" from "Custom Print Form" window.
   '4 In Late Fee section, enter the data.
   '5 Click on Save icon
   '6 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '  Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '7 Select Settings->Secondary Setup-> Servicing
   '8 Select "Heloc" in Environment 1 and click sync to arrow button
   '9 Click on Yes button.
   '10 Click on Ok button.
   '11 Select state "Alabama" record in late fee section in Environment 1 and click sync to arrow button
   '12 Click on Yes button.
   '13 Verify that the Template data in Environment 2 should match with Environment1
   '14 Delete the created record in both environments
'@ ExpectedResult:
   '1 Admin should be login successfully
   '2 Servicing screen should display
   '3 Data should be entered.
   '4 Data should be entered.
   '5 Data should be saved.
   '6 Settings Sync tool should be displayed with two environment details.
   '7 Display the Form
   '8 Settings Synchronization popup opens.
   '9 File System Setting pop-up opens
   '10 "Heloc" should be synced to Environment2.
   '11 Settings Synchronization popup opens.
   '12 Late fee should be synced to Environment2.
   '13 Template data in Environment 2 should match with Environment1
   '14 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3062","The objective of test case is to verify synced 'Servicing' data in Environment 2 should match with Environment 1", Null

Dim objSetUp
Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Navigate to Servicing","Start Navigate to Servicing", Null
GUI_swfTab_Click objSetUp.SwfTab("swfname:=tabCtrlMain"), "Servicing"

FRM_Logger_ReportInfoEvent "Validation of Custom Advice Form","Start Validation of Custom Advice Formin Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_SelectCustomPrintForms "Servicing", "Mortgage Statement Print Form", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Validation of Custom Advice Form","Start Validation of Custom Advice Formin Env1", Null
SettingsSync_SecondarySetup_AdminTools_SelectCustomPrintForms "Servicing", "Mortgage Statement Print Form", 0
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "Validation of State","Start Validation of State in Env1", Null
SettingsSync_SecondarySetup_AdminTools_SelectCustomPrintForms "Servicing", "State", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "Validation of State","Start Validation of State in Env 2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_SelectCustomPrintForms "Servicing", "State", 0

Set objSetUp = Nothing
