'@**************************************************************************************************
'@ TestStory: PTAC-3731 LO Connect
'@ TestCase: 
   '1 PTAC-2933 - Verify mobile settings are added for Encompass Broker
'@ Test Automation JIRA Task: PTAC-3749 LOConnect_VerifyMobileSettingsAddedForEncompassBroker
'@ TestData: NA
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Navigate to Encompass 'Admin Tools.exe' under C:\SmartClientCache\Apps\Ellie Mae\Encompass 
   '2 Select 'Yes' option.Enter Client ID, and click on Login.Double click on 'Settings Manager' option  
   '3 Enter the credentials with Admin/Password, and click on 'Log In' button
   '4 Under Category : Policies, Update the "Allow Mobile Platform " to FALSE.Click on Apply then OK button  
   '5 Login to Encompass Broker as Admin.Verify Navigate to Encompass Settings > Company / User Setup > Personas> Access Tab  
   '6 Verify under Persona > Access Tab 
   '7 Login to Encompass 'Admin Tools' as adminUnder Category : Policies, update the "Allow Mobile Platform " to TRUEClick on Apply, then OK button 
   '8 Login to Encompass Broker as Admin.Verify Navigate to Encompass Settings > Company / User Setup > Personas> Access Tab   
   '9 Verify under Personas > Access Tab 
   '10 Verify for Loan Officer , Loan Processor, Closer and Manager Persona > Mobile settings (Loan Officer)
   '11 To verify access rights for Admin, Organization / Users> Create a User and add Administrator persona
   '12 Click on 'View/Edit rights' option for the Administrator Persona to the User
'@ ExpectedResult:
   '1 It shows the pop up message with Yes/No options
   '2 It opens the 'Admin Tools' .It opens the 'Encompass Admin Tools' window.It opens the 'Encompass Admin Tools Log In' window
   '3 It opens the 'Server Settings Manager' window
   '4 The 'Server Settings Manager' window closes.Personas > Access Tab is displayed
   '5 'Mobile Settings (LO Connect)' section should not be displayed as its turned OFF
   '6 The 'Server Settings Manager' window closes
   '7 Personas > Access Tab is displayeds
   '8 For all Personas, 'Mobile Settings (LO Connect)' section should  be displayed as its turned ON
   '9 'Microsoft Windows Encompass Client' - first option should be selected   
   '10 For Administrator Persona,Both Microsoft Windows Encompass Client and Encompass Mobile (LO Connect TM) in a web browser' - 2nd option should be selected by default
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3749","Script Name - LOConnect_VerifyMobileSettingsAddedForEncompassBroker", Null

'======= The objective of test case is to verify AdminTools Logins =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2933","Verify mobile settings are added for Encompass Broker", Null

''====== Login to the AdminTools ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Manager"
BIZ_AdminTools_Login "AdminLogin_Loconnect"
BIZ_LOConnect_ServerSettingsManager_SetValue "Policies","Allow Mobile Platform",False
BIZ_AminTools_Close

'====== Login to the Encompass as closer ======
'====== Go to Settings/Company/User Setup/Personas ======
BIZ_Login_UserLogin "AdminLogin_Loconnect"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"

GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTab("swfname:=tabControl1"),60
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTab("swfname:=tabControl1"), "Access"

GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gradientPanel1"),120
boolStatus = GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("text:=Mobile Access.*"),60)
FRM_VerifyFalse boolStatus,"Mobile Access (LO Connect™)","'Mobile Settings (LO Connect)' section should not be displayed as its turned OFF"
BIZ_Nav_Settings_Close
BIZ_Login_UserLogout()

'====== Login to the AdminTools ======
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Settings Manager"
BIZ_AdminTools_Login "AdminLogin_Loconnect"
BIZ_LOConnect_ServerSettingsManager_SetValue "Policies","Allow Mobile Platform",True
BIZ_AminTools_Close

'====== Login to the Encompass as closer ======
'====== Go to Settings/Company/User Setup/Personas ======
BIZ_Login_UserLogin "AdminLogin_Loconnect"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"

GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTab("swfname:=tabControl1"),60
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTab("swfname:=tabControl1"), "Access"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("text:=Mobile Access.*"),120
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("text:=Mobile Access.*"),60,"Mobile Access (LO Connect™)"

BIZ_Settings_Personas_SelectPersona "Loan Officer"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),120
GUI_Object_ValidateChecked SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),"True","Microsoft Windows Encompass Client"

BIZ_Settings_Personas_SelectPersona "Loan Processor"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),120
GUI_Object_ValidateChecked SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),"True","Microsoft Windows Encompass Client"

BIZ_Settings_Personas_SelectPersona "Closer"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),120
GUI_Object_ValidateChecked SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),"True","Microsoft Windows Encompass Client"

BIZ_Settings_Personas_SelectPersona "Manager"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),120
GUI_Object_ValidateChecked SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfRadioButton("swfname:=rdoDesktop"),"True","Microsoft Windows Encompass Client"

'====== Create Persona with Admin access  ======
strNewPerson = BIZ_OrganizationUsers_CreateUser ("PTAC-3516_UserWithAdimAccess")
Wait g_ShortWaitMedium
LOConnect_ValidateBothOption strNewPerson

'====== Delete Persona ======
BIZ_OrganizationUsers_DeleteExistingUser strNewPerson
BIZ_Nav_Settings_Close

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
