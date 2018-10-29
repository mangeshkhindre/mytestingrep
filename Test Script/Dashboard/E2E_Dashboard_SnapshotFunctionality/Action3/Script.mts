'@**************************************************************************************************
'@ TestStory: PTAC-849 Dashboard
'@ TestCase: PTAC-296 Add Coloumn
'@ Test Automation JIRA Task: PTAC-856 Dashboard_Snapshot_ColumnOperations
'@ TestData: Dashboard, Snapshots And ManageSnapshot
'@ Pre-conditions: 
'@ Description: Adding Column In Loan Table 
'@ TestSteps:
   '1 Create a snapshot
   '2 Select Loan Table from Chart Type dropdown menu
   '3 Click on Add field icon
   '4 Click on look-up field
   '5 Search the required field name and click find
   '6 Select the Category from the search and press Select button
   '7 Now press Ok button on Add/Edit Loan field
'@ ExpectedResult: Should Be Able To Add Column
'***************************************************************************************************



'Select Manage Snapshot and Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Personal Dashboard Templates")

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-296","Add Coloumn in Loan Table", Null
'Create snapshot
strCreateSnapshot = BIZ_Dashboard_CreateSnapshot ("TC3_Dashboard_Setdata")
BIZ_Dashboard_SelectingCreatedSnapshot strCreateSnapshot
BIZ_Dashboard_AddColumnInSnapshot "TC3_Dashboard_Filterdata", "Loan Table", "Add"

'Delete Column And Snapshot
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-300","Delete a loan table coloumn", Null
Dashboard_DeleteColumn "TC3_Dashboard_Filterdata","No|Yes"

'edit
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-297","Edit Coloumn in Loan Table", Null
BIZ_Dashboard_SelectAddedColumnInList "TC3_Dashboard_Filterdata"
BIZ_Dashboard_AddColumnInSnapshot "TC2_Dashboard_Filterdata", "Loan Table", "Edit"

'move up
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-298","Move Up records", Null
BIZ_Dashboard_AddColumnInSnapshot "TC3_Dashboard_Filterdata", "Loan Table", "Add"
Dashboard_MoveAndValidate "TC3_Dashboard_Filterdata","up"

'move down
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-299","Move Down records", Null
Dashboard_MoveAndValidate "TC3_Dashboard_Filterdata","down"

wait 5
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType "Personal Dashboard Templates"
'BIZ_Dashboard_DeleteSnapshot2 "Snapshot20182613226","Yes"
'Delete Snapshot
BIZ_Dashboard_DeleteSnapshot2 strCreateSnapshot,"Yes"
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")



Function BIZ_Dashboard_DeleteSnapshot2(strSnapShotName,boolDeleteYesOrNo)
	
	FRM_Logger_ReportInfoEvent "Delete Snapshot/Folder", "Delete operation on '"&strSnapShotName&"' ", Null
	
	Dim objDeleteSnapshot, objMainView, objYes, objNo, objDialogMain, boolExpectedSnapShotTxt
	
	Set objDeleteSnapshot = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog").SwfObject("swfname:=btnDelete")
	Set objMainView 	  = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog").SwfObject("swfname:=gvDirectory")
	Set objDialogMain 	  = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
	Set objYes 			  = Dialog("text:=Encompass","height:=145").WinButton("text:=&Yes")
	Set objNo 			  = Dialog("text:=Encompass","height:=145").WinButton("text:=&No")
	
	'GUI_List_ClickRow objMainView, objMainView.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strSnapShotName, True, False, False, "Single"
	GUI_List_ClickRow objMainView, objMainView.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strSnapShotName, True, False, False, "Single"

	GUI_SwfButton_Click(objDeleteSnapshot)
	
	Select Case UCase(boolDeleteYesOrNo)
		   	
		   Case UCase("Yes")
		   GUI_WinButton_Click(objYes)
		   Wait g_ShortWaitMedium		'@ Due To Sync Issues We Are Calling Wait Statement Explicitly
		   boolExpectedSnapShotTxt = GUI_List_TextExists (objMainView,"Name",strSnapShotName)
				
		   If boolExpectedSnapShotTxt Then
			  FRM_Logger_ReportFailEvent "Validate Snapshot/Folder deletion", "Selected Snapshot/Folder '"&strSnapShotName&"' Not deleted", Null
		   Else
			  FRM_Logger_ReportPassEvent "Validate Snapshot/Folder deletion", "Selected Snapshot/Folder '"&strSnapShotName&"' deleted", Null
		   End If
			
	End Select	
		
	Set objDeleteSnapshot = Nothing
	Set objMainView	 	  = Nothing
	Set objYes	 		  = Nothing
	Set objNo             = Nothing
	Set objDialogMain	  = Nothing
	
End Function
