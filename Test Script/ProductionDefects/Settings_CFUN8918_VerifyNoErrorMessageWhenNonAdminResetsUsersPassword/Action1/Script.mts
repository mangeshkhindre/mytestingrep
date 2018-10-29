'@******************************************************************************************
'@ TestStory:CFUN8918 Sync error when non-admin user resets a users password & forces password change
'@ TestCase: CFUN-9772-Verify that no Sync error when non-admin user resets a users password and forces password change 
'@ TestData: "Setttings_CompanyUserSetup","OrganizationUsers_CreateUser","cfun8918"
'@ TestData: "Setttings_CompanyUserSetup","OrganizationUsers_CreateUser","cfun8918_1"
'@ Pre-conditions: NA
'@ Description:
'@ TestSteps:
    '1. Create a new Persona with Access to All features.
	'2. Create a new user with that Persona
	'3. Login with the new user and Change the password for another user say 'Greenuser1' & check the checkbox "Force user to change password."
	'4. Login with the 'greenuser1' with the changed password.
	'5. Prompt to change password should be displayed.
	'6. Set a new password. Verify that no password synchronization error should be displayed.
	
'@ ExpectedResult: 1.For step-6,no password synchronization error should be displayed.
'********************************************************************************************
FRM_RT_SetupTest(null)

'=============Login with admin=============
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Create new persona", "TC01-CFUN-9772-Creating a new Persona", NULL

'==========Go to Encompass->Setting->Personas=============
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"

BIZ_Settings_Personas_CreatePersona "cfun8918",True

FRM_Logger_ReportStepEvent "Create new user", "TC01-CFUN-9772-Creating a new user(non admin profile) with admin", NULL

BIZ_OrganizationUsers_CreateUser "cfun8918" 
    
'=====Wait time is added as immediately after creating new user,time is required to update in the list=============
Wait 10

'=============Close settings Window==============
BIZ_Nav_Settings_Close()

'=======================Logout of Application========================
BIZ_Login_UserLogout()

FRM_Logger_ReportStepEvent "Login with new user", "TC01-CFUN-9772-Login with the newly created user", NULL

'=============Login with user cfun8918=============
BIZ_Login_UserLogin "cfun8918"

FRM_Logger_ReportStepEvent "Create new user", "TC01-CFUN-9772-Creating a new user(non admin profile) with non admin user", NULL

BIZ_OrganizationUsers_CreateUser "cfun8918_1" 

'=====Wait time is added as immediately after creating new user,time is required to update in the list=============
Wait 10

'=======================Logout of Application========================
BIZ_Login_UserLogout()

strNewUserId=FRM_RT_GetPropValue("NewUserCreated",True)
strNewUserPwd=FRM_RT_GetPropValue("NewUserPassword",True)

If UTIL_File_FileExists("C:\SmartClientCache\Apps\Ellie Mae\Encompass\Encompass.exe") Then
   SystemUtil.Run("C:\SmartClientCache\Apps\Ellie Mae\Encompass\Encompass.exe")
Else
   SystemUtil.Run("C:\SmartClientCache\Apps\Ellie Mae\Encompass\AppLauncher.exe")
End If

GUI_Object_WaitTillVisibleX SwfWindow("swfname:=LoginScreen"),120
SwfWindow("swfname:=LoginScreen").Activate
SwfWindow("swfname:=LoginScreen").SwfEdit("swfname:=loginNameBox").Set strNewUserId
SwfWindow("swfname:=LoginScreen").SwfEdit("swfname:=passwordBox").Set strNewUserPwd

SwfWindow("swfname:=LoginScreen").SwfButton("swfname:=okBtn").Click

If SwfWindow("swfname:=LoginScreen").SwfWindow("swfname:=ChangePasswordDialog").Exist(5) Then
	FRM_Logger_ReportInfoEvent "Password Expired dialog box", "Password Expired dialog box appears for user:"&strNewUserId, null
	SwfWindow("swfname:=LoginScreen").SwfWindow("swfname:=ChangePasswordDialog").SwfEdit("swfname:=txtPassword").Set "Password$2"
	SwfWindow("swfname:=LoginScreen").SwfWindow("swfname:=ChangePasswordDialog").SwfEdit("swfname:=txtConfirm").Set "Password$2"
	SwfWindow("swfname:=LoginScreen").SwfWindow("swfname:=ChangePasswordDialog").SwfButton("swfname:=btnOK").Click
	'Set objDialog=SwfWindow("swfname:=LoginScreen").SwfWindow("swfname:=ChangePasswordDialog").Dialog("index:=0")
	Set objDialog=Dialog("text:=.*Password Synchronization.*")
	wait 10
	If objDialog.Exist Then		
		If objDialog.Static("text:=Password Synchronization Failed").Exist(2) Then
			FRM_Logger_ReportFailEvent "Login to Encompass", "Unable to Log in due to Password Synchronization Error", null
		End If
		objDialog.Activate
		objDialog.WinButton("text:=OK", "index:=0").Click
	End If			
End If

'=======================Logout of Application========================
BIZ_Login_UserLogout()

'=============Login with admin=============
BIZ_Login_UserLogin "admin_core2p"

'==========Go to Encompass->Setting->Personas=============
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

FRM_Logger_ReportStepEvent "Deleting the new created user", "TC01-CFUN-9772-Deleting the newly created user "&strNewUserId, NULL

BIZ_OrganizationUsers_DeleteExistingUser strNewUserId

FRM_RT_TearDownTest(Null) 
