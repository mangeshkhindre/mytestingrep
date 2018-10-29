'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3197 The objective of test case is to verify synced Business Contacts-Custom Letters(2nd tab) in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3439 SettingsSync_Contacts_VerifySyncedEnv1DetailsWithEnv2
'@ TestData: 
	'1 Reports, ReportOperation, Settings_Sync_ReportsValidation
  	'2 Global_Data, Login, Sync_Admin_Login
  	'3 Global_Data, Login, Sync_Admin_Login1
'@ Description: The objective of test case is to verify synced 'Report' data in Environment 2 should match with Environment 1
'@ TestSteps:
   '1 Login into Environment1 Encompass
   '2 In the Environment1, Select Settings-> Contacts -> Borrower Contacts-Custom Letters
   '3Click on new icon in Environment 1 and enter custom letter name
   '4 Double-Click on the letter.
   '5 Enter the data and click insert button
   '6 Click on Save icon.
   '7 Select created Letter in test data column and click Sync to arrow button.
   '8 Verify that the synced Letter data in Environment 2 should match with Environment1
   '9 Delete the created record in Encompass
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Business Contact should open 
   '3 Letter should be created.
   '4 Insert Fields pop up opens
   '5 Data should be inserted in word doc.
   '6 Data should be saved.
   '7 Letter should be synced to Environment2.
   '8 Synced Letter data in Environment 2 should match with Environment1
   '9 The record to be deleted
'***************************************************************************************************
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3197","The objective of test case is to verify synced User Group data in Environment 2 should match with Environment 1", Null

'================Borrower Contacts - Customm Letters tab selction===============
GUI_SwfTab_Click SwfWindow("Swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain","index:=1"), "Borrower Contacts - Custom Letters"
Wait g_ShortWaitMedium

strCompName = SyncSettings_Contacts_CreateCustomLettersPersonas("SyncSettings_BorrContact", "Borrower Contacts - Custom Letters", 1)

Set objSettings   = SwfWindow("Swfname:=SettingsToolMain")
Set objCustomPage = objSettings.SwfObject("swfname:=gvDirectory","index:=1")
	
GUI_List_ClickRow objCustomPage, objCustomPage.SwfScrollBar("swfname:=vPanelScrollBar"), "Name", strCompName, True, False, False, "Single"

Set objCustomPage = Nothing

BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "SyncSettings_Contacts_ValidationCustomLettersPersonas", "Validate Borrower Letter '"&strCompName&"' is synced to Env2", null
SyncSettings_Contacts_ValidationCustomLettersPersonas strCompName, 0

Set objCustomPage = objSettings.SwfObject("swfname:=gvDirectory","index:=0")
GUI_SwfObject_Click objCustomPage
GUI_List_ClickRow objCustomPage, objCustomPage.SwfScrollBar("swfname:=vPanelScrollBar"), "Name", strCompName, True, False, False, "Double"
Wait g_LongWaitSmall
Settings_Sync_Contacts_SaveDocument strCompName&".docx"
GUI_SwfButton_Click SwfWindow("swfname:=ContactFieldDialog").SwfButton("swfname:=btnClose")
Wait g_LongWaitSmall
Settings_Sync_Contacts_ValidateDocumentData strCompName&".docx", "SyncSettings_BorrContact"
Settings_Sync_Contacts_DeleteDocument strCompName&".docx"

Set objCustomPage 	= Nothing
GUI_SwfObject_Click objSettings.SwfObject("swfname:=gvDirectory","index:=1")
'================Business Contacts - Customm Letters Deletion===============
FRM_Logger_ReportInfoEvent "Deletion Of Borrower Letter", "Start Deletion Of Borrower Letter As Env1", null
SyncSettings_Contacts_DeleteCustomLettersPersonas strCompName, 1

'================Business Contacts - Customm Letters Deletion===============
FRM_Logger_ReportInfoEvent "Deletion Of Borrower Letter", "Start Deletion Of Borrower Letter As Env2", null
SyncSettings_Contacts_DeleteCustomLettersPersonas strCompName, 0

Set objSettings	 	= Nothing
