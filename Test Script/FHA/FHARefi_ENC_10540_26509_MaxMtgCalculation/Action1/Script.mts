'@**************************************************************************************************
'@ TestStory: ENC-10540 FHA Maximum Mortgage Calculation Updates – Refinance
'@ TestCase:  ENC-26509 TC #1 ENC-10540 - FHA Maximum Mortgage Calculation Updates: New Checkbox 'Simple Refinance (FHA to FHA)'
'@ Test Automation JIRA Task: TA-4553
'@ TestCase:  ENC-26509 TC #2 and TC #3 ENC-10540 Validate Mortgage Basis Value
'@ Test Automation JIRA Task: TA-4572
'**************************************************************************************************

	FRM_RT_SetupTest(null)

	RunAction "TC1_ENC_10540_CheckboxSimpleRefinanceFHAToFHA", oneIteration
	RunAction "TC2-TC3_ENC_10540_FHAManagementPrequalificationUpdates", oneIteration
	RunAction "TC4-TC5_ENC_10540_FHAManagementPrequalificationUpdatesStreamline", oneIteration
	
    BIZ_Loan_Save()
    BIZ_Loan_Exit(False)
	BIZ_Login_UserLogout()
	
	FRM_RT_TeardownTest(null)
	
	
'==================================================================================
     



