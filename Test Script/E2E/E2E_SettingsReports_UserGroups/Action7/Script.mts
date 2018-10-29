'@**************************************************************************************************
'@ TestStory: PTAC-3750 ReEnforcement_SettingsReports_UserGroups
'@ TestCase: 
	'1 PTAC-2441 Settings Reports - UserGroups - Generate  and validate User Group sheet "Role List View" - Admin login with All users, users below hierarchy & some users.
'@ Test Automation JIRA Task: PTAC-3751 E2E_SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet
'@ TestData: 
	'1 Settings_SystemAdministration, SettingReports, PTAC-3751_SettingReports_CreateReport
	'2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, PTAC-3751_SettingReports_ExistingUser	
	'3 CompanyUserSetup_Roles_Groups, Roles, SettingReports_ExistingRole
'@ Pre-conditions: 
	'1 System should have an existing persona, user account, user group & role.
	'2 User group should have multiple roles with different users bifurcations. 
		'Ex:
		'In Company/User Setup -> User Groups -> Role List View -> The Group can View:
		'Role-1: select option as -> 'Select All Users'
		'Role-2: select option as -> 'Loan Officers below in organization hierarchy'
		'Role-3: select option as -> 'Some Loan Officers'
'@ Description: 
'@ TestSteps:
	'1 Save the "User Group" record successfully.
	'2 Go to system administration --> settings report --> and here create a user group settings report by selecting following options:
		'1 Report Type: User Group.
		'2 Check the newly created user group.
		'3 Enter Report name.
		'4 Check the check box "Role List View" and click on the "Create Report" button.
		'5 Wait for a while (for the Report to generate) and click on "Refresh" button.
	'3 Open the report and check the worksheet: "Role List View"
		'1 User Group
		'2 Role
		'3 Group Can View
		'4 Organization / User Name:
		'5 Include Levels Below
		'6 User ID
		'7 Don’t show disabled user accounts
'@ ExpectedResult:
	'1 Data should be saved successfully.
	'2 Report should be generated successfully.
	'3 Validate the following values:
		'1 User Group: "Selected  User Group name".
		'2 Role: List of the roles which are mapped against that user group.
		'3 Group Can View: Selection made as per the user roles.
		'4 Organization / User Name: Name of the org/ user name where the user was created.
		'5 Include Levels Below:  Yes or No when an organization is selected and blank if an user id is selected. 
		'6 User ID: If an user is selected, the user id column will have the user id
		'7 Don’t show disabled user accounts = N/A
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2441", "Settings Reports - UserGroups - Generate  and validate User Group sheet Role List View - Admin login with All users, users below hierarchy & some users.", Null

'====== Create a Organization User ======
strUserId 		= BIZ_OrganizationUsers_CreateUser("PTAC-3751_SettingReports_ExistingUser")
Dim objRoleData, strRole1, strRole3
Set objRoleData = FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", "SettingReports_ExistingRole")
Set objRoleData1 = FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", "SettingReports_ExistingRole1")

strRole1 = FRM_DS_GetValue(objRoleData, "RoleName")
strRole3 = FRM_DS_GetValue(objRoleData1, "RoleName")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
SettingReports_UserGroups_RoleListView_AccessToRole "PTAC-3751_SettingReports_ExistingUser", Parameter("strUserGroup"), Parameter("strRole2"), strUserId, "All Users"
SettingReports_UserGroups_RoleListView_AccessToRole "PTAC-3751_SettingReports_ExistingUser", Parameter("strUserGroup"), strRole3, strUserId, "Below Hierarchy "
arrRoles = SettingReports_UserGroups_RoleListView_AccessToRole("PTAC-3751_SettingReports_ExistingUser", Parameter("strUserGroup"), strRole1, strUserId, "Some Users")

'====== Create a Settings Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
strReportName = SettingReports_SystemAdministration_CreateReport("PTAC-3751_SettingReports_CreateReport", Parameter("strUserGroup"))
util_win_CloseExcel()

'====== Download Report ======
SettingReports_SystemAdministration_OpenDownloadReport strReportName	
strExcelFilePathWithName   = Pathfinder.Locate("Test Report\")&strReportName&".xlsx"
Wait g_LongWaitSmall + g_LongWaitMedium 'Explicit wait added due to sync
UTIL_Excel_Opened_File_Save strExcelFilePathWithName

Dim objExistingData
Set objExistingData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "PTAC-3751_SettingReports_ExistingUser")
arrValues = Array(Parameter("strUserGroup"), strRole1,  objExistingData.Item("CanView"),  objExistingData.Item("UserName"),  objExistingData.Item("Levels"), strUserId,  objExistingData.Item("DisabledUser"))

'====== Validate all the roles mapped to User Group ======
SettingReports_SystemAdministration_ValidateRoles strReportName&".xlsx", arrRoles

'====== Validate Report data ======
SettingReports_SystemAdministration_ValidateReportData strReportName&".xlsx", arrValues
util_win_CloseExcel()
'====== Delete Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
Wait g_ShortWaitMedium
SettingReports_SystemAdministration_DeleteReport strReportName
util_win_CloseExcel()
