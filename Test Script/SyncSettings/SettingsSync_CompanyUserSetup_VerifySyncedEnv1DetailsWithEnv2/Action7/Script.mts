'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-2080 The objective of test case is to verify synced MileStone Templates data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '01 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
       'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '02 Select Settings-> Company/User Setup-> Milestones
   '03 Select Milestone Templates tab
   '04 Click on new icon
   '05 In Details tab, enter Template Name
   '06 In Roles tab, click on new icon
   '07 Select ""StarRole"" checkbox and click Add button
   '08 Select Milestones tab present next to Details tab
   '09 Click on new icon
   '10 Select ""StarMilestone"" checkbox and click Add button."
   '11 Select created Milestone  Star MTemplate in test data column and click Sync to arrow button
   '12 Verify that the synced User Groups data in Environment 2 should match with Environment1
   '13 Delete the created record in Encompass
'@ ExpectedResult:
   '01 Settings Sync tool should be displayed with two environment details.
   '02 Milestones module should be opened
   '03 Template name should be entered
   '04 Role selection window opens
   '05 Role selection window should be closed and role "" StarRole"" should be displayed in "" Roles Not Tied to a Milestone"" section
   '06 Milestone Selection popup should be opened
   '07 Milestone Selection popup should be closed and ""StarMilestone"" should be added in ""Milestone Template"" section."
   '08 Milestone template should be synced to Environment2.
   '09 Synced Milestone Template data in Environment 2 should match with Environment1
   '10 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2080","The objective of test case is to verify synced MileStone Templates data in Environment 2 should match with Environment 1", Null

'================MileStones tab selction===============
FRM_Logger_ReportInfoEvent "MileStone Settings selection","Milestone Settings selected", Null
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Milestone Settings"
GUI_Object_WaitTillVisibleX SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabMilestones","index:=1"), 60

FRM_Logger_ReportInfoEvent "MileStone Tab selection","Milestone Tab selected", Null
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabMilestones","index:=1"), "Milestone Templates"
GUI_Object_WaitTillVisibleX SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabTemplates","index:=1"), 60

'================MileStone Creation===================
Dim strMileStoneTemplateName
FRM_Logger_ReportInfoEvent "MileStone Template Creation","Milestone Template creation Started", Null
strMileStoneTemplateName = SyncSettings_CompanyUserSetUp_MileStonesTemplates_CreateNew("SyncSettings_MileStoneTemplates", 1,Parameter("strMileStoneName"))

boolExist = GUI_List_ClickRow (SwfWindow("Swfname:=SettingsToolMain").SwfObject("swfname:=gvSequentialMilestones","index:=1"), SwfWindow("Swfname:=SettingsToolMain").SwfScrollBar("swfname:=vPanelScrollBar"), "Milestone", strMileStoneTemplateName, True, False, False, "Single")
'Validate the Sync Data in Env2
FRM_Logger_ReportInfoEvent "MileStone Template valdiation in Env1","Created MileStone Template validation in Env1", Null
SyncSettings_CompanyUserSetUp_MileStonesTemplates_validation "SyncSettings_MileStoneTemplates", strMileStoneTemplateName, 1,Parameter("strMileStoneName")

'Templatevalidation
FRM_Logger_ReportInfoEvent "MileStone Template Validation","Started Milestone Template Validation in Env1 ", Null
SyncSettings_CompanyUserSetUp_MileStonesTemplates_validationinMileStone strMileStoneTemplateName, 1

BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "MileStone Template Validation","Started Milestone Template Validation in Env2 ", Null
SyncSettings_CompanyUserSetUp_MileStonesTemplates_validationinMileStone strMileStoneTemplateName, 0

'==========Delete the Roles================
FRM_Logger_ReportInfoEvent "MileStone Template Remove","Started Milestone Template Remove in Env1 ", Null
SyncSettings_CompanyUserSetUp_MileStonesTemplates_RemoveValidation strMileStoneTemplateName, "SyncSettings_MileStoneTemplates", 1,Parameter("strMileStoneName")
FRM_Logger_ReportInfoEvent "MileStone Template Remove","Started Milestone Template Remove in Env2 ", Null
SyncSettings_CompanyUserSetUp_MileStonesTemplates_RemoveValidation strMileStoneTemplateName, "SyncSettings_MileStoneTemplates", 0,Parameter("strMileStoneName")
