'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2981 The objective of test case is to verify synced 'Piggyback Loan Synchronization' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, PiggybackLoanSynchronization, SettingsSync_PiggyBack
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Piggyback Loan Synchronization' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup-> Piggyback Loan Synchronization
	'3 In Environment1, select the field ID and click Sync to arrow button.
	'4 Click on Yes button.
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Piggyback Loan Synchronization Setup should be opened.
	'3 Settings Synchronization popup opens.
	'4 Settings Synchronization popup closes and the "Field ID:1014" should be synced to Environment2.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2981", "The objective of test case is to verify synced 'Piggyback Loan Synchronization' data in Environment 2 should match with Environment 1", Null

'====== Select Piggyback Loan Synchronization Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Piggyback Loan Synchronization"
Wait g_TinyWaitMedium
Wait g_ShortWaitMedium

'====== Select Field ID in Environment 1 ======
'====== Click on Sync arrow button ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_PiggybackLoanSynch_SelectField", "Select Field ID in Piggyback Loan Synchronization in Environment 1", Null
Settings_Sync_LoanSetup_PiggybackLoanSynch_SelectField "SettingsSync_PiggyBack", 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()

'====== Validate Synced Field ID in Environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_PiggybackLoanSynch_SelectField", "Validate Synced Field ID in Piggyback Loan Synchronization in Environment 2", Null
Wait g_TinyWaitMedium
arrField = Settings_Sync_LoanSetup_PiggybackLoanSynch_SelectField("SettingsSync_PiggyBack", 0)
FRM_VerifyEqual arrField(0), True, "Field ID", "Field ID '"&arrField(1)&"' is synced to Environment successfully"
