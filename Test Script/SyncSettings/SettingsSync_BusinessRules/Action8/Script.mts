'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3018 - Verify synced 'Input Form List' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_InputFormList,InputFormList and SettingsSync_InputFormList
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Input Form List
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Input Form List
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 enter the data mentioned in Test Data column
   '  Add Input Form window should open.
   '6 Select Input form(1003 Page 1)
   '7 Click Add button
   '8 Click on Save button
   '9 Select rule in Environment 1 and click sync to arrow button
   '10 Verify that the Rule data in Environment 2 should match with Environment1
   '11 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Input Form List module should open.
   '3 Input Form List Rule window should open.
   '4 Data should be entered.
   '5 Add Input Form window should open.
   '6 Input Form should be selected
   '7 Data should be saved and displayed in the grid.
   '8 Data should be saved and displayed in the grid.
   '9 Rule should be synced to Environment2.
   '10 Rule data in Environment 2 should match with Environment1
   '11 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3018","Verify synced 'Input Form List' data in Environment 2 should match with Environment 1", Null

'====== Select Input Form List Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Input Form List"
Wait g_ShortWaitMedium

'====== Create Input Form List in Environment 1 ======
'====== Validate Input Form List Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Input Form List", "Create Input Form List template in Environment 1", null
strInformListName= Settings_Sync_BusinessRules_CreateInputFormListRule("SettingsSync_InputFormList",1)
FRM_Logger_ReportInfoEvent "Input Form List", "Data saved and Validate new created template '"&strInformListName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateInputFormListRuleData "SettingsSync_InputFormList",1,strInformListName

'====== Click on Sync arrow button ======
'====== Validate Persona Access to Loans Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Input Form List ", "Validate Input Form List '"&strInformListName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateInputFormListRuleData "SettingsSync_InputFormList",0,strInformListName

'====== Delete the Input Form List in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Input Form List data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strInformListName,1

'====== Delete the Input Form List in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Input Form List data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strInformListName,0
