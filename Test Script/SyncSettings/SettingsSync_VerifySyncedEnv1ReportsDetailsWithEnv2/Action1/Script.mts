'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2931 The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3254 SettingsSync_VerifySyncedEnv1ReportsDetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Reports
	'3 Click on New(+) in Environment1.
	'4 Enter the data, save
	'5 Select the created Report in Environment 1 and click sync to arrow button, Click on Ok button.
	'6 Verify that the synced report  in Environment 2 should match with Environment1
	'7 Delete the created report in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Reports module opens.
	'3 Report should create.
	'4 Data should be saved.
	'5 Report should be synced to Environment2.
	'6 Synced Report data in Environment 2 should match with Environment1
	'Report tab:
	'	Report Type: Bar Chart
	'	Paper Size: Legal
	'	Fields tab:
	'	Field Id: Alert-Ability to Repay Exemption
	'	Milestones tab:
	'	Select option " Define the loans to include in the report by milestone criteria.
	'	Check the Started checkbox
	'	Milestone Finished: Qualification
	'	Time Frame: Current Month
	'	Folders tab:
	'	Select My Pipeline checkbox
	'	Filters tab(Right click on filter screen to add filter)
	'	Field ID: Alert-Ability to Repay Exemption
	'	Operator: Less than
	'	Value: 1111
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3254","Script Name - SettingsSync_VerifySyncedEnv1ReportsDetailsWithEnv2", Null

'====== Open th eadmin tool ======
'====== Login to the Encompass as admin ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2931", "The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1", Null
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Reports"
Wait g_TinyWaitMedium

'====== Create a new report ======
'====== Validate created report ======
strReportName = Settings_Sync_Reports_CreateNewReport("Settings_Sync_ReportsValidation", "Public Reports", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateReport", "Verify '"&strReportName&"' exists in environment 1 ", Null
Settings_Sync_Reports_ValidateReport strReportName, 1 
Wait g_TinyWaitMedium

'====== Set data in Report Tab for environment 1 ======
'====== Validate data in Report Tab for environment 1 ======
Settings_Sync_Reports_ReportTab "Settings_Sync_ReportsValidation", strReportName, 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateReportTab", "Verify Report tab data in environment 1 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateReportTab "Settings_Sync_ReportsValidation", 1

'====== Set data in Fields Tab for environment 1 ======
'====== Validate data in Fields Tab for environment 1 ======
Wait g_TinyWaitMedium
strDescription = Settings_Sync_Reports_AddField("Settings_Sync_ReportsValidation", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFieldTab", "Verify Field tab data in environment 1 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateFieldTab strDescription, 1
Wait g_TinyWaitMedium

'====== Set data in Milestones Tab for environment 1 ======
'====== Validate data in Milestones Tab for environment 1 ======
Settings_Sync_Reports_MilestonesTab "Settings_Sync_ReportsValidation", 1
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateMilestonesTab", "Verify Milestone tab data in environment 1 ", Null
Settings_Sync_Reports_ValidateMilestonesTab "Settings_Sync_ReportsValidation", 1
Wait g_TinyWaitMedium

'====== Set data in Folders Tab for environment 1 ======
'====== Validate data in Folders Tab for environment 1 ======
Settings_Sync_Reports_FoldersTab "Settings_Sync_ReportsValidation", 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFoldersTab", "Verify Folder tab data in environment 1 ", Null
Settings_Sync_Reports_ValidateFoldersTab "Settings_Sync_ReportsValidation", 1
Wait g_TinyWaitMedium

'====== Set data in Filters Tab for environment 1 ======
'====== Validate data in Filters Tab for environment 1 ======
sreDescription = Settings_Sync_Reports_AddFilter("Settings_Sync_ReportsValidation", 1)
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFiltersTab", "Verify Filter tab data in environment 1 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateFiltersTab sreDescription, 1
Wait g_TinyWaitMedium

'====== Save the Report ======
'====== Click on Sync arrow button ======
Settings_Sync_Reports_Save 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()

'====== Validate Synced Report for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateReport", "Verify '"&strReportName&"' exists in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateReport strReportName, 0

'====== Validate Synced data in Report Tab for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateReportTab", "Verify Report tab data in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateReportTab "Settings_Sync_ReportsValidation", 0

'====== Validate Synced data in Fields Tab for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFieldTab", "Verify Field tab data in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateFieldTab strDescription, 0

'====== Validate Synced data in Milestones Tab for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateMilestonesTab", "Verify Milestone tab data in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateMilestonesTab "Settings_Sync_ReportsValidation", 0

'====== Validate Synced data in Folders Tab for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFoldersTab", "Verify Folders tab data in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateFoldersTab "Settings_Sync_ReportsValidation", 0

'====== Validate Synced data in Filters Tab for environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_ValidateFiltersTab", "Verify Filters tab data in environment 2 ", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_ValidateFiltersTab sreDescription, 0

'====== Delete the report in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_DeleteReport", "Delete the report in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_DeleteReport strReportName, "Public Reports", 1

'====== Delete the report in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_Reports_DeleteReport", "Delete the report in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_Reports_DeleteReport strReportName, "Public Reports", 0
Wait g_TinyWaitMedium

'====== Logout from the application ======
BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
