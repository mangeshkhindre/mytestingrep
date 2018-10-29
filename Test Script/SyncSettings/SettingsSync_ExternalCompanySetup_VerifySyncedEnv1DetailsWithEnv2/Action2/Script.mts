'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3302 -  Verify synced TPO Fees data in Environment 2 should match with Environment1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3434 SettingsSync_ExternalCompanySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:
   '1 Settings_CompanySettings,TPOFees and PTAC-3302
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select External Company Setup
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 In Enviro1, Select Settings->External Company Setup-> TPO Fees
   '3 In Environment1, Click on New icon and enter the data
   '  Name: Star TPO Fees
   '  Fee Amount: 100
   '  Description: TPO Fees desc
   '4 Click on Save icon
   '5 Select TPO Fee in Environment 1 and click sync to arrow button
   '6 Click on Yes button
   '7 Verify that the synced TPO Fee data in Environment 2 should match with Environment1
   '8 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 The TPO Fees window should open
   '3 The data should be entered
   '4 Group should be saved.
   '5 Settings Synchronization popup opens.
   '6 TPO Fees should be synced to Environment2.
   '7 Synced TPO Fee data in Environment 2 should match with Environment1
   '8 Record should be deleted in both environments
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3302","Verify synced TPO Fees data in Environment 2 should match with Environment1", Null

'====== Create TPO Fee in Environment 1 ======
'====== Validate TPO Fee Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "TPO Fee", "create TPO Fee in Environment 1", null
strTpoFeeName= Settings_Sync_ExternalCompanySetup_CreateTPOFee("PTAC-3302",1)
FRM_Logger_ReportInfoEvent "TPO Fee", "Validate new created '"&strTpoFeeName&"' data in environment 1", Null
Wait g_TinyWaitMedium
Settings_Sync_ExternalCompanySetup_TPOFees_VerifyTPOFeeValues "PTAC-3302",strTpoFeeName,1

'====== Click on Sync arrow button ======
'====== Validate TPO Fee Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "TPOFeeValues ", "Validate Synced TPOFeeValues '"&strTpoFeeName&"' data in environment 2", Null
Settings_Sync_ExternalCompanySetup_TPOFees_VerifyTPOFeeValues "PTAC-3302",strTpoFeeName,0
Wait g_TinyWaitMedium

'====== Delete the TPO Fee in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the TPO Fee data in environment 1", Null
Settings_Sync_ExternalCompanySetup_DeleteTPOFees strTpoFeeName,1
Wait g_TinyWaitMedium

'====== Delete the TPO Fee in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the TPO Fee data in environment 2", Null
Settings_Sync_ExternalCompanySetup_DeleteTPOFees strTpoFeeName,0
Wait g_TinyWaitMedium

BIZ_Login_SyncLogout() @@ hightlight id_;_65812_;_script infofile_;_ZIP::ssf3.xml_;_
