'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3012 - The objective of test case is to verify synced 'Milestone Completion Rule' data in Environment 2 should match with Environment 1
   '2 PTAC-3013 - The objective of test case is to verify synced 'Field Data Entry' data in Environment 2 should match with Environment 1
   '3 PTAC-3014 - The objective of test case is to verify synced 'Field Trigger' data in Environment 2 should match with Environment 1
   '4 PTAC-3015 - The objective of test case is to verify synced 'Automated Conditions' data in Environment 2 should match with Environment 1
   '5 PTAC-3016 - The objective of test case is to verify synced 'Persona Access to Fields' data in Environment 2 should match with Environment 1
   '6 PTAC-3017 - The objective of test case is to verify synced 'Persona Access to Loans' data in Environment 2 should match with Environment 1
   '7 PTAC-3018 - The objective of test case is to verify synced 'Input Form List' data in Environment 2 should match with Environment 1
   '8 PTAC-3019 - The objective of test case is to verify synced 'Loan Form Printing' data in Environment 2 should match with Environment 1
   '9 PTAC-3020 - The objective of test case is to verify synced 'Print Auto Selection' data in Environment 2 should match with Environment 1
   '10 PTAC-3054- The objective of test case is to verify synced 'Loan Folder Business Rule' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_MilestoneCompletion,SetMilestoneCompletion and SettingsSync_Milestone
   '2 BusinessRule_FieldDataEntry,FieldRule and SettingsSync_FieldDataEntry
   '3 BusinessRule_FieldTrigger,TriggerDetails and SettingsSync_FieldTriggers
   '4 BusinessRule_AutomatedCondition,SetAutomatedCondition and SettingsSync_AutomatedConditions
   '5 BusinessRule_PersonaAccessToFields,RuleDetails and SettingsSync_PersonaAccessFields
   '6 BusinessRule_PersonaAccesstoLoans,PerosnaAccesstoLoans and SettingsSync_PersonaAccessLoans
   '7 BusinessRule_InputFormList,InputFormList and SettingsSync_InputFormList
   '8 BusinessRule_LoanFormPrinting,LoanFormPrinting and SettingsSync_LoanFormPrinting
   '9 BusinessRule_PrintAutoSelection,RuleDetails and SettingsSync_PrintAutoSelection
   '10 BusinessRule_MilestoneCompletion,SetMilestoneCompletion and SettingsSync_LoanFolder
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description: Sync_Settings_MilestoneCompletionRule 
'@ TestSteps:  Updated in Action Level
'@ ExpectedResult: Updated in Action Level

'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3274","Script Name -SettingsSync_BusinessRules", Null

BIZ_Login_OpenAdminTool()
'====== Login to the Encompass as admin ======
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_adminloginEnv1","Sync_adminloginEnv2"
''====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Business Rules"

'The objective of test case is to verify synced 'Milestone Completion Rule' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_MileStoneCompletionRule_001", oneIteration

'The objective of test case is to verify synced 'Field Data Entry' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_FindingFields_002", oneIteration

'The objective of test case is to verify synced 'Field Trigger' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_FieldTrigger_003", oneIteration

'The objective of test case is to verify synced 'Automated Conditions' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_AutomatedConditions_004", oneIteration

'The objective of test case is to verify synced 'Persona Access to Fields' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_PersonaAccesstoFields_005", oneIteration

'The objective of test case is to verify synced 'Persona Access to Loans' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_PersonaAccesstoLoans_006", oneIteration

'The objective of test case is to verify synced 'Input Form List' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_InputFormList_007", oneIteration

'The objective of test case is to verify synced 'Loan Form Printing' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_LoanFormPrinting_008", oneIteration

'The objective of test case is to verify synced 'Print Auto Selection' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_PrintAutoSelection_009", oneIteration

'The objective of test case is to verify synced 'Loan Folder Business Rule' data in Environment 2 should match with Environment 1
RunAction "SyncSettings_BusinessRules_LoanFolderBusinessRule_010", oneIteration


BIZ_Login_SyncLogout()
FRM_RT_TearDownTest(Null)
