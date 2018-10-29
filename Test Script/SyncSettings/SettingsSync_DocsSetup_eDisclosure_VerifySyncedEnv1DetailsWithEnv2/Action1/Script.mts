'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase : PTAC-3483 The objective of test case is to verify synced 'eDisclosure Packages' in Environment 1 should match with Environment 2
'@ Test Automation JIRA Task: PTAC-3783 SettingsSync_DocsSetup_eDisclosure_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Setttings_eDisclosurePackages, SetData, SettingSync_eDisc
'@ Pre-conditions: Login into Environment1 encompass.
'@ Description: The objective of test case is to verify synced 'eDisclosure Packages' in Environment 1 should match with Environment 2
'@ TestSteps:
	'01 Login into Environment1 encompass. 
    '02 Select Settings-> Docs Setup -> eDisclosure packages
	'03 Select Banker Retail tab and select the data mentioned in test data column. 
	'04 Select Banker-Wholesale tab and select the data mentioned in test data column. 
	'05 Select Broker tab and select the data mentioned in test data column. 
	'06 Select Correspondent tab and select the data mentioned in test data column. 
	'07 Click on save icon
	'08 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
        'Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
	'09 Select Settings-> Docs Setup -> eDisclosure packages
	'10 Select Banker-Retail tab in Environment1 and click sync to arrow button.
	'11 Verify that the Banker-Retail data in Environment 2 should match with Environment1
	'12 Verify that Fee data is not getting synced.
	'13 Select Banker-Wholesale tab in Environment1 and click sync to arrow button.
	'14 Verify that the Banker-Wholesale data in Environment 2 should match with Environment1
	'15 Select Broker tab in Environment1 and click sync to arrow button.
	'16 Verify that the Broker data in Environment 2 should match with Environment1
	'17 Select Correspondent tab in Environment1 and click sync to arrow button.
	'18 Verify that the Correspondent data in Environment 2 should match with Environment1
	'19 Login to Encompass in Env1 and Env2 and revert the settings back to default
'@ ExpectedResult:
	'01 Encompass should able to login.
    '02 eDisclosure Packages tab should open	
	'03 Data should be entered
	'04 Data should be entered
	'05 Data should be entered
	'06 Data should be entered
	'07 Data should be saved.
	'08 Settings Sync tool should be displayed with two environment details.
	'09 eDisclosure Packages module opens.
	'10 Only Banker-Retail tab data should be synced in Environment2.
	'11 Banker-Retail data in Environment 2 should match with Environment1
	'12 Fee data should not get synced.
	'13 Only Banker-Wholesale tab data should be synced in Environment2.
	'14 Banker-Wholesale data in Environment 2 should match with Environment1
	'15 Only Broker tab data should be synced in Environment2.
	'16 Broker data in Environment 2 should match with Environment1
	'17 Only Correspondent tab data should be synced in Environment2.
	'18 Correspondent data in Environment 2 should match with Environment1
	'19 All the values should set to default settings for all the tabs such as Banker- Retail, Banker-Wholesale, Broker, Correspondent
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3783", "Script Name - SettingsSync_DocsSetup_eDisclosure_VerifySyncedEnv1DetailsWithEnv2", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"
		
'====== Go to Settings/'Docs Setup'/eDisclosure Packages ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Docs Setup", "eDisclosure Packages"
Wait g_ShortWaitMedium

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3483", "The objective of test case is to verify synced 'eDisclosure Packages' in Environment 1 should match with Environment 2", Null
'====== Set data in Banker - Retail Tab ======
'====== Set data in Banker - Wholesale Tab ======
'====== Set data in Broker Tab ======
'====== Set data in Correspondent Tab ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetData", "Set data in Banker - Retail Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetData "SettingSync_eDisc", "Banker - Retail"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetData", "Set data in Banker - Wholesale Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetData "SettingSync_eDisc", "Banker - Wholesale"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetData", "Set data in Broker Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetData "SettingSync_eDisc", "Broker"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetData", "Set data in Correspondent Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetData "SettingSync_eDisc", "Correspondent"

'====== Close the Settings window ======
'====== To logout from Encompass ======
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout() 

'====== Open th admin tool ======
'====== Login to the Encompass as admin ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"
BIZ_Login_SyncLogin "Sync_Admin_Login", "Sync_Admin_Login1"
Wait g_LongWaitLarge

'====== Select Docs Setup in Settings Toolbar ======
Biz_SyncSettings_SelectSettingsToolBarItem "Docs Setup"

'====== Select eDisclosure Packages Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "eDisclosure Packages"
Wait g_ShortWaitMedium

'====== Validate data in Banker - Retail Tab ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Banker - Retail Tab in Setting Sync Tool in Environment 1", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabPackages","index:=1"), "Banker - Retail"
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 1
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Banker - Retail Tab in Setting Sync Tool in Environment 2", Null
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 0

'====== Validate data in Banker - Wholesale Tab ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Banker - Wholesale Tab in Setting Sync Tool in Environment 1", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabPackages","index:=1"), "Banker - Wholesale"
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 1
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Banker - Wholesale Tab in Setting Sync Tool in Environment 2", Null
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 0

'====== Validate data in Broker Tab ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Broker Tab in Setting Sync Tool in Environment 1", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabPackages","index:=1"), "Broker"
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 1
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Broker Tab in Setting Sync Tool in Environment 2", Null
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 0

'====== Validate data in Correspondent Tab ======
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Correspondent Tab in Setting Sync Tool in Environment 1", Null
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabPackages","index:=1"), "Correspondent"
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 1
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_ValidateData", "Validate data in Correspondent Tab in Setting Sync Tool in Environment 2", Null
Settings_Sync_DocsSetup_eDisclosure_ValidateData "SettingSync_eDisc", 0

'====== Logout from the application ======
BIZ_Login_SyncLogout()

FRM_Logger_ReportInfoEvent "Revert the settings back to default", "Revert the settings back to default in Environment 1", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login"
		
'====== Go to Settings/'Docs Setup'/eDisclosure Packages ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Docs Setup", "eDisclosure Packages"
Wait g_ShortWaitMedium

FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Banker - Retail Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Banker - Retail"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Banker - Wholesale Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Banker - Wholesale"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Broker Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Broker"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Correspondent Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Correspondent"

'====== Close the Settings window ======
'====== To logout from Encompass ======
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout() 

FRM_Logger_ReportInfoEvent "Revert the settings back to default", "Revert the settings back to default in Environment 2", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "Sync_Admin_Login1"
		
'====== Go to Settings/'Docs Setup'/eDisclosure Packages ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Docs Setup", "eDisclosure Packages"
Wait g_ShortWaitMedium

FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Banker - Retail Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Banker - Retail"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Banker - Wholesale Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Banker - Wholesale"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Broker Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Broker"
FRM_Logger_ReportInfoEvent "Settings_Sync_DocsSetup_eDisclosure_SetRevertData", "Revert data in Correspondent Tab in Encompass", Null
Settings_Sync_DocsSetup_eDisclosure_SetRevertData "SettingSync_Revert", "Correspondent"

'====== Close the Settings window ======
'====== To logout from Encompass ======
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout() 
FRM_RT_TearDownTest(Null)