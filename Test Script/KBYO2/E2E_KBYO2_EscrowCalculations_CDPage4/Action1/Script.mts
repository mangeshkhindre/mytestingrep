

FRM_RT_SetupTest(null)	

FRM_Logger_ReportStepEvent "Start test case","KBYO2 Escrow Calculations",Null

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

RunAction "VerifyEscrowCalculations", oneIteration, "1"
		
RunAction "VerifyEscrowCalculations", oneIteration, "2"

RunAction "VerifyEscrowCalculations", oneIteration, "3"

RunAction "VerifyEscrowCalculations", oneIteration, "4"

RunAction "VerifyEscrowCalculations", oneIteration, "5"

RunAction "VerifyEscrowCalculations", oneIteration, "6"

RunAction "VerifyEscrowCalculations", oneIteration, "7"

RunAction "VerifyEscrowCalculations", oneIteration, "8"
'===================================================
BIZ_Login_UserLogout

FRM_RT_TeardownTest Null


