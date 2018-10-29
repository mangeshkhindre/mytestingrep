'@**************************************************************************************************
'@ TestStory: PTAC-1673 Company Org Setup
'@ TestCase: 
   '1 PTAC-1580 - Verification of settings levied on the newly created non-admin persona user login session is working properly
'@ Test Automation JIRA Task: PTAC-3718 Settings_CompanyOrganizationSetUp_VerificationOfSettingsOnNon-AdminPersona
'@ TestData: 
   '1 Setttings_CompanyUserSetup, Persona and PTAC-1580_PersonaSetUp
   '2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and PTAC-1580_LoanSetupUncheck
   '3 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and PTAC-1580_ValidateUncheck
   '4 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser and PTAC_1580_SetOrganizationData
'@ Pre-conditions: User logged into Encompass as an admin
'@ Description:  
'@ TestSteps:
   '1 Go to Encompass settings --> company/ User Setup --> Personas.In '1.Create a Persona' section, click on 'Add persona(+) icon
   '2 In 'Create a Persona' popup message box, enter the persona name
   '3 Select 'Access to All features' radio button and check 'Internal' checkbox --> click on 'Save' button
   '4 Select newly created persona and click on 'Settings' tab
   '5 Uncheck the 'Loan Setup' checkbox and also uncheck 'Custom Print Forms' and 'Print Form Groups' checkboxes.Click on 'Save' icon
   '6 Go to Company/ User Setup --> Organization/Users
   '7 Go to 'Organization' section and select available organization
   '8 Go to 'Enabled Users() User Licenses()' section and click on 'Add User(+)' icon
   '9 In 'User Details popup window, enter the details according to the test data
   '10 Go to 'Persons' section in the right side and click on 'Add Persona(+)' icon
   '11 In 'Persona Selection' popup window, check the check box for 'Settings' persona.Click on 'Save' button
   '12 Click on 'Close' icon in Settings window and then click on 'Close' icon in Encompass main window
   '13 Re-login to Encompass with the newly created user credentials
   '14 Go to Encompass -->  Settings and check for 'Loan Setup' section
   '15 Click on 'Close' icon in settings window and click on 'Close' icon in Encompass main window.
   '16 In Encompass popup message click on 'Yes' button
'@ ExpectedResult:
   '1 New persona created successfully
   '2 Loan Setup, 'Custom Print Forms' , 'Print form Groups' checkboxes are unchecked
   '3 User is created successfully
   '4 'Loan Setup' section shouldn't be available
   '5 Are you sure you want to close Encompass? popup message appears
'***************************************************************************************************
Wait g_LongWaitMedium 

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3718","Script Name - Settings_CompanyOrganizationSetUp_VerificationOfSettingsOnNon-AdminPersona", Null


'====== Go to Settings/Company/User Setup/;Personas ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
    
'====== Verification of settings levied on the newly created non-admin persona user login session is working properly ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1580","Verification of settings levied on the newly created non-admin persona user login session is working properly", Null
strNewPersona = CompanyUserSetup_CreateAndValidatePersona("PTAC-1580_PersonaSetUp")
Settings_Personas_CompanySettings_Access "PTAC-1580_LoanSetupUncheck",strNewPersona,"Loan Setup"
Settings_CompanySettings_ValidateCheckBox "PTAC-1580_ValidateUncheck","Loan Setup"
strUserId = Settings_CompanyUserSetup_CreateOrganizationUser("PTAC_1580_SetOrganizationData",strNewPersona) 
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Login with Specified User ======
Login_UserLogin "admin_Setting_Verification",strUserId

'====== Go to Settings/Encompass;Settings.../;Loan Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Settings_CompanySettings_ValidateLoanSetupNotExists "Loan Setup"
BIZ_Login_UserLogout()

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Company/User Setup/;Organization/Users ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
BIZ_OrganizationUsers_DeleteExistingUser strUserId
Settings_OrganizationUsers_DeleteExistingUserValidation strUserId

'====== Go to Settings/Company/User Setup/;Personas ======
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
BIZ_Settings_Personas_DeletePersona strNewPersona
BIZ_Settings_ClickClose()



