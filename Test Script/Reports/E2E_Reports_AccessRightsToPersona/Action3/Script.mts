'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: PTAC-736 : Verify the access rights to enable 'Reports' tab to a Persona with full access.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: Reports, AccessTOPersona, PTAC-736_ReportAccess1
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: 
'@ TestSteps:
'	1 Go to Encompass Settings-> Company/User Setup
'	2 Go to 'Personas':
'		a. In '1.Create a persona' section, select 'Loan Officer' persona.
'		b. Go to 'Trades/Contacts/Dashboard/Reports' tab
'		c. Under section 'Reports', check all the checkboxes, including sub-items.
'		d. click on 'Save' icon.
'	3 Go to 'User Groups':
'		a. In 'Create a Group' section, Select 'All Users' option
'		b. Go to Resources tab and remove all the items under Reports section.
'		c. click on 'Save' icon.
'	4 Logout from Encompass as Admin user.
'	5 Login to Encompass with new user account i.e. 'emilylo'/'11111111' which has Loan Officer Persona.
'	6 Verify the top tabs
'	7 Go to Reports tab, Select the 'Personal Reports' folder, Verify whether the report can be created in this Folders
'	8 Open a report, Verify the 'Data Source' radio buttons.
'	9 Go to Reports menu and verify the submenus
'	10 Logout 
'@ ExpectedResult:
'	1 All the check boxes under 'Report' section are Checked.
'	2 Reports section is displayed as empty.
'	3 Admin user is logged out of Encompass.
'	4 Loan officer persona user is logged into Encompass.
'	5 'Reports' tab is displayed for Loan Officer Persona.
'	6 The report should be created in the Persona Folders
'	7 The radio buttons for 'Loans', 'Borrower Contacts', 'Business Contacts', 'TOP Settings' and 'Trades' are enabled
'	8 The Sub menu option 'Add Options when Reports Run' should exist.
'	9 User is logged out of Encompass
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-736_ReportAccess1")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-736","Verify the access rights to enable 'Reports' tab to a Persona with full access.", Null

Set objData 	 = FRM_DS_GetTestData("Reports", "AccessToPersona", "PTAC-736_ReportAccess1")
strTabName  	 = FRM_DS_GetValue(objData, "TabName")
strItemInToolBar = FRM_DS_GetValue(objData, "ItemNameInToolBar")

'====== Login to the Encompass as admin ======
'====== Go to Settings/'Company/User Setup'/Personas ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_ShortWaitMedium
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Wait g_ShortWaitMedium
BIZ_Report_UserGroups_ResourcesReportsDelete("PTAC-736_ReportAccess1")
Wait g_ShortWaitMedium
'====== Eable Reports tab to a persona with full access ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Wait g_ShortWaitMedium
Report_AccessRightsToPersona_DisableOrEnableReportTab "PTAC-736_ReportAccess1", "Enable"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass as non admin ======
Reports_AccessRights_UserLogin "PTAC-736_ReportAccess1", Parameter("strUserId")
Wait g_ShortWaitMedium
Reports_VerifyEnabledReportTab(strTabName)
BIZ_Nav_SelectTabControl strTabName
wait 10
strReportName = BIZ_Reports_CreateNewReport ("PTAC-736_ReportAccess1", "Personal Reports")
Reports_VerifyDataSourceEnableOrNot "PTAC-736_ReportAccess1", strReportName, "FullAccess"
If GUI_SwfToolBar_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfToolBar("swfname:=mainMenu"), strItemInToolBar) = True Then
	FRM_Logger_ReportPassEvent "Verify '"&strItemInToolBar&"' is present in toolbar or not","'"&strItemInToolBar& "' is present in toolBar",null
Else
	FRM_Logger_ReportFailEvent "Verify '"&strItemInToolBar&"' is present in toolbar or not","'"&strItemInToolBar& "' is not present in toolBar",null
End If

BIZ_Login_UserLogout()

Set objData  	 = Nothing

End if
