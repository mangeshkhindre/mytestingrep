'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2978 The objective of test case is to verify synced 'Condition Forms' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, Form, SettingsSync_ConditionForms
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Condition Forms' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Condition Forms
	'3 In Environment1, Click on New icon.
	'4 Enter Condition Form name.
	'5 Select the Condition Form and click Edit icon
	'6 Select data mentioned in test data column
	'7 Click on Save button
	'8 Select the Condition Form mentioned in test data column and click Sync to arrow button.
	'9 Click on Yes button.
	'10 Click on Ok button.
	'11 In Environment2, select the synced Condition Form and click on Edit icon
	'12 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Condition Forms module should be opened.
	'3 Condition Form should be created.
	'4 Name should be entered.
	'5 Condition form Details window should be opened.
	'6 "Data should be selected.
	'7 Data should be saved.
	'8 Settings Synchronization popup opens.
	'9 File System Setting pop-up opens
	'10 File System Setting pop-up should close and Condition Form "StarCondition Form" should be synced to Environment2.
	'11 "Below data should be selected:
	'	1. Select ""All Conditions"" option from the ""include these conditions"" dropdown.
	'	2. select Condition status checkbox
	'	3. ""Conditions owner name"" from ""Sort conditions by"""
	'12 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2978", "The objective of test case is to verify synced 'Condition Forms' data in Environment 2 should match with Environment 1", Null

'====== Select Condition Forms Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Condition Forms"
Wait g_ShortWaitMedium

'====== Create new Condition Forms in Environment 1 ======
'====== Validate new Condition Forms in Environment 1 ======
'====== Set Data in Condition Forms in Environment 1 ======
'====== Validate Data in Condition Forms in Environment 1 ======
FRM_Logger_ReportInfoEvent "Condition Forms", "Create Condition Forms in environment 1", Null
strTemplateName = Settings_Sync_LoanSetup_CreateIcon("SettingsSync_ConditionForms", "Condition Forms", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Condition Forms", "Validate new created Condition Forms '"&strTemplateName&"' in environment 1", Null
boolTemplateExist = Settings_Sync_LoanSetup_SelectTemplate(strTemplateName, 1)
Wait g_TinyWaitMedium
FRM_VerifyEqual boolTemplateExist, True, "new created Condition Forms '"&strTemplateName&"'", "'"&strTemplateName&"' exists in list "
FRM_Logger_ReportInfoEvent "Condition Forms", "Set data in Condition Form in environment 1", Null
Settings_Sync_LoanSetup_EditConditionForms "SettingsSync_ConditionForms", strTemplateName, 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Condition Forms", "Validate data in Condition Forms in environment 1", Null
Settings_Sync_LoanSetup_ValidateEditConditionForms "SettingsSync_ConditionForms", strTemplateName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Synced Condition Form in Environment 2 ======
Settings_Sync_LoanSetup_SelectTemplate strTemplateName, 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
FRM_Logger_ReportInfoEvent "Condition Forms", "Validate Synced Condition Forms '"&strTemplateName&"' in environment 2", Null
Wait g_TinyWaitMedium
boolTemplateExist = Settings_Sync_LoanSetup_SelectTemplate(strTemplateName, 0)
Wait g_TinyWaitMedium
FRM_VerifyEqual boolTemplateExist, True, "Condition Forms '"&strTemplateName&"' is synced with environment 2", "'"&strTemplateName&"' exists in list "
Wait g_TinyWaitMedium

'====== Validate Data in Condition Forms in Environment 2 ======
FRM_Logger_ReportInfoEvent "Condition Forms", "Validate data in Condition Forms in environment 2", Null
Settings_Sync_LoanSetup_ValidateEditConditionForms "SettingsSync_ConditionForms", strTemplateName, 0
Wait g_TinyWaitMedium

'====== Delete the Condition Form in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Condition Form in environment 1", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=1")
Settings_Sync_LoanSetup_DeleteTemplate strTemplateName, 1
Wait g_TinyWaitMedium

'====== Delete the Condition Form in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Condition Form in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strTemplateName, 0
