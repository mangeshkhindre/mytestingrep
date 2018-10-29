'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-738 : Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - ViewOnly.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-738_ReportLimitedViewAccess
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'User Groups':
'		a In 'Create a Group' section, Select 'All Users' option
'		b Go to Resources tab.
'		c In Reports section, select '\Companywide\' and modify the 'Access Right' column as 'View Only.
'		d click on 'Save' icon.
'	3 Go to 'Personas':
'		a In '1.Create a persona' section, select 'Loan Officer' persona.
'		b Go to 'Trades/Contacts/Dashboard/Reports' tab
'		c Under section 'Reports', check all the items including the sub-items.
'		d click on 'Save' icon.
'	4 Logout from Encompass as Admin user.
'	5 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
'	6 Go to Reports tab->Public Reports folder, Select "Companywide", check the Rename icon           
'	7 Go to the folder Companywide, check all the icons                                                                     
'	8 Go to the subfolder "Loan Reports" below Companywide, check all the icons                         
'	9 Select a Loan Report, check all the 5 tabs "Report",  "Milestone","Fields", "Folder","Filters"     
'	10 Logout of Encompass
'@ ExpectedResult:
'	1 Reports section displays '\Companywide\' and 'Access Right' value as 'View Only'.
'	2 'Report' section displays all the check boxes as Checked.
'	3 Admin user is logged out of Encompass.
'	4 Loan officer persona user is logged into Encompass.
'	5 'Rename' button is disabled for companywide folder.
'	6 For Companywide folder, all the icons are disabled
'	7 For Companywide sub-folder i.e. 'Loan Reports', all the icons are disabled
'	8 All the 5 tab controls are disabled, we can't edit the loan report
'	9 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-738_ReportLimitedViewAccess")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-738","Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - ViewOnly.", Null

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/User Groups ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-738_ReportLimitedViewAccess", "AccessToView"
Reports_UserGroups_VerifyReportSection "PTAC-738_ReportLimitedViewAccess"
Wait g_ShortWaitMedium

'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-738_ReportLimitedViewAccess","Enable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as non admin ======
'====== Eable Reports tab to a persona with limited access only company wide ViewAccess ======
Reports_AccessRights_UserLogin "PTAC-738_ReportLimitedViewAccess", Parameter("strUserId")
Report_AccessRightsToPersona_EnableLimitedViewAccess "PTAC-738_ReportLimitedViewAccess", "CompanyWide"
BIZ_Login_UserLogout()

End if
