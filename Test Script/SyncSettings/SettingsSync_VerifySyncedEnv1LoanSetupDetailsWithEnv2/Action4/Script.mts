'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2980 The objective of test case is to verify synced 'Zipcode Setup' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, ZipCode, SettingsSync_ZipcodeSetup
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Zipcode Setup' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup-> Zipcode Setup
	'3 Click on new icon
	'4 Enter the mentioned data
	'5 Click on Ok button.
	'6 In Environment1, select the created data and click Sync to arrow button.
	'7 Click on Yes button.
	'8 In Environment2, select the synced Zipcode and click on Edit icon
	'9 "Verify that below data is present:
	'	Zip: 32256-11111
	'	City: New York
	'	State: FL
	'	County: Orange
	'10 Delete the created record in both ennvironments	
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Zipcode Setup should be opened.
	'3 Zipcode popup opens.
	'4 Data should be entered.
	'5 Zipcode popup closes and the entered data should be displayed in the grid.
	'6 Settings Synchronization popup opens.
	'7 Settings Synchronization popup closes and the zipcode should be synced to Environment2.
	'8 Zipcode popup opens.
	'	"Below data should be present:
	'	Zip: 32256-11111
	'	City: New York
	'	State: FL
	'	County: Orange"
	'9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2980", "The objective of test case is to verify synced 'Zipcode Setup' data in Environment 2 should match with Environment 1", Null

'====== Select Zipcode Setup Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Zipcode Setup"
Wait g_ShortWaitMedium

'====== Create new Zipcode Setup in Environment 1 ======
'====== Validate Zipcode Setup in Environment 1 ======
FRM_Logger_ReportInfoEvent "Zipcode Setup", "Create Zipcode Setup in environment 1", Null
strZipCode = Settings_Sync_LoanSetup_CreateZipcode("SettingsSync_ZipcodeSetup", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Zipcode Setup", "Validate new created Zipcode '"&strZipCode&"' in environment 1", Null
Settings_Sync_LoanSetup_ValidateZipcode strZipCode, "SettingsSync_ZipcodeSetup", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Zipcode Setup in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Zipcode Setup", "Validate Synced Zipcode '"&strZipCode&"' in environment 2", Null
Settings_Sync_LoanSetup_ValidateZipcode strZipCode, "SettingsSync_ZipcodeSetup", 0
Wait g_TinyWaitMedium

'====== Delete the Template in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteZipcode", "Delete the Zipcode Setup in environment 1", Null
Settings_Sync_LoanSetup_DeleteZipcode strZipCode, 1
Wait g_TinyWaitMedium

'====== Delete the Template in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteZipcode", "Delete the Zipcode Setup in environment 2", Null
Settings_Sync_LoanSetup_DeleteZipcode strZipCode, 0
Wait g_TinyWaitMedium
