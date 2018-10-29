'@******************************************************************************************
'@ TestStory: CFUN-1411 business contacts Custom field - have the field value copy as entered
'@ TestCase: CFUN-2607 - TC01 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@			CFUN-2609 - TC02 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@			CFUN-2610 - TC03 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@ Test Automation JIRA Task: TA-4851
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass
	'2 Run Action "TC1-3" forTC01
	'3 Run Action "TC1-3" forTC02
	'4 Run Action "TC1-3" forTC03
	'5  Lgout of Encompass
'@ ExpectedResult: Once the credit report is imported into the loan file the user should be able to select and 
'					import liabilities from the credit report to page 2 of the 1003
'********************************************************************************************
FRM_RT_SetupTest(Null)
'login to Encompass
BIZ_Login_UserLogin "sven_admin"

RunAction "TC1-3", oneIteration, "Alpha", "TC1", "EMERGENCY RESCUE TEAM #01"
RunAction "TC1-3", oneIteration, "Beta", "TC2",  "emergency rescue team #01"
RunAction "TC1-3", oneIteration, "Gamma", "TC3", "EmErGeNcY rEsCuE@1234aB"

FRM_RT_TeardownTest(null)
'Logout of Encompass
BIZ_Login_UserLogout()


