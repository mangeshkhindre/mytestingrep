FRM_RT_SetupTest(null)	

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

'======Verifying the Non Admin User Existence with Admin User ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
BIZ_OrganizationUsers_CreateUser "BusinessRules_NonAdmin"
BIZ_Settings_ClickClose

RunAction "BR_LoanFormPrinting", oneIteration, "1"

RunAction "BR_LoanFormPrinting", oneIteration, "2"

RunAction "BR_LoanFormPrinting", oneIteration, "3"

RunAction "BR_LoanFormPrinting", oneIteration, "4"

RunAction "BR_LoanFormPrinting", oneIteration, "5"

RunAction "BR_LoanFormPrinting", oneIteration, "6"

RunAction "BR_LoanFormPrinting", oneIteration, "7"

RunAction "BR_LoanFormPrinting", oneIteration, "8"
	
RunAction "BR_LoanFormPrinting", oneIteration, "9"

RunAction "BR_LoanFormPrinting", oneIteration, "10"

RunAction "BR_LoanFormPrinting", oneIteration, "11"

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

'====== Set Nothing for Created Objects ======
Set objRuleData = Nothing

FRM_RT_TearDownTest(Null)

