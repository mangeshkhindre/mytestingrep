'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3054 -  Verify synced 'Loan Folder Business Rule' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_MilestoneCompletion,SetMilestoneCompletion and SettingsSync_LoanFolder
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Environment1 Encompass 
   '2 Select Settings-> Loan Setup-> Loan Folders
   '3 Click on new icons
   '4 Enter folder name and click Save button.
   '5 Select Settings-> Business Rules-> Loan Folder Business Rules
   '6 Select folder " Star Folder"
   '7 1.Select "No" radio button for "Can loans be duplicated from Loan Folders"
   '  2.Select "Loan Status" option button and check "Active Loan" checkbox,Click on save icon.
   '8 1. Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '9 Select Settings-> Business Rules-> Loan Folder Business Rules
   '10 Select rule in Environment 1 and click sync to arrow button
   '11	Click on Yes button.
   '12 Click on Ok button.
   '13 Verify that the Rule data in Environment 2 should match with Environment1
   '14 Delete the created record in Encompass env1
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Loan folder screen should display
   '3 Create Loan Folder popup opens.
   '4 Folder should be saved..
   '5 Loan Folder Business Rule screen displays
   '6 It displays 'Star Folder' Business rule screen appears at right side
   '7 Data should be saved and displayed in the grid.
   '8 Settings Sync tool should be displayed with two environment details.
   '9 Loan Folder Business Rules module should open.
   '10 Settings Synchronization popup opens.
   '11	File System Setting pop-up opens
   '12 Rule should be synced to Environment2.
   '13	Rule data in Environment 2 should match with Environment1
   '   "No" radio button should be selected in "Can loans be duplicated from Loan Folders"
   '   "Active Loan" checkbox should be checked under "Loan Status" section
   '14 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3054","Verify synced 'Loan Folder Business Rule' data in Environment 2 should match with Environment 1", Null

BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

Wait g_ShortWaitMedium

'====== Create Loan Folder in Environment 1 ======
'====== Validate Loan Folder Data in LoanFolder page ======
FRM_Logger_ReportInfoEvent "Loan Folder", "Create Loan Folder in Environment 1", null
strLoanFolder=Settings_Sync_BusinessRules_CreateLoanFolder("SettingsSync_LoanFolder",1)
FRM_Logger_ReportInfoEvent "Loan Folder", "Validate new created Folder '"&strLoanFolder&"' data", Null
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
Settings_Sync_BusinessRules_ValidateLoanFolder strLoanFolder

BIZ_Login_UserLogout()
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
BIZ_Login_SyncLogin "Sync_adminloginEnv1","Sync_adminloginEnv2"
Wait g_TinyWaitMedium 'Explicit Wait Added Due to Sync
'====== Select Reports in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Business Rules"
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Loan Folder Business Rule"
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "Loan Folder ", "Validate Loan Folder '"&strLoanFolder&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateLoanFolderinEnviroment1 "SettingsSync_LoanFolder",strLoanFolder,1

BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Loan Folder ", "Validate Loan Folder '"&strLoanFolder&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateLoanFolderinEnviroment1 "SettingsSync_LoanFolder",strLoanFolder,0


	
