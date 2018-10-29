﻿'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3020 - verify synced 'Print Auto Selection' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_PrintAutoSelection,RuleDetails and SettingsSync_PrintAutoSelection
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Print Auto Selection
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Input Form List
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 and click Add button.
   '6 Enter the data
   ' "Field Id: 4000 Value: Alpha Click on Add Forms button and add ""1003 Page 1"" "
   '7 Click OK button
   '8 Click on Save button
   '9 Select rule in Environment 1 and click sync to arrow button
   '10 Verify that the Rule data in Environment 2 should match with Environment1
   '11 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Print Auto Selection module should open.
   '3 Print Auto Selection Rule Details window should open.
   '4 Data should be entered.
   '5 Add/Edit Field Event window should open.
   '6 Data to be entered
   '7 Data should be saved and displayed in the grid.
   '8 Data should be saved and displayed in the grid.
   '9 Rule should be synced to Environment2.
   '10 Rule data in Environment 2 should match with Environment1
   '11 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3020","Verify synced 'Print Auto Selection' data in Environment 2 should match with Environment 1", Null

'====== Select Print Auto Selection Printing Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Print Auto Selection"
Wait g_ShortWaitMedium

'====== Create Print Auto Selection in Environment 1 ======
'====== Validate Print Auto Selection Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Print Auto Selection", "Create Print Auto Selection template in Environment 1", null
strPrintAutoSelectionName= Settings_Sync_BusinessRules_CreatePrintAutoSelectionRule("SettingsSync_PrintAutoSelection",1)

FRM_Logger_ReportInfoEvent "Print Auto Selection", "Data saved and Validate new created template '"&strPrintAutoSelectionName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidatePrintAutoSelectionRuleData "SettingsSync_PrintAutoSelection",1,strPrintAutoSelectionName

'====== Click on Sync arrow button ======
'====== Validate Loan Form Printing Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Print Auto Selection ", "Validate Print Auto Selection '"&strPrintAutoSelectionName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidatePrintAutoSelectionRuleData "SettingsSync_PrintAutoSelection",0,strPrintAutoSelectionName

'====== Delete the Loan Form Printing in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Print Auto Selection data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strPrintAutoSelectionName,1

'====== Delete the Loan Form Printing in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Print Auto Selection data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strPrintAutoSelectionName,0

BIZ_Login_SyncLogout()
Wait g_LongWaitLarge+15
