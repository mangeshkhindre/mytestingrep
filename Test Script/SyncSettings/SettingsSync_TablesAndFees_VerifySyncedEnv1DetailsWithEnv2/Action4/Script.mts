'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3330 The objective of test case is to verify synced 'City Tax' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, TaxRecord, SettingsSync_CityTax
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'City Tax' in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> City Tax
	'2 Enter the data and click on Ok button.
	'3 Select the City tax and click Sync to arrow button.
	'4 In Environment2, select the synced City tax and click on Edit icon
	'5 "Verify that below value are populated correctly:
	'	Fee Description: Star city Tax
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'6 Delete the records in both environments, verify
'@ ExpectedResult:
	'1 City Tax module should open.
	'2 Data should be saved.
	'3 Data should be synced to Environment2.
	'4 City/County Tax/Stamps List window should open.
	'5 "Below value should populate correctly:
	'	Fee Description: Star city Tax
	'	Calculated Based on: Loan Amount
	'	Rate: 1
	'	+Additional: 11"
	'6 The records should be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3330", "The objective of test case is to verify synced 'City Tax' in Environment 1 should match with Environment 2", Null

'====== Select City Tax Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "City Tax"
Wait g_ShortWaitMedium

'====== Create City Tax in Environment 1 ======
'====== Validate City Tax Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "City Tax ", "Create City Tax in environment 1", Null
strCityTax = Settings_Sync_TablesAndFees_CreateTax("SettingsSync_CityTax", "City Tax", 1)
FRM_Logger_ReportInfoEvent "City Tax ", "Validate new created City Tax '"&strCityTax&"' data in Environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_CityTax", strCityTax, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate City Tax Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "City Tax ", "Validate Synced City Tax '"&strCityTax&"' data in Environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateTax "SettingsSync_CityTax", strCityTax, 0

'====== Delete the City Tax in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the City Tax in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_DeleteTax strCityTax, 1

'====== Delete the City Tax in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteTax", "Delete the City Tax in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_DeleteTax strCityTax, 0
