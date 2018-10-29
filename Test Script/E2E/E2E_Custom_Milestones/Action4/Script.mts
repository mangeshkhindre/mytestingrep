'@****************************************************************************************** 
'@ TestSteps:
	'1 start of TC3
	'2 go to the tab Milestone Templates
	'3 Click the button for Add template
	'4 Enter the template name
	'5 verify that all the channels for this template are selected
	'6 verify the default condition for this template
	'7 enter template notes
	'8 go to the Milestones tab for this template
	'9 Click the button to add milestone to the template
	'10 select the milestoneA
	'11 save the milestone template
	'12 select the template CMtemA
	'13 go to the Milestones tab
	'14 verify that the 1st and last milestone is Started and completion
	'15 verify the dropdown options in the Yes - condition for this template
	'16 enter the template name and save the template
	'17 select the two milestone templates created above, activate them and verify if they got activated
'@****************************************************************************************** 


'*************start of TC3**************************
FRM_Logger_ReportStepEvent "TC3_E2E_CustomMilestones", "Validate the creation of Milestone templates", Null

'go to settings->Company/USer setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

BIZ_MilestoneTemplate_Delete "CMtemA"
BIZ_MilestoneTemplate_Delete "CMtemB"
BIZ_MilestoneTemplate_Delete "Milestone Template"
BIZ_MilestoneTemplate_Delete "MT_1"

'Click the button for Add template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnAddTemplate")
wait 5
'Enter the template name
GUI_SwfEdit_Set objSettingWindow.SwfEdit("swfname:=txtName"), "CMtemA"

'verify that all the channels for this template are selected
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvChannels").Object.Items.Item(0).checked, True, "No channels selected", "Verify that No channels selected checkbox is checked"
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvChannels").Object.Items.Item(1).checked, True, "Banked - Retail", "Verify that Banked - Retail checkbox is checked"
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvChannels").Object.Items.Item(2).checked, True, "Banked - Wholesale", "Verify that Banked - wholesale checkbox is checked"
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvChannels").Object.Items.Item(3).checked, True, "Brokered", "Verify that Brokered checkbox is checked"
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvChannels").Object.Items.Item(4).checked, True, "Correspondent", "Verify that correspondent checkbox is checked"

'verify the default condition for this template
GUI_Object_ValidateChecked objSettingWindow.SwfRadioButton("swfname:=radioGeneral"), True, "No - Always apply this rule radio button"

'enter template notes
GUI_SwfEditor_Type objSettingWindow.SwfEditor("swfname:=txtComments"), "This is template note"

'go to the Milestones tab for this template
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabTemplates"), "Milestones"

'Click the button to add milestone to the template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdAddMilestoneToTemplate")

'select the milestoneA
GUI_List_ClickCheckbox objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfObject("swfname:=gvAvailableMilestones"), objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfScrollBar("swfname:=vPanelScrollBar"),"MilestoneA",0, True, False, "Single", True
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=AddMilestoneToTemplate").SwfButton("swfname:=btnSubmit")

'save the milestone template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'select the template CMtemA
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), Null, 1, "CMtemA", True, False, False, "Single"

'go to the Milestones tab
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabTemplates"), "Milestones"

'verify that the 1st and last milestone is Started and completion
intRowCount = objSettingWindow.SwfObject("swfname:=gvSequentialMilestones").Object.Items.Count
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvSequentialMilestones").Object.Items.Item(0).Text, "Started", "1st milestone", "Verify that 1st milestone is Started"
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvSequentialMilestones").Object.Items.Item(intRowCount - 1).Text, "Completion", "last milestone", "Verify that last milestone is Completion"

'click the Add template button
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnAddTemplate")

'verify the dropdown options in the Yes - condition for this template
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=radioCondition")
GUI_Object_ValidateProperty objSettingWindow.SwfComboBox("swfname:=comboType"), "all items", "Advanced Conditions" & chr(10) & "Loan Type" & chr(10) & "Loan Purpose", "Condition for the template - Yes"
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=radioGeneral")

'enter the template name and save the template
GUI_SwfEdit_Set objSettingWindow.SwfEdit("swfname:=txtName"), "Milestone Template"
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")
wait 3
'select the two milestone templates created above and activate them and verify if they got activated
intRowNumber = GUI_List_GetRowIndex(objSettingWindow.SwfObject("swfname:=gvTemplates"), 1, "Milestone Template")
GUI_List_ActonRow objSettingWindow.SwfObject("swfname:=gvTemplates"), intRowNumber, True, False, False, "Single"
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnStatus")
wait 3
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvTemplates").Object.Items.Item(intRowNumber).SubItems.Item(5).Text, "Active", "Status", "Verify status of the template Milestone template"
intRowNumber = GUI_List_GetRowIndex(objSettingWindow.SwfObject("swfname:=gvTemplates"), 1, "CMtemA")
GUI_List_ActonRow objSettingWindow.SwfObject("swfname:=gvTemplates"), intRowNumber, True, False, False, "Single"
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnStatus")
wait 3
FRM_VerifyEqual objSettingWindow.SwfObject("swfname:=gvTemplates").Object.Items.Item(intRowNumber).SubItems.Item(5).Text, "Active", "Status", "Verify status of the template Milestone template"
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")
