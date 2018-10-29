'@**************************************************************************************************
'@ TestStory: PTAC-1679 Persona
'@ TestCase: 
   		'PTAC-3528 Validate that the persona settings should remain intact whose settings are not yet modified while logged in as admin
   		'PTAC-3557 Validate the restore behavior of the persona settings which were already modified while logged in as admin.
   		'PTAC-3503 Verify additional persona permission"Submit for Purchase" within the Pipeline and Loans section in the TPO Connect tab
'@ Test Automation JIRA Task:  PTAC-3767 Settings_Persona_TpoConnectAndLoansTab
'@ TestData:"Global_Data","Login","admin_core2p"
'			"Setttings_CompanyUserSetup", "Persona","1679_PersonaSettings"
'			"Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser","3528_User"
'			"Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser","1533_LoanStatus"
'			"Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser","3767_AdminUser"
'			"Global_Data","Login","3767_AdminPersonaUser"
'			"Setttings_CompanyUserSetup", "Persona","3503_PersonaSettings"
'@ Pre-conditions:  (PTAC-3557)
'					Create a user.Assign the 'Loan Officer' to the User
'					(PTAC-3503)
'					Create a user.Assign the Administrator persona to the user
'@ Description:  Settings_Persona_TpoConnectAndLoansTab
	'@ TestSteps:
		'1. Login as an admin with credentials to Encompass.
		'2. Navigate to the encompass settings --> Company/ User setup --> Persona.
		'3. Create a new persona with access to all and persona type as both internal and external.
		'4. Now go to the Organization/ Users and here create a new user and assign newly created
		'	persona to that user.
		'5. Now, open the newly created user and click on the button named, "View/Edit Rights button" under persona section.
		'6. Navigate to Loan tab and also check that the user should not be able to modify any of the checkbox options 
		'	( Order Closing Docs, and Manage Alt Lenders), without selecting 'Modify this user's rights'.
		'	-Verify 'Save' option should be disabled
		'7. (PTAC-3557)
		'	Login as an admin with credentials to Encompass
		'8. Go to the Settings> Organization/ Users. Select the created User and double click on the User
		'	Select 'Loan Officer' under 'Persona' section, click on 'View/Edit Rights' button
		'9. Navigate to 'Loan' tab and by double click on check box for'Modify this User's rights'
		'	Click on 'Yes' button. Select the 'Manage Alt Lenders' and click on Save button
		'10.Again, double click on the created User from Organization/Users.
		'	Select 'Loan Officer' under 'Persona' section, click on 'View/Edit Rights' button
		'	Navigate to 'Loan' tab and by  click on check box for Modify this User's rights'Click on 'Yes' button
		'11.(PTAC-3503)
		'	Login as Administrator user persona to Encompass.Go to Encompass > Settings > Organization/Users
		'12.Under 'Enabled User' section, Select the user and double click on the user
		'13.Click on 'view/Edit rights' under person.Select TPO Connect tab
		'14.Login with the Super Administrator persona user, Add a new persona > selected "access all features" 
		'15.Go to Settings > Personas > TPO Connect tab, Verify
		'16.Go back to  Settings > Company/User Setup/ Personas.
		'17.Open any existing Personas that already have  "Access to all features" i.e Accounting
		'18.Go to  Settings > Personas > TPO Connect tab, verify
	'@ ExpectedResult: 
		'1. User should be able to login successfully.
		'2. Persona landing page should open up.
		'3. New Persona should be created successfully.
		'4. User should be created successfully with that linked persona.
		'5. Persona settings page should open with 'Modify this users rights' check box enabled and unchecked
		'6. User should not be able to modify any of the checkbox options, without selecting 'Modify this user's rights',
		'	then the 'Save' option should be disabled.
		'7. (PTAC-3557)
		'	User should be able to login successfully.
		'8. Organization/ Users screen displayed. It opens the 'User details' screen.
		'	It displayed the 'Persona Settings' screen
		'9. The 'Persona setting' window closed and display the 'User details' window
		'10.The 'Manage Alt Lenders' checkbox should be unchecked  under 'Closing Docs' automatically
		'	(which means restore the settings) and also, the 'Save' button will be disabled.
		'	Note: To update the 'Manage Alt Lenders' checkbox option to be unchecked takes few seconds in the UI
		'11.(PTAC-3503)
		'	User is able to login as Administrator user persona
		'12.opens the 'user details' screen. Opens Persona settings screen.
		'13.Under 'Pipeline and Loans', there are one new persona permission is added "Submit for Purchase" and are by default checked.
		'14.New persona is created
		'15.For newly created persona Under 'Pipeline and Loans', there are one new persona is added "Submit for Purchase" and are by default checked.
		'16.For Accounting persona, Under 'Pipeline and Loans' Section, there are one new persona is added "Submit for Purchase" and is UNCHECKED
