'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
	'1 PTAC-2973 The objective of test case is to verify synced 'Loan Duplication Template' data in Environment 2 should match with Environment 1
	'2 PTAC-2982 The objective of test case is to verify synced 'Changed Circumstances setup' data in Environment 2 should match with Environment 1
	'3 PTAC-2978 The objective of test case is to verify synced 'Condition Forms' data in Environment 2 should match with Environment 1
	'4 PTAC-2980 The objective of test case is to verify synced 'Zipcode Setup' data in Environment 2 should match with Environment 1
	'5 PTAC-2975 The objective of test case is to verify synced 'Tasks' data in Environment 2 should match with Environment 1
	'6 PTAC-2974 The objective of test case is to verify synced 'Alerts' data in Environment 2 should match with Environment 1
	'7 PTAC-2979 The objective of test case is to verify synced 'Loan Custom Fields' data in Environment 2 should match with Environment 1
	'8 PTAC-2981 The objective of test case is to verify synced 'Piggyback Loan Synchronization' data in Environment 2 should match with Environment 1
	'9 PTAC-2977 The objective of test case is to verify synced 'Custom Print Forms' data in Environment 2 should match with Environment 1
	'10 PTAC-2983 The objective of test case is to verify synced 'Print Form Groups' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_Loansetup, Form, SettingsSync_LoanDuplicationTemplate
	'4 Settings_Loansetup, LoanDuplicationTemplate, SettingsSync_LoanDuplicationTemplate
	'5 Settings_Loansetup, CreateNewAlert, SettingsSync_Alert
  	'6 Settings_Loansetup, Task, SettingsSync_TaskSetup
  	'7 Settings_Loansetup, Form, SettingsSync_ConditionForms 
  	'8 Settings_Loansetup, Form, SettingsSync_CustomPrintForm
  	'9 Settings_Loansetup, Form, SettingsSync_PrintFormGroup
  	'10 Settings_Loansetup, CustomFields, SettingsSync_LoanCustomFields
  	'11 Settings_Loansetup, ChangedCircumstances, SettingsSync_ChangedCircumSetup
  	'12 Settings_Loansetup, PiggybackLoanSynchronization, SettingsSync_PiggyBack
  	'13 Settings_Loansetup, ZipCode, SettingsSync_ZipcodeSetup
'@ Description: 
	'1 The objective of test case is to verify synced 'Loan Duplication Template' data in Environment 2 should match with Environment 1
	'2 The objective of test case is to verify synced 'Zipcode Setup' data in Environment 2 should match with Environment 1
	'3 The objective of test case is to verify synced 'Condition Forms' data in Environment 2 should match with Environment 1
	'4 The objective of test case is to verify synced 'Changed Circumstances setup ' data in Environment 2 should match with Environment 1
	'5 The objective of test case is to verify synced 'Tasks' data in Environment 2 should match with Environment 1
	'6 The objective of test case is to verify synced 'Alerts' data in Environment 2 should match with Environment 1
	'7 The objective of test case is to verify synced 'Loan Custom Fields' data in Environment 2 should match with Environment 1
	'8 The objective of test case is to verify synced 'Piggyback Loan Synchronization' data in Environment 2 should match with Environment 1
	'9 The objective of test case is to verify synced 'Custom Print Forms' data in Environment 2 should match with Environment 1
	'10 The objective of test case is to verify synced 'Print Form Groups' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3289", "Script Name - SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2", Null

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Loan Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Loan Setup"

RunAction "SettingsSync_VerifySyncedEnv1LDTDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1AlertsDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1TaskDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1ConditionFormsDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1CustomPrintFormsDetailWithEnv2", OneIteration 

RunAction "SettingsSync_VerifySyncedEnv1PrintFormGroupsDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1LoanCustomFieldsDetailWithEnv2", OneIteration    	

RunAction "SettingsSync_VerifySyncedEnv1PiggybackLoanSyncDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1ZipCodeSetupDetailWithEnv2", OneIteration

RunAction "SettingsSync_VerifySyncedEnv1ChangedCircumSetupDetailWithEnv2", OneIteration

FRM_RT_TearDownTest(Null)
