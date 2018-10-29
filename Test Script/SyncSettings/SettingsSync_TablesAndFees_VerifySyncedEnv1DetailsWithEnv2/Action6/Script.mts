'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3332 The objective of test case is to verify synced 'User Defined Fee' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, TaxRecord, SettingsSync_UserDefinedFee
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'User Defined Fee' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> User Defined Fee
	'2 In Environment1, Click on new icon
	'3 Enter the data and click on Ok button.
	'4 Select the User Defined Fee and click Sync to arrow button.
	'5 In Environment2, select the synced User Defined Fee and click on Edit icon
	'6 "Verify that below value are populated correctly:
	'	Fee Description: Star User Defined Fee
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'7 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 User Defined Fee module should open.
	'2 User Defined List window should open.
	'3 Data should be saved.
	'4 Data should be synced to Environment2.
	'5 User Defined List window should open.
	'6 "Below value should populate correctly:
	'	Fee Description: Star User Defined Fee
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'7 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3332", "The objective of test case is to verify synced 'User Defined Fee' in Environment 1 should match with Environment 2", Null

'====== Select User Defined Fee Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "User Defined Fee"
Wait g_ShortWaitMedium

'====== Create User Defined Fee in Environment 1 ======
'====== Validate User Defined Fee Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "User Defined Fee ", "Create User Defined Fee in Environment 1", Null
strUserDefinedFee = Settings_Sync_TablesAndFees_CreateTax("SettingsSync_UserDefinedFee", "User Defined Fee", 1)
FRM_Logger_ReportInfoEvent "User Defined Fee ", "Validate new created User Defined Fee '"&strUserDefinedFee&"' data in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_UserDefinedFee", strUserDefinedFee, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate User Defined Fee Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "User Defined Fee ", "Validate Synced User Defined Fee '"&strUserDefinedFee&"' data in Environment 2", Null
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_UserDefinedFee", strUserDefinedFee, 0
Wait g_TinyWaitMedium

'====== Delete the User Defined Fee in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the User Defined Fee in environment 1", Null
Settings_Sync_TablesAndFees_DeleteTax strUserDefinedFee, 1
Wait g_TinyWaitMedium

'====== Delete the User Defined Fee in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the User Defined Fee in environment 2", Null
Settings_Sync_TablesAndFees_DeleteTax strUserDefinedFee, 0