'*************************************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3767","Script Name: Settings_Persona_TpoConnectAndLoansTab",Null

Dim objSettings,objUsersAvaliable,objUserDetails,objPersonaSettings,WshShell
Dim strPersonaName, strUserId, boolChecked, boolSubmitForPurchaseChecked

BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3528","Validate that the persona settings should "&_
"remain intact whose settings are not yet modified while logged in as admin",Null

Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objUsersAvaliable  = objSettings.SwfObject("swfname:=gvUsers")
Set objUserDetails         = objSettings.SwfWindow("swfname:=AddEditUserCEDialog")
Set objPersonaSettings = objUserDetails.SwfWindow("swfname:=PersonaSettingsMainForm")

'delete persona if existing, to make sure new persona is created for every execution
BIZ_Nav_Settings_Personas()
BIZ_Settings_Personas_DeletePersona "PersonaAuto_3528"

'Create new persona
strPersonaName = BIZ_Settings_CompanyUserSetup_CreatePersona("1679_PersonaSettings")

'refresh persona list
BIZ_Nav_Settings_OrganizationUsers()
BIZ_Nav_Settings_Personas()

'verify persona creation
FRM_VerifyTrue GUI_List_VerifyItemExists(objSettings.SwfListView("swfname:=lvPersona"),strPersonaName),"Persona Creation",_
"New Persona '"&strPersonaName &"' is created"

'delete user if existing, before creating new user
BIZ_Nav_Settings_OrganizationUsers()
BIZ_OrganizationUsers_DeleteExistingUser "userauto_3528"

'create new user and associate previously created persona "PersonaAuto_3528"
strUserId = BIZ_OrganizationUsers_CreateUser("3528_User")

FRM_Logger_ReportInfoEvent "New User created","New user "&strUserId &" is created with "&strPersonaName &" associated with user",Null

'refresh users list
BIZ_Nav_Settings_Personas()
BIZ_Nav_Settings_OrganizationUsers()

'open user details for newly created user
objSettings.SwfTreeView("swfname:=hierarchyTree").Select "Administration"
GUI_List_ClickRow objUsersAvaliable, Null,"User ID", strUserId, True, False, False, "Double"
GUI_Object_WaitTillVisibleX objUserDetails,30

'click on View/Edit Rights button
GUI_SwfButton_Click objUserDetails.SwfButton("swfname:=btnViewPersonaRights")
GUI_Object_WaitTillVisibleX objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),60

GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Loan"

'validate enabled and unchecked for 'Modify this user's rights' checkbox
GUI_Object_ValidateEnabled objPersonaSettings.SwfCheckBox("swfname:=cxbModify"),"'Modify this user's rights'"
GUI_Object_ValidateChecked objPersonaSettings.SwfCheckBox("swfname:=cxbModify"),False,"'Modify this user's rights'"
 
FRM_Logger_ReportInfoEvent "Set Order Closing Docs checkbox","Uncheck Order Closing Docs checkbox under Loan Tab",Null
GUI_TreeView_SetItemState objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight;pnlBase;.*"),_
"Order Closing Docs",0

'validate save button is disabled
GUI_Object_ValidateDisabled objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),"Save button for Persona settings"
GUI_SwfButton_Click objPersonaSettings.SwfButton("swfname:=btnClose")

'close User details window
objUserDetails.Activate
Set WshShell = CreateObject("WScript.Shell")
WshShell.SendKeys "%s"



'================================================================================================================
'SCENARIO 2 -- PTAC-3557

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3557","Validate the restore behavior"&_
"of the persona settings which were already modified while logged in as admin",Null

strUserId = "emilylo"

'If required user with Loan Officer persona not existing, create new user with Loan Officer persona
If Not GUI_List_ClickRow(objUsersAvaliable, Null, "User ID", strUserId, True, False, False, "Double") Then
	BIZ_OrganizationUsers_CreateUser "1533_LoanStatus"
End If

GUI_Object_WaitTillVisibleX objUserDetails,30

'click on View/Edit Rights button
GUI_SwfButton_Click objUserDetails.SwfButton("swfname:=btnViewPersonaRights")

'verify persona settings screen exists for emilylo after clicking on View/Edit Rights
GUI_Object_WaitTillVisibleX objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),60
GUI_Object_ValidateExists objPersonaSettings,5,"'Persona Settings' screen for user with Loan Officer persona"

'navigate to loan tab and click on Modify this user's rights checkbox 
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Loan"
GUI_SwfCheckbox_Set objPersonaSettings.SwfCheckBox("swfname:=cxbModify"),"ON"


