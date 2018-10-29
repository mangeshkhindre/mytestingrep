'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-2973 The objective of test case is to verify synced 'Loan Duplication Template' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3289 SettingsSync_VerifySyncedEnv1LoanSetupDetailsWithEnv2
'@ TestData: 
	'1 Global_Data, Login, Sync_Admin_Login1
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Settings_Loansetup, LoanDuplicationTemplate, SettingsSync_LoanDuplicationTemplate
  	'4 Settings_Loansetup, Form, SettingsSync_LoanDuplicationTemplate  
'@ Description: The objective of test case is to verify synced 'Loan Duplication Template' data in Environment 2 should match with Environment 1
'@ TestSteps:
	'1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'2 Select Settings-> Loan Setup->Loan Duplication Templates
	'3 Click on New(+) in Environment1.
	'4 Enter Loan Duplication Template name.
	'5 Select the template and click Edit icon
	'6 Enter Description mentioned in Test Data column
	'7 Select Borrower Information checkbox
	'8 Select Co-Borrower Information checkbox
	'9 Select Property Address checkbox and select "Borrower's Present Address" option from the dropdown.
	'10 Select Borrower Employer Information checkbox
	'11 Select Co-Borrower Employer Information checkbox
	'12 Select Borrower Present Address checkbox and select " Borrower's Prior Residence" option from the dropdown.
	'13 Select Co-Borrower Present Address checkbox and select " Co-Borrower's Prior Residence" option from the dropdown.
	'14 Select new icon preset in Additional Fields section 
	'15 Enter Field ID mentioned in Test Data column
	'16 Click Add button
	'17 Click on Save button
	'18 Select template mentioned in test data column and click Sync to arrow button.
	'19 In Environment2, select the synced template and click on Edit icon
	'20 Verify that the below data is shown:
	'	1. Borrower Information checkbox is checked.
	'	2. Co-Borrower Information checkbox is checked.
	'	3. Property Address checkbox  is checked and select "Borrower's Present Address" option is selected from the dropdown.
	'	4. Borrower Employer Information checkbox is checked.
	'	5. Co-Borrower Employer Information checkbox is checked.
	'	6. Borrower Present Address checkbox  is checked and select  "Borrower's Prior Residence" option is selected from the dropdown.
	'	7. Co-Borrower Present Address checkbox  is checked and select " Co-Borrower's Prior Residence" option is selected from the dropdown.
	'	8. Field ID "1179" is displayed in Additional Fields section.
	'21 Delete the created record in both ennvironments
'@ ExpectedResult:
	'1 Settings Sync tool should be displayed with two environment details.
	'2 Loan Duplication Templates should be opened.
	'3 'Test Template' should create.
	'4 Name should be entered.
	'5 Loan Duplication Templates window should be opened.
	'6 The description to be entered
	'7 Add Required fields popup opens.
	'8 Field ID should be displayed in the grid.
	'9 Loan Duplication Templates window should be closed and Data should be saved.
	'10 Loan Duplication Template should be synced to Environment2.
	'11 Loan Duplication Templates window should be opened.
	'12 Below data should be shown:
	'1. Borrower Information checkbox should be  checked.
	'2. Co-Borrower Information checkbox should be checked.
	'3. Property Address checkbox  should be checked and select "Borrower's Present Address" option should be selected from the dropdown.
	'4. Borrower Employer Information checkbox should be checked.
	'5. Co-Borrower Employer Information checkbox should be checked.
	'6. Borrower Present Address checkbox  should be checked and select " Borrower's Prior Residence" option should be selected from the dropdown.
	'7. Co-Borrower Present Address checkbox  should be checked and select " Co-Borrower's Prior Residence" option should be selected from the dropdown.
	'8. Field ID "1179" should be displayed in Additional Fields section.
	'13 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2973", "The objective of test case is to verify synced 'Loan Duplication Template' data in Environment 2 should match with Environment 1", Null

'====== Select Loan Duplication Template Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Loan Duplication Templates"
Wait g_ShortWaitMedium

'====== Create new Loan Duplication Template in Environment 1 ======
'====== Validate new Loan Duplication Template in Environment 1 ======
'====== Set Data in Loan Duplication Template in Environment 1 ======
'====== Validate Data in Loan Duplication Template in Environment 1 ======
FRM_Logger_ReportInfoEvent "Loan Duplication Template ", "Create Loan Duplication Template in environment 1", Null
Wait g_TinyWaitMedium
strTemplateName = Settings_Sync_LoanSetup_CreateIcon("SettingsSync_LoanDuplicationTemplate", "Loan Duplication Templates", 1)
FRM_Logger_ReportInfoEvent "Loan Duplication Template ", "Validate new created Loan Duplication Template '"&strTemplateName&"' in environment 1", Null
Wait g_TinyWaitMedium
boolTemplateExist = Settings_Sync_LoanSetup_SelectTemplate(strTemplateName, 1)
Wait g_TinyWaitMedium
FRM_VerifyEqual boolTemplateExist, True, "new created Loan Duplication Template '"&strTemplateName&"'", "'"&strTemplateName&"' exists in list "
FRM_Logger_ReportInfoEvent "Loan Duplication Template ", "Set data in Loan Duplication Template in environment 1", Null
Settings_Sync_LoanSetup_EditLoanDuplicationTemplate "SettingsSync_LoanDuplicationTemplate", strTemplateName, 1
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Loan Duplication Template ", "Validate data in Loan Duplication Template in environment 1", Null
Settings_Sync_LoanSetup_ValidateEditLoanDuplicationTemplate "SettingsSync_LoanDuplicationTemplate", strTemplateName, 1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate Synced Loan Duplication Template in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Loan Duplication Template", "Validate Synced Loan Duplication Template '"&strTemplateName&"' in environment 2", Null
boolTemplateExist = Settings_Sync_LoanSetup_SelectTemplate(strTemplateName, 0)
Wait g_TinyWaitMedium
FRM_VerifyEqual boolTemplateExist, True, "Loan Duplication Template '"&strTemplateName&"' synced with environment 2", "'"&strTemplateName&"' exists in list "

'====== Validate Data in Loan Duplication Template in Environment 2 ======
FRM_Logger_ReportInfoEvent "Loan Duplication Template ", "Validate data in Loan Duplication Template in environment 2", Null
Settings_Sync_LoanSetup_ValidateEditLoanDuplicationTemplate "SettingsSync_LoanDuplicationTemplate", strTemplateName, 0
Wait g_TinyWaitMedium

'====== Delete the Template in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the template in environment 1", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=1")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strTemplateName, 1

'====== Delete the Template in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_LoanSetup_DeleteTemplate", "Delete the template in environment 2", Null
GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=gvDirectory","index:=0")
Wait g_TinyWaitMedium
Settings_Sync_LoanSetup_DeleteTemplate strTemplateName, 0
