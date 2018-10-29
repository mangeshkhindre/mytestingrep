'@**************************************************************************************************
'@ TestStory:CBIZ-13631
'@ TestCase: 30yr Term & 1st Lien,15yr Term & 1st Lien,30yr Term & 2nd Lien,15yr Term & 2nd Lien
'@ Test Automation JIRA Task: 
'@ TestData: 
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: 
	'Validate  various fields for Diffrenet conbinations of Lienn,Term Note and Qual rate






'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:CBIZ-13028", " Validate 30yr Term & 1st Lien (CBIZ-9790) Monthly Payment Calculations", Null
BIZ_Nav_SelectPipelineTab()

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Open Borrower Summary - Origination Form ======
'====== Set Data in Borrower Summary - Origination Form ======

BIZ_Forms_Open "Borrower Summary - Origination"
'BIZ_BorrowerSummaryOrigination_SetBorrower "CBIZ-13028"
'BIZ_BorrowerSummaryOrigination_SetProperty "CBIZ-13028"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_Biweekly"

'====== Navigate to FNMA Streamlined 1003 to set Biweekly ON  ======
BIZ_Forms_Open "FNMA Streamlined 1003"
Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Set objFNMA.WebCheckBox("html id:=__cid_CheckBox9_Ctrl"),"ON"

'====== Validate 30 Years 1st Lien ======

Validate30Years1stLien_E2E("Biweekly")

'================================================================================================================
'====== Validate 30 Years 2nd Lien ======
'====== Change the Loan Data F3 (Note Rate)=6.5%  and Term =360 mths  and Lien Position as second ======

Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
SetNoteRate "5"
'GUI_WebEdit_Set objFNMA.WebEdit("html id:=l_4"),""	'Clear the Old value for Term
GUI_WebEdit_Set objFNMA.WebEdit("html id:=l_4"),"360"	'Set the New Value for Term

'Validate Term set to 360
If GUI_Object_GetPropertyValue (objFNMA.WebEdit("html id:=l_4"),"value")="360" Then
	FRM_Logger_ReportPassEvent "Set Term Period ","Test Data Term = 360 Successfully Entered in Term F4 Field ",null
Else
	FRM_Logger_ReportFailEvent "Set Term Period","Test Data Change was not Successfull in Term F4 Field ",null
End If

'Set Lien Postion to Second
'Validate Lien Postion set to Second
If GUI_WebCheckbox_IsChecked  (objFNMA.WebCheckbox("html id:=__cid_CheckBox23_Ctrl")) Then

	FRM_Logger_ReportPassEvent "Set Lien Position","Test Data Lien Postion is set to Second Successfully ",null
Else
	GUI_WebCheckbox_Click objFNMA.WebCheckbox("html id:=__cid_CheckBox23_Ctrl")
	wait 2
	FRM_Logger_ReportPassEvent "Set Lien Position","Test Data Lien Postion is set to Second Successfully ",null
End if

Validate30Years2ndLien_E2E("Biweekly")



