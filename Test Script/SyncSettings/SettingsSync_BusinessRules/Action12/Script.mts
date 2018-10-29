'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3018 - Verify synced 'Roles Access to Documents' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_MilestoneCompletion,SetMilestoneCompletion and  PTAC-3108_Sync_Data
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Roles Access to Documents
   '3 "In Environment1, 
   '  a)Select 'Others' from "If a document is added by" section, Select few roles from "The following role can access the document"
   '  De-select few roles from ""The following role can access the document"",Click on Save icon.
   '  b)Select 'Archiver' from 'Select a Role' under "Protected Documents" section.
   '  Click on Save icon.
   '4 Select "Others" and click sync to arrow button
   '5 Verify that the data in Environment 2 should match with Environment1
   '6 Replace the settings back to Original
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Roles Access to Documents module should open.
   '3 Data should be saved.
   '4 Loan officer data should be synced to Environment2.
   '5 Data in Environment 2 should match with Environment1
   '6 The data to be updated
'***************************************************************************************************
'strRuleName= SyncSettings_BusinessRules_CreateRolesAccesstoDocumentsRule("PTAC-3108_Sync_Data",1)

'Settings_Sync_ValidateRule strRuleName, 1
'
''====== Save the Report ======
'
'Settings_Sync_ValidateRule strRuleName, 0
'
''====== Validate Synced MilestoneCompletionRule for Environment1 and environment 2 ======
'SyncSettings_BusinessRules_VerifyRolesAccesstoDocumentsData "PTAC-3108_Sync_Data",1,strRuleName
'SyncSettings_BusinessRules_VerifyRolesAccesstoDocumentsData "PTAC-3108_Sync_Data",0,strRuleName
'
'SyncSettings_BusinessRules_DeleteRule strRuleName,1
'SyncSettings_BusinessRules_DeleteRule strRuleName,0