'handle pop-up
If GUI_Object_IsExistX(objPersonaSettings.Dialog("text:=Encompass"),80) Then
	GUI_WinButton_Click objPersonaSettings.Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

'select Manage Alt Lenders checkbox in Persona Settings page
FRM_Logger_ReportInfoEvent "Set Manage Alt Lenders","Setting Manage Alt Lenders in Loan Tab",Null
GUI_TreeView_SetItemState objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight;pnlBase;.*"),_
"Manage Alt Lenders",-2

GUI_TreeView_SetItemState objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight;pnlBase;.*"),_
"Manage Alt Lenders",0


'verify save button enabled
GUI_Object_ValidateEnabled objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),"Save button after checking on 'Modify this user's rights' checkbox"

'navigating to another tab and coming back for sync issues
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Pipeline"
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Loan"

'click save
'GUI_SwfObject_Click objPersonaSettings.SwfObject("swfname:=stdIconBtnSave")
'objPersonaSettings.Activate


'close user details
FRM_Logger_ReportInfoEvent "Close User Details", "Closing user details window for "&strUserId,Null
GUI_SwfObject_Click objPersonaSettings.SwfObject("swfname:=stdIconBtnSave")
'GUI_SwfObject_Click objPersonaSettings.SwfObject("swfname:=btnClose")
objUserDetails.Activate
WshShell.SendKeys "%s"

're-open user details for emilylo
GUI_Object_WaitTillVisibleX objUsersAvaliable,15
FRM_Logger_ReportInfoEvent "ReOpen User Details","ReOpen user details window for "&strUserId,Null
GUI_List_ClickRow objUsersAvaliable, Null, "User ID", strUserId, True, False, False, "Double"

'open persona settings window 
GUI_Object_WaitTillVisibleX objUserDetails,30
GUI_SwfButton_Click objUserDetails.SwfButton("swfname:=btnViewPersonaRights")

GUI_Object_WaitTillVisibleX objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),60

'select Loan tab
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Loan"

'uncheck Modify this user's rights
GUI_SwfCheckbox_Set objPersonaSettings.SwfCheckBox("swfname:=cxbModify"),"OFF"
GUI_WinButton_Click objPersonaSettings.Dialog("text:=Encompass").WinButton("text:=&Yes")

'wait for changes to reflect. It is taking approx. one to two minutes for changes to reflect in UI


While GUI_SwfTreeView_ValidateCheckBoxItemState(objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;"&_
"PersonaTreePageBase;pnlExDocs;pnlExRight;pnlBase;.*"),"Manage Alt Lenders") And counter<=20
	Wait g_TinyWaitLarge
	counter=counter+1
Wend

'verify Manage Alt Lenders checkbox is changed to UnChecked state
boolChecked=GUI_SwfTreeView_ValidateCheckBoxItemState(objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;"&_
"gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight;pnlBase;.*"),"Manage Alt Lenders")
FRM_VerifyFalse boolChecked,"'Manage Alt Lenders' UnChecked","Manage Alt Lender checkbox is set back to previous state"

'validate save button is disabled
GUI_Object_ValidateDisabled objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),"Save button for Persona settings"

GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Pipeline"
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"Loan"

If GUI_Object_IsExist(objPersonaSettings.SwfButton("swfname:=btnClose")) Then
	GUI_SwfButton_Click objPersonaSettings.SwfButton("swfname:=btnClose")
End If

objUserDetails.Activate
'If(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog").SwfButton("swfname:=okBtn").Exist)Then
'	SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog").SwfButton("swfname:=okBtn").Click
'End If
'GUI_Object_WaitPropertyX objUserDetails,"visible",False,140

WshShell.SendKeys "%s"


'=================================================================================================================
'SCENARIO 3 -- PTAC-3503

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3503","Verify additional persona permission "&_
"Submit for Purchase within the Pipeline and Loans section in the TPO Connect tab",Null

FRM_Logger_ReportInfoEvent "Verify Pre-requisite user exists","Verify required user with Administrator persona exists",Null

'pre-requisite user with Administrator persona should exists
strUserId = "useradmin_3503"

'if pre-requisite user doesn't exist create new user with Administrator persona
If Not GUI_List_ClickRow(objUsersAvaliable, Null, "User ID", strUserId, True, False, False, "Single") Then
	BIZ_OrganizationUsers_CreateUser "3767_AdminUser"
End If

'logout
BIZ_Nav_Settings_Close()
BIZ_Login_UserLogout()

'login with useradmin_3503 which has Administrator persona 
BIZ_Login_UserLogin "3767_AdminPersonaUser"



'open user details for useradmin_3503
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"
FRM_Logger_ReportInfoEvent "Open User Details","Opening user details for "&strUserId,Null
GUI_List_ClickRow objUsersAvaliable, Null,"User ID", strUserId, True, False, False, "Double"

