'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3303 -  verify synced TPO Custom fields in Environment 2 should match with Environment1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3434 SettingsSync_ExternalCompanySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:
   '1 Settings_CompanySettings,TPOFees and PTAC-3303
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select External Company Setup
'@ Description:  
'@ TestSteps:
   '1 Login into Environment1 encompass
   '2 In Enviro1,Select Settings->External Company Setup-> TPO Custom Fields
   '3 Enter the data.
   '4 Enter the data
   '  Page1
   '  Custom Field1:
   '  Field Description: Star Fields
   '  Field Type: String
   '  Loan Field ID: 4000
   '5 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '6 Select Settings->External Company Setup-> TPO Custom Fields
   '7 Select the custom Field 1 checkbox in Environment1 and click sync to arrow button
   '8 Verify that the synced custom Field data in Environment 2 should match with Environment1
   '9 Delete the created record in both environments
'@ ExpectedResult:
   '1 User should be login to Encompass successfully
   '2 The TPO Custom Fields should be open
   '3 The data should be entered
   '4 Data should be saved
   '5 Settings Sync tool should be displayed with two environment details.
   '6 The TPO Custom Fields window should open
   '7 Custom Field should be synced to Environment2.
   '8 Synced custom Field data in Environment 2 should match with Environment1
   '9 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3303","verify synced TPO Custom fields in Environment 2 should match with Environment1", Null

BIZ_Login_UserLogin "Sync_adminloginEnv1"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "External Company Setup","TPO Custom Fields"
Wait g_ShortWaitMedium

'====== Create TPO Custom Fields in Environment 1 ======
'====== Validate TPO Custom Fields Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "TPO CustomFields", "Create TPO CustomFields in Environment 1", null
strFieldDescName= Settings_Sync_ExternalCompanySetup_CreateTpoCustomFields("PTAC-3303",1)
Wait g_TinyWaitMedium
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

BIZ_Login_OpenAdminTool()

'====== Login to the Encompass as admin ======
Wait g_ShortWaitMedium
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_adminloginEnv1","Sync_adminloginEnv2"

'====== Select Reports in Settings Toolbar ======
Wait g_ShortWaitMedium
Biz_SyncSettings_SelectSettingsToolBarItem "External Company Setup"
Wait g_ShortWaitMedium
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "TPO Custom Fields"
Wait g_ShortWaitMedium
FRM_Logger_ReportInfoEvent "TPO Custom Fields", "Validate new created TPO Custom Fields data in environment 1", Null
Settings_Sync_ExternalCompanySetup_VerifyCustomFieldsValues "PTAC-3303",strFieldDescName,1
Wait g_TinyWaitMedium

'====== Click on Sync arrow button ======
'====== Validate FieldDataEntry Data in Environment 2 ======
GUI_SwfCheckbox_Set SwfWindow("swfname:=SettingsToolMain").SwfCheckBox("swfname:=chkSelect1","index:=1"),"ON"
Wait g_ShortWaitMedium
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Custom fields ", "Validate Synced TPO Custom Fields data in environment 2", Null
Settings_Sync_ExternalCompanySetup_VerifyCustomFieldsValues "PTAC-3303",strFieldDescName,0

BIZ_Login_SyncLogout()
