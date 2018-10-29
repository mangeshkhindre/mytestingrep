'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2983 The objective of test case is to verify synced 'Print Form Groups' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, Form, SettingsSync_PrintFormGroup
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Print Form Groups' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1. Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Print Form Groups
	'3 In Environment1, Click on New icon.
	'4 Enter Print Form Group name.
	'5 Enter description
	'6 Select Standard Forms tab
	'7 Select "1003 Page 1" and click Add button.
	'8 Click on Save button.
	'9 Select the Print Form Groups mentioned in test data column and click Sync to arrow button.
	'10 Click on Yes button.
	'11 Click on Ok button.
	'12 In Environment2, select the synced Print Form Group and click on Edit icon
	'13 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Print Form Groups should be opened.
	'3 Print Form Group should be created.
	'4 Name should be entered.
	'5 Description should be entered.
	'6 Standard Forms tab shold be selected.
	'7 In "Selected Forms" tab, "1003 Page 1" should be moved.
	'8 Print Form Group Details window should be closed.
	'9 Settings Synchronization popup opens.
	'File System Setting pop-up opens
	'10 File System Setting pop-up should close and Print Form Group "StarCPF" should be synced to Environment2.
	'11 "Below data should be shown:
	'	In ""Selected Forms"" tab, ""1003 Page 1"" should be shown
	'	Name: StarPFG
	'	Description: StarPFG_Description"
	'12 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2983", "The objective of test case is to verify synced 'Print Form Groups' data in Environment 2 should match with Environment 1", Null

'====== Select Print Form Group Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Print Form Groups"
Wait g_ShortWaitMedium

'====== Create Print Form Groups in Environment 1 ======
'====== Validate Print Form Groups in environment 1 ======
FRM_Logger_ReportInfoEvent "Print Form Groups", "Create Print Form Groups in environment 1", Null
strFormName = Settings_Sync_LoanSetup_CreateIcon("SettingsSync_PrintFormGroup", "Print Form Groups", 1)
FRM_Logger_ReportInfoEvent "Print Form Groups", "Validate Print Form Groups in environment 1", Null
Wait g_TinyWaitMedium
boolFormExist = Settings_Sync_LoanSetup_SelectTemplate(strFormName, 1)
FRM_VerifyEqual boolFormExist, True, "Print Form Groups '"&strFormName&"' is created", "'"&strFormName&"' exists in list "

'====== Set Data in Print Form Groups in Environment 1 ======
'====== Validate Data in Print Form Groups in Environment 1 ======
FRM_Logger_ReportInfoEvent "Print Form Groups ", "Set data in Print Form Groups in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_EditPrintFormGroup "SettingsSync_PrintFormGroup", strFormName, 1
FRM_Logger_ReportInfoEvent "Print Form Groups ", "Validate data in Print Form Groups in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_ValidatePrintFormGroup "SettingsSync_PrintFormGroup", strFormName, 1

'====== Click on Sync arrow button ======
'====== Validate Print Form Groups in environment 2 ======
'====== Validate Data in Print Form Groups in Environment 2 ======
Settings_Sync_LoanSetup_SelectTemplate strFormName, 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Print Form Groups", "Validate Print Form Groups in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
boolFormExist = Settings_Sync_LoanSetup_SelectTemplate(strFormName, 0)
FRM_VerifyEqual boolFormExist, True, "Print Form Group '"&strFormName&"' is synced with env 2", "'"&strFormName&"' exists in list."
FRM_Logger_ReportInfoEvent "Print Form Groups ", "Validate data in Print Form Groups in environment 2", Null
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_ValidatePrintFormGroup "SettingsSync_PrintFormGroup", strFormName, 0

'====== Delete the Print Form Group in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Form in environment 1", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=1")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strFormName, 1

'====== Delete the Print Form Group in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Form in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strFormName, 0
