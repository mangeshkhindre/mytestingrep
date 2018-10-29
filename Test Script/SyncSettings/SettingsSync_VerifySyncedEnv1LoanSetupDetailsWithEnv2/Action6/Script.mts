'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2975 The objective of test case is to verify synced 'Tasks' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, Task, SettingsSync_TaskSetup
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Tasks' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Tasks
	'3 Click on New(+) in Environment1.
	'4 Enter the data mentioned in Test Data Column
	'5 Click on Ok button.
	'6 Select Task mentioned in test data column and click Sync to arrow button.
	'7 In Environment2, select the synced Task and click on Edit icon
	'8 "Verify that below data is present:
	'	Name: StarTask
	'	Description: Star Task Message
	'	Days To Complete:30 
	'	Priority: High
	'9 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Tasks should be opened.
	'3 Task Setup window should be opened.
	'4 Data should be entered.
	'5 Task Setup window should close and data should be populated in "Tasks" grid.
	'6 Task should be synced to Environment2.
	'7 Task Setup window should be opened.
	'8 "Below data should be present:
	'	Name: StarTask
	'	Description: Star Task Message
	'	Days To Complete:30 
	'	Priority: High"
	'9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2975", "The objective of test case is to verify synced 'Tasks' data in Environment 2 should match with Environment 1", Null

'====== Select Task Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Tasks"
Wait g_ShortWaitMedium

'====== Create new Task Setup in Environment 1 ======
'====== Validate Task Setup in Environment 1 ======
FRM_Logger_ReportInfoEvent "Task Setup", "Create Task Setup in environment 1", Null
strTask = Settings_Sync_LoanSetup_CreateTask("SettingsSync_TaskSetup", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Task Setup", "Validate new created Task '"&strTask&"' in environment 1", Null
Settings_Sync_LoanSetup_ValidateTask strTask, "SettingsSync_TaskSetup", 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Task Setup in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Task Setup", "Validate new created Task '"&strTask&"' in environment 2", Null
Settings_Sync_LoanSetup_ValidateTask strTask, "SettingsSync_TaskSetup", 0
Wait g_TinyWaitMedium

'====== Delete the Task in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTask", "Delete the Task in environment 1", Null
Settings_Sync_LoanSetup_DeleteTask strTask, 1
Wait g_TinyWaitMedium

'====== Delete the Task in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTask", "Delete the Task in environment 2", Null
Settings_Sync_LoanSetup_DeleteTask strTask, 0
Wait g_TinyWaitMedium
