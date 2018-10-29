'@**************************************************************************************************
'@ TestStory: E2E_CompanyUserSetup_Functionalities
'@ TestCase:
   '1 PTAC-918 - Verification of assigning privileges to newly created persona 
'@ Test Automation JIRA Task: PTAC-1893 Settings_CompanyUserSetup_NewPersonaPrivileges
'@ TestData: Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and NewPersonaPrivileges  
'@ Pre-conditions: 
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Company/User Setup:Personas  
'@ Description:  
'@ TestSteps:
   '1 Assigning privileges to newly created persona 
'@ ExpectedResult:
   '1 Verification of assigning privileges to newly created persona 
'***************************************************************************************************
wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyUserSetup_Functionalities","Script Name - E2E_Settings_CompanyUserSetup_PersonaSettings", Null

'====== Go to Settings/Company/User Setup/Personas ======
Wait g_TinyWaitMedium
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync

'====== Verification of assigning privileges to newly created persona  ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-918","Verification of assigning privileges to newly created persona", Null
strNewPersonaName= CompanyUserSetup_NewPersonaPrivileges("PTAC-918")

'================================== Merging Persona script ============================================

'====== Verification of duplicating the persona ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-919","Verification of duplicate persona", Null
strDuplicatePersonas = CompanyUserSetup_DuplicatePersonaValidation(strNewPersonaName)

'====== Verification of Renameand Move the persona ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-937","Verificaiton of performing available operations by right clicking on a Persona", Null
strRenamePersona = CompanyUserSetup_RenameandMovePersona("PersonaSetUp",strDuplicatePersonas,strNewPersonaName)

'================================== Merging Persona script ============================================

Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
strUserId1 = CompanyUserSetup_OrganizationUsers_CreateUser ("PTAC-918",strNewPersonaName)
'Validate AppointmentSection availability
CompanyUserSetup_UserLogin "PTAC-918",strUserId1
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
CompanyUserSetup_ValidateAppointmentSection()

'Login as Admin
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"

'Change the appointment Privileges 
CompanyUserSetup_ChangeAppointmentAccessible strNewPersonaName
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync

'Created data Removal
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
'====== Verification of Delete the persona ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-938","Verification of deleting a user created persona", Null
CompanyUserSetup_DeleteAndValidation strNewPersonaName
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
'================================== Merging Persona script ============================================

'====== Verification of duplicating the persona ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-920","Verification of deleting an unique persona", Null
CompanyUserSetup_UniquePersonaErrorMessageValidation "PersonaSetUp"


'======Deletion of creation data ======
CompanyUserSetup_DeleteAndValidation strDuplicatePersonas
CompanyUserSetup_DeleteAndValidation strRenamePersona

'================================== Merging Persona script ============================================

'Navigate to Organization/users page
BIZ_Nav_Settings_OrganizationUsers()
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
BIZ_OrganizationUsers_DeleteExistingUser strUserId1

BIZ_Settings_ClickClose()

'================================ Roles verification =================================================


FRM_Logger_ReportInfoEvent "Start Test Case:PTAC-3500","Scrpit Name - Settings_CompanyUserSetup_Roles", Null



'====== Go to Settings/Company/User Setup/;User Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "Roles"

'====== Verification of creating a new role ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-978","Verification of creating a new role", Null
strNewRole= CompanyUserSetup_CreateAndValidateRoles("PTAC-978_SetData")

'====== Verification of editing an existing role ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-979","Verification of editing an existing role", Null
BIZ_CompanyUserSetup_Roles_EditRole "PTAC-978_SetData",strNewRole

'====== Verification of deleting an existing role ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-980","Verification of deleting an existing role", Null
BIZ_CompanyUserSetup_Roles_DeleteRole "PTAC-978_SetData",strNewRole

'Close the settings window
BIZ_Settings_ClickClose()
wait g_TinyWaitMedium
