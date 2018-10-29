'@**************************************************************************************************
'@ TestStory: 
'@ TestCase: PTAC - 291 Performing operation in  Adv Search Filter AND/OR
'@ Test Automation JIRA Task: 
'@ TestData: Dashboard
'@ Pre-conditions: should have a created snapshot
'@ Description: Performing operation in Advance Search Filter AND/OR
'@ TestSteps:
   '1 Select a Snapshot from Snapshot list
   '2 Select "User table" in Snapshot tab
   '3 Click on Filters tab
   '4 Now Click on "Add" filter icon                                                        
   '5 Click on "Find Field" in Add/Edit search filter window and select required category
   '6 Click on Ok button
   '7 Select required data from "Operator" dropdown menu
   '8 Enter required inputs in "Value" input box
   '9 Now Click "Ok"
   '10 Click on created filter
   '11 Now Click "AND/OR" button
   '12 Add another filter
   '13 Click "AND/OR" button
   '14 Again Click "AND/OR" button
'@ ExpectedResult: Should Be Able To Apply AND/OR Filter
'***************************************************************************************************
	
FRM_Logger_ReportStepEvent "Start Test Case : PTAC - 291","Performing operation in Advance Search Filter AND/OR", Null

'Select Manage Snapshot And Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType "Personal Dashboard Templates"

'Create Snapshot And Adding Filters
strCreateSnap=BIZ_Dashboard_CreateSnapshot ("TC5_Dashboard_Setdata")
BIZ_Dashboard_AddingFilter "TC5_Dashboard_Setdata","Filters","TC1_Dashboard_Filterdata","Adding",strCreateSnap
BIZ_Dashboard_FilterOperations "TC1_Dashboard_Filterdata","TC2_Dashboard_Filterdata","Insert"
'wait 10
'Add filter & Editing
'BIZ_Dashboard_AddingFilter "TC5_Dashboard_Setdata","Filters","TC1_Dashboard_Filterdata","Adding",strCreateSnap
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-288","Editing Filter", Null
BIZ_Dashboard_FilterOperations "TC1_Dashboard_Filterdata","TC2_Dashboard_Filterdata","Edit"
wait 10
'Validates AND/OR Filter
'BIZ_Dashboard_SelectingFilterInListForEditOrDelete "TC1_Dashboard_Filterdata"
BIZ_Dashboard_SelectingFilterInListForEditOrDelete "TC2_Dashboard_Filterdata"
Dashboard_ValidateANDORFilter()
'Changing Between And / Or And Validation Part
Dashboard_ANDOR_Selection()
Dashboard_ANDOR_Selection()

'Select Parantheses And Validates
FRM_Logger_ReportStepEvent "Start Test Case : PTAC - 292","Performing operation in Advance Search Filter Parentheses", Null
'BIZ_Dashboard_SelectingFilterInListForEditOrDelete "TC1_Dashboard_Filterdata"
BIZ_Dashboard_SelectingFilterInListForEditOrDelete "TC2_Dashboard_Filterdata"
Dashboard_ParenthesesSelection()

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
'Select Manage Snapshot And Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType "Personal Dashboard Templates"

'msgbox "strCreateSnap"&strCreateSnap
'Create Snapshot And Adding Filter, Selecting All loan folders and returning to main function
FRM_Logger_ReportStepEvent "Start Test Case : PTAC - 286","Creating Folders area check to understand functionality of various radio buttons", Null
strCreateSnap2=BIZ_Dashboard_CreateSnapshot ("TC1_Dashboard_Setdata")
Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
GUI_List_ClickRow objMainView.SwfObject("swfname:=gvDirectory"), objMainView.SwfObject("swfname:=gvDirectory").SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateSnap, True, False, False, "Single"
GUI_SwfTab_Click objMainView.SwfTab("swfname:=tabDefineTemplate"), "Snapshot"

GUI_List_ClickRow objMainView.SwfObject("swfname:=gvDirectory"), objMainView.SwfObject("swfname:=gvDirectory").SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateSnap2, True, False, False, "Single"
GUI_SwfTab_Click objMainView.SwfTab("swfname:=tabDefineTemplate"), "Snapshot"
GUI_SwfComboBox_Select objMainView.SwfComboBox("swfname:=cboChartType"),"Trend Chart"
BIZ_Dashboard_AddingFilter "TC1_Dashboard_Setdata","Filters","TC1_Dashboard_Filterdata","Adding",strCreateSnap2
BIZ_Dashboard_SelectLoanFoldersToIncludeInSnapshot "Bar Chart","All loan folders"
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")

'Select Manage Snapshot And Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType "Personal Dashboard Templates"
BIZ_Dashboard_SelectingCreatedSnapshot strCreateSnap2
BIZ_Dashboard_SelectLoanFoldersToIncludeInSnapshot "Bar Chart","All loan folders except Archive folders"
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")

'Select Manage Snapshot And Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType "Personal Dashboard Templates"
BIZ_Dashboard_SelectingCreatedSnapshot strCreateSnap2
BIZ_Dashboard_SelectLoanFoldersToIncludeInSnapshot "Bar Chart","Select loan folders manually"

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
