'@****************************************************************************************** 
'@ TestSteps:
	'start of TC8
	'1 go to settings->company/user setup->Milestones
	'2 go to the tab Milestone Templates
	'3 Select the template CMtemA
	'4 go to the Roles tab for this template
	'5 click the Add milestonefreerole button
	'6 add a milestonefree role
	'7 save the milestone template
	'8 Close the settings
	'9 set loan type to FHA
	'10 save the loan
	'11 Manually apply the template CMtemA
	'12 click the select and continue button
	'13 select the apply button
	'14 Open Tools->File contacts
	'15 verify that the milestone free role is present in the file contacts
	'
'@****************************************************************************************** 


'*****************start of TC8***********************
FRM_Logger_ReportStepEvent "TC8_E2E_CustomMilestones", "Validate the testing of milestone roles", Null

Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to settings->company/user setup->Milestones
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"

'go to the tab Milestone Templates
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabMilestones"), "Milestone Templates"

'select the template CMtemA
GUI_List_ClickRow objSettingWindow.SwfObject("swfname:=gvTemplates"), objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar"), 1, "CMtemA", True, False, False, "Single"

'go to the Roles tab for this template
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabTemplates"), "Roles"

'click the Add milestonefreerole button
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdAddFreeRoleToTemplate")

'add a milestonefree role
If objSettingWindow.SwfWindow("swfname:=AddFreeRoleToTemplate").SwfObject("swfname:=gvAvailableRoles").Object.Items.Count > 0 Then
	GUI_List_ClickCheckboxByRowNum objSettingWindow.SwfWindow("swfname:=AddFreeRoleToTemplate").SwfObject("swfname:=gvAvailableRoles"), Null, 0, True, False, "Single", True	
End If 
GUI_SwfButton_Click objSettingWindow.SwfWindow("swfname:=AddFreeRoleToTemplate").SwfButton("swfname:=btnSubmit")

'Retrieve the names of all milestone free roles
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
intRownumber = GUI_List_GetRowIndex(objSettingWindow.SwfObject("swfname:=gvRoles"), 0, "----- Roles Not Tied to a Milestone -----")
numberOfFreeRoles = objSettingWindow.SwfObject("swfname:=gvRoles").Object.Items.Count - (intRownumber + 1)
ReDim arrFreeRoles(numberOfFreeRoles)
For i = 0 To (numberOfFreeRoles - 1)	
	arrFreeRoles(i) = objSettingWindow.SwfObject("swfname:=gvRoles").Object.Items.Item(intRowNumber + 1 + i).Text
Next

'save the milestone template
GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=btnSaveTemplate")

'close settings
GUI_SwfButton_Click objSettingWindow.SwfButton("swfname:=btnClose")

BIZ_Forms_Open "Borrower Summary - Origination"
'set loan type to FHA
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox20_Ctrl","value:=FHA"), "ON"

'save the loan
BIZ_loan_Save()

'Manually apply template CMtemA
BIZ_Nav_OpenMenuItem "Loan;Manage Milestone Templates...;Apply Milestone Template..."
GUI_List_ClickRow  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfObject("swfname:=gvTemplates"), Null, 0, "CMtemA", True, False, False, "Single"

'click the select and continue button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneTemplateSelector").SwfButton("swfname:=btnSelect")

'select the apply button
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MilestoneLogDiff").SwfButton("swfname:=btnSelect")
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation")) Then
	If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation").SwfObject("swfname:=gridViewUsers")) Then
		SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation").SwfObject("swfname:=gridViewUsers").Object.Items.Item(0).Subitems.Item(1).checked = False
	End If
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LogChangeConfirmation").SwfButton("swfname:=btnYes")
End If

'open Tools->File Contacts
BIZ_Tools_Open "File Contacts"
'verify that the milestone free roles are present in the file contacts
For i = 0 To (numberOfFreeRoles - 1)
	FRM_VerifyTrue GUI_List_TextExists(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewContacts"), 1, "Role - " & arrFreeRoles(i)), "Milestone free role " & arrFreeRoles(i), "Verify that milestone free role is present in File contacts"	
Next




