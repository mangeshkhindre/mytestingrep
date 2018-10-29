'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Environment Management_Business Rule_E2E testcases->Field Data Entry
'@ Test Automation JIRA Task: TA-4833
'@ TestData: "BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC1_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC2_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC3_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC4_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC5_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC6_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC7_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC8_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC9_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC10_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC11_FieldDataEntry"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass
	'2 Go to Settings->Company/USer Setup->Organization Users
	'3 Delete the existing user sven_officer
	'4 Close the settings
	'5 Create a new user sven_officer
	'6 Close the settings
	'7 Run the Action FieldDataEntry for TC1-TC11
	'8 Logout of Encompass
'@ ExpectedResult: 
'********************************************************************************************
FRM_RT_SetupTest(Null)
'login to Encompass
BIZ_Login_UserLogin "sven_admin"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

'Create a new user sven_officer
BIZ_OrganizationUsers_CreateUser "sven_officer"
'Close the settings
BIZ_Nav_Settings_Close()

RunAction "FieldDataEntry", oneIteration, "TC1", "Without condition"
RunAction "FieldDataEntry", oneIteration, "TC2","Loan purpose condition"
RunAction "FieldDataEntry", oneIteration, "TC3","Advanced conditions condition"
RunAction "FieldDataEntry", oneIteration, "TC4","Doc type condition"
RunAction "FieldDataEntry", oneIteration, "TC5","Loan program condition"
RunAction "FieldDataEntry", oneIteration, "TC6","Loan type condition"
RunAction "FieldDataEntry", oneIteration, "TC7","Loan status condtion"
RunAction "FieldDataEntry", oneIteration, "TC8","Property state condition"
RunAction "FieldDataEntry", oneIteration, "TC9","Rate condition"
RunAction "FieldDataEntry", oneIteration, "TC10","Current role condition"
RunAction "FieldDataEntry", oneIteration, "TC11","Loan Type condition"
'Commented out this, since the condition "TPO Actions" is not present in the dropdown list. Discussed the same with Madhava.
'RunAction "FieldDataEntry", oneIteration, "TC11"

FRM_RT_TeardownTest(null)
'Logout of Encompass
BIZ_Login_UserLogout()




