'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-796 : Verify the access rights to a user who has both  'Loan Officer' and 'Loan Processor' personas and have partial access rights to Reports function.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-796_ReportPartialAccessTwoPersonaUser
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'User Groups':
'		a In 'Create a Group' section, Select 'All Users' option
'		b Go to Resources tab.
'		c In Reports section, select/add '\Public Reports\' and set the 'Access Right' column as 'Edit'.
'		d click on 'Save' icon.
'	3 Go to 'Personas':
'	4 In '1.Create a persona' section, select 'Loan Officer' persona.
'		i Go to 'Trades/Contacts/Dashboard/Reports' tab
'		ii Under 'Reports' section, check all the items except for 'Loan Reports', 'Manage Personal Reports', 'Dynamic Reporting'.
'	5 In '1.Create a persona' section, select 'Loan Processor' persona.
'		i Go to 'Trades/Contacts/Dashboard/Reports' tab
'		ii Under 'Reports' section, check all the items except for 'Borrower Contact Reports', 'Dynamic Reporting'.
'	6 Go to "Organization/Users":
'		a select "emilylo" user who already have 'Loan Officer' Persona.
'		b Click on Edit icon
'		c In 'Personas' section, add  "Loan Processor" persona. and save.
'	7 Logout from Encompass
'	8 Login to Encompass with new user account i.e. 'emilylo'/'111111' which has both 'Loan Officer' and 'Loan Processor' Persona's.
'	9 Check the Reports tab
'	10 Go to Reports tab, check the Personal Reports folder
'	11 Create a new a Report and check the 'Data Source' in 'Report' tab.
'	12 Go to Reports menu and verify the submenus
'	13 Logout of Encompass
'@ ExpectedResult:
'	1 Reports section displays '\Public Reports\' and 'Access Right' value as 'Edit'
'	2 'Loan Officer' Persona 'Report' section displays 'Loan Reports', 'Manage Personal Reports' and 'Dynamic Reporting' check boxes as Unchecked.
'	3 'Loan Processor' Persona 'Report' section displays 'Borrower Contact Reports' and 'Dynamic Reporting' as Unchecked.
'	4 "emilylo" user is mapped to both 'Loan Officer' and 'Loan Processor' persona's.
'	5 Admin user is logged out of Encompass.
'	6 "emilylo" user (with both 'Loan officer' & 'Loan Processor' persona) is logged into Encompass.
'	7 Reports tab should exist.
'	8 'Personal Reports' folder should exist under 'Folder' drop-down.
'	9 All of the Data Sources i.e. "Loans", "Borrower Contact", "Business Contact" are enabled
'	10 Sub menu option 'Add Options when Reports Run' should be unselected.
'	11 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-796_ReportPartialAccessTwoPersonaUser")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-796","Verify the access rights to a user who has both  'Loan Officer' and 'Loan Processor' personas and have partial access rights to Reports function.", Null

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/User Groups ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium + g_ShortWaitMedium
BIZ_Report_UserGroups_ResourcesReportsDelete "PTAC-796_ReportPartialAccessTwoPersonaUser"
Wait g_ShortWaitMedium 'sync issue
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-796_ReportPartialAccessTwoPersonaUser", "AddAndAccessToEdit"
Reports_UserGroups_VerifyReportSection "PTAC-796_ReportPartialAccessTwoPersonaUser"
Wait g_ShortWaitMedium
'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium + g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-796_ReportPartialAccessTwoPersonaUser","Enable"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-796_ReportPartialAccessTwoPersonaUser","Disable"

BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
Wait g_ShortWaitMedium
Reports_AddPersonaToUserIn_OrganizationUsers "PTAC-796_ReportPartialAccessTwoPersonaUser", Parameter("strUserId")
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as non admin ======
'====== Eable Reports tab to a user with two persona with partial Access ======
Reports_AccessRights_UserLogin "PTAC-796_ReportPartialAccessTwoPersonaUser", Parameter("strUserId")
Report_AccessRightsToPersona_PartialAccessTwoPersonaUser "PTAC-796_ReportPartialAccessTwoPersonaUser"

End if
