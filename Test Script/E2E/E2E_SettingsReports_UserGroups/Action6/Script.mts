'@**************************************************************************************************
'@ TestStory: PTAC-3750 ReEnforcement_SettingsReports_UserGroups
'@ TestCase: PTAC-2440 Settings Reports - UserGroups - Generate  and validate User Group sheet "Role List View" - Admin login with existing persona, user account, group& role & editing them later.
'@ Test Automation JIRA Task: PTAC-3751 E2E_SettingsReports_UserGroups_GenerateAndValidateUserGroupSheet
'@ TestData: 
	'1 Settings_SystemAdministration, SettingReports, SettingReports_CreateReport
	'2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, PTAC-3751_SettingReports_ExistingUser	
	'3 CompanyUserSetup_Roles_Groups, Roles, SettingReports_ExistingRole
'@ Pre-conditions: Create or use an existing persona, user account, user group & role
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
	'10 Now navigate back to the encompass settings --> user groups --> select the user group selected previously and then select the tab "Role List View"
	'11 Select any role, and select the radio button "some users " and then delete the user.
	'12 Now navigate back to the encompass settings --> role --> delete any role
	'13 Go to system administration --> settings report --> and here create a user group settings report by selecting following options:
		'1 Report Type: User Group.
		'2 Check the existing user group.
		'3 Enter Report name.
		'4 Check the check box "Role List View" and click on the "Create Report" button.
		'5 Wait for a while (for the Report to generate) and click on "Refresh" button.
	'14 Open the report and check the worksheet: "Role List View"
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
	'6 "Role list view" tab should open.
	'7 User should be deleted successfully.
	'8 Role should be deleted successfully.
	'9 Report should be generated successfully.
	'10 Validate the following values:
		'1 User Group: "Selected  User Group name".
		'2 Role: List of the roles which are mapped against that user group.
		'3 Group Can View: Selection made as per the user roles.
		'4 Organization / User Name: Name of the org/ user name where the user was created.
		'5 Include Levels Below:  Yes or No when an organization is selected and blank if an user id is selected. 
		'6 User ID: If an user is selected, the user id column will have the user id
		'7 Don’t show disabled user accounts = N/A
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2440", "Settings Reports - UserGroups - Generate  and validate User Group sheet Role List View - Admin login with existing persona, user account, group& role & editing them later.", Null

'====== Create a Organization User ======
strUserId 		= BIZ_OrganizationUsers_CreateUser("PTAC-3751_SettingReports_ExistingUser")
Dim objRoleData
Set objRoleData = FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", "SettingReports_ExistingRole")
 
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
arrRoles = SettingReports_UserGroups_RoleListView_AccessToRole("PTAC-3751_SettingReports_ExistingUser", Parameter("strUserGroup"), FRM_DS_GetValue(objRoleData, "RoleName"), strUserId, "Some Users")

'====== Create a Settings Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
strReportName = SettingReports_SystemAdministration_CreateReport("PTAC-3751_SettingReports_CreateReport", Parameter("strUserGroup"))
util_win_CloseExcel()

'====== Download Report ======
SettingReports_SystemAdministration_OpenDownloadReport strReportName	
strExcelFilePathWithName   = Pathfinder.Locate("Test Report\")&strReportName&".xlsx"
Wait g_LongWaitSmall + g_LongWaitMedium 'Explicit wait added due to sync
UTIL_Excel_Opened_File_Save strExcelFilePathWithName
util_win_CloseExcel()
Dim objExistingData
Set objExistingData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "PTAC-3751_SettingReports_ExistingUser")
arrValues = Array(Parameter("strUserGroup"), FRM_DS_GetValue(objRoleData, "RoleName"),  objExistingData.Item("CanView"),  objExistingData.Item("UserName"),  objExistingData.Item("Levels"), strUserId,  objExistingData.Item("DisabledUser"))

'====== Validate all the roles mapped to User Group ======
SettingReports_SystemAdministration_ValidateRoles strReportName&".xlsx", arrRoles

'====== Validate Report data ======
SettingReports_SystemAdministration_ValidateReportData strReportName&".xlsx", arrValues

'====== Delete Role and User ======
arrRoles = SettingReports_UserGroups_DeleteRoleAndUser("SettingReports_User", Parameter("strUserGroup"), Parameter("strRole"), Parameter("strUserId"))

'====== Create a Settings Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
strReportName = SettingReports_SystemAdministration_CreateReport("PTAC-3751_SettingReports_CreateReport", Parameter("strUserGroup"))
util_win_CloseExcel()

'====== Download Report ======
SettingReports_SystemAdministration_OpenDownloadReport strReportName	
strExcelFilePathWithName   = Pathfinder.Locate("Test Report\")&strReportName&".xlsx"
Wait g_LongWaitSmall + g_LongWaitMedium 'Explicit wait added due to sync
UTIL_Excel_Opened_File_Save strExcelFilePathWithName

Set objExistingData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "PTAC-3751_SettingReports_ExistingUser")
arrValues = Array(Parameter("strUserGroup"), FRM_DS_GetValue(objRoleData, "RoleName"),  objExistingData.Item("CanView"),  objExistingData.Item("UserName"),  objExistingData.Item("Levels"), strUserId,  objExistingData.Item("DisabledUser"))

'====== Validate all the roles mapped to User Group ======
SettingReports_SystemAdministration_ValidateRoles strReportName&".xlsx", arrRoles

'====== Validate Report data ======
SettingReports_SystemAdministration_ValidateReportData strReportName&".xlsx", arrValues
util_win_CloseExcel()
'====== Delete Report ======
BIZ_Nav_HierarchyTree "System Administration", "Settings Reports"
Wait g_ShortWaitMedium
SettingReports_SystemAdministration_DeleteReport strReportName
