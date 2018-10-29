'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-737 : Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - Edit.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-737_ReportLimitedEditAccess
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description:
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'User Groups':
'		a In 'Create a Group' section, Select 'All Users' option
'		b Go to Resources tab.
'		c In Reports section, select 'Add' icon and add the companywide folder:
'		 i In 'User Group Configuration' window, select '\Companywide\' and click on 'Add to Group - this level and below' icon
'		d select the 'Access Right' column as Edit
'		e Remove all the items under Reports section.
'		f click on 'Save' icon.
'	3 Go to 'Personas':
'		a In '1.Create a persona' section, select 'Loan Officer' persona.
'		b Go to 'Trades/Contacts/Dashboard/Reports' tab
'		c Under section 'Reports', check all the items except for "Loan Reports" and "Manage Personal Reports".
'		d click on 'Save' icon.
'	4 Logout from Encompass as Admin user.
'	5 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
'	6 Go to Reports tab, Verify Personal Reports folder
'	7 Go to "Public Reports ->Companywide" folder, create a new report "Auto Report-Loan Reports for Access"
'	8 Select the new report and Open the "Report" tab, check the 'Data Source' section
'	9 Delete the report
'	10 Logout of Encompass
'@ ExpectedResult:
'	1 Reports section displays '\Companywide\' and 'Access Right' value as 'Edit'.
'	2 'Report' section displays "Loan Reports" and "Manage Personal Reports" check boxes as Unchecked.
'	3 Admin user is logged out of Encompass.
'	4 Loan officer persona user is logged into Encompass.
'	5 The "Personal Reports" should not exist in the dropdown list of Folder
'	6 New report is created successfully.
'	7 In the 'Data Source' section, "Loans" option is disabled
'	8 Selected report is deleted.
'	9 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-737_ReportLimitedEditAccess")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-737","Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - Edit.", Null

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/User Groups ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-737_ReportLimitedEditAccess", "AddAndAccessToEdit"
Reports_UserGroups_VerifyReportSection "PTAC-737_ReportLimitedEditAccess"
Wait g_ShortWaitMedium
'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-737_ReportLimitedEditAccess","Disable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as admin ======
'====== Eable Reports tab to a persona with limited access only company wide EditAccess======
Reports_AccessRights_UserLogin "PTAC-737_ReportLimitedEditAccess", Parameter("strUserId")
Report_AccessRightsToPersona_EnableLimitedEditAccess "PTAC-737_ReportLimitedEditAccess", "CompanyWide"
BIZ_Login_UserLogout()
 @@ hightlight id_;_1773346_;_script infofile_;_ZIP::ssf3.xml_;_
End if