'verify user details opened
GUI_Object_WaitTillVisibleX objUserDetails,30
GUI_Object_ValidateVisible objUserDetails,True,"User Details window for "&strUserId

'click on View/Edit Rights button, validate Persona Settings screen opened
GUI_SwfButton_Click objUserDetails.SwfButton("swfname:=btnViewPersonaRights")
GUI_Object_WaitTillVisibleX objPersonaSettings.SwfObject("swfname:=stdIconBtnSave"),60
GUI_Object_ValidateVisible objPersonaSettings,True, "'Persona settings' window for "&strUserId

'select TPO connect tab
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"TPO Connect"

'validate Submit for Purchase is checked by default
boolSubmitForPurchaseChecked=GUI_SwfTreeView_ValidateCheckBoxItemState(objPersonaSettings.SwfTreeView("swfname path:=treeViewTabs;"&_
"gcTreeView;TPOAdministrationPage;panelTPOSiteSettings;TPOAdminPage;tabPageTPOAdministration;.*"),"Submit For Purchase")

FRM_VerifyTrue boolSubmitForPurchaseChecked,"New Persona permission 'Submit For Purchase'",_
"Submit For Purchase is checked by default for Administrator persona"

'close persona settings window
FRM_Logger_ReportInfoEvent "Close windows","Close Persona Settings and User Details windows for "&strUserId,Null
GUI_SwfTab_Click objPersonaSettings.SwfTab("swfname:=tabControl1"),"External Settings"
GUI_SwfButton_Click objPersonaSettings.SwfButton("swfname:=btnClose")

'close user details window
objUserDetails.Activate
WshShell.SendKeys "%s"

'handle pop-up. You are trying to change your own information
GUI_WinButton_Click objSettings.Dialog("text:=Encompass").WinButton("text:=OK")

BIZ_Nav_Settings_Close()
BIZ_Login_UserLogout()

'login with user which has Super Administrator persona
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_Settings_Personas()

'delete existing persona with same name
BIZ_Settings_Personas_DeletePersona "PersonaAuto_3503"

'create persona
strPersonaName = BIZ_Settings_CompanyUserSetup_CreatePersona("3503_PersonaSettings")

'validate persona creation
BIZ_Nav_Settings_OrganizationUsers()
BIZ_Nav_Settings_Personas()
FRM_VerifyTrue GUI_List_VerifyItemExists(objSettings.SwfListView("swfname:=lvPersona"),strPersonaName),"Persona Creation",_
"New Persona '"&strPersonaName &"' is created"

'open persona details for PersonaAuto_3503
BIZ_Settings_Personas_SelectPersona strPersonaName

GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer")._
SwfObject("text:=.*PersonaAuto_3503.*"),60

GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "TPO Connect"

boolSubmitForPurchaseChecked=GUI_SwfTreeView_ValidateCheckBoxItemState(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;"&_
"TPOAdministrationPage;panelTPOSiteSettings;TPOAdminPage;tabPageTPOAdministration;tabControl1;gcPersona;PersonaSettingsMainForm;panelPersonaSettings;"&_
"PersonaSetupForm;contentPanel;SetUpDialog;pnlRight;pnlContent;SetUpContainer"),"Submit For Purchase")

'validate Submit for Purchase is checked by default
FRM_VerifyTrue boolSubmitForPurchaseChecked,"New Persona permission 'Submit For Purchase'",_
"Submit For Purchase is checked by default for "&strPersonaName&" persona"

'select Accounting persona 
BIZ_Settings_Personas_SelectPersona "Accounting"

GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer")._
SwfObject("text:=.*Accounting.*"),60

GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "TPO Connect"

'verify 'Submit for Purchase' option under TPO Connect tab in unchecked by default
boolSubmitForPurchaseChecked=GUI_SwfTreeView_ValidateCheckBoxItemState(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;"&_
"TPOAdministrationPage;panelTPOSiteSettings;TPOAdminPage;tabPageTPOAdministration;tabControl1;gcPersona;PersonaSettingsMainForm;panelPersonaSettings;"&_
"PersonaSetupForm;contentPanel;SetUpDialog;pnlRight;pnlContent;SetUpContainer"),"Submit For Purchase")

FRM_VerifyFalse boolSubmitForPurchaseChecked,"New Persona permission 'Submit For Purchase'",_
"Submit For Purchase is unchecked by default for existing 'Accounting' persona with Internal Type"

BIZ_Nav_Settings_Close()
BIZ_Login_UserLogout()

'dispose objects
Set objSettings = Nothing
Set objUsersAvaliable = Nothing
Set objUserDetails = Nothing
Set objPersonaSettings= Nothing
Set WshShell= Nothing

FRM_RT_TeardownTest(null)
