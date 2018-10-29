'@****************************************************************************************** 
'@ TestSteps:
	'start of TC7
	'1 change the Milestone template mode to Manual
	'2 add a new blank loan
	'3 verify that the loan number is blank
	'4 go to settings->company/user setup->Milestones
	'5 go to tab Milestone Templates
	'6 click the Add template button
	'7 Enter template name
	'8 go to the Milestones tab for this template
	'9 Click the button to add milestone to the template
	'10 Select the MilestoneA->CMtemA
	'11 Move up the MilestoneA->CMtemA
	'12 save the milestone template
	'13 select the template
	'14 Activate the template
	'15 Close settings
	'16 go to settings->Loan Setup->Auto Loan Numbering
	'17 In the Manage exceptions popup select MilestoneA for template MT_1 and save it
	'18 close the settings
	'19 Manually apply template MT_1
	'20 click the select and continue button
	'21 select the apply button
	'22 select the log tab
	'23 Finish the milestoneA
	'24 save the loan
	'25 verify that the loan number is generated
	'	
'@****************************************************************************************** 


'*****************Start of TC7************************
FRM_Logger_ReportStepEvent "TC7_E2E_CustomMilestones", "Validate the testing of Auto Loan numbering", Null

'add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"

'change the Milestone template mode to Manual
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Manual Mode..."
GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Milestone Templates are in Manual Mode").WinButton("text:=OK")

'verify that the Loan number is blank
BIZ_Forms_Open "Borrower Summary - Origination"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_364"), "", "Loan number field"

'go to settings->company/user setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

'click the Add template button
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnAddTemplate")

wait 5
'enter template name
Tempname="MT_1"&Month(Date) & "_" & Day(Date) & "_" & Year(Date)
GUI_SwfEdit_Set objSettingWindow.SwfEdit("swfname:=txtName"), Tempname

'go to the Milestones tab for this template
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabTemplates"), "Milestones"

'Click the button to add milestone to the template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdAddMilestoneToTemplate")

'select the milestoneA(E2EmilestoneA->CMtemA)
GUI_List_ClickCheckbox objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfObject("swfname:=gvAvailableMilestones"), _
	objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfScrollBar("swfname:=vPanelScrollBar"), "E2E_MilestoneA", 0, True, False, "Single", True
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfButton("swfname:=btnSubmit")

'move up the MilestoneA

intRowNumber = GUI_List_GetRowIndex(objSettingWindow.SwfObject("swfname:=gvSequentialMilestones"), 0, "E2E_MilestoneA")
Scrollvalue=(intRowNumber-11)+1
'objSettingWindow.SwfObject("swfname:=gvTemplates").SwfScrollBar("swfname:=vPanelScrollBar").object.value=Scrollvalue
intRowNumber=Scrollvalue
'GUI_List_ActOnRow objSettingWindow.SwfObject("swfname:=gvSequentialMilestones"), intRowNumber, True, False, False, "Single"
'For i = 1 To (intRowNumber - 1)
'	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnMoveTemplateMilestoneUp")	
'Next

'save the milestone template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'select the template
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 1, Tempname, True, False, False, "Single"

'Activate the template
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnStatus")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")

'go to settings->Loan Setup->Auto Loan Numbering
BIZ_Nav_HierarchyTree "Loan Setup", "Auto Loan Numbering"

strPrefix = GUI_Object_GetPropertyValue(objSettingWindow.SwfEdit("swfname:=prefixTxt"), "Text")
strNextNumber = GUI_Object_GetPropertyValue(objSettingWindow.SwfEdit("swfname:=nextNumTxt"), "Text")
strSuffix = GUI_Object_GetPropertyValue(objSettingWindow.SwfEdit("swfname:=suffixTxt"), "Text")

'In the Manage exceptions popup select MilestoneA for template MT_1 and save it
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnManageExceptions")

GUI_SwfObject_Click objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfObject("swfname:=btnAssignPersona")
GUI_List_ClickCheckbox objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfWindow("swfname:=CustomMilestoneExceptionTemplate").SwfObject("swfname:=gvAvaiTemplates"), Null, Tempname, 1, True, False, "Single", True
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfWindow("swfname:=CustomMilestoneExceptionTemplate").SwfButton("swfname:=button1")
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
intRowIndex = GUI_List_GetRowIndex(objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfObject("swfname:=gvExceptions"), 0, Tempname)
GUI_SwfComboBox_Select objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfComboBox("swfname:=cboMilestones", "Location:=" & intRowIndex), "E2E_MilestoneA"
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfButton("swfname:=button1")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")
GUI_Dialog_Encompass_Yes ""
GUI_Dialog_Encompass_OK ""

'Manually apply template MT_1
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Milestone Template..."
GUI_List_ClickRow  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), Null, 0, Tempname, True, False, False, "Single"

'click the select and continue button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfButton("swfname:=btnSelect")

'select the apply button
GUI_SwfButton_Click SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation"), 5) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation").SwfButton("swfname:=btnYes")	
End If

wait(5)

'select the Log tab
GUI_SwfObject_SelectTab SwfWindow("swfname:=MainForm").SwfObject("swfname:=tabsLog"), "Log"

'Finish the milestoneA
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), Null, 0, "E2E_MilestoneA expected", False, False, False, "Single"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
'GUI_SwfCheckBox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"), "ON"

'save the loan
BIZ_Loan_Save()

'verify that the Loan number is generated
BIZ_Forms_Open "Borrower Summary - Origination"
shortdate = formatdatetime(Date, 2)
strLoanNumber = Right(shortdate,2) & Left(shortdate,2) & strPrefix & strNextNumber & strSuffix

'go to settings->Loan Setup->Auto Loan Numbering
BIZ_Nav_HierarchyTree "Loan Setup", "Auto Loan Numbering"

'In the Manage exceptions popup remove MilestoneA for template MT_1 and save it
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnManageExceptions")
GUI_List_ClickRow  objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfObject("swfname:=gvExceptions"), NULL, 0, Tempname, True, False, False, "Single"
GUI_SwfObject_Click objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfObject("swfname:=btnRemove")
GUI_SwfButton_Click  objSettingWindow.SwfWindow("swfname:=CustomMilestoneExceptionResolver").SwfButton("swfname:=button1")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")
GUI_Dialog_Encompass_Yes ""
GUI_Dialog_Encompass_OK ""

