'@**************************************************************************************************
'@ TestStory :NICE-796 DDM - Fee Rules Value tab for Fee line 902
'@ TestCase:
   '1 NICE-2420 - Validate in the FEE RULE the various field IDs associated with the line # 902 (refer attachment) while logged in as non-admin are getting displayed correctly.
   '2 NICE-2422 - Validate the NC report along with the report data, with Preapproval request approved but not accepted loan status
'@ Test Automation JIRA Task: NICE-796 DDM - Fee Rules Value tab for Fee line 902
'@ TestData:Not any Specific
'@ Pre-Conditions: Please make sure that non-admin user is having access to DDM. 
		  'To make this possible, please ensure that user linked persona is having access to DDM. 
		  'For this go to the encompass settings --> Company User/ Setup --> Persona --> Select desired persona --> Settings tab --> DDM --> Select all checkboxes and under it too.
'@ Description:
'@ TestSteps:Updated at Action level
'@ Test Steps: Updated at Action level
'@ ExpectedResult:Updated at Action level
'***************************************************************************************************
FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case: NICE-796","Script Name :DDM Fee Rules Value tab for Fee line 902", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'====== Setup the Pre-requisite for DDM settings ======
BIZ_Nav_Settings_OrganizationUsers()
BIZ_OrganizationUsers_DeleteExistingUser "RAauto123"
BIZ_OrganizationUsers_CreateUser "NICE_796_TC_02"
BIZ_Settings_Personas_SelectPersona "Loan Officer"
SetSettingsPersona "NICE_796_TC_02"
BIZ_Login_UserLogout
'====== Login to the Encompass as Non-admin ======
BIZ_Login_UserLogin "DDM_NonAdmin_User"

'======Create new Data Table for FEE Rule=======
BIZ_DDM_CreateNewDataTable "NICE_796_TC_02"

RunAction "NICE_796_TC_02_Validate_in_the_FEE_RULE_the_various_field_IDs_associated_with_the_line", oneIteration
RunAction "NICE_796_TC_02_Validate_in_the_FIELD_RULE_the_various_field_IDs_associated_with_the_line", oneIteration

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)
