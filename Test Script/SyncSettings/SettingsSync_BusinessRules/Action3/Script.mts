'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3013 -  verify synced 'Field Data Entry' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_FieldDataEntry,FieldRule and SettingsSync_FieldDataEntry
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Field Data Entry
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Star Milestone Completion Rule
   ' select below channels:Brokered,Correspondent
   ' In section 3 select below data:Select Yes option button,Doc Type is Alternative"
   '5 select Required Docs tab from section 4 and click Add button.
   '6 Select the document
   '7 Select the Milestone from Milestone dropdown and click save button.
   '8 select Required Tasks tab from section 4 and click Add button.
   '9 Select the Task
   '10 Select the Milestone from Milestone dropdown and click save button.
   '11 select Required Fields tab from section 4 and click Add button
   '12 Enter the field
   '13 Select the Milestone from Milestone dropdown and click save button.
   '14 select Advanced Conditions tab from section 4 and click Add button.
   '15 Enter the advanced coding
   '16 Select rule in Environment 1 and click sync to arrow butto
   '17 Verify that the Rule data in Environment 2 should match with Environment1
   '18 Delete the created record in both ennvironments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Milestone Completion Rule module should open.
   '3 Milestone Completion Rule window should open.
   '4 Data should be entered.
   '5 Add Required Documents window opens.
   '6 value to be selected
   '7 Data should be saved and displayed in the grid.
   '8 Add Task window opens.
   '9 Option to be selected
   '10 Data should be saved and displayed in the grid.
   '11 Add Required Fields window opens.
   '12 The value to be entered
   '13 Data should be saved and displayed in the grid.
   '14 Add Required Fields window opens.
   '15 Data should be saved and displayed in the grid.
   '16 Rule should be synced to Environment2.
   '17 Rule data in Environment 2 should match with Environment1
   '18 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3013","Verify synced 'Field Data Entry' data in Environment 2 should match with Environment 1", Null

'====== Select Field Data Entry Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Field Data Entry"
Wait g_ShortWaitMedium

'====== Create FieldDataEntry in Environment 1 ======
'====== Validate FieldDataEntry Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "FieldDataEntry", "Create FieldDataEntry template in Environment 1", null
strFieldDataEntryName= Settings_Sync_BusinessRules_CreateFieldDataEntryRule("SettingsSync_FieldDataEntry",1)
FRM_Logger_ReportInfoEvent "FieldDataEntry", "Data saved and Validate new created templatee '"&strFieldDataEntryName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateFieldEnteryRuleData "SettingsSync_FieldDataEntry",1,strFieldDataEntryName

'====== Click on Sync arrow button ======
'====== Validate FieldDataEntry Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "FieldDataEntry ", "Validate Synced FieldDataEntry '"&strFieldDataEntryName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateFieldEnteryRuleData "SettingsSync_FieldDataEntry",0,strFieldDataEntryName

'====== Delete the FieldDataEntry in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the FieldEntry data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strFieldDataEntryName,1

'====== Delete the FieldDataEntry in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the FieldEntry data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strFieldDataEntryName,0
