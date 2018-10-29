
FRM_RT_SetupTest(null)	

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

'=============== Go to Settings -> Company/User Setup -> Organization Users ================
BIZ_Nav_Settings_OrganizationUsers()

'=============== Delete the existing user cindy_officer ==================
BIZ_OrganizationUsers_DeleteExistingUser "cindy_officer"

'================  Create a new user cindy_officer ==================
BIZ_OrganizationUsers_CreateUser "cindy_officer"

'========== Close the settings ===============
BIZ_Nav_Settings_Close()

RunAction "BR_MilestoneCompletion", oneIteration, "1"

RunAction "BR_MilestoneCompletion", oneIteration, "2"

RunAction "BR_MilestoneCompletion", oneIteration, "3"

RunAction "BR_MilestoneCompletion", oneIteration, "4"

RunAction "BR_MilestoneCompletion", oneIteration, "5"

RunAction "BR_MilestoneCompletion", oneIteration, "6"

RunAction "BR_MilestoneCompletion", oneIteration, "7"

RunAction "BR_MilestoneCompletion", oneIteration, "8"

RunAction "BR_MilestoneCompletion", oneIteration, "9"

RunAction "BR_MilestoneCompletion", oneIteration, "10"

'======== Logout from Encompass ========   
BIZ_Login_UserLogout

FRM_RT_TeardownTest (Null)

 @@ hightlight id_;_3540002_;_script infofile_;_ZIP::ssf7.xml_;_
