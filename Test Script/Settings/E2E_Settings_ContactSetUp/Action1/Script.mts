'@**************************************************************************************************
'@ TestStory: E2E_Settings_ContactSetUp
'@ TestData: ' Updated at Action Level in Details.
'@ Pre-conditions: 
   ' Updated at Action Level in Details.
   
'@ TestSteps:
   ' Updated at Action Level in Details.
   
'@ ExpectedResult:
   ' Updated at Action Level in Details.
   
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: ", "Script Name - E2E_Settings_ContactSetUp", null
	
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

RunAction "ContactSetup", oneIteration

RunAction "BusinessCategories", oneIteration

RunAction "PublicBussinessContactGroup", oneIteration

RunAction "BorrowerContactOperations", oneIteration




'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)	
