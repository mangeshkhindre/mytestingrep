	FRM_RT_SetupTest(null)
	
	
	
	'====== Login to the Encompass as admin ======
	BIZ_Login_UserLogin "admin_core2p"
	
	RunAction "DataTemplateVerification", oneIteration
	
	RunAction "ClosingCost", oneIteration
	
	BIZ_Loan_Exit False
	
	'====== Logout From Encompass ======
	BIZ_Login_UserLogout()
	FRM_RT_TearDownTest(Null)
	
	

