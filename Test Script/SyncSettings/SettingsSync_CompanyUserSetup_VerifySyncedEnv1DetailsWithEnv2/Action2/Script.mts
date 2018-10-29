'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-1895 The objective of test case is to verify synced Persona data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
        'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 Select Settings-> Company/User Setup-> Personas
   '3 Click on new button in Environment1.
   '4 1 Enter Persona Name
   '  2 In Start With, select ""Access to All Features"" option
   '  3 In Persona Type, select Internal and External checkboxes
   '  4 Click on OK button
   '5 Edit the data as mentioned in Test data column.
   '    "From Pipeline tab, deselect ""Delete Loans"" checkbox, From Settings, Select Roles checkbox"
   '6 Click on Save icon.
   '7 Select created persona in test data column and click Sync to arrow button.
   '8 Verify that the synced Persona data in Environment 2 should match with Environment1
   '9 Delete the created record in Encompass
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Create a persona popup should be opened.
   '3 Data should be entered
   '4 Persona should be created.
   '5 "From Pipeline tab, deselect ""Delete Loans"" checkbox, From Settings, Select Roles checkbox, "
   '6 Data should be saved.
   '7 Persona should be synced to Environment2.
   '8 Synced Persona data in Environment 2 should match with Environment1
   '9 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1895","The objective of test case is to verify synced Persona data in Environment 2 should match with Environment 1", Null

'================Persona tab selction===============
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Personas"
GUI_Object_WaitTillVisibleX SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=gcCreatePersona","index:="&intIndex), 60

'================Persona Creation===================
Dim strPersonaName
FRM_Logger_ReportInfoEvent "Persona Creation ","Started Persona creation in Env1", Null
strPersonaName = SyncSettings_CompanyUserSetup_CreatePersonas("SyncSettings_PersonaCreation", True, 1)
FRM_Logger_ReportInfoEvent "Persona valdiation in Env1","Created Persona validation in Env1", Null
SyncSettings_CompanyUserSetup_ValidateCreatedPersonas strPersonaName, 1

'=================persona Edit for Loan and Roles=====
FRM_Logger_ReportInfoEvent "Persona Edit forLoan tab ","Started Persona Edit for Loans Tab in Env1", Null
SyncSettings_CompanyUserSetup_EditPersonasForLoanAndRoles strPersonaName, 1, micUnchecked

'=================Sync arrow fucntionality=====
BIZ_SyncSettings_ClickArrow()

'Validate th Sync Data in Env2
FRM_Logger_ReportInfoEvent "Persona valdiation in Env2","Created Persona validation in Env2", Null
SyncSettings_CompanyUserSetup_ValidateCreatedPersonas strPersonaName, 0

'==========Delete the Personas================
FRM_Logger_ReportInfoEvent "Persona Deletion 2","Persona deletion in Env1", Null
SyncSttings_CompanyUserSetup_DeletePersona strPersonaName, 1
FRM_Logger_ReportInfoEvent "Persona Deletion 2","Persona deletion in Env2", Null
SyncSttings_CompanyUserSetup_DeletePersona strPersonaName, 0
