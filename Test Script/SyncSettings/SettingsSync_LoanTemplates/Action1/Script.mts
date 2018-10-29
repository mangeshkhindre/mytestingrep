'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3121 -  Verify synced 'Document Sets' data in Environment 2 should match with Environment 1
   '2 PTAC-3122 -  Verify synced 'Input Form Sets' data in Environment 2 should match with Environment 1
   '3 PTAC-3123 -  Verify synced 'Task Sets' data in Environment 2 should match with Environment 1
   '4 PTAC-3124 -  Verify synced 'Loan Template Sets' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3438 SettingsSync_LoanTemplates
'@ TestData:
   '1 Settings_LoanTemplates,SetLoanProgram and 3121_LoanTemplates_DocumentSet
   '2 Settings_LoanTemplates,SetLoanProgram and PTAC-3122_LoanTemplates_InputFormSet
   '3 Settings_LoanTemplates,SetLoanProgram and PTAC-3123_LoanTemplates_TaskSet
   '4 Settings_LoanTemplates,SetLoanProgram and PTAC-3124_Sync_Data
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description: 
'@ TestSteps:  Updated in Action Level
'@ ExpectedResult: Updated in Action Level

'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3438","Script Name -SettingsSync_LoanTemplates", Null

BIZ_Login_OpenAdminTool()
'====== Login to the Encompass as admin ======
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_adminloginEnv1","Sync_adminloginEnv2"
'====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Loan Templates"

'Create and validate DocumentSets
RunAction "SyncSettings_LoanTemplates_DocumentSets_001", oneIteration

'Create and validate InputFormSets
RunAction "SyncSettings_LoanTemplates_InputFormSets_002", oneIteration

'Create and validate TaskSets
RunAction "SyncSettings_LoanTemplates_TaskSets_003", oneIteration

'Create and validate LoanTemplateSets
RunAction "SyncSettings_LoanTemplates_LoanTemplateSets_004", oneIteration

BIZ_Login_SyncLogout
FRM_RT_TearDownTest(Null)


