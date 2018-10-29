'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2977 The objective of test case is to verify synced 'Custom Print Forms' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Settings_Loansetup, Form, SettingsSync_CustomPrintForm
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Custom Print Forms' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1. Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Custom Print Forms
	'3 In Environment1, Click on New icon.
	'4 Enter Custom Print Form name.
	'5 Select the Custom Print Form and click Edit icon
	'6 Enter Description mentioned in Test Data column
	'7 Click on Insert button
	'8 In "Insert Fields" popup, click on Save button
	'9 In "Insert Fields" popup, click on Close button.
	'10 Select the Custom Print Form mentioned in test data column and click Sync to arrow button.
	'11 Click on Yes button.
	'12 Click on Ok button.
	'13 In Environment2, select the synced Custom Print Form and click on Edit icon
	'14 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Custom Print Forms should be opened.
	'3 Custom Print Form should be created.
	'4 Name should be entered.
	'5 Insert Fields window should be opened and word document "StarCPF" should be opened.
	'6 "Data should be selected.
	'7 Field ID should show FR0106"
	'8 Below data should populate in "StarCPF" document, «Borrower_Present_Address_City_FR0106»
	'9 Data should be saved
	'10 Insert Fields window and word document "StarCPF" should be closed.
	'12 Settings Synchronization popup opens.
	'13 File System Setting pop-up opens
	'14 File System Setting pop-up should close and Custom Print Form "StarCPF" should be synced to Environment2.
	'15 Below data should populate in "StarCPF" document, «Borrower_Present_Address_City_FR0106»
	'16 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2977", "The objective of test case is to verify synced 'Custom Print Forms' data in Environment 2 should match with Environment 1", Null

'====== Select Custom Print Forms Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Custom Print Forms"
Wait g_ShortWaitMedium

'====== Create Custom Print Form in Environment 1 ======
'====== Validate Custom Print Form in environment 1 ======
FRM_Logger_ReportInfoEvent "Custom Print Form", "Create Custom Print Form in environment 1", Null
strFormName = Settings_Sync_LoanSetup_CreateIcon("SettingsSync_CustomPrintForm", "Custom Print Form", 1)
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Custom Print Form", "Validate Custom Print Form in environment 1", Null
boolFormExist = Settings_Sync_LoanSetup_SelectTemplate(strFormName, 1)
FRM_VerifyEqual boolFormExist, True, "Custom Print Form '"&strFormName&"' is created", "'"&strFormName&"' exists in list "
Wait g_TinyWaitMedium

'====== Edit Custom Print Form and validate document  in environment 1 ======
FRM_Logger_ReportInfoEvent "Custom Print Form", "Edit Custom Print Form and validate document data.", Null
Settings_Sync_LoanSetUp_CustomPrintForms_Edit "SettingsSync_CustomPrintForm", strFormName, 1
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteDocument strFormName&".docx"

'====== Click on Sync arrow button ======
'====== Validate Custom Print Form in environment 2 ======
'====== Validate Document data in environment 2 ======
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_SelectTemplate strFormName, 1
Wait g_TinyWaitMedium
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Custom Print Form", "Validate Custom Print Form in environment 2", Null
Wait g_TinyWaitMedium
boolFormExist = Settings_Sync_LoanSetup_SelectTemplate(strFormName, 0)
FRM_VerifyEqual boolFormExist, True, "Custom Print Form '"&strFormName&"' is synced with env 2", "'"&strFormName&"' exists in list."
FRM_Logger_ReportInfoEvent "Select Custom Print Form and click Edit button", "Validate document data in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=btnOpen","index:=0")
Wait g_LongWaitSmall
Settings_Sync_LoanSetUp_SaveDocument strFormName&".docx"
Wait g_TinyWaitMedium
GUI_SwfButton_Click SwfWindow("swfname:=InsertFieldDialog").SwfButton("swfname:=closeBtn")
Wait g_LongWaitSmall
Settings_Sync_LoanSetup_ValidateDocumentData strFormName&".docx", "SettingsSync_CustomPrintForm"
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteDocument strFormName&".docx"
Wait g_TinyWaitMedium

'====== Delete the Custom Print Form in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Custom Print Form in environment 1", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=1")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strFormName, 1

'====== Delete the Custom Print Form in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the Custom Print Form in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strFormName, 0
