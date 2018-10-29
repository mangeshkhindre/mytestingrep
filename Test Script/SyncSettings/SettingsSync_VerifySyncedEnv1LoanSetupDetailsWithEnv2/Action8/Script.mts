'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2979 The objective of test case is to verify synced 'Loan Custom Fields' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, CustomFields, SettingsSync_LoanCustomFields
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Loan Custom Fields' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup-> Loan Custom Fields
	'3 In Environment1, Click on New icon.
	'4 "1. Enter the data mentioned in Test Data column. Click on Ok button."
	'5 Select the Loan Custom Field mentioned in test data column and click Sync to arrow button.
	'6 Click on Yes button.
	'7 In Environment2, select the synced Loan Custom Field and click on Edit icon
	'8 "Verify that below data is present:
	'	Field ID: GREEN
	'	Description: Green Description
	'	Format: Zipcode
	'	Calculation <FieldID> : 1
	'9 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Custom Field should be opened.
	'3 Loan Custom Field Editor should be opened.
	'4 Loan Custom Field Editor should be closed and record should be displayed in the grid.
	'5 Settings Synchronization popup opens.
	'6 Loan Custom Field "CX.GREEN" should be synced to Environment2.
	'7 Loan Custom Field Editor should be opened.
	'8 "Below data should be present:
	'	Field ID: GREEN
	'	Description: Green Description
	'	Format: Zipcode
	'	Calculation <FieldID> : 1"
	'9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2979", "The objective of test case is to verify synced 'Loan Custom Fields' data in Environment 2 should match with Environment 1", Null

'====== Select Loan Custom Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Loan Custom Fields"
Wait g_ShortWaitMedium

'====== Create new Loan Custom Fields" in Environment 1 ======
'====== Validate Loan Custom Fields" in Environment 1 ======
FRM_Logger_ReportInfoEvent "Loan Custom Fields", "Create Loan Custom Fields in environment 1", Null
strCustomField = Settings_Sync_LoanSetup_SetCustomFieldDetails("SettingsSync_LoanCustomFields", 1)
FRM_Logger_ReportInfoEvent "Loan Custom Fields", "Validate Loan Custom Fields in Grid in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_ValidateCustomField "SettingsSync_LoanCustomFields", strCustomField, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Loan Custom Fields in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Loan Custom Fields", "Validate Loan Custom Fields in environment 2", Null
Settings_Sync_LoanSetup_ValidateCustomField "SettingsSync_LoanCustomFields", strCustomField, 0
Wait g_TinyWaitMedium

'====== Delete the Loan Custom Fields in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteCustomField", "Delete the Loan Custom Fields in environment 1", Null
Settings_Sync_LoanSetup_DeleteCustomField strCustomField, 1
Wait g_TinyWaitMedium

'====== Delete the Loan Custom Fields in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteCustomField", "Delete the Loan Custom Fields in environment 2", Null
Settings_Sync_LoanSetup_DeleteCustomField strCustomField, 0
Wait g_TinyWaitMedium
