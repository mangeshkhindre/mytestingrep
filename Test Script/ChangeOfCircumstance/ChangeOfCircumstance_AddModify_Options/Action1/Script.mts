'@**************************************************************************************************
'@ TestStory: PTAC-3763 Change Of Circumstance
'@ TestCase:  PTAC-17 Add/Modify COC option and its attributes.
'@ Test Automation JIRA Task: PTAC-3766 ChangeOfCircumstance_AddModify_Options
'@ TestData:  Settings_ChangedCircumstanceSetup, SetChangedCircumstanceDetails, PTAC-17
'@ Pre-conditions: Login as Admin user  
'@ Description: 
'@ TestSteps:
	'1 Login to Encompass with the credentials provided.
         'Username: admin
         'password: password
    '2 Go to Encompass settings, Loan setup, Changed circumstances setup.
	'3 Enter/modify the description for the CoC (Implementation note: This is the existing CoC option value) Select the reason for the CoC option
        '- Select the reason for the CoC option
        '* The reasons that are shown in the drop down are as listed below. (Please note that some reasons are LE only or CD only or both as identified within square brackets)
        '** Changed Circumstance - Settlement Charges [LE & CD]
        '** Changed Circumstance - Eligibility [LE & CD]
        '**  Revisions requested by the Consumer [LE & CD]
        '** Interest Rate dependent charges (Rate Lock) [LE & CD]
        '** Expiration (Intent to Proceed received after 10 business days) [LE only]
        '** Delayed Settlement on Construction Loans [LE only]
        '** Change in APR [CD only]
        '** Change in Loan Product [CD only]
        '** Prepayment Penalty Added [CD only]
        '** 24-hour Advanced Preview [CD only]
        '** Tolerance Cure [CD only]
        '** Clerical Error Correction [CD only]
        '** Other [LE & CD]
        '* By default, no reason is selected. 
    '4 Enter/Modify the code for the CoC option. (Note: The code cannot be modified after a CoC record has been saved.) 
    '5.Enter / Modify the comments.
	'6 Save the CoC option and its attributes
        '- When a CoC option is saved, validate that the following required fields are entered:
        '* Code
        '* Description
        '- Ensure that code is unique
        '- Set the type as LE or CD or both or none , depending on the selected reason. Note that the type is an internal field and will not show in the settings UI.
	'7 Duplicate CoC option - (Duplicate button is enabled only on CoCs that have been created and saved earlier.)
'@ ExpectedResult:
	'1 should be able to enter/modify the description for COC and select the reason for COC option from the dropdown box.
    '2 Should be able to enter/modify the code and comments.
    '3 COC should be saved with the field values entered.
    '4 CoC should be duplicated with a prefix "Copy of".
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3766","Script Name: ChangeOfCircumstance_AddModify_Options", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-17","Add/Modify COC option and its attributes", Null

Dim objMain, objSettings, objData, strReason, strCode, strComments, boolEnterOrModify, boolChanges

strRowID		=	"PTAC-17"
Set objMain		=	SwfWindow("swfname:=MainForm")
Set objSettings =	objMain.SwfWindow("swfname:=SetUpContainer")
Set objData 	= 	FRM_DS_GetTestData("Settings_ChangedCircumstanceSetup", "SetChangedCircumstanceDetails", strRowID)
strReason		=	FRM_DS_GetValue(objData, "Reason")
strCode			=	FRM_DS_GetValue(objData, "Code")
strComments		=	FRM_DS_GetValue(objData, "Comments")

'====== Add Change Of Circumstances ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Changed Circumstances Setup"
BIZ_Settings_ClickAdd
strDescription = BIZ_ChangedCircumstances_SetChangedCircumstanceDetails (strRowID)
BIZ_Settings_ClickSave

'@ Validation
GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 300		'@ To handle sync Related Issues 
boolEnterOrModify = GUI_List_ClickRow(objSettings.SwfObject("swfname:=listViewOptions"), Null,_
"Description", strDescription, True, False, False, "Single") 

wait g_ShortWaitMedium  '@ To handle sync Related Issues 

FRM_VerifyTrue boolEnterOrModify, "Verify Change of circumstances dialog",_
"Able to enter/modify the description: '"&strDescription&"' for COC and selected the reason: '"&strReason&"' for COC option from the dropdown box."

