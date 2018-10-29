'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-3454 The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1
	'2 PTAC-3456 The objective of test case is to verify synced 'VA download' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3747 SettingsSync_TablesAndFees_FHAOrVADownload_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: 
	'The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1.
	'*Note:*
	'	Select the record from source system which should not be available in target system.
	'	If selected record present in the target system, delete the record in target system before syncing to target system.
'@ TestSteps:
	'1 Go to settings-> Tables and Fees -> MI Table
	'2 Click on FHA Download tab in Environment1.
	'3 Select a MI table and click Sync to arrow button.
	'4 In Environment2, double-click on the synced MI Table.
	'5 Verify that below data should match with Environment2 MI table
	'	Scenario:<Any scenario> 
	'6 Go to settings-> Tables and Fees -> MI Table
	'7 Click on VA Download tab in Environment1.
	'8 Select a MI table and click Sync to arrow button.
	'9 In Environment2, double-click on the synced MI Table.
	'10 Verify that below data should match with Environment2 MI table
	'	Scenario: <Any Scenario>
'@ ExpectedResult:
	'1 MITable module should open
	'2 It displays the FHA download tab
	'3 MI Table should be synced to Environment2.
	'4 MI scenario window should open.
	'5 Verify that below data should match with Environment1 MI table
	'	Scenario:<Any scenario> 
	'6 MITable module should open
	'7 It displays the VA download tab
	'8 MI Table should be synced to Environment2.
	'9 MI scenario window should open.
	'10 Verify that below data should match with Environment1 MI table
	'	Scenario:<Any Scenario>
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3747", "Script Name - SettingsSync_TablesAndFees_FHAOrVADownload_VerifySyncedEnv1DetailsWithEnv2 ", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Tables and Fees in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Tables and Fees"

'====== Select MI Table Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "MI Tables"
Wait g_ShortWaitMedium

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3454", "The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1", Null

FRM_Logger_ReportInfoEvent "FHA (Download)", "Select FHA (Download) Tab", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabControlMI","index:=1"), "FHA (Download)"
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabControlMI","index:=0"), "FHA (Download)"
Settings_Sync_TablesAndFees_SyncTable "FHA"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3456", "The objective of test case is to verify synced 'VA download' data in Environment 2 should match with Environment 1", Null

FRM_Logger_ReportInfoEvent "VA (Download)", "Select VA (Download) Tab", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabControlMI","index:=1"), "VA (Download)"
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabControlMI","index:=0"), "VA (Download)"
Settings_Sync_TablesAndFees_SyncTable "VA"

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
