'@**************************************************************************************************
'@ TestStory: PTAC-1529 Re-Enforcement_Dashboard
'@ TestCase: PTAC-1462 , Verify Dashboard functionality -E2E
'@ Test Automation JIRA Task: PTAC-1509 E2E_Dashboard_VerifyFunctionality
'@ TestData: Dashboard, SnapShots and ManageSnapshot, TC1_Dashboard_Setdata
'@ Pre-conditions: 
   '1 User should be logged into Encompass with Admin Credentials
   '2 Under Pipeline > Create say 5 loans within a loan folder (e.g: TestDashboardFolder)
'@ Description: Create 5 loans under one folder, create snapshot and view 
'@ TestSteps:
   '1 create 5 loans under one folder
   '2 create one snapshot, with bar chart as filter and select that created loan folder
   '3 Create one view select the layout and verify
'@ ExpectedResult:
   '1 loans should be created
   '2 snapshot should be created with folder and with loan folder
   '3 view should be created with selected layout
'***************************************************************************************************

'Object Initialization & Declaration 
Dim objSnapshotMainWindow, objSettings, objFolders

Set objSnapshotMainWindow 	=	SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog")
Set objSettings 			= 	objSnapshotMainWindow.SwfObject("swfname:=gvDirectory")
Set objFolders				= 	objSnapshotMainWindow.SwfObject("swfname:=gvFolders")

' Select Dashboard Tab 
BIZ_Nav_SelectDashboardTab()
BIZ_Dashboard_DefaultViewAccessibilityCheck()

' Select Manage Snapshot and Dashboard Template Type 
'BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Public Dashboard Templates")
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Personal Dashboard Templates")

' Create snapshot 
strCreateSnapshot = BIZ_Dashboard_CreateSnapshot ("TC1_Dashboard_Setdata")
GUI_Object_WaitTillExistX objSettings , 240
GUI_List_ClickRow objSettings, objSettings.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateSnapshot, True, False, False, "Single"
GUI_Object_WaitTillExistX objSnapshotMainWindow , 240
GUI_SwfComboBox_Select objSnapshotMainWindow.SwfComboBox("swfname:=cboChartType","index:=0"), "Bar Chart"
GUI_SwfButton_Click objSnapshotMainWindow.SwfButton("swfname:=btnSave")
GUI_Object_WaitTillExistX objSettings , 240
GUI_List_ClickRow objSettings, objSettings.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateSnapshot, True, False, False, "Single"
GUI_SwfTab_Click objSnapshotMainWindow.SwfTab("swfname:=tabDefineTemplate") , "Folders"
'GUI_SwfButton_Click objSnapshotMainWindow.swfbutton("swfname:=btnUnselectAll")
'GUI_Object_WaitTillExistX objFolders , 240
'GUI_List_ClickCheckbox objFolders, objFolders.SwfScrollBar("swfname:=vPanelScrollBar"),Parameter("strCreateLoanFolder"),0, True, False, "Single", True
'GUI_SwfButton_Click objSnapshotMainWindow.SwfButton("swfname:=btnSave")
GUI_Window_Close objSnapshotMainWindow

Parameter("strCreateSnapshot")	=	strCreateSnapshot

' Releasing Objects
Set objSnapshotMainWindow 	=	Nothing
Set objSettings 			=	Nothing
Set objFolders 				=	Nothing
