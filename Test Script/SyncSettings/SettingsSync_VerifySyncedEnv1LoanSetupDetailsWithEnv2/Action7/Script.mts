'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2974 The objective of test case is to verify synced 'Alerts' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, CreateNewAlert, SettingsSync_Alert
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Alerts' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1. Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Alerts
	'3 Click on New(+) in Environment1.
	'4 Enter the data mentioned in Test Data Column
	'5 Select the option "Condition" and click on "Add Filter" icon.
	'6 In Field, Enter data and press tab
	'7 In Operator dropdown, select option "Starts With"
	'8 Enter data in Value field.
	'9 Click on Ok button.
	'10 Click on Save button.
	'11 Select Alert mentioned in test data column and click Sync to arrow button.
	'12 In Environment2, select the synced alert and click on Edit icon
	'13 Verify that below data is present:
	'	Alert Name: StarAlert
	'	Message: Star Alert Message
	'	In Conditions grid,
	'	Field: Borrower First Name
	'	Operator: Starts with
	'	Value: a
	'14 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Alerts should be opened.
	'3 Encompass Alerts Settings window should be opened.
	'4 Name and description should be entered.
	'5 Add/Edit Search Filter popup opens.
	'6 In Description field "Borrower First Name" data should populate.
	'7 Below fields should be visible:
	'	"Operator" dropdown
	'	Value field
	'	Option "Starts With" should be selected.
	'8 Data should be entered.
	'9 Add/Edit Search Filter popup should close and data should be populated in "Conditions" grid.
	'10 Encompass Alerts Settings window should close and data should be saved and displayed in the Alerts grid.
	'11 Alert should be synced to Environment2.
	'12 Encompass Alerts Settings window should be opened.
	'13 Below data should be present:
	'	Alert Name: StarAlert
	'	Message: Star Alert Message
	'In Conditions grid,
	'	Field: Borrower First Name
	'	Operator: Starts with
	'	Value: a
	'14 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2974", "The objective of test case is to verify synced 'Alerts' data in Environment 2 should match with Environment 1", Null

'====== Select Alerts Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Alerts"
Wait g_ShortWaitMedium

'====== Create new Alerts in Environment 1 ======
'====== Validate Alert in Alerts list in environment 1 ======
FRM_Logger_ReportInfoEvent "Alerts", "Create Alert in environment 1", Null
arrValue = Settings_Sync_LoanSetup_Alerts_CreateNewAlert("SettingsSync_Alert", 1)
FRM_Logger_ReportInfoEvent "Alerts", "Validate Alert in Alerts list in environment 1", Null
Wait g_ShortWaitMedium
Settings_Sync_LoanSetup_ValidateAlert arrValue(0), 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Alert in Alerts list in environment 2 ======
'====== Validate Alert data in environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Alerts", "Validate Alert in Alerts list in environment 2", Null
Settings_Sync_LoanSetup_ValidateAlert arrValue(0), 0
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_ValidateAlertData", "Validate Alert data in environment 2", Null
Settings_Sync_LoanSetup_ValidateAlertData "SettingsSync_Alert", arrValue(0), arrValue(1), 0
Wait g_TinyWaitMedium

'====== Delete the Alerts in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteAlert", "Delete the Alert in environment 1", Null
Settings_Sync_LoanSetup_DeleteAlert arrValue(0), 1
Wait g_TinyWaitMedium

'====== Delete the Alerts in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteAlert", "Delete the Alert in environment 2", Null
Settings_Sync_LoanSetup_DeleteAlert arrValue(0), 0
Wait g_TinyWaitMedium
