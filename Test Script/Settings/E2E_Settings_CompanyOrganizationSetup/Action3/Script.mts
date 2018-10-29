
'@**************************************************************************************************
'@ TestStory: PTAC-1673 Company Org Setup
'@ TestCase: 
   '1 PTAC-1603 - Verification of the User Group -'Loan' section settings when it is linked to an User
'@ Test Automation JIRA Task: PTAC-1790 Settings_CompanyOrganizationSetUp_VerificationofUserGroupLinkedToUser
'@ TestData: 
   '1 Settings_Loansetup, AddLoanFolder and PTAC-846_LoanSetup_LoanFolder
   '2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and PTAC_1603_SetUserData
   '3 CompanyUserSetup_Roles_Groups, Groups and PTAC-1603_UserGroup
'@ Pre-conditions: 
   '1 User logged into Encompass as an admin 
'@ Description:  
'@ TestSteps:
   '01 Go to the Encompass Settings --> Company/User Setup --> User Group and click on 'New(+)' icon
   '02 In 'Group Name' popup box, enter the User group name and click on 'OK' button
   '03 Go to '.Define the members and access for Verification groups' section in the right side and click on 'Loans' tab  
   '04 In 'Access to Loan Folders' section at the bottom, uncheck any available loan folder and click on 'Save' button
   '05 Select 'Members' tab and click on 'New(+)' icon.
   '06 In 'User Group Configuration' popup window,  expand the 'Administration' folder and select the user
   '07 Click on 'add to Group' icon and click on 'Ok' button.Click on 'Save' icon in settings window  
   '08 Click on 'Close' icon in Settings window and close Encompass main window
   '09 Re login to the Encompass with the selected user credentials 
   '10 Select  'Pipeline' tab --> 'Loan Folder' label and select the drop down menu
   '11 Check that the user is not able to access the loan folder which was unchecked under its user group settings as done in step 4
   '12 Click on 'Close' icon in settings window and click on 'Close' icon in Encompass main window 
   '13 In Encompass popup message click on 'Yes' button   
'@ ExpectedResult:
   '1 New user group created  successfully
   '2 Selected loan folder is unchecked
   '3 User is successfully added to the User Group
   '4 User should be not allowed to view the loan folder which was unchecked
   '5 'Are you sure you want to close Encompass?' popup message appears
'***************************************************************************************************

Wait g_LongWaitMedium 
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1790","Script Name - Settings_CompanyOrganizationSetUp_VerificationofUserGroupLinkedToUser", Null


'====== Go to Settings/Company/User Setup/;Loan Folders ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"

'====== Pre-Requiste to Create LoanFolder ======
strLoanFolder = BIZ_Settings_LoanSetup_CreateLoanFolder ("PTAC-846_LoanSetup_LoanFolder")

'===============================Sub Organization User Creation merged script ========================================================================
'====== Verification of Creating a new user record under newly created Sub-Organization ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1604","Verification of Creating a new user record under newly created Sub-Organization", Null
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
strOrganization = Settings_Organization_CreateOrganization("PTAC-1604_SetOrganization")
strUserId = Settings_OrganizationUsers_CreateUser ("PTAC-1604_SetUser",strOrganization)
Settings_OrganizationUsers_DeleteExistingUser strUserId,strOrganization
Settings_OrganizationUsers_DeleteExistingUserValidation strUserId
BIZ_Organization_DeleteOrganization strOrganization
BIZ_Settings_ClickClose()

'===============================Sub Organization User Creation merged script ========================================================================

'====== Verification of the User Group -'Loan' section settings when it is linked to an User ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1603","Verification of the User Group -'Loan' section settings when it is linked to an User", Null
'===============Exisitng persona Merged script ===========================================================================
'====== Go to Settings/Company/User Setup/;Personas ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
'====== Validating Existing Persona's Newly Updated Settings in Encompass ======

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1579","Validating Existing Persona's Newly Updated Settings in Encompass", Null

Settings_Personas_CompanySettings_Access "PTAC-1579_RolesUncheck","Loan Officer","Company/User Setup"
Settings_CompanySettings_ValidateCheckBox "PTAC-1579_RolesUncheck","Roles"
'===============Exisitng persona Merged script ===========================================================================

BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
Set objSettings            = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objHierachyTree        = objSettings.SwfTreeView("swfname:=hierarchyTree")
GUI_SwfTreeView_Select objHierachyTree,"Administration"
strUserId = BIZ_OrganizationUsers_CreateUser("PTAC_1603_SetUserData")
Set objHierachyTree        = Nothing
Set objSettings            =Nothing
'====== Go to Company/User Setup->User Groups ======

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
strGroupName = CompanyUserSetup_UserGroups_CreateNew("PTAC-1603_UserGroup")
Wait g_LongWaitMedium    ' Due To Sync Issue We Are Calling Explicit Wait Statement
Settings_CompanySettings_ValidateLoanFolderCheckBox strGroupName,strLoanFolder

Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "PTAC_1603_SetUserData")
strFullName = objData.Item("FirstName")&" "&objData.Item("LastName")&" ("&strUserId&")"
Set objData = Nothing

'====== Add UserMemberGroup ======
BIZ_CompanyUserSetup_UserGroups_UserMemebrGroup "PTAC-1603_UserGroup",strGroupName,strFullName
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login to the Encompass =====

'strUserId="user201820161741"

'BIZ_Settings_ExpandTreeView "Company/User Setup"
Login_UserLogin_ExisitngPersona "admin_Setting_Verification",strUserId


Settings_CompanySettings_ValidateRolesNotExists "PTAC-1579_RolesUncheck"
BIZ_Settings_ClickClose()

BIZ_Nav_SelectPipelineTab()
Settings_LoanSetup_VerifyLoanFolderInPipeline strLoanFolder
BIZ_Login_UserLogout()

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to Encompass->Settings ======
'====== Go to LoanSetup->Loan Folders ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"

'====== Delete Loan Folder ======
BIZ_Settings_DeleteLoanFolder strLoanFolder
Settings_LoanSetup_ValidateDeleteLoanFolder strLoanFolder

'====== Go to Company/User Setup->Organization/Users ======
'====== Delete Organization User ======
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
BIZ_OrganizationUsers_DeleteExistingUser strUserId
Settings_OrganizationUsers_DeleteExistingUserValidation strUserId

'====== Go to Company/User Setup->User Groups ======
'====== Delete User Group ======
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
BIZ_CompanyUserSetup_UserGroups_DeleteGroup strGroupName
BIZ_Settings_ClickClose()



