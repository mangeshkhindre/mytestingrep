'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3331 The objective of test case is to verify synced 'State Tax' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, TaxRecord, SettingsSync_StateTax
'@ Description: The objective of test case is to verify synced 'State Tax' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> State Tax
	'2 In Environment1, Click on new icon
	'3 Enter the data and click on Ok button.
	'4 Select the State Tax and click Sync to arrow button.
	'5 In Environment2, select the synced State Tax and click on Edit icon
	'6 "Verify that below value are populated correctly:
	'	Fee Description: Star State Tax
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'7 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 State Tax module should open.
	'2 State Tax/Stamps List window should open.
	'3 Data should be saved.
	'4 Data should be synced to Environment2.
	'5 State Tax/Stamps List window should open.
	'6 "Below value should populate correctly:
	'	Fee Description: Star State Tax
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'7 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3331", "The objective of test case is to verify synced 'State Tax' in Environment 1 should match with Environment 2", Null

'====== Select State Tax Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "State Tax"
Wait g_ShortWaitMedium

'====== Create State Tax in Environment 1 ======
'====== Validate State Tax Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "State Tax ", "Create State Tax in Environment 1", Null
strStateTax = Settings_Sync_TablesAndFees_CreateTax("SettingsSync_StateTax", "State Tax", 1)
FRM_Logger_ReportInfoEvent "State Tax ", "Validate new created State Tax '"&strStateTax&"' data in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_StateTax", strStateTax, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate State Tax Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "State Tax ", "Validate Synced State Tax '"&strStateTax&"' data in Environment 2", Null
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_StateTax", strStateTax, 0
Wait g_TinyWaitMedium

'====== Delete the State Tax in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the State Tax in environment 1", Null
Settings_Sync_TablesAndFees_DeleteTax strStateTax, 1
Wait g_TinyWaitMedium

'====== Delete the State Tax in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the State Tax in environment 2", Null
Settings_Sync_TablesAndFees_DeleteTax strStateTax, 0
Wait g_TinyWaitMedium
