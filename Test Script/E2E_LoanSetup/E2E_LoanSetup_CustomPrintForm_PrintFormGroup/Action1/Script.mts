	FRM_RT_SetupTest(Null)
	
	
	'====== Login to the Encompass as admin ======
	BIZ_Login_UserLogin "admin_core2p"
	
	'====== RunAction To Verify Custom Print Forms =======
	'RunAction "E2E_LoanSetup_CustomPrintForms", oneIteration
	
	FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1882","Script Name - E2E_LoanSetup_CustomPrintForms", Null
	FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1964","Script Name - E2E_LoanSetup_PrintFormGroup - Admin User", Null
	
	'====== RunAction To Verify NotDefaultInputForm in Forms Tab =======
	RunAction "E2E_LoanSetup_AdminPrintFormGroup", oneIteration
	'UTIL_Win_CloseWinWord	
	'====== RunAction To Verify DefaultInputForm in Forms Tab =======
	
	RunAction "E2E_LoanSetup_Non-AdminPrintFormGroup", oneIteration
		
	'====== Logout From Application ======
	BIZ_Login_UserLogout()	
	UTIL_Win_CloseWinWord
	FRM_RT_TearDownTest(Null) 
