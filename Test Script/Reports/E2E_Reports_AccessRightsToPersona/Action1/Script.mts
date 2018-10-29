'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: 
    '1 PTAC-735 : Verify the access rights to disable 'Reports' tab to a Persona. 
    '2 PTAC-736 : Verify the access rights to enable 'Reports' tab to a Persona with full access.
    '3 PTAC-737 : Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - Edit.
    '4 PTAC-738 : Verify the access rights to enable 'Reports' tab to a Persona with limited access - Only Companywide - ViewOnly.
    '5 PTAC-778 : Verify the Edit access rights to a user group which can edit Companywide folder and its sub-folders.
    '6 PTAC-779 : Verify the Edit access rights to a user group which can edit only sub-folders under Companywide folder.
    '7 PTAC-796 : Verify the access rights to a user who has both  'Loan Officer' and 'Loan Processor' personas and have partial access rights to Reports function.
'@ Test Automation JIRA Task: PTAC-1452 Reports_AccessRightsToPersona
'@ TestData: 
	'1 Reports, AccessTOPersona, PTAC-735_ReportAccess
	'2 Reports, AccessTOPersona, PTAC-736_ReportAccess1
	'3 Reports, AccessTOPersona, PTAC-737_ReportLimitedEditAccess
	'4 Reports, AccessTOPersona, PTAC-738_ReportLimitedViewAccess
	'5 Reports, AccessTOPersona, PTAC-778_ReportLimitedEditSubFolderAccess
	'6 Reports, AccessTOPersona, PTAC-779_ReportEditSubFolderInCompanywideAccess
	'7 Reports, AccessTOPersona, PTAC-796_ReportPartialAccessTwoPersonaUser
'@ Pre-conditions:
	'1 Login as Admin user
'@ Description: Different Types of access rights to a user with selected persona for Report tab
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level	
'***************************************************************************************************

   
FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1452","Scrpit Name - Reports_AccessRightsToPersona", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
strUserID = BIZ_OrganizationUsers_CreateUser("PTAC-735_ReportAccess")


RunAction "Reports_AccessRightsToPersona_DisableReportTab", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_EnableReportTab", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_EnableLimitedViewAccess", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_EnableEditSubFoldersAccess", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_EnableEditSubFoldersInCompanyWideAccess", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_EnableLimitedEditAccess", oneIteration, strUserID

RunAction "Reports_AccessRightsToPersona_PartialAccessTwoPersonaUse", oneIteration, strUserID

BIZ_Login_UserLogout()

BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
Wait g_LongWaitLarge 'sync issue
BIZ_OrganizationUsers_DeleteExistingUser strUserID
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
BIZ_Report_UserGroups_ResourcesReportsDelete "PTAC-1350_ResetSettings"
Wait g_LongWaitLarge 'sync issue
Report_UserGroups_ResourcesReportsAddEditAccess "PTAC-1350_ResetSettings", "AddAndAccessToEdit"
Reports_UserGroups_VerifyReportSection "PTAC-1350_ResetSettings"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


