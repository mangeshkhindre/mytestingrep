'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Environment Management_Business Rule_E2E testcases->Persona Access to Fields
'@ Test Automation JIRA Task: TA-4833
'@ TestData: "BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC1_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC2_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC3_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC4_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC5_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC6_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC7_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC8_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC9_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC10_PersonaAccessToFields"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass
	'2 Go to Settings->Company/USer Setup->Organization Users
	'3 Delete the existing user sven_officer
	'4 Create a new user sven_officer
	'5 Close the settings
	'6 Run the Action PersonaAccessToFields for TC1-TC10
	'7 go to settings->Business Rules->Persona Access to Fields
	'8 Delete existing rule PersonaAccesstoFields
	'9 Logout of Encompass
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

RunAction "PersonaAccessToFields", oneIteration, "TC1",  "Without condition"
RunAction "PersonaAccessToFields", oneIteration, "TC2",  "Loan purpose condition"
RunAction "PersonaAccessToFields", oneIteration, "TC3",  "Advanced conditions condition"
RunAction "PersonaAccessToFields", oneIteration, "TC4",  "Doc type condition"
RunAction "PersonaAccessToFields", oneIteration, "TC5",  "Loan program condition"
RunAction "PersonaAccessToFields", oneIteration, "TC6",  "Loan type condition"
RunAction "PersonaAccessToFields", oneIteration, "TC7",  "Loan status condition"
RunAction "PersonaAccessToFields", oneIteration, "TC8",  "Property state condition"
RunAction "PersonaAccessToFields", oneIteration, "TC9",  "Rate condition"
RunAction "PersonaAccessToFields", oneIteration, "TC10", "Current role condition"
RunAction "PersonaAccessToFields", oneIteration, "TC11", "Loan Type condition"
'go to settings->Business Rules->Persona Access to Fields
BIZ_Nav_HierarchyTree "Business Rules", "Persona Access to Fields"
'Delete existing rule PersonaAccesstoFields
BIZ_BR_PersonaAccesstoFields_DeleteExisting "PersonaAccesstoFields"

FRM_RT_TeardownTest(null)
'Logout of Encompass
BIZ_Login_UserLogout()




