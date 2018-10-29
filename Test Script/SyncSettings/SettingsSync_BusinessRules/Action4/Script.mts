'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3014 -  Verify synced 'Field Trigger' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_FieldTrigger,TriggerDetails and SettingsSync_FieldTriggers
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules->Field Trigger
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Star Milestone Completion Rule
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 and click Add button.
   '6 Enter the data.
   '7 Click Ok button
   '8 Click on Save button
   '9 Select rule in Environment 1 and click sync to arrow button
   '10 Verify that the Rule data in Environment 2 should match with Environment1
   '11 Delete the created record in both ennvironments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Milestone Completion Rule module should open.
   '3 Milestone Completion Rule window should open.
   '4 Data should be entered.
   '5 Add/Edit field event window should open.
   '6 values to be entered
   '7 Data should be saved and displayed in the grid.
   '8 Data should be saved and displayed in the grid.
   '9 Rule should be synced to Environment2.
   '10 Rule data in Environment 2 should match with Environment1
   '11 The record to be deleted
   
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3014"," Verify synced 'Field Trigger' data in Environment 2 should match with Environment 1", Null

'====== Select Field Triggers Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Field Triggers"
Wait g_ShortWaitMedium

'====== Create Field Triggers in Environment 1 ======
'====== Validate Field Triggers Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Field Triggers", "Create Field Triggers template in Environment 1", null
strFieldTriggersName= Settings_Sync_BusinessRules_CreateFieldTriggerRule("SettingsSync_FieldTriggers",1)
FRM_Logger_ReportInfoEvent "Field Triggers", "Data saved and Validate new created template '"&strFieldTriggersName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateFieldTriggerRuleData "SettingsSync_FieldTriggers",1,strFieldTriggersName

'====== Click on Sync arrow button ======
'====== Validate Field Triggers Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Field Triggers ", "Validate Synced Field Triggers  '"&strFieldTriggersName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateFieldTriggerRuleData "SettingsSync_FieldTriggers",0,strFieldTriggersName

'====== Delete the Field Triggers in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Field Triggers data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strFieldTriggersName,1

'====== Delete the Field Triggers in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Field Triggers data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strFieldTriggersName,0