'====== Modify/Edit Change Of Circumstances ======
strNewDescription	=	strDescription & " Edited On: " & Time()
strNewComments		=	strComments & " Edited On: " & Time()
strNewReason		=	"Changed Circumstance - Settlement Charges [LE & CD]"
strNewDescription	=	BIZ_ChangedCircumstances_EditChangedCircumstanceDetails (strDescription, strNewDescription, strNewReason, strCode, strNewComments)
BIZ_Settings_ClickSave

'@ Validation
GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 240		'@ To handle sync Related Issues 
boolDesc 	 = 	GUI_List_TextExists (objSettings.SwfObject("swfname:=listViewOptions"), "Description", strNewDescription)
boolReason 	 = 	GUI_List_TextExists (objSettings.SwfObject("swfname:=listViewOptions"), "Reason", strNewReason)
boolComments = 	GUI_List_TextExists (objSettings.SwfObject("swfname:=listViewOptions"), "Comments", strNewComments)
boolChanges	 =	boolDesc AND boolReason AND boolComments

FRM_VerifyTrue boolChanges, "Edit Change Of Circumstances Details", "Able to edit Description, Reason, Comments"

If boolChanges Then
	FRM_Logger_ReportPassEvent "Change of circumstances dialog",_
	"Able to modify the description: '"&strDescription&"' to '"&strNewDescription&"' for COC", Null	
	
	FRM_Logger_ReportPassEvent "Change of circumstances dialog",_
	"Able to modify the Reason: '"&strReason&"' to '"&strNewReason&"' for COC", Null	
	
	FRM_Logger_ReportPassEvent "Change of circumstances dialog",_
	"Able to modify the Comments: '"&strComments&"' to '"&strNewComments&"' for COC", Null	
Else
  	FRM_Logger_ReportFailEvent "Change of circumstances dialog",_
	"Not Able to modify the description: '"&strDescription&"' to '"&strNewDescription&"' for COC", Null
	
	FRM_Logger_ReportFailEvent "Change of circumstances dialog",_
	"Not Able to modify the Reason: '"&strReason&"' to '"&strNewReason&"' for COC", Null
	
	FRM_Logger_ReportFailEvent "Change of circumstances dialog",_
	"Not Able to modify the Comments: '"&strComments&"' to '"&strNewComments&"' for COC", Null
	
End If

'====== Duplicate Change Of Circumstances ======
GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 240		'@ To handle sync Related Issues 
GUI_List_ClickRow objSettings.SwfObject("swfname:=listViewOptions"), Null, "Description", strNewDescription, True, False, False, "Single"
Wait g_ShortWaitSmall '@ Explicit wait added due sync
BIZ_Settings_ClickCopy
BIZ_Settings_ClickSave

'@ Validation
strDuplicateDescription	=	"Copy of "&strNewDescription
GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 240		'@ To handle sync Related Issues 
wait g_ShortWaitMedium  '@ To handle sync Related Issues 
boolDupDesc	= GUI_List_TextExists (objSettings.SwfObject("swfname:=listViewOptions"), "Description", strDuplicateDescription)

FRM_VerifyTrue boolDupDesc, "Duplicate CoC option", "Duplicated with a prefix 'Copy of' " 

'====== Delete Change Of Circumstances ======
GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 240		'@ To handle sync Related Issues 
GUI_List_ClickRow objSettings.SwfObject("swfname:=listViewOptions"), Null, "Description", strNewDescription, True, False, False, "Single"
Wait g_ShortWaitSmall '@ Explicit wait added due sync
BIZ_Settings_ClickDelete
BIZ_Settings_Dialog_ClickYes

GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=listViewOptions"), 240		'@ To handle sync Related Issues 
GUI_List_ClickRow objSettings.SwfObject("swfname:=listViewOptions"), Null, "Description", strDuplicateDescription, True, False, False, "Single"
Wait g_ShortWaitSmall '@ Explicit wait added due sync
BIZ_Settings_ClickDelete
BIZ_Settings_Dialog_ClickYes
BIZ_Nav_Settings_Close

Set objMain			=	Nothing
Set objSettings 	=	Nothing
Set objData 		= 	Nothing

'====== Logout from the application ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
