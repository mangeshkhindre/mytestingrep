'@**************************************************************************************************
'@ TestStory: Deleting Dashboard view folder 
'@ TestCases:'PTAC-308 Deleting Dashboard view folder              
'@ Test Automation JIRA Task: 
'@ TestData: Dashboard ,SnapShots, TC1_Dashboard_Setdata
'@ Pre-conditions:
	'1. Go to the Dashboard tab,
	'2. Click ""Manage View"" button.
'@ Description:  
'@ TestSteps:
	'1. Select ""Personal"" from Folder list,
	'2. Create a folder,
	'3. Go to the created folder, create a view,
	'4. Click ""UpFolder"" button,
	'5. Click ""Delete"",
	'6. Go to the created folder, delete view
	'7. Click ""UpFolder"" button,
	'8. Click ""Delete"".
	'9. Click ""No"" on confirmation dialog box.
	'10.Click ""Yes"" on confirmation dialog box.
'@ ExpectedResult:
	'After Step 3, New ""View"" gets created.
	'After step 5, give message ""The folder 'Auto Snapshot Folder' cannot be deleted, because it is not empty.
	'After Step 6, ""View"" gets ""Delete"".
	'After Step 8, give message ""Are you sure want to delete this folder""?
	'After step 9,Folder still exists and appears.
	'After Step 10,The created folder gets ""Delete"" and  disappear from list."
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-308" ,"Deleting Dashboard view folder", Null

Dim objMain,objMainView

Set objMain     = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog")
Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog").SwfObject("swfname:=gvDirectory")

BIZ_Nav_SelectDashboardTab()
BIZ_Dashboard_DefaultViewAccessibilityCheck()
BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"

'Create manageview folder
strCreateViewFolder=BIZ_Dashboard_CreateManageViewFolder("TC1_Dashboard_Setdata","new","manageviewfolder")
GUI_List_ClickRow objMainView, objMainView.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateViewFolder, True, False, False, "Double"
'Creat Manage View
strCreateView=BIZ_Dashboard_CreateManageViewFolder("TC1_Dashboard_Setdata","new","manageview")
GUI_SwfObject_Click objMain.SwfObject("swfname:=stdIconBtnUpFolder")

'Delete Created Folder which is not empty
BIZ_Dashboard_DeleteManageViewFolder strCreateViewFolder,"Folder Not Empty"
GUI_List_ClickRow objMainView, objMainView.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateViewFolder, True, False, False, "Double"

'Delete Created manage view
BIZ_Dashboard_DeleteManageViewFolder strCreateView,"No|Yes"
GUI_SwfObject_Click objMain.SwfObject("swfname:=stdIconBtnUpFolder")

'Delete Created manage view Folder
BIZ_Dashboard_DeleteManageViewFolder strCreateViewFolder,"No|Yes"
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog")

Set objMain     =	Nothing
Set objMainView =   Nothing

