'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-778 : Verify the Edit access rights to a user group which can edit Companywide folder and its sub-folders.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-778_ReportLimitedEditSubFolderAccess
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'User Groups':
'	a In 'Create a Group' section, Select 'All Users' option
'	b Go to Resources tab.
'	c In Reports section, select '\Companywide\' and set the 'Access Right' column as 'Edit'.
'	d click on 'Save' icon.
'	5 Go to 'Personas':
'	a In '1.Create a persona' section, select 'Loan Officer' persona.
'	b Go to 'Trades/Contacts/Dashboard/Reports' tab
'	c Under section 'Reports', check all the items including the sub-items.
'	d click on 'Save' icon.
'	6 Logout from Encompass as Admin user.
'	7 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
'	8 Go to Reports tab->Public Reports, don't' select Companywide folder, check all the icons.
'	9 Go to Companywide folder and select any existing report, check all the icons
'	10 Go to the subfolder 'Loan Reports', select any existing report, check all the icons
'	11 Select a Loan Report, check all the 5 tabs "Report",  "Milestone","Fields", "Folder","Filters"     
'	12 Logout of Encompass
'@ ExpectedResult:
'	1 Reports section displays '\Companywide\' and 'Access Right' value as 'Edit'.
'	2 'Report' section displays all the check boxes as Checked.
'	3 Admin user is logged out of Encompass.
'	4 Loan officer persona user is logged into Encompass.
'	5 All the icons under 'Public Reports' folder are disabled.
'	6 All the icons under 'Companywide' folder are enabled.
'	7 All the icons under 'Companywide' sub-folder i.e. 'Loan Reports' folder are enabled.
'	8 All the 5 tab controls are enabled, use should be able to edit the loan report successfully.
'	9 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-778_ReportLimitedEditSubFolderAccess")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-778","Verify the Edit access rights to a user group which can edit Companywide folder and its sub-folders.", Null

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/User Groups ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-778_ReportLimitedEditSubFolderAccess", "AccessToEdit"
Reports_UserGroups_VerifyReportSection "PTAC-778_ReportLimitedEditSubFolderAccess"
Wait g_ShortWaitMedium
'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-778_ReportLimitedEditSubFolderAccess","Enable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as non admin ======
'====== Eable Reports tab to a persona with  EditSubFoldersAccess only company wide EditAccess ======
Reports_AccessRights_UserLogin "PTAC-778_ReportLimitedEditSubFolderAccess", Parameter("strUserId")
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_EnableEditSubFoldersAccess "PTAC-778_ReportLimitedEditSubFolderAccess", "CompanyWide"
BIZ_Login_UserLogout()

End if
