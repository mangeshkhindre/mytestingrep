'@**************************************************************************************************
'@ TestStory: E2E_CompanyUserSetup_Functionalities
'@ TestCase:
   '1 Milestone:- Create,Edit,Movement from Current Milestone to Archived milestoneand vice versa,
   

'@ TestData: ' Updated at Action Level in Details.
'@ Pre-conditions: 
   ' Updated at Action Level in Details.
   
'@ TestSteps:
   ' Updated at Action Level in Details.
   
'@ ExpectedResult:
   ' Updated at Action Level in Details.
   
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyOrganizationSetup_Functionalities","Script Name - E2E_Settings_CompanyOrganizationSetup", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"


RunAction "NewlyCreatedMileStone_Role", oneIteration
RunAction "UserGroupLinkUser", oneIteration
RunAction "NonAdminPersona", oneIteration
'RunAction "PersonaRoles", oneIteration
'RunAction "UserGroup", oneIteration

BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)

