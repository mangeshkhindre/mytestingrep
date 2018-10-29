'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: 
   '1 PTAC-3055 The objective of test case is to verify synced 'Secondary Lock Fields' data in Environment 2 should match with Environment 1
   '2 PTAC-3056 The objective of test case is to verify synced 'Lock Request Additional Fields' data in Environment 2 should match with Environment 1
   '3 PTAC-3057 The objective of test case is to verify synced 'Investor Templates' data in Environment 2 should match with Environment 1
   '4 PTAC-3058 The objective of test case is to verify synced 'Adjustment Templates' data in Environment 2 should match with Environment 1
   '5 PTAC-3059 The objective of test case is to verify synced 'SRP Templates' data in Environment 2 should match with Environment 1
   '6 PTAC-3060 The objective of test case is to verify synced 'Funding Templates' data in Environment 2 should match with Environment 1
   '7 PTAC-3061 The objective of test case is to verify synced 'Purchase Advice Form' data in Environment 2 should match with Environment 1
   '8 PTAC-3062 The objective of test case is to verify synced 'Servicing' data in Environment 2 should match with Environment 1
   '9 PTAC-3063 The objective of test case is to verify synced 'Trade Management Setup' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 SecondaryMarket, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps: Updated in Action Level
'@ ExpectedResult: Updated in Action Level
'***************************************************************************************************
FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3344","Script Name - SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2", Null

'======Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"

FRM_Logger_ReportInfoEvent "PTAC-3055","Data Creation", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Secondary Setup", "Secondary Lock Fields"
Wait g_TinyWaitMedium

strBasePriceName     = SettingsSync_SecondarySetup_CreateSecondaryLockFields("Secondary_Lock_Fields", "Base Price")
strProfitabilityName = SettingsSync_SecondarySetup_CreateSecondaryLockFields("Secondary_Lock_Fields", "Profitability")
strLockTypeName      = SettingsSync_SecondarySetup_CreateSecondaryLockFields("Secondary_Lock_Fields", "Lock Type")
strBaseRateName      = SettingsSync_SecondarySetup_CreateSecondaryLockFields("Secondary_Lock_Fields", "Base Rate")
strBaseARMMarginName = SettingsSync_SecondarySetup_CreateSecondaryLockFields("Secondary_Lock_Fields", "Base ARM Margin")
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "PTAC-3056","Data Creation", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Lock Request Additional Fields"
Wait g_TinyWaitMedium
strLockFormName      = SettingsSync_SecondarySetup_CreateLockRequestAdditionalFields("Lock_Request_Additional_Fields", "Lock Request Form")
Wait g_TinyWaitMedium
strLockSnapShotName  = SettingsSync_SecondarySetup_CreateLockRequestAdditionalFields("Lock_Request_Additional_Fields", "Loan Snapshot")
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "PTAC-3062","Data Creation", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Servicing"
SettingsSync_SecondarySetup_CreateServicing "Servicing", "Mortgage Statement Print Form"
Wait g_TinyWaitMedium

FRM_Logger_ReportInfoEvent "PTAC-3063","Data Creation", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Trade Management Setup"
SettingsSync_SecondarySetup_CreateTradeManagementSetup "Trade_Management_Setup"
Wait g_TinyWaitMedium
BIZ_Login_UserLogout()

'====== Open the admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"

'====== Select Reports in Settings Toolbar ======
Wait g_TinyWaitMedium
Biz_SyncSettings_SelectSettingsToolBarItem "Secondary Setup"

'The objective of test case is to verify synced 'Secondary Lock Fields' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_SecondaryLockFields_001", oneIteration

'The objective of test case is to verify synced 'Lock Request Additional Fields' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_LockRequestAdditionalFields_002", oneIteration

'The objective of test case is to verify synced 'Investor Templates' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_InvestorTemplates_003", oneIteration

'The objective of test case is to verify synced 'Adjustment Templates' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_AdjustmentTemplates_004", oneIteration

'The objective of test case is to verify synced 'SRP Templates' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_SRPTemplates_005", oneIteration

'The objective of test case is to verify synced 'Funding Templates' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_FundingTemplates_006", oneIteration

'The objective of test case is to verify synced 'Purchase Advice Form' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_PurchaseAdviceForm_007", oneIteration

'The objective of test case is to verify synced 'Servicing' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_Servicing_008", oneIteration

'The objective of test case is to verify synced 'Trade Management Setup' data in Environment 2 should match with Environment 1
RunAction "SettingsSync_SecondarySetUp_TradeManagementSetup_009", oneIteration

'====== Logout from the application ======
BIZ_Login_SyncLogout()

FRM_Logger_ReportInfoEvent "PTAC-3055","Data Deletion in Env1", Null
BIZ_Login_UserLogin "Sync_Admin_Login"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Secondary Setup", "Secondary Lock Fields"

SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base Price"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Profitability"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Lock Type"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base Rate"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base ARM Margin"

FRM_Logger_ReportInfoEvent "PTAC-3062","Data Deletion in Env1", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Servicing"
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_DeleteServicing "Servicing"

FRM_Logger_ReportInfoEvent "PTAC-3063","Data Deletion in Env1", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Trade Management Setup"
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeleteTradeManagementSetup "Trade_Management_Setup"
BIZ_Login_UserLogout()

BIZ_Login_UserLogin "Sync_Admin_Login1"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
FRM_Logger_ReportInfoEvent "PTAC-3055","Data Deletion in Env2", Null

BIZ_Nav_HierarchyTree "Secondary Setup", "Secondary Lock Fields"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base Price"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Profitability"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Lock Type"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base Rate"
SettingsSync_SecondarySetup_DeleteSecondaryLockFields "Secondary_Lock_Fields", "Base ARM Margin"

FRM_Logger_ReportInfoEvent "PTAC-3062","Data Deletion in Env2", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Servicing"
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_DeleteServicing "Servicing"

FRM_Logger_ReportInfoEvent "PTAC-3063","Data Deletion in Env2", Null
BIZ_Nav_HierarchyTree "Secondary Setup", "Trade Management Setup"
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeleteTradeManagementSetup "Trade_Management_Setup"
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)        	
