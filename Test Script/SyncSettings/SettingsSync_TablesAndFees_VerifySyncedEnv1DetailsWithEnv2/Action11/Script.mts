'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3428 The objective of test case is to verify synced 'Other' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, MITable, SettingsSync_OtherMI
'@ Description: The objective of test case is to verify synced 'Other' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> MI Table
	'2 Click on Other tab
	'3 Click New button in Environment1
	'4 Click create button, and click on 'Add Filter',then add the fields and values
	'5 Enter the data mentioned in Test Data column
	'6 Click on OK button
	'7 Select MI Table created and click Sync to arrow button.
	'8 In Environment2, select the synced MI Table and click on Edit icon
	'9 "Verify that below data is present:
	'	Scenario: Field and Values 
	'	1st Monthly MI: 2
	'	2nd Monthly MI: 0.1
	'	1st Monthly MI months: 20
	'	2nd Monthly MI months: 25
	'	Cutoff: 2"
	'10 Delete the created record in both environments
'@ ExpectedResult:
	'1 MITable module should open
	'2 It displays the Other tab
	'3 MI scenario window should open.
	'4 All the fields should be enetered.
	'5 Data should be entered.
	'6 Data should be saved and displayed in the grid.
	'7 MI Table should be synced to Environment2.
	'8 MI scenario window should open.
	'9 "Below data should be present:
	'	Scenario: Field and Values entered
	'	1st Monthly MI: 2
	'	2nd Monthly MI: 0.1
	'	1st Monthly MI months: 20
	'	2nd Monthly MI months: 25
	'	Cutoff: 2"
	'10 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3428", "The objective of test case is to verify synced 'Other' data in Environment 2 should match with Environment 1", Null

'====== Select MI Table Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "MI Tables"
Wait g_ShortWaitMedium

'====== Create Other MI Table Scenario in Environment 1 ======
'====== Validate Other MI Table Scenario Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Other MI Table", "Create Other MI Table data in environment 1", Null
strScenario = Settings_Sync_TablesAndFees_CreateMISecnario("SettingsSync_OtherMI", "Other", 1)
FRM_Logger_ReportInfoEvent "Other MI Table", "Validate Other data in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateMISecnario "SettingsSync_OtherMI", strScenario, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Other MI Table Scenario Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Other MI Table", "Validate Other data in Environment 2", Null
Settings_Sync_TablesAndFees_ValidateMISecnario "SettingsSync_OtherMI", strScenario, 0
Wait g_TinyWaitMedium

'====== Delete Other MI Table Scenario Data in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteMISecnario", "Delete Other MI Table data in environment 1", Null
Settings_Sync_TablesAndFees_DeleteMISecnario strScenario, 1
Wait g_TinyWaitMedium

'====== Delete Other MI Table Scenario Data in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteMISecnario", "Delete Other MI Table data in environment 2", Null
Settings_Sync_TablesAndFees_DeleteMISecnario strScenario, 0
Wait g_TinyWaitMedium
