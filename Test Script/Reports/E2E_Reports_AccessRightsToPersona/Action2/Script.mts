'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-735 : Verify the access rights to disable 'Reports' tab to a Persona. 
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-735_ReportAccess
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
	'1 Click on Encompass Settings-> Company/User Setup
	'2 Go to "Personas":
	'	a In '1.Create a persona' section, select 'Loan Officer' persona.
	'	b Go to 'Trades/Contacts/Dashboard/Reports' tab
	'	c Under section 'Reports', uncheck all the checkboxes
	'	d click on 'Save' icon.
	'3 Go to Encompass Settings-> Company/User Setup
	'4 Go to "Organization/Users":
	'	a create a new user with 'Persona' as "Loan Officer"
	'	b save the user.
	'5 Logout from Encompass
	'6 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
	'7 Verify for 'Report' tab.
	'8 Logout again
'@ ExpectedResult:
	'1 All the check boxes under 'Report' section are unchecked.
	'2 New user is created successfully with 'Loan officer' persona.
	'3 Admin user is logged out of Encompass.
	'4 Loan officer persona user is logged into Encompass.
	'5 'Reports' tab is not displayed for Loan Officer Persona because the "Loan Officer" persona does not have access to reports tab.
'***************************************************************************************************



'====== Go to Settings/'Company/User Setup'/Personas ======	
'====== Disable Reports tab to a persona ======
Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-735_ReportAccess")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-735","Verify the access rights to disable 'Reports' tab to a Persona.", Null
Dim strTabName : strTabName  = FRM_DS_GetValue(objData, "TabName")
Set objData = Nothing


BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium + g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-735_ReportAccess","Disable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non admin user ======
Reports_AccessRights_UserLogin "PTAC-735_ReportAccess", Parameter("strUserId")
Wait g_ShortWaitMedium
Reports_VerifyDisabledReportTab strTabName 
BIZ_Login_UserLogout()

End if
