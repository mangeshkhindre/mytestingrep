'@******************************************************************************************
'@ TestStory:CFUN1895 Error message when 'admin' creates new user
'@ TestCase: CFUN-2081 TC02- CFUN1895 - Saving an Internal User after edit 
'@ TestCase: CFUN-2094 TC04- CFUN1895 - Saving an External User after edit
'@ Test Automation JIRA Task: TA-4802
'@ TestData: "Settings_CompanySettings","SetTPO","CFUN1895"
'@ TestData: "Settings_CompanySettings","SetTPOContact","CFUN1895"
'@ TestData: "Setttings_CompanyUserSetup","OrganizationUsers_CreateUser","cfun1895"
'@ TestData: "Global_Data","Login","cfun1895"
'@ Pre-conditions: 1. Create new user.
'@ Description:
'@ TestSteps:
    '1 Go to Settings-> Company/User setup-> Organization/Users
	'2 Select the user which is created in precondition.
	'3 Edit some data and click Save button.
	'4 Login with created user.
	'5 Go to Settings-> External Company Setup -> Company Details
	'6 Select the user which is created in precondition.
	'7 Edit some data and click Save button.
	
'@ ExpectedResult: 1.For step-4,User should be able to login.
'				   2.For step-7,Data should be saved without any error and created user should be displayed in 'Third Party Originator Contacts' section.
'********************************************************************************************
FRM_RT_SetupTest(null)

'=============Login with newly created user=============
BIZ_Login_UserLogin "sven_admin"

FRM_Logger_ReportStepEvent "Delete existing user if exists","", NULL

'==========Go to Encompass>>Setting>>Organization/User=============
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

'============Delete Existing user if exists==========================
BIZ_OrganizationUsers_DeleteExistingUser("cfun1895")

'=============Create new user=======================
FRM_Logger_ReportStepEvent "CFUN-2080", "TC01- CFUN-1895 - Creating an Internal User", NULL

BIZ_OrganizationUsers_CreateUser("cfun1895")

Set objUsersAvaliable = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvUsers")
    
'=====Wait time is added as immediately after creating new user,time is required to update in the list=============
Wait 10

'================Open newly created user=========================
FRM_Logger_ReportStepEvent "CFUN-2081", "TC02-CFUN-1895 - Saving an Internal User after edit", NULL
GUI_List_ClickRow objUsersAvaliable, NULL, 0, "cfun1895", True, False, False, "Double"

'===============Enter comments===================
GUI_SwfEditor_Type SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog").SwfEditor("swfname:=PersonaCommentsTextBox"),"Comment"

'==============Save the user====================
GUI_SwfButton_ClickSave SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog"), "okBtn"

Set objUsersAvaliable = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvUsers")
GUI_List_ClickRow objUsersAvaliable, NULL, 0, "cfun1895", True, False, False, "Double"
Set objAddEditUserCEDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog")
GUI_Object_ValidateText objAddEditUserCEDialog.SwfEditor("swfname:=PersonaCommentsTextBox"), "Comment", "Comments textbox"
GUI_SwfButton_ClickSave SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditUserCEDialog"), "okBtn"

'==========Go to Encompass>>Setting>>Personas=============
BIZ_Nav_HierarchyTree "Company/User Setup","Personas"

'=============Delete Existing persona==========
BIZ_Settings_Personas_DeletePersona "CFUN1895"

'==============Create new External persona=============
BIZ_Settings_Personas_CreateExternalPersona "CFUN1895",True

FRM_Logger_ReportStepEvent "CFUN-2093", "TC03- CFUN-1895 - Creating an External User", NULL

'==========Go to Encompass>>External Company Setup>>Company Details=============
BIZ_Nav_HierarchyTree "External Company Setup","Company Details"

'==================Delete existing user========================
BIZ_CompanyDetails_TPO_Delete("Third Party Originators;CFUN1895")

FRM_Logger_ReportStepEvent "Precondition Data","Create new TPO",NULL

'=============Create new TPO=======
BIZ_CompanyDetails_TPO_Create "CFUN1895","CFUN1895"
 
'===============Create new user============================
BIZ_CompanyDetails_TPOContact_Create "CFUN1895","CFUN1895"

'========================Validate the contact===========================
BIZ_CompanyDetails_TPOContact_ValidateCreatedTPOContact "CFUN1895","CFUN1895"

FRM_Logger_ReportStepEvent "CFUN-2094", "TC04- CFUN-1895 - Saving an External User after edit",NULL

'=============Select the contact=========================
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gridViewContacts"),objScrollBar,0,"CFUN1895",True,False,False,"Single"  

'===============Click on edit icon=================
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=btnEditContact")

'============Set Last Name=========================
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=TPOContactSetupForm").SwfEdit("swfname:=txtLastName"),"Edit Contact"

'===========Save Contact========================
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=TPOContactSetupForm").SwfButton("swfname:=btnSave")

'=============Close settings Window==============
BIZ_Nav_Settings_Close()

'=======================Logout of Application========================
BIZ_Login_UserLogout()

'=============Login with newly created user=============
BIZ_Login_UserLogin "cfun1895"

'=======================Logout of Application========================
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null) 
