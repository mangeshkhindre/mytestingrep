'@**************************************************************************************************
'@ TestStory: PTAC-3579 Smoke Test Suite
'@ TestCase: 
   '1 PTAC-3516 - The objective of test case is to verify AdminTools Login
   '2 PTAC-3517 - The objective of test case is to verify Setting Sync-Tool login
   '3 PTAC-3518 - The objective of the test case is to verify Reporting Database Login
   '4 PTAC-3519 - The objective of the test case is to verify Form Builder Login
'@ Test Automation JIRA Task: PTAC-3580 SmokeTestSuite_VerifyAdminTools
'@ TestData: 
   '1 Global_Data, Login and AdminTools_Login
   '2 Global_Data, Login and AdminTools_Login1
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Launch the Admin tool Path Open the Encompass path:C:\SmartClientCache\Apps\Ellie Mae\Encompass
   '2 Select "AdminTools" Icon and double click the application
   '3 Click on <Yes> button
   '4 Enter SmartClient Server and SmartClient ID: Info and click on Login
   '5 Click on <Settings Sync Tool> link
   '6 Enter SmartClient Server and SmartClient ID: Info and click on Login
   '7 Enter user Id & Password in Environment1 & Environment2 and click on Login button
   '8 Enter SmartClient Server and SmartClient ID: Info and click on Login
   '9 Click on <Reporting Database> link
   '10 Enter user Id & Password in Environments and click on Login button
   '11 Launch the Admin tool Path 
		'Open the Encompass path:
		'C:\SmartClientCache\Apps\Ellie Mae\Encompass
	'12 Select "FormBuilder" Icon and double click the application 
	'13 Enter SmartClient Server and SmartClient ID: Info and click on Login
	'14 Enter user Id & Password in Environment and click on Login button
	'15 Logout from the application File --> Exit button
'@ ExpectedResult:
   '1 The Encompass path should be open
   '2 "User Account Control" Popup window should display
   '3 It should open AdminTools Popup window with SmartClient Server and SmartClient ID: 
   '4 It should Launch Encompass Admin Tools window 
   '5 It should open SettingsTool Popup window with SmartClient Server and SmartClient ID:
   '6 It should Launch Encompass Settings Sync Tool Log In window
   '7 Settings Sync tool Home page should display with two environment details
   '8 It should Launch Encompass Admin Tools window 
   '9 It should open Encompass Admin Tools Log In screen
   '10 Report Database home page should display 
   '11 The Encompass path should be open
   '12 It should open FormBuilder Popup window with SmartClient Server and SmartClient ID: 
   '13 It should Launch Encompass Input Form Builder Log In
   '14 It should display FormBuilder  home page
   '15 The application should be closed
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3580","Script Name: SmokeTestSuite_VerifyAdminTools", Null

'======= The objective of test case is to verify AdminTools Logins =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3516","The objective of test case is to verify AdminTools Login", Null
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Sync Tool"

If GUI_Object_IsExistX(SwfWindow("swfname:= AdminTools"),160) Then
   FRM_Logger_ReportPassEvent "Launch AdminTools","AdminTools Window is Launched", Null
Else
   FRM_Logger_ReportFailEvent "Launch AdminTools","AdminTools Window is not Launched", Null
End If

'======= The objective of test case is to verify Setting Sync-Tool login =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3517","The objective of test case is to verify Setting Sync-Tool login", Null
BIZ_Login_SyncLogin "AdminTools_Login", "AdminTools_Login1"

If GUI_Object_IsExistX(SwfWindow("swfname:= SettingsToolMain"),160) Then
   FRM_Logger_ReportPassEvent "SyncLogin","Logged in as Sync Tool", Null
Else
   FRM_Logger_ReportFailEvent "SyncLogin","Unable to Logged in as Sync Tool", Null
End If
	
BIZ_Login_SyncLogout()

'======= The objective of the test case is to verify Reporting Database Login =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3518","The objective of the test case is to verify Reporting Database Login", Null
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Reporting Database"
'====== Login to the Encompass ======
BIZ_AdminTools_Login "AdminTools_Login"

