'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3061 The objective of test case is to verify synced 'Purchase Advice Form' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3344 SettingsSync_SecondarySetup_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '  Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
   '2 Select Settings->Secondary Setup-> Purchase Advice Form
   '3 Click on New button present in Payouts Dropdown list in Environment
   '4 Enter name and click Ok buttonClick on New button in Environment 1
   '5 Click on New button present in Purchase Advice Template in Environment 1
   '6 Double-Click on template and Enter the data"Enter data as per the Test Data column
   '6 Save the data
   '7 Select Payout in Environment 1 and click sync to arrow button
   '8 Verify that the Payout data in Environment 2 should match with Environment1
   '9 Select template in Environment 1 and click sync to arrow button
   '10 Verify that the Template data in Environment 2 should match with Environment1
   '11 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Display the form
   '3 Payout options popup opens
   '4 Data should be entered and displayed in the grid
   '5 Template created
   '6 Data should be entered and displayed in the grid
   '6 Data should be saved and displayed in the grid.
   '7 Payout should be synced to Environment2.
   '8 Payout data in Environment 2 should match with Environment1
   '9 Template should be synced to Environment2.
   '10 Template data in Environment 2 should match with Environment1
   '11 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3061","The objective of test case is to verify synced 'Purchase Advice Form' data in Environment 2 should match with Environment 1", Null

Dim objSetUp
Set objSetUp = SwfWindow("Swfname:=SettingsToolMain")

FRM_Logger_ReportInfoEvent "Navigate to Funding Templates","Start Navigate to Funding Templates", Null
GUI_swfTab_Click objSetUp.SwfTab("swfname:=tabCtrlMain"), "Purchase Advice Form"

FRM_Logger_ReportInfoEvent "Purchase Advice Form","urchase Advice Form Creation Started", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_CreatePayOutAndPurchaseAdviceForm "Purchase_Advice_Form", "Purchase Advice Form", 1

FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Template Form","Purchase Advice Template Form Validation Started for Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationPurchaseAdviceForm "Purchase_Advice_Form", "Purchase Advice Form", 1

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Template Form","Purchase Advice Template Form Validation Started for Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_ValidationPurchaseAdviceForm "Purchase_Advice_Form", "Purchase Advice Form", 0

FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Template Form","Purchase Advice Template Form Deletion Started for Env1", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeletionPurchaseAdviceForm "Purchase_Advice_Form", "Purchase Advice Form", 1

FRM_Logger_ReportInfoEvent "Deletion Purchase Advice Template Form","Purchase Advice Template Form Deletion Started for Env2", Null
Wait g_TinyWaitMedium
SettingsSync_SecondarySetup_AdminTools_DeletionPurchaseAdviceForm "Purchase_Advice_Form", "Purchase Advice Form", 0

'FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Form","Purchase Advice Form Validation Started for Env1", Null
'SettingsSync_SecondarySetup_AdminTools_ValidationPayOut "Purchase_Advice_Form", "Purchase Advice Form", 1

'FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Form","Purchase Advice Form Validation Started for Env1", Null
'SettingsSync_SecondarySetup_AdminTools_ValidationPayOut "Purchase_Advice_Form", "Purchase Advice Form", 0

'FRM_Logger_ReportInfoEvent "Valdiation Purchase Advice Form","Purchase Advice Form Validation Started for Env1", Null
'SettingsSync_SecondarySetup_AdminTools_ValidationPayOut "Purchase_Advice_Form", "Purchase Advice Form", 1
'
'FRM_Logger_ReportInfoEvent "Deletion Purchase Advice Form","Purchase Advice Form Validation Deletion for Env1", Null
'SettingsSync_SecondarySetup_AdminTools_DeletionPayOut "Purchase_Advice_Form", "Purchase Advice Form", 1
'
'

Set objSetUp = Nothing
