
FRM_RT_SetupTest(null)

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

RunAction "CM_LinkedLoan", oneIteration

RunAction "PiggybackLoan", oneIteration

'======== Logout ========== 
BIZ_Login_UserLogout

FRM_RT_TeardownTest Null

