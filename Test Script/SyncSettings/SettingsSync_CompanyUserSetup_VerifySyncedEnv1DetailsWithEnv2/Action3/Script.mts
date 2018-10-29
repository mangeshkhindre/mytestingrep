'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-1897 The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
        'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 Select Settings-> Company/User Setup-> User Group
   '3 Click on new button in Environment1.
   '4 "Enter User Group name.
   '5 Edit the data as mentioned in Test data column
   '  In Loans tab, add ""Accounting User"" by clicking add icon.(Expand Account management folder and select Accounting User then click ""Add to group-this level/user only"" icon. Click on Ok button
   '  In Access to Loan Folders section, select ""My Pipeline"" checkbox
   '6 Click on Save icon.
   '7 Select created User Group in test data column and click Sync to arrow button
   '8 Click on yes button
   '9 Verify that the synced User Groups data in Environment 2 should match with Environment1
   '10 Delete the created record in Encompass
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 User Groups module should be opened.
   '3 Group name popup should be opened.
   '4 Create a persona popup should be opened.
   '5 Data should be saved.
   '6 Settings Synchronization popup opens.
   '7 User Group should be synced to Environment2.
   '8 Synced Persona data in Environment 2 should match with Environment1
   '9 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1897","The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1", Null

'================Persona tab selction===============
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "User Groups"
GUI_Object_WaitTillVisibleX SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain").SwfObject("swfname:=lvGroup","index:=1"), 60

'================UserGroup Creation===================
Dim struserGroupName
FRM_Logger_ReportInfoEvent "UserGroup Creation","Started UserGroup Creation in Env1", Null
struserGroupName = SyncSettings_CompanyUserSetUP_UserGroups_CreateNew("SyncSettings_UserGroup", 1)

'=================persona Edit for Loan and Roles=====
SyncSettings_CompanyUserSetUP_UserGroups_SelectMember "Accounting Management", 1
SyncSettings_CompanyUserSetup_UserGroups_SelectLoanFolder "My Pipeline", 1

If GUI_Object_IsEnabled(SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=stdIconBtnSave","index:=1")) Then
   GUI_SwfObject_Click SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=stdIconBtnSave","index:=1")
End If
'=================Sync arrow fucntionality=====
BIZ_SyncSettings_ClickArrow()

'Validate th Sync Data in Env2
FRM_Logger_ReportInfoEvent "UserGroup valdiation","Started UserGroup validation in Env1", Null
SyncSettings_CompanyUserSetup_ValidateCreatedUserGroup struserGroupName, 1
FRM_Logger_ReportInfoEvent "UserGroup valdiation","Started UserGroup validation in Env2", Null
SyncSettings_CompanyUserSetup_ValidateCreatedUserGroup struserGroupName, 0

'==========Delete the User Group================
FRM_Logger_ReportInfoEvent "UserGroup Deletion","Started UserGroup Deletion in Env1", Null
SyncSttings_CompanyUserSetup_DeleteUserGroup struserGroupName, 1
FRM_Logger_ReportInfoEvent "UserGroup Deletion","Started UserGroup Deletion in Env2", Null
SyncSttings_CompanyUserSetup_DeleteUserGroup struserGroupName, 0