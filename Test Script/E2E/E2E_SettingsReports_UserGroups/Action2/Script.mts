'@**************************************************************************************************
'@ TestStory: PTAC-3750 ReEnforcement_SettingsReports_UserGroups
'@ TestCase: PTAC-2427 Settings Reports - UserGroups - Generate  and validate User Group sheet "Role List View" - Admin login with newly created persona, user account, group and role.
'@ Test Automation JIRA Task: PTAC-3751 E2E_SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet
'@ TestData: 
	'1 Setttings_CompanyUserSetup, Persona, SettingReports_Persona
	'2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, SettingReports_User
	'3 CompanyUserSetup_Roles_Groups, Groups, SettingReports_UserGroup
	'4 CompanyUserSetup_Roles_Groups, Roles, SettingReports_Role
	'5 Settings_SystemAdministration, SettingReports, PTAC-3751_SettingReports_CreateReport
'@ Pre-conditions: 
	'1 Create a new persona. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Persona (Persona type: Internal & External & with all features).
	'2 Create a new user account. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Organization/ Users and here while creating a new user select the newly created persona.
	'3 Create a new usergroup. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> User Groups.
	'4 Create a new role. To do the needful login to encompass as an admin with credentials admin / password. Then navigate to the encompass settings --> Company /User Setup --> Role and here while creating a new role select the newly created persona & user group.
'@ Description: 
'@ TestSteps:
	'1 Navigate to the encompass settings --> Company/ User Setup --> User Groups.
	'2 Select the newly created user group and click on the "Role List View" tab.
	'3 Select the newly created or existing role from the drop down
	'4 Select "The group can view" then select the radio button, "Some <Role Name>"
	'5 Click on the (+) icon and select existing user account and click on the icon at top right side saying "Add to group - this level/ user only" & then press "Ok" button. 
	'6 Select checkbox "Don't show disabled user accounts in the list"
	'7 Save the "User Group" record successfully.
	'8 Go to system administration --> settings report --> and here create a user group settings report by selecting following options:
		'1 Report Type: User Group.
		'2 Check the newly created user group.
		'3 Enter Report name.
		'4 Check the check box "Role List View" and click on the "Create Report" button.
		'5 Wait for a while (for the Report to generate) and click on "Refresh" button.
	'9 Open the report and check the worksheet: "Role List View"
		'1 User Group
		'2 Role
		'3 Group Can View
		'4 Organization / User Name:
		'5 Include Levels Below
		'6 User ID
		'7 Don’t show disabled user accounts
'@ ExpectedResult:
	'1 Role List View tab should open successfully.
	'2 Data should be saved successfully.
	'3 Data should be saved successfully.
	'4 Report should be generated successfully.
	'5 Validate the following values:
		'1 User Group: "Selected  User Group name".
		'2 Role: List of the roles which are mapped against that user group.
		'3 Group Can View: Selection made as per the user roles.
		'4 Organization / User Name: Name of the org/ user name where the user was created.
		'5 Include Levels Below:  Yes or No when an organization is selected and blank if an user id is selected. 
		'6 User ID: If an user is selected, the user id column will have the user id
		'7 Don’t show disabled user accounts = N/A
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2427", "Settings Reports - UserGroups - Generate  and validate User Group sheet 'Role List View' - Admin login with newly created persona, user account, group and role.", Null

'====== Create a Persona ======
strPersonaName 	= BIZ_Settings_CompanyUserSetup_CreatePersona("SettingReports_Persona")

'====== Create a Organization User ======
Parameter("strUserID") = SettingReports_CompanyUserSetup_CreateOrganizationUser("SettingReports_User", Array(strPersonaName))

'====== Create a User Group ======
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Parameter("strUserGroup") = BIZ_UserGroups_CreateNew("SettingReports_UserGroup")

'====== Create a new Role ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Roles"
Parameter("strRole")	= SettingReports_Roles_CreateNew("SettingReports_Role", Array(strPersonaName), Parameter("strUserGroup"))

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
arrRoles = SettingReports_UserGroups_RoleListView_AccessToRole("SettingReports_User", Parameter("strUserGroup"), Parameter("strRole"), Parameter("strUserID"), "Some Users")

'====== Create a Settings Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
strReportName = SettingReports_SystemAdministration_CreateReport("PTAC-3751_SettingReports_CreateReport", Parameter("strUserGroup"))
util_win_CloseExcel()

'====== Download Report ======
SettingReports_SystemAdministration_OpenDownloadReport strReportName	
strExcelFilePathWithName   = Pathfinder.Locate("Test Report\")&strReportName&".xlsx"
Wait g_LongWaitSmall + g_LongWaitMedium 'Explicit wait added due to sync
UTIL_Excel_Opened_File_Save strExcelFilePathWithName

Dim objData
Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "SettingReports_User")
arrValues = Array(Parameter("strUserGroup"), Parameter("strRole"),  objData.Item("CanView"),  objData.Item("UserName"),  objData.Item("Levels"), Parameter("strUserID"),  objData.Item("DisabledUser"))

'====== Validate all the roles mapped to User Group ======
SettingReports_SystemAdministration_ValidateRoles strReportName&".xlsx", arrRoles

'====== Validate Report data ======
SettingReports_SystemAdministration_ValidateReportData strReportName&".xlsx", arrValues
util_win_CloseExcel()
'====== Delete Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
Wait g_ShortWaitMedium
SettingReports_SystemAdministration_DeleteReport strReportName
