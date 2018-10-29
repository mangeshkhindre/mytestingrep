'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-2078 The objective of test case is to verify synced Roles data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
        'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2'1 Select Settings-> Company/User Setup-> Roles
     '2 Click on New icon in Environment1.
     '3 Enter data in Role Name
     '4 Enter data in Role Abbreviation
     '5 Click on New icon present in "All Users in These Personas" section
     '6 Select persona and click "Select" button
     '7 Click on present New icon present in "User Groups" section
     '8 Select User Group and click "Select" button.
   '3 Click on Save icon.
   '4 Select created User Group in test data column and click Sync to arrow button
   '5 Verify that the synced User Groups data in Environment 2 should match with Environment1
   '6 Delete the created record in Encompass
'@ ExpectedResult:
   '01 Settings Sync tool should be displayed with two environment details.
    '2 '1 User Groups module should be opened
       '2 Create Edit/Role pop up should be opened
       '3 "Select Personas"" pop-up should be opened
       '4 "StarPersona"" should be populated in ""All Users in These Personas"" section
       '5 "Select User Groups"" pop-up should be opened
       '6 "StarUserGroup"" should be populated in ""User Groups"" section
   '3 Roles should be saved and displayed in the grid.
   '4 Role should be synced to Environment2.
   '5 Synced Role data in Environment 2 should match with Environment1
   '6 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2078","The objective of test case is to verify synced Roles data in Environment 2 should match with Environment 1", Null

'================Persona tab selction===============
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Roles"

'================Role Creation===================
Dim strRoleName
FRM_Logger_ReportInfoEvent "Role Creation","Started Role Creation", Null
strRoleName = SyncSettings_CompanyUserSetUp_Roles_CreateNew("SyncSettings_Roles", 1)

If GUI_Object_IsEnabled(SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=stdIconBtnSave","index:=1")) Then
   GUI_SwfObject_Click SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=stdIconBtnSave","index:=1")
End If
'=================Sync arrow fucntionality=====
BIZ_SyncSettings_ClickArrow()

'Validate th Sync Data in Env2
FRM_Logger_ReportInfoEvent "Roles valdiation in Env1","Created Roles validation in Env1", Null
SyncSettings_CompanyUserSetUp_Roles_SelectExistingRoleAndValidateData "SyncSettings_Roles", strRoleName, 1
FRM_Logger_ReportInfoEvent "Roles valdiation in Env2","Created Roles validation in Env2", Null
SyncSettings_CompanyUserSetUp_Roles_SelectExistingRoleAndValidateData "SyncSettings_Roles", strRoleName, 0

'==========Delete the Roles================
FRM_Logger_ReportInfoEvent "Role Deletion","Started Role deletion in Env1", Null
SyncSettings_CompanyUserSetUp_Roles_Delete strRoleName, 1
FRM_Logger_ReportInfoEvent "Role Deletion","Started Role deletion in Env2", Null
SyncSettings_CompanyUserSetUp_Roles_Delete strRoleName, 0