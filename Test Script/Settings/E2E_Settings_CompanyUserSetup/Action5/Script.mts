'@**************************************************************************************************
'@ TestStory: E2E_CompanyUserSetup_Functionalities
'@ TestCase:
   '1 Verification of creating,editing and deleting a new organisation
'@ Test Automation JIRA Task: PTAC-1888 Settings_CompanyUserSetup_NewOrganization
'@ TestData: Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and Organization
'@ Pre-conditions: 
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Company/User Setup:Organization/Users
'@ Description:  
'@ TestSteps:
   '1 Creating a new organization
   '2 Editing an organization
   '3 Deleting an organization
'@ ExpectedResult:
   '1 Verification of creating a new organization
   '2 Verification of editing an organization
   '3 Verification of deleting an organization
'***************************************************************************************************

Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyUserSetup_Functionalities","Script Name - E2E_Settings_CompanyUserSetup_NewOrganisation", Null
Public strRowID
strRowID= "PTAC_939_SetOrganizationData"

'====== Go to Settings/Company/User Setup/;User Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_Settings_OrganizationUsers()
    
'====== Verfication of creating a new persona ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-939","Verfication of creating a new organization", Null
strOrganization = CompanyUserSetup_NewOrganization(strRowID)

'====== Verification of editing an organization ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-940","Verification of editing an organization", Null
CompanyUserSetup_EditOrganization "PTAC_939_SetOrganizationData",strOrganization

'====== Verification of deleting an organization ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-941","Verification of deleting an organization", Null
BIZ_Organization_DeleteOrganization strOrganization
TreeView_VerifyNewOrganization strOrganization,"Delete"

BIZ_Settings_ClickClose()
wait g_TinyWaitMedium

