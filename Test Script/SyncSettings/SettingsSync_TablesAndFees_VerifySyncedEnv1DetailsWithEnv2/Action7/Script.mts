'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3328 The objective of test case is to verify synced 'HELOC Table' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, HelocTable, SettingsSync_Heloc
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'HELOC Table' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> HELOC Table
	'2 Click New button in Environment1
	'3 Enter the data mentioned in Test Data column
	'4 Click on Add button
	'5 Enter the data mentioned in Test Data column
	'6 Click Ok button in Edit HELOC Table window.
	'7 Select HELOC Table mentioned in test data column and click Sync to arrow button.
	'8 In Environment2, select the synced HELOC Table and click on Edit icon
	'9 "Verify that below data is present:
	'	Table Name: Star Heloc
	'	Year: 20
	'	Period Type: Repayment
	'	Index: 1
	'	Margin: 2
	'	APR: 0.1"
	'10 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 HELOC Table module should open
	'2 Edit HELOC Table window should open.
	'3 Data should be entered.
	'4 Minimum Monthly Payment window opens.
	'5 Data should be entered.
	'6 Data should be saved and displayed in the grid.
	'7 HELOC Table should be synced to Environment2.
	'8 HELOC Table fee details should open.
	'9 "Below data should be present:
	'	Table Name: Star Heloc
	'	Year: 20
	'	Period Type: Repayment
	'	Index: 1
	'	Margin: 2
	'	APR: 0.1"
	'10 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3328", "The objective of test case is to verify synced 'HELOC Table' in Environment 1 should match with Environment 2", Null

'====== Select HELOC Table Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "HELOC Table"
Wait g_ShortWaitMedium

'====== Create Heloc Table in Environment 1 ======
'====== Validate Heloc Table Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Heloc Table ", "Create Heloc Table in environment 1", Null
strHelocName = Settings_Sync_TablesAndFees_CreateHeloc("SettingsSync_Heloc", 1)
FRM_Logger_ReportInfoEvent "Heloc Table ", "Validate new created Heloc Table  '"&strHelocName&"' data in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateHeloc "SettingsSync_Heloc", strHelocName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Heloc Table Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Heloc Table ", "Validate Synced Heloc Table  '"&strHelocName&"' data in Environment 2", Null
Settings_Sync_TablesAndFees_ValidateHeloc "SettingsSync_Heloc", strHelocName, 0

'====== Delete the Heloc in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteHeloc", "Delete the Heloc '"&strHelocName&"' in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_DeleteHeloc strHelocName, 1

'====== Delete the Heloc in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteHeloc", "Delete the Heloc '"&strHelocName&"' in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_DeleteHeloc strHelocName, 0
