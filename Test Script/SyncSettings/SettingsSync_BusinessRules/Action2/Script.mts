'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3012 -  Verify synced 'Milestone Completion Rule' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_MilestoneCompletion,SetMilestoneCompletion and SettingsSync_Milestone
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Milestone Completion Rule
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Star Milestone Completion Rule
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
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
   '13 Data should be saved and dispusinlayed in the grid.
   '14 Add Required Fields window opens.
   '15 Data should be saved and displayed in the grid.
   '16 Rule should be synced to Environment2.
   '17 Rule data in Environment 2 should match with Environment1
   '18 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3012","verify synced 'Milestone Completion Rule' data in Environment 2 should match with Environment 1", Null

'====== Select Milestone Completion Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Milestone Completion"
Wait g_ShortWaitMedium

'====== Create Milestone Completion in Environment 1 ======
'====== Validate Milestone Completion Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Milestone Completion", "create Milestone Completion template in Environment 1", null
strMilestoneName= Settings_Sync_BusinessRules_CreateMilestoneCompletionRule("SettingsSync_Milestone",1)
FRM_Logger_ReportInfoEvent "Milestone Completion", "Data saved and Validate new created template '"&strMilestoneName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateMilestoneRuleData "SettingsSync_Milestone",strMilestoneName,1

'====== Click on Sync arrow button ======
'====== Validate Milestome Completion Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Milestone Completion ", "Validate Synced Milestone Completion '"&strMilestoneName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateMilestoneRuleData "SettingsSync_Milestone",strMilestoneName,0

'====== Delete the Milestone in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Milestone data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strMilestoneName,1

'====== Delete the Milestone in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Milestone data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strMilestoneName,0

	
	
	
 @@ hightlight id_;_3015892_;_script infofile_;_ZIP::ssf2.xml_;_
 @@ hightlight id_;_65812_;_script infofile_;_ZIP::ssf3.xml_;_
