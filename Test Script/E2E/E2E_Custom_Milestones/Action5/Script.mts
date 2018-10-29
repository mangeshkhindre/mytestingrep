'@****************************************************************************************** 
'@ TestSteps:
	'start of TC5
	'1 add a new blank loan
	'2 apply milestone template
	'3 click the select and continue button
	'4 select the apply button
	'5 go to settings->company/user setup->Milestones
	'6 go to the tab Milestone Templates
	'7 specify the condition Loan Type = FHA
	'8 save the template
	'9 close the settings
	'10 Apply milestone template
	'11 verify that the matching template is above the dividing line and non-matching template is below the dividing line
	'12 go to settings->company/user setup->Milestones
	'13 go to the tab Milestone Templates
	'14 click the Add template button
	'15 Enter template name
	'16 specify the condition
	'17 save the template
	'18 Select the template
	'19 Activate the template
	'20 click the Add template button
	'21 Enter template name
	'22 specify the condition
	'23 save the template
	'24 Select the template
	'25 Activate the template
	'26 close the settings
	'27 go to form Borrower summary origination
	'28 set loan type to FHA
	'29 save the loan
	'30 select the Log tab
	'31 apply milestone template
	'32 select CMtemA template
	'33 click the select and continue button
	'34 select the apply button
	'35 Verify that CMtemA has been applied
	'36 go to form Borrower summary origination
	'37 set loan type to VA
	'38 save the loan
	'39 verify that CMtemB is not automatically applied
	'
	'start of TC6
	'1 change the Milestone template mode to Automatic
	'2 set loan type to FHA
	'3 save the loan
	'4 verify that the current template CMtemA itself is automatically applied
	'5 set loan type to VA
	'6 save the loan
	'7 select the apply button
	'8 verify that the template CMtemB itself is automatically applied	
'@****************************************************************************************** 


'************Start of TC5*********************************
FRM_Logger_ReportStepEvent "TC5_E2E_CustomMilestones", "Validate the applying of Milestone templates manually", Null

'add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"

'apply milestone template
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Milestone Template..."
'click the select and continue button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfButton("swfname:=btnSelect")
'select the apply button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")
'go to settings->company/user setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"

Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

'click on Global settings button
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnGlobalSettings")
'Set ON the checkbox to show non-matching templates
GUI_SwfCheckBox_Set objSettingWindow.SwfWindow("swfname:=GlobalSettings").SwfCheckBox("swfname:=chkShowNonMatching"), "ON"
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=GlobalSettings").SwfButton("swfname:=btnSave")

'select the template "Milestone Template"
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 1, "Milestone Template", True, False, False, "Single"

'specify the condition Loan Type = FHA
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=radioCondition")
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboType"), "Loan Type"
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboCondition"), "FHA"

'save the template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")


'apply milestone template
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Milestone Template..."

'verify that the matching template is above the dividing line and non-matching template is below the dividing line
middleRow = GUI_List_GetRowIndex(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), 0, "       -----Non-matching Templates-----")
matchingRow = GUI_List_GetRowIndex(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), 0, "CMtemA")
nonmatchingRow = GUI_List_GetRowIndex(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), 0, "Milestone Template (Current)")
FRM_VerifyTrue matchingRow < middleRow, "matching template", "Verify that matching template is above the dividing line"
FRM_VerifyTrue nonmatchingRow > middleRow, "non-matching template", "Verify that non-matching template is below the dividing line"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfButton("swfname:=btnCancel")

'go to settings->company/user setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

BIZ_MilestoneTemplate_Delete "CMtemA"
BIZ_MilestoneTemplate_Delete "Milestone Template"

'click the Add template button
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnAddTemplate")
wait 5
'enter template name
GUI_SwfEdit_Set objSettingWindow.SwfEdit("swfname:=txtName"), "CMtemA"

'specify the condition
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=radioCondition")
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboType"), "Loan Type"
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboCondition"), "FHA"

'save the template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'select the template
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 1, "CMtemA", True, False, False, "Single"

'Activate the template
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnStatus")

'click the Add template button
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnAddTemplate")

wait 5
'enter template name
GUI_SwfEdit_Set objSettingWindow.SwfEdit("swfname:=txtName"), "CMtemB"

'specify the condition
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=radioCondition")
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboType"), "Loan Type"
GUI_SwfComboBox_Select objSettingWindow.SwfComboBox("swfname:=comboCondition"), "VA"

'save the template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'select the template
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 1, "CMtemB", True, False, False, "Single"

'Activate the template
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnStatus")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")

'go to form Borrower summary origination
BIZ_Forms_Open "Borrower Summary - Origination"

'set loan type to FHA
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox20_Ctrl","value:=FHA"), "ON"

'save the loan
BIZ_loan_Save()

'select the Log tab
GUI_SwfObject_SelectTab SwfWindow("swfname:=MainForm").SwfObject("swfname:=tabsLog"), "Log"

intRowCount = GUI_List_GetRowCount(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), 0, "Milestone Template Change")

'apply milestone template
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Milestone Template..."

'select CMtemA template
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), 0, True, False, False, "Single"

'click the select and continue button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfButton("swfname:=btnSelect")

'select the apply button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")
'wait for screen to refresh
wait 10

'verify that CMtemA has been applied
intRowCount1 = GUI_List_GetRowCount(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), 0, "Milestone Template Change")
FRM_VerifyEqual intRowCount1, (intRowCount + 1), "Template applied", "Verify that the applying of the template is logged"

'go to form Borrower summary origination
BIZ_Forms_Open "Borrower Summary - Origination"

'set loan type to VA
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox21_Ctrl","value:=VA"), "ON"
'save the loan
BIZ_loan_Save()

'wait for screen to refresh
wait 10

'verify that CMtemB is not automatically applied
intRowCount2 = GUI_List_GetRowCount(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), 0, "Milestone Template Change")
FRM_VerifyEqual intRowCount2, intRowCount1, "Template applied", "Verify that the template CMtemB is not automatically applied"

'*****************Start of TC6****************************
FRM_Logger_ReportStepEvent "TC6_E2E_CustomMilestones", "Validate the applying of milestone templates automatically", Null

'change the Milestone template mode to Automatic
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Automatic Mode..."
GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Milestone Templates are in Automatic Mode").WinButton("text:=OK")

'set loan type to FHA
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox20_Ctrl","value:=FHA"), "ON"

'save the loan
BIZ_loan_Save()

'wait for screen to refresh
wait 10

'verify that the current template CMtemA itself is automatically applied
intRowCount3 = GUI_List_GetRowCount(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), 0, "Milestone Template Change")
FRM_VerifyEqual intRowCount3, intRowCount2, "Template applied", "Verify that the current template CMtemA is automatically applied"

'set loan type to VA
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox21_Ctrl","value:=VA"), "ON"

'save the loan
BIZ_loan_Save()

'select the apply button 
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff"), 15) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")	
End If

intRowCount4 = GUI_List_GetRowCount(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog"), 0, "Milestone Template Change")

'verify that the template CMtemB itself is automatically applied
FRM_VerifyEqual intRowCount4, (intRowCount3 + 1), "Template applied", "Verify that the template CMtemB is automatically applied"

BIZ_Loan_Exit(False)


