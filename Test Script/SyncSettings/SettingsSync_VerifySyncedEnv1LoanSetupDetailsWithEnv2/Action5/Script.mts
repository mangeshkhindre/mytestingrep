'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2982 The objective of test case is to verify synced 'Changed Circumstances setup' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, ChangedCircumstances, SettingsSync_ChangedCircumSetup
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Changed Circumstances setup ' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup-> Changed Circumstances setup
	'3 In Environment1, Click on New icon.
	'4 Enter the data in Details section as mentioned in Test Data column.
	'5 Click on Save icon."
	'6 Select the Changed Circumstances options mentioned in test data column and click Sync to arrow button.
	'7 "In Environment2, select the synced option and Verify that below data is present:
	'	Description: Green Description
	'	Reason: Other [LE &CD]
	'	Code: GD
	'	Comments: GD Comments"
	'8 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Changed Circumstances setup should be opened.
	'3 Loan Custom Field Editor should be opened.
	'4 Record should be displayed in the grid.
	'5 Option should be synced to Environment2.
	'6 "Below data should be present:
	'	Description: Green Description
	'	Reason: Other [LE &CD]
	'	Code: GD
	'	Comments: GD Comments"
	'7 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2982", "The objective of test case is to verify synced 'Changed Circumstances setup' data in Environment 2 should match with Environment 1", Null

'====== Select Changed Circumstances Setup Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Changed Circumstances Setup"
Wait g_ShortWaitMedium

'====== Create new Changed Circumstances Setup in Environment 1 ======
'====== Validate Changed Circumstances Setup in Environment 1 ======
FRM_Logger_ReportInfoEvent "Changed Circumstances Setup", "Create Changed Circumstances Setup in environment 1", Null
strCode = Settings_Sync_LoanSetup_ChangedCircumstanceSetupSetData("SettingsSync_ChangedCircumSetup", 1)
FRM_Logger_ReportInfoEvent "Changed Circumstances Setup", "Validate Changed Circumstances Setup in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_ValidateChangedCircumstanceSetup "SettingsSync_ChangedCircumSetup", strCode, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
Settings_Sync_LoanSetup_SelectChangedCircumstanceSetup strCode, 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
Settings_Sync_LoanSetup_SelectChangedCircumstanceSetup strCode, 0
Wait g_TinyWaitMedium

'====== Validate Changed Circumstances Setup in Environment 2 ======
FRM_Logger_ReportInfoEvent "Changed Circumstances Setup", "Validate Changed Circumstances Setup in environment 2", Null
Settings_Sync_LoanSetup_ValidateChangedCircumstanceSetup "SettingsSync_ChangedCircumSetup", strCode, 0
Wait g_TinyWaitMedium

'====== Logout from the Setting Sync Tool application ======
BIZ_Login_SyncLogout()

FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteChangedCircum", "Delete the "&strCode&" in environment 1", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"
		
'====== Go to Settings/'Tables and Fees'/Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Changed Circumstances Setup"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfLabel("swfname:=lblHeader","text:=Changed Circumstances Setup"), 30

'====== Delete the Changed Circumstances Setup in environment 1 ======
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteChangedCircum strCode
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteChangedCircum", "Delete the "&strCode&" in environment 2", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login1"
		
'====== Go to Settings/'Tables and Fees'/Title ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Changed Circumstances Setup"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfLabel("swfname:=lblHeader","text:=Changed Circumstances Setup"), 30
Wait g_TinyWaitMedium

'====== Delete the Changed Circumstances Setup in environment 2 ======
Settings_Sync_LoanSetup_DeleteChangedCircum strCode
Wait g_TinyWaitMedium
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()
