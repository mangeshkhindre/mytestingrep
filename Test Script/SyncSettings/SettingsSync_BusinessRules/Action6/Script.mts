'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3016 -  Verify synced 'Persona Access to Fields' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_PersonaAccessToFields,RuleDetails and SettingsSync_PersonaAccessFields
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules->Persona Access to Fields
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Star Milestone Completion Rule
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 and click Add button.
   ' "Add ""4000"" in ""Add a Field"" section
   ' Assign Rights ""View Only/Disabled"" for ""Loan Opener"" persona"
   '6 Click on Save button
   '7 Select rule in Environment 1 and click sync to arrow button
   '8 Verify that the Rule data in Environment 2 should match with Environment1
   '9 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Persona Access to Fields module should open.
   '3 Field Access Rule window should open.
   '4 Data should be entered.
   '5 Data should be entered.
   '6 Data should be saved and displayed in the grid.
   '7 Rule should be synced to Environment2.
   '8 Rule data in Environment 2 should match with Environment1
   '9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3016","Verify synced 'Persona Access to Fields' data in Environment 2 should match with Environment 1", Null

'====== Select Persona Access to Fields Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Persona Access to Fields"
Wait g_ShortWaitMedium

'====== Create Persona Access to Fields in Environment 1 ======
'====== Validate Persona Access to Fields Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Persona Access to Fields", "Create Persona Access to Fields template in Environment 1", null
strPersonaAccessName= Settings_Sync_BusinessRules_CreatePersonaAccesstoFieldsRule("SettingsSync_PersonaAccessFields",1)
FRM_Logger_ReportInfoEvent "Persona Access to Fields", "Data saved and Validate new created template '"&strPersonaAccessName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidatePersonaAccesstoFieldsRuleData "SettingsSync_PersonaAccessFields",strPersonaAccessName,1

'====== Click on Sync arrow button ======
'====== Validate Persona Access to Fields Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Persona Access to Fields ", "Validate Persona Access to Fields '"&strPersonaAccessName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidatePersonaAccesstoFieldsRuleData "SettingsSync_PersonaAccessFields",strPersonaAccessName,0

'====== Delete the Persona Access to Fields in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Persona Access to Fields data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strPersonaAccessName,1

'====== Delete the Persona Access to Fields in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Persona Access to Fields data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strPersonaAccessName,0



