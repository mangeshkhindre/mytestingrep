'@******************************************************************************************
'@ TestStory: E2E_BusinessRule_Field Triggers
'@ TestCase: Field Triggers Rule without Condition
'@ TestCase: Field Triggers Rule Set "Loan Purpose" Condition
'@ TestCase: Field Triggers Rule Set "Advanced Conditions" Condition
'@ TestCase: Field Triggers Rule Set "Doc Type" Condition
'@ TestCase: Field Triggers Rule Set "Loan Program" Condition
'@ TestCase: Field Triggers Rule Set "Loan Type" Condition
'@ TestCase: Field Triggers Rule Set "Loan Status" Condition
'@ TestCase: Field Triggers Rule Set "Property State" Condition
'@ TestCase: Field Triggers Rule Set "Rate" Condition
'@ TestCase: Field Triggers Rule Set "Current Role" Condition
'@ Test Automation JIRA Task: TA-4834
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_1"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_2"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_3"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_4"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_5"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_6"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_7"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_8"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_9"
'@ TestData: "BusinessRule_FieldTrigger","TriggerDetails","E2E_BR_FT_10"
'@ Pre-conditions: NA
'@ Description:  
'@ TestSteps:1. Login into Encompass
'			 2. Go to Settings->Business Rules->Field Triggers
'            3. Create a field trigger with different conditions.
'            4. Create a new loan.
'            5. Apply condition on which business rule is created.
'            6. Check if business rule is triggered.
'            7. Go to Settings->Business Rules->Field Triggers
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

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_1", "Without Condition"

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_2", "Loan Purpose Condition"

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_3", "Advanced Conditions Condition"

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_4", "Doc Type Condition"

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_5", "Loan Program Condition" 

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_6", "Loan Type Condition"

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_7", "Loan Status Condition" 

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_8", "Property State Condition" 

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_9", "Rate Condition" 

RunAction "BusinessRules_FieldTriggers", oneIteration, "E2E_BR_FT_10", "Current Role Condition" 

RunAction "BusinessRules_FieldTriggers_OverritePopup", oneIteration, "E2E_BR_FT_6","Loan Type Condition with overrite popup"

'=======================Logout of Application========================
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null) 


