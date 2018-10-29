'@**************************************************************************************************
'@ TestStory :NICE-2306 Fee and Field scenarios conditions added in business rules
'@ TestCase:
   '1  TC23 - NICE-2306 - Verify DDM Field Rule Condition Execution for Current Role option with Custom Role & Milestone
   '2  
  
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    
'@ Pre-Conditions: NA

'@ Description:
	'Updated in action
'@Expected Result:
	'Updated in action
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: NICE-2306 ","Script Name : DDM_NICE2306_FeeRules_AddedIn_BusinessRules", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'======Below creation of data template is not a part NICE-2548======
'======It is added to include Data template import functionality in DDM Field Rule=======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates","Data Templates"

Set objSettings        = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objLoanProgramList = objSettings.SwfObject("swfname:=gvDirectory")
Set scrollbarDataTemplate = objsettings.SwfScrollBar("swfname:=vPanelScrollBar")
Set objDataTemplateDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DataTemplateDialog")
'Get Template related test data
Set objData = FRM_DS_GetTestData("DDM", "DDMFieldRule", "NICE-2548")
strDataTemplateName=FRM_DS_GetValue(objData, "DataTemplate")
Set objData = Nothing
boolExist = GUI_List_ClickRow(objLoanProgramList, scrollbarDataTemplate, "Name", strDataTemplateName, True, False, False, "Single")	
If boolExist Then 
	FRM_Logger_ReportInfoEvent "Data Template","Data Template already exists with name '"&strDataTemplateName&"'",null
	GUI_SwfObject_Click objSettings.SwfObject("swfname:=btnDelete")
	GUI_Dialog_Encompass_Click "4","Are you sure","Yes"	
	FRM_Logger_ReportInfoEvent "Data Template delete","Data Template deleted with name '"&strDataTemplateName&"'",null	
End If	
'======================== Click on New(+) Icon to create data template==============
'Select folder
GUI_Object_WaitTillExistX objSettings, 60
GUI_SwfComboBox_Select objsettings.SwfComboBox("swfname:=cmbBoxFolder|cboFolder"), "Public Data Templates"
'Create Template
GUI_SwfObject_Click objSettings.SwfObject("swfname:=btnAdd")

GUI_SwfEdit_Set objSettings.SwfEdit("micclass:=SwfEdit","focused:=True"), strDataTemplateName 
GUI_SwfObject_Click objLoanProgramList	

Wait g_TinyWaitMedium 				' Due To Sync Issue We Are Explicitly Passing Wait Statement

boolExist = GUI_List_ClickRow(objLoanProgramList, scrollbarDataTemplate, "Name", strDataTemplateName, True, False, False, "Single")	
If boolExist Then
	GUI_Object_Click objSettings.SwfObject("swfname:=btnOpen"), "SwfObject", "Edit Data Template"	
	GUI_Object_WaitTillExistX objDataTemplateDialog, 60
	GUI_SwfEditor_Type objDataTemplateDialog.SwfEditor("swfname:=descTxt"), "Data Template for creation of DDM Field Rule"
	GUI_WebEdit_Set objDataTemplateDialog.Page("micClass:=Page").WebEdit("html id:=TextBox10"),"NICE2435"
	GUI_SwfButton_Click objDataTemplateDialog.SwfButton("swfname:=saveBtn")	
	FRM_Logger_ReportPassEvent "Create Data Template","New Data Template Created with name '"&strDataTemplateName&"'",null
Else
	FRM_Logger_ReportFailEvent "Create Data Template","New Data Template is not created",null
End If

Set objDataTemplateDialog = Nothing
Set scrollbarDataTemplate = Nothing
Set objSettings 		= Nothing
Set objLoanProgramList 	= Nothing	


RunAction "DDM_NICE2548_FieldCustomeRole_TC23", oneIteration
RunAction "DDM_NICE2549_FeeCustomRole_TC24", oneIteration

FRM_RT_TearDownTest(Null)
