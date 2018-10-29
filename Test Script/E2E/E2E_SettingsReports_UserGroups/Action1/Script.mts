'@**************************************************************************************************
'@ TestStory: PTAC-3750 ReEnforcement_SettingsReports_UserGroups
'@ TestCase: 
	'1 PTAC-2439 Settings Reports - UserGroups - Generate  and validate User Group sheet "Role List View" - Admin login with Persona (New & Existing --> Internal , External), user account, group and role.
'@ Test Automation JIRA Task: PTAC-3751 E2E_SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet
'@ TestData: 
	'1 Setttings_CompanyUserSetup, Persona, SettingReports_Persona
	'2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, SettingReports_User
	'3 CompanyUserSetup_Roles_Groups, Groups, SettingReports_UserGroup
	'4 CompanyUserSetup_Roles_Groups, Roles, SettingReports_Role
	'5 Settings_SystemAdministration, SettingReports, SettingReports_CreateReport
	'6 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, SettingReports_ExistingUser	
	'7 CompanyUserSetup_Roles_Groups, Roles, SettingReports_ExistingRole
'@ Pre-conditions: 
	'1 Create a new persona. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Persona (Persona type: Internal & External & with all features).
	'2 Create a new user account. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Organization/ Users and here while creating a new user select the newly created persona.
	'3 Create a new usergroup. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> User Groups.
	'4 Create a new role. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Role and here while creating a new role select the newly created persona & user group.
	'5 Create or use an existing persona, user account, user group & role
'@ Description: 
'@ TestSteps:
	'Updated at Action level
'@ ExpectedResult:
	'Updated at Action level
'***************************************************************************************************

FRM_RT_SetupTest(Null)


'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"	

RunAction "SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet_001", oneIteration, strUserGroup, strRole, strUserID

RunAction "SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet_002", oneIteration, strUserGroup

RunAction "SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet_003", oneIteration, strRoleName

RunAction "SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet_004", oneIteration, strUserGroup, strRole, strUserID

RunAction "SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet_005", oneIteration, strUserGroup, strRoleName

'====== To logout from Encompass ======
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
