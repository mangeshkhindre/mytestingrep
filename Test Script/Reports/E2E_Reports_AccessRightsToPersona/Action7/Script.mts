'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-779 : Verify the Edit access rights to a user group which can edit only sub-folders under Companywide folder.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-779_ReportEditSubFolderInCompanywideAccess
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'User Groups':
'		a In 'Create a Group' section, Select 'All Users' option
'		b Go to Resources tab.
'		c In Reports section, select/add:
'			i '\Companywide\' and set the 'Access Right' column as 'View Only'.
'			ii '\Companywide\Loan Reports\' and set the 'Access Right' column as 'Edit'.
'		d click on 'Save' icon.
'	3 Go to 'Personas':
'		a In '1.Create a persona' section, select 'Loan Officer' persona.
'		b Go to 'Trades/Contacts/Dashboard/Reports' tab
'		c Under section 'Reports', check all the items except for 'Loan Reports' and 'Manage Personal Reports'.
'		d click on 'Save' icon.
'	4 Logout from Encompass as Admin user.
'	5 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
'	6 Go to Reports tab->Public Reports, dont' select Companywide folder, check all the icons.
'	7 Go to Companywide folder, dont select any sub-folder and check all the icons
'	8 Go to the subfolder 'Loan Reports' and check all the icons
'	9 Logout of Encompass
'@ ExpectedResult:
'	1 Reports section displays:
'		a '\Companywide\' and 'Access Right' value as 'View Only'
'		'\Companywide\Loan Reports\'  and 'Access Right' value as 'Edit'
'	2 'Report' section displays 'Loan Reports' and 'Manage Personal Reports' check boxes as Unchecked.
'	3 Admin user is logged out of Encompass.
'	4 Loan officer persona user is logged into Encompass.
'	5 After Step 2, All the icons under 'Public Reports' folder are disabled.
'	6 After Step 3, All the icons under 'Companywide' folder are disabled.
'	7 After Step 4, All the icons under 'Companywide' sub-folder i.e. 'Loan Reports' folder are enabled.
'	8 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-779_ReportEditSubFolderInCompanywideAccess")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-779","Verify the Edit access rights to a user group which can edit only sub-folders under Companywide folder.", Null

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/User Groups ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-779_ReportEditSubFolderInCompanywideAccess", "AccessToEditSubFoldersInCompanywide"
Reports_UserGroups_VerifyReportSection "PTAC-779_ReportEditSubFolderInCompanywideAccess"
Reports_UserGroups_VerifyReportSection "PTAC-779_ReportEditSubFolderInCompanywideAccess1"
Wait g_ShortWaitMedium
'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-779_ReportEditSubFolderInCompanywideAccess", "Disable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as non admin ======
'====== Eable Reports tab to a persona with EditSubFoldersInCompanyWideAccess ======
Reports_AccessRights_UserLogin "PTAC-779_ReportEditSubFolderInCompanywideAccess", Parameter("strUserId")
Report_AccessRightsToPersona_EnableEditSubFoldersInCompanyWideAccess "PTAC-779_ReportEditSubFolderInCompanywideAccess", "CompanyWide"
BIZ_Login_UserLogout()

End if
