'@******************************************************************************************
'@ TestStory: E2E_BusinessRule_Persona Access To Loans
'@ TestCase: Persona Access to Loans Rule without Conditon
'@ TestCase: Persona Access to Loans Rule Set "Loan Purpose" Condition
'@ TestCase: Persona Access to Loans Rule Set "Advanced Conditions" Condition
'@ TestCase: Persona Access to Loans Rule Set "Doc Type" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Program" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Type" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Status" Condition
'@ TestCase: Persona Access to Loans Rule Set "Property State" Condition
'@ TestCase: Persona Access to Loans Rule Set "Rate" Condition
'@ TestCase: Persona Access to Loans Rule Set "Current Role" Condition
'@ Test Automation JIRA Task:TA-4850
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_1"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_2"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_3"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_4"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_5"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_6"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_7"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_8"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_9"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_10"
'@ Pre-conditions: 1. Create new user.
'@ Description:  
'@ TestSteps:1. Login into Encompass
'			 2. Go to Settings->Business Rules->Persona Access to Loans
'            3. Create a new loan access rule with  with different conditions.
'			 4. Login with newly created user.
'            4. Create a new loan.
'            5. Apply condition on which business rule is created.
'            6. Check if loan has proper access rights which are set while creating rule.
'            7. Go to Settings->Business Rules->Persona Access to Loans
'            8. Select the newly created business rule.
'            9. Export the rule.
'            10.Delete the rule.
'            11.Import the rule and check if it is imported successfully or not.
'            12.Delete the rule and logout of Encompass. 
'@ ExpectedResult: 1.For test step-3,Business rule should be created successfully.
'                  2.For test step-6,Business rule should be triggered successfully.
'                  3.For test step-9,Business rule should be exported successfully.
'                  4.For test step-10,Business rule should be deleted successfully.
'                  5.For test step-11,Business rule should be imported successfully.
'********************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Test step-1","Login to Encompass",NULL

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

'====Go to Settings->Company/User Setup->Personas==========
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

FRM_Logger_ReportStepEvent "Precondition Step-0","Delete existing user.",NULL

'==============Delete Existing user================
BIZ_OrganizationUsers_DeleteExistingUser("e2ebrpal")

FRM_Logger_ReportStepEvent "Precondition Step-1","Create new user.",NULL

'======Create new user=================
BIZ_OrganizationUsers_CreateUser("e2ebrpal")

'=============Close the settings==================
BIZ_Nav_Settings_Close()

'=======================Logout of Application========================
BIZ_Login_UserLogout

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_1","without Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_2","Loan Purpose Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_3","Advanced Conditions"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_4","Doc Type Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_5","Loan Program Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_6","Loan Type Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_7","Loan Status Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_8","Property State Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_9","Rate Condition"

RunAction "BusinessRules_PersonaAccessToLoans", oneIteration, "E2E_BR_PersAcsToLoans_10","Current Role Condition"

RunAction "BusinessRules_PersonaAccessToLoans_OverritePopup", oneIteration, "E2E_BR_PersAcsToLoans_6","Loan Type Condition with overrite popup"

FRM_RT_TearDownTest(Null) 