If GUI_Object_IsExistX(Dialog("text:=Encompass"),160) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= LoanXDBNMLSReportFieldDialog").SwfButton("swfname:=btnNo"),80) Then
	GUI_SwfButton_Click SwfWindow("swfname:= LoanXDBNMLSReportFieldDialog").SwfButton("swfname:=btnNo")
End If

If GUI_Object_IsExistX(Dialog("text:=Encompass"),80) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= LoanXDBManager"),80) Then
   FRM_Logger_ReportPassEvent "Reporting Database Login","Logged in as Reporting Database", Null
Else
   FRM_Logger_ReportFailEvent "Reporting Database Login","Unable to Logged in as Reporting Database", Null
End If

'Francesca
'======= The objective of the test case is to verify Reporting Database Login =======
FRM_Logger_ReportStepEvent "Start Test Case: Settings Manager","The objective of the test case is to verify Settings Manger screen", Null
'BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Manager"
'====== Login to the Encompass ======
'BIZ_AdminTools_Login "AdminTools_Login"

If GUI_Object_IsExistX(Dialog("text:=Encompass"),160) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= ServerSettingsManager").SwfComboBox("swfname:=cboCategory"),80) Then
   FRM_Logger_ReportPassEvent "Server Settings Manager Login","Logged in to Server Settings Manager", Null
   GUI_SwfButton_Click SwfWindow("swfname:= ServerSettingsManager").SwfButton("swfname:=btnCancel") 
Else
   FRM_Logger_ReportFailEvent "Server Settings Manager Login","Unable to Log in to Server Settings Manager", Null
End If


FRM_Logger_ReportStepEvent "Start Test Case: Version Manager","The objective of the test case is to verify Version Manger screen", Null
'BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Version Manager"
'====== Login to the Encompass ======
'BIZ_AdminTools_Login "AdminTools_Login"

If GUI_Object_IsExistX(Dialog("text:=Encompass"),160) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= VersionManagerSC").SwfObject("swfname:=grpHotfixes"),80) Then
   FRM_Logger_ReportPassEvent "Version Manager Login","Logged in to Version Manager", Null
   GUI_SwfButton_Click SwfWindow("swfname:= VersionManagerSC").SwfButton("swfname:=btnClose") 
Else
   FRM_Logger_ReportFailEvent "Version Manager Login","Unable to Log in to Version Manager", Null
End If

FRM_Logger_ReportStepEvent "Start Test Case: Online User Manager","The objective of the test case is to verify Online User Manger screen", Null
'BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Online User Manager"
'====== Login to the Encompass ======
'BIZ_AdminTools_Login "AdminTools_Login"

If GUI_Object_IsExistX(Dialog("text:=Encompass"),160) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= SystemManager").SwfButton("swfname:=emailBtn"),80) Then
   FRM_Logger_ReportPassEvent "Online User Manager Login","Logged in to Online User Manager", Null
   GUI_SwfButton_Click SwfWindow("swfname:= SystemManager").SwfButton("swfname:=closeBtn") 
Else
   FRM_Logger_ReportFailEvent "Online User Manager Login","Unable to Log in to Online User Manager", Null
End If

'End Francesca
BIZ_AminTools_Close()

'======= The objective of the test case is to verify Form Builder Login =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3519","The objective of the test case is to verify Form Builder Login", Null
BIZ_InputFormBuilder_Launch()
BIZ_InputFormBuilder_Login "AdminTools_Login"

If GUI_Object_IsExistX(SwfWindow("swfname:= HostWin"),160) Then
   FRM_Logger_ReportPassEvent "InputFormBuilder Login","Logged in as InputFormBuilder", Null
Else
   FRM_Logger_ReportFailEvent "InputFormBuilder Login","Unable to Logged in as InputFormBuilder", Null
End If

BIZ_InputFormBuilder_Close()
FRM_RT_TearDownTest(Null) 
