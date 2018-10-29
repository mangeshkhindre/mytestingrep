'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-2079 The objective of test case is to verify synced MileStone data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_CompanyUserSetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
        'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 '1 Select Settings-> Company/User Setup-> Milestones
      '2 Select Milestone tab
      '3 Click on new icon
      '4 Enter Milestone Name
      '5 Select Role from Role dropdown
      '6 Click on Save button
   '8 Select created Milestone in test data column and click Sync to arrow button.
   '9 Click on Yes button
   '10 Verify that the synced User Groups data in Environment 2 should match with Environment1
   '11 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2'1 Milestones module should be opened
     '2 Milestone Details popup should be opened
     '3 Milestone should be saved and displayed in the grid
   '3 Settings Synchronization popup opens
   '4 Milestone should be synced to Environment2
   '5 Synced Persona data in Environment 2 should match with Environment1
   '6 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2079","The objective of test case is to verify synced MileStones data in Environment 2 should match with Environment 1", Null

'================MileStones tab selction===============
FRM_Logger_ReportInfoEvent "MileStone Settings selection","Milestone Settings selected", Null
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Milestone Settings"
GUI_Object_WaitTillVisibleX SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabMilestones","index:=1"), 60

FRM_Logger_ReportInfoEvent "MileStone Tab selection","Milestone Tab selected", Null
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabMilestones","index:=1"), "Milestones"

'================MileStone Creation===================
Dim strMileStoneName
FRM_Logger_ReportInfoEvent "MileStone Creation","Milestone creation Started", Null
strMileStoneName = SyncSettings_CompanyUserSetUp_MileStones_CreateNew("SyncSettings_MileStone", 1)
Parameter("strMileStoneName")=strMileStoneName

'=================Sync arrow fucntionality=====
BIZ_SyncSettings_ClickArrow()

'Validate the Sync Data in Env2
FRM_Logger_ReportInfoEvent "MileStone valdiation in Env1","Created MileStone validation in Env1", Null
SyncSettings_CompanyUserSetUp_MileStones_Exist strMileStoneName, 1
FRM_Logger_ReportInfoEvent "MileStone valdiation in Env2","Created MileStone validation in Env2", Null
SyncSettings_CompanyUserSetUp_MileStones_Exist strMileStoneName, 0
