'@****************************************************************************************** 
'@ TestSteps:
	'Login to Encompass
	'1 start of TC1
	'2 go to settings->Company/User setup->Milestones
	'3 verify that default tab is "Milestones"
	'4 verify that Current milestones radio button is selected by default
	'5 click the button to add new milestone
	'6 Verify that Milestone details window comes up
	'7 Enter the milestone name
	'8 validate the As shown in log field
	'9 validate the default color of the milestone
	'10 verify that milestone role is blank by default
	'11 verify that days to finish is 0 by default
	'12 click the glass icon to the right of Field summary form
	'13 verify that Select an input form window comes up
	'14 Validate that the checkbox for assigning loan team member to this milestone is unchecked by default
	'15 save the changes to the milestone
	'16 Verify that E2E_MilestoneA is created successfully
	'17 Create a new milestone milestoneB
	'
	'
	'1 start of TC2
	'2 'validate the presence of Archive button
	'3 select Milestone B
	'4 click the Archive button
	'5 verify that milestone B is removed from the current milestone list
	'6 verify that milestoneB is present in the Archived milestones list	
'********************************************************************************************



'*************start of TC1****************************
FRM_Logger_ReportStepEvent "TC1_E2E_CustomMilestones", "Validate the creation of milestones", Null

'go to settings->Company/USer setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'verify that default tab is "Milestones"
strDefaultTab = objSettingWindow.SwfTab("swfname:=tabMilestones").GetSelection()
FRM_VerifyEqual strDefaultTab, "Milestones", "Default tab", "Verify that the default tab is Milestones"

'verify that Current milestones radio button is selected by default
GUI_Object_ValidateChecked objSettingWindow.SwfRadioButton("swfname:=rdbCurrent"), True, "Current Milestones radio button"
If GUI_List_TextExists(objSettingWindow.SwfObject("swfname:=gvMilestones"), 0, "E2E_MilestoneA")  Then
	boolExists = True
	GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvMilestones"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 0, "E2E_MilestoneA", True, False, False, "Single"
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnEditMilestone")
Else
	boolExists = False
	'click the button to add new milestone
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnNewMilestone")
End If

Set objMilestoneDetails = objSettingWindow.SwfWindow("swfname:=MilestonePropertiesForm")
'Verify that Milestone details window comes up
GUI_Object_ValidateExists objMilestoneDetails, 5, "Milestone details window"

'Enter the milestone name
GUI_SwfEdit_Set objMilestoneDetails.SwfEdit("swfname:=txtName"), "E2E_MilestoneA"

'validate the As shown in log field
GUI_Object_ValidateText objMilestoneDetails.SwfEdit("swfname:=txtDisplayBefore"), "E2E_MilestoneA expected", "As shown in log field"
GUI_Object_ValidateText objMilestoneDetails.SwfEdit("swfname:=txtDisplayAfter"), "E2E_MilestoneA finished", "As shown in log field"
If boolExists Then
	'validate the default color of the milestone
	FRM_VerifyEqual objMilestoneDetails.SwfObject("swfname:=icoColor").Object.PrimaryColor, "Color [A=255, R=0, G=0, B=255]", "Verify default color of the milestone", "Verify default color of the milestone is blue"
Else
	'validate the default color of the milestone
	FRM_VerifyEqual objMilestoneDetails.SwfObject("swfname:=icoColor").Object.PrimaryColor, "Color [Blue]", "Verify default color of the milestone", "Verify default color of the milestone is blue"
End If

'verify that milestone role is blank by default
GUI_Object_ValidateSelection objMilestoneDetails.SwfComboBox("swfname:=cboRoles"), "", "Milestone Role"

'verify that days to finish is 0 by default
GUI_Object_ValidateText objMilestoneDetails.SwfEdit("swfname:=txtDays"), "0", "Milestone - Days to finish"

'click the glass icon to the right of Field summary form
GUI_SwfObject_Click objMilestoneDetails.SwfObject("swfname:=btnSelect")

'verify that Select an input form window comes up
GUI_Object_ValidateExists objMilestoneDetails.SwfWindow("swfname:=InputFormSelector"), 5, "Select input form window"
GUI_SwfButton_Click objMilestoneDetails.SwfWindow("swfname:=InputFormSelector").SwfButton("swfname:=btnCancel")

'Validate that the checkbox for assigning loan team member to this milestone is unchecked by default
GUI_Object_ValidateChecked objMilestoneDetails.SwfCheckBox("swfname:=chkRoleRequired"), False, "Checkbox for assigning a loan team member to this milestone"

'save the changes to the milestone
GUI_SwfButton_Click objMilestoneDetails.SwfButton("swfname:=btnSave")
Set objMilestoneList = objSettingWindow.SwfObject("swfname:=gvMilestones")

'Verify that E2E_MilestoneA is created successfully
FRM_VerifyEqual GUI_List_TextExists(objMilestoneList, 0, "E2E_MilestoneA"), True, "Verify if E2E_MilestoneA created", "Verify if E2E_MilestoneA created" 
If Not GUI_List_TextExists(objSettingWindow.SwfObject("swfname:=gvMilestones"), 0, "E2E_MilestoneB")  Then
	GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=rdbArchived")
	If Not GUI_List_TextExists(objMilestoneList, 0, "E2E_MilestoneB ") Then
		GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=rdbCurrent")
		'Create a new milestone milestoneB
		GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnNewMilestone")
		GUI_SwfEdit_Set objMilestoneDetails.SwfEdit("swfname:=txtName"), "E2E_MilestoneB"
		GUI_SwfButton_Click objMilestoneDetails.SwfButton("swfname:=btnSave")
	Else
		GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=rdbCurrent")
	End If
End If





'*************start of TC2*************************
FRM_Logger_ReportStepEvent "TC2_E2E_CustomMilestones", "Validate the archival of milestones", Null

Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objMilestoneList = objSettingWindow.SwfObject("swfname:=gvMilestones")

'validate the presence of Archive button
GUI_Object_ValidateExists objSettingWindow.SwfButton("swfname:=btnArchive"), 2, "Archive button"
Set objScrollBar = objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar")
If GUI_List_TextExists(objSettingWindow.SwfObject("swfname:=gvMilestones"), 0, "E2E_MilestoneB")  Then
	'select Milestone B
	GUI_List_ClickRow objMilestoneList, objScrollBar, 0, "E2E_MilestoneB", True, False, False, "Single"
	'click the Archive button
	GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnArchive")
	'verify that milestone B is removed from the current milestone list
	FRM_VerifyEqual GUI_List_TextExists(objMilestoneList, 0, "E2E_MilestoneB"), False, "Verify E2E_MilestoneB removed", "Verify if E2E_MilestoneB is removed from current milestones list" 
End If

'verify that milestoneB is present in the Archived milestones list
GUI_SwfRadioButton_Click objSettingWindow.SwfRadioButton("swfname:=rdbArchived")
FRM_VerifyEqual GUI_List_TextExists(objMilestoneList, 0, "E2E_MilestoneB "), True, "Verify E2E_MilestoneB is Archived", "Verify if E2E_MilestoneB is present in archived milestones list" 

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")
