'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2810 The objective of test case is to verify synced Title details in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, EscrowFees, SettingsSync_TitleFee
'@ Description: The objective of test case is to verify synced Title details in Environment 1 should match with Environment 2
'@ TestSteps:
	'1 In the Environment1, Go to settings-> Tables and Fees -> Title
	'2 Click New button in Environment1
	'3 Enter the data mentioned in Test Data column
	'4 In Fees section, click on new icon
	'5vEnter the data mentioned in Test Data column
	'6 Click on Ok button
	'7 Click Ok button in Title Fee Details window.
	'8 Select Title mentioned in test data column and click Sync to arrow button.
	'9 In Environment2, select the synced Title and click on Edit icon
	'10 Verify that below data is present:
	'	Table Name: Star Title
	'	Purpose: Purchase
	'	Type: Owner
	'	Based On: Loan Amount
	'	Select Round Down option button
	'	To Neares $: 40
	'	With Offset $: 60
	'	Range Up To $: 100
	'	Base $: 70
	'	+Factor: 1
'@ ExpectedResult:
	'1 Title module should open
	'2 Title fee details should open
	'3 Data should be entered.
	'4 Fee Details pop-up opens
	'5 Data should be entered.
	'6 Fee Details pop-up closes
	'7 Data should be saved and displayed in the grid.
	'8 Escrow should be synced to Environment2.
	'9 Title should be synced to Environment2.
	'10 Below data should be present:
	'	Table Name: Star Title
	'	Purpose: Purchase
	'	Type: Owner
	'	Based On: Loan Amount
	'	Select Round Down option button
	'	To Neares $: 40
	'	With Offset $: 60
	'	Range Up To $: 100
	'	Base $: 70
	'	+Factor: 1
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2810", "The objective of test case is to verify synced Title details in Environment 1 should match with Environment 2", Null

'====== Select Title Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Title"
Wait g_ShortWaitMedium

'====== Create Title Fee in Environment 1 ======
'====== Validate Title Fee Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Title Fee ", "Create Title Fee in environment 1", Null
strTableName = Settings_Sync_TablesAndFees_CreateFee("SettingsSync_TitleFee", 1)
FRM_Logger_ReportInfoEvent "Title Fee ", "Validate new created Title Fee '"&strTableName&"' data in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_TablesAndFees_ValidateFeeData "SettingsSync_TitleFee", strTableName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Title Fee Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Title Fee ", "Validate Synced Title Fee '"&strTableName&"' data in environment 2", Null
Settings_Sync_TablesAndFees_ValidateFeeData "SettingsSync_TitleFee", strTableName, 0
Wait g_TinyWaitMedium

'====== Delete the Fee in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_TablesAndFees_DeleteFee", "Delete the Title Fee in environment 1", Null
Settings_Sync_TablesAndFees_DeleteFee strTableName, 1
Wait g_TinyWaitMedium

'====== Delete the Fee in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Title Fee in environment 2", Null
Settings_Sync_TablesAndFees_DeleteFee strTableName, 0
Wait g_TinyWaitMedium
