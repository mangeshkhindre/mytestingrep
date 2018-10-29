'@**************************************************************************************************
'@ TestStory: PTAC-1529 Re-Enforcement_Dashboard
'@ TestCase:  PTAC-1462 Verify Dashboard functionality -E2E
'@ Test Automation JIRA Task: PTAC-1509 E2E_Dashboard_VerifyFunctionality
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-1462_VerifyDashboardE2E
   '2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1462_VerifyDashboardE2E
   '3 Forms_BorrowerSummaryOrigination, SetCreditInformation, PTAC-1462_VerifyDashboardE2E
   '4 Forms_BorrowerSummaryOrigination, SetProperty, PTAC-1462_VerifyDashboardE2E
   '5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1462_VerifyDashboardE2E
   '6 Dashboard, SnapShots and ManageSnapshot, TC1_Dashboard_Setdata
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
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1509 ","Script Name: E2E_Dashboard_VerifyFunctionality", Null

'====== Login ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1462","Verify Dashboard functionality -E2E", Null

'====== Create Loan Folder ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strCreateLoanFolder = Settings_CreateLoanFolder ("LoanFolder_DashboardE2E" , "OFF" , "OFF")

'====== Create 5 Loans & Snapshot ====== 
RunAction "Dashboard_CreateNewLoanWithBorrowerInfo", oneIteration, strCreateLoanFolder, Parameter("strLoan")
strLoan	=	Parameter("strLoan")

RunAction "Dashboard_CreateSnapshot", oneIteration, strCreateLoanFolder, Parameter("strCreateSnapshot")
strCreateSnapshot	=	Parameter("strCreateSnapshot")

'====== Manage View Delete Folder Test case:37_Dashboard_View_Folder_Delete =============	

RunAction "ManageViewDeleteFolder", oneIteration
'RunAction "ManageViewDeleteFolder",OneIteration

'====== Select Dashboard Tab & Create Dashboard View ======
BIZ_Nav_SelectDashboardTab()
BIZ_Dashboard_DefaultViewAccessibilityCheck()
'BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Public"
'Select Manage Snapshot and Dashboard Template Type
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Personal Dashboard Templates")

'Create two Snapshots
'strCreateSnap1 = BIZ_Dashboard_CreateSnapshot ("TC1_Dashboard_Setdata")
strCreateSnap2 = BIZ_Dashboard_CreateSnapshot ("TC2_Dashboard_Setdata")

'Create Filter 
'msgbox "strCreateSnapshot"&strCreateSnapshot
'msgbox "strCreateSnap2"&strCreateSnap2
Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
Set objSettings = objMainView.SwfObject("swfname:=gvDirectory")
'GUI_List_ClickRow objSettings, objSettings.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreateSnapshot, True, False, False, "Single"

BIZ_Dashboard_AddingFilter "TC2_Dashboard_Setdata","Filters","TC2_Dashboard_Filterdata","Adding",strCreateSnap2
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog").SwfButton("swfname:=btnsave") 

'GUI_SwfTab_Click objMainView.SwfTab("swfname:=tabDefineTemplate"), "Snapshot"
BIZ_Dashboard_AddingFilter "TC1_Dashboard_Setdata","Filters","TC1_Dashboard_Filterdata","Adding",strCreateSnapshot
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog").SwfButton("swfname:=btnsave") 

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog")
BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"

'Create Dashboard View	
strCreateView = BIZ_Dashboard_CreateManageViewFolder("TC1_Dashboard_Setdata","new","manageview")
'BIZ_Dashboard_SelectingCreatedView strCreateView ' francesca
'BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Public Dashboard Templates", strCreateSnapshot , "1", "Current Year", "yes"

'Set As Default
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-309" ,"Creating a Dashboard View folder and setting it as a Default and Selecting First layouts", Null
BIZ_Dashboard_ManageView_SetAsDefault strCreateView
BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Personal Dashboard Templates",strCreateSnapshot,"1","Last 365 Days","yes"

'FRM_Logger_ReportStepEvent "Start Test Case: PTAC-310 " ,"Selecting First layouts from Dashboard View Folder", Null
'BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"
'Create Dashboard View	
'strCreateView = BIZ_Dashboard_CreateManageViewFolder("TC1_Dashboard_Setdata","new","manageview")
'BIZ_Dashboard_SelectingCreatedView strCreateView
'BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Personal Dashboard Templates",strCreateSnapshot,"1","Last 365 Days","yes"

'BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Personal Dashboard Templates",strCreateSnapshot,"1","Last 365 Days","yes"

'Selecting layout
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-311" ,"Selecting multi layouts from Dashboard View Folder", Null
BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"

'Create Dashboard View	
strCreateView2 = BIZ_Dashboard_CreateManageViewFolder("TC1_Dashboard_Setdata","new","manageview")
BIZ_Dashboard_SelectingCreatedView strCreateView2

'Selecting layout
BIZ_Dashboard_ManageView_Layout "2"
BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Personal Dashboard Templates",strCreateSnapshot,"1","Last 365 Days","no"
BIZ_Dashboard_SelectLayoutSnapshotAndTimeFrame "Personal Dashboard Templates",strCreateSnap2,"2","Previous 24 months","Yes"
'====== Creating Manage View Test case:040_Dashboard_View_Folder_Select_Last_Layout ========
'RunAction "ManageViewLayoutMulti",OneIteration

'====== Deletes View ======

BIZ_Nav_SelectDashboardTab()
BIZ_Dashboard_DefaultViewAccessibilityCheck()
BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"
BIZ_Dashboard_DeleteManageView strCreateView, "yes"
'BIZ_Dashboard_DeleteManageViewFolder strCreateView, "yes"
GUI_Object_WaitTillExistX SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("swfname:=btnCancel"), 120
GUI_SwfButton_Click SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("swfname:=btnCancel")


'Deletes sec view=================
BIZ_Dashboard_DefaultViewAccessibilityCheck()
BIZ_Dashboard_ClickManageViewAndSelectTemplateFolderType "Personal"
BIZ_Dashboard_DeleteManageViewFolder strCreateView2, "yes"
GUI_Object_WaitTillExistX SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("swfname:=btnCancel"), 120
GUI_SwfButton_Click SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("swfname:=btnCancel")

'====== Deletes Snapshot ======
BIZ_Dashboard_DefaultViewAccessibilityCheck()
'BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Public Dashboard Templates")
BIZ_Dashboard_ClickManageSnapShotAndSelectTemplateFolderType("Personal Dashboard Templates")
BIZ_Dashboard_DeleteSnapshot strCreateSnapshot,"yes"
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog"), 120
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog")

'====== Delete Loans ======
BIZ_Pipeline_SelectLoanFolder strCreateLoanFolder
BIZ_Loan_DeleteLoan()
BIZ_Loan_DeleteLoan()
BIZ_Loan_DeleteLoan()
BIZ_Loan_DeleteLoan()
BIZ_Loan_DeleteLoan()

'====== Go To Home Tab & Logout Of Encompass======
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()

FRM_RT_TeardownTest(Null)

Function BIZ_Dashboard_DeleteManageView(strCreatedManageViewFolder,boolDeleteYesOrNo)

	FRM_Logger_ReportInfoEvent "Manage View/Folder Deletion ","Dashboard Manage View/Folder Deletion Using Created View/Folder named : '"&strCreatedManageViewFolder&"'", Null	
	
	Dim objMain,objListView
	
	Set objMain     = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardTemplateFormDialog|DashboardViewTemplateFormDialog")
	Set objListView = objMain.swfobject("swfname:=gvdirectory")
	'GUI_List_ClickRow objListView, objListView.SwfScrollBar("swfname:=vPanelScrollBar"),0, strCreatedManageViewFolder, True, False, False, "Single"
	
	GUI_List_ClickRow objListView, objListView.SwfScrollBar("swfname:=vPanelScrollBar"), 0, strCreatedManageViewFolder, True, False, False, "Single"
	GUI_Object_WaitTillExist objListView
	
	Select Case UCase(boolDeleteYesOrNo)
		
		
		   Case UCase("yes")		'@	yes Process
				GUI_Object_WaitTillExistX objMain,100
				GUI_SwfButton_Click objMain.SwfObject("swfname:=btnDelete")
			
				If GUI_Object_IsExistX (objMain.Dialog("text:=Encompass"),60) Then		'@ To handle unexpected popups (Some instances) 					
				   GUI_Dialog_Encompass_Yes "Are you sure you want to delete .*" 
				   FRM_Logger_ReportPassEvent "Encompass Dialog Box Existance","Encompass Dialog Delete confirmation message is displayed", Null
				   Wait g_ShortWaitMedium		'@ Due To Sync Issues We Are Calling Wait Statement Explicitly
				   If Dialog("text:=Encompass","height:=152").Exist(5) Then
						GUI_WinButton_Click Dialog("text:=Encompass","height:=152").WinButton("text:=&Yes")
				   End If
				   wait 10
				   If GUI_List_TextExists2 (objListView,"Name",strCreatedManageViewFolder) Then
					  FRM_Logger_ReportFailEvent "Dashboard Manage View/folder Deletion","Dashboard Manage View/folder named '"&strCreatedManageViewFolder&"' not deleted", Null
				   Else
					  FRM_Logger_ReportPassEvent "Dashboard Manage View/folder Deletion","Dashboard Manage View/folder deleted with name : '"&strCreatedManageViewFolder&"'", Null			 			 
				   End If 
				
				Else
				   FRM_Logger_ReportFailEvent "Encompass Dialog Box Existance","Encompass Dialog Delete confirmation message is not displayed", Null	
				End If
			
		   
			
	End Select
	
	Set objMain		 = Nothing
	Set objListView  = Nothing
				
End Function

Function GUI_List_TextExists2(objMainView, intColNumOrText, strSearchText)

	If GUI_List_GetRowIndex2(objMainView, intColNumOrText, strSearchText) <> -1 Then
		GUI_List_TextExists2 = True
		FRM_Logger_ReportPassEvent "Verify Text", "Verify text exists in column " & """" & intColNumOrText & """" & ", Expected Value="&strSearchText, Null
	Else
		GUI_List_TextExists2 = False
	End If		
End Function

Function GUI_List_GetRowIndex2(objMainView, intColNumOrText, strSearchText)

    If IsNumeric(intColNumOrText)Then
        intColNum = CInt(intColNumOrText)
    Else
        intColNum = GUI_List_GetColumnIndex(objMainView, intColNumOrText)
    End If
	
	intRowNum = -1	
	' Check the expect item whether exist in the list
	intRowCount = objMainView.Object.Items.Count
	For i = 0 To intRowCount  - 2
		strActualText = objMainView.Object.Items.Item(i).Subitems.Item(intColNum).Text
		If LCase(strActualText) = LCase(strSearchText) Then
			intRowNum = i
			Exit For
		End If	
	Next
	GUI_List_GetRowIndex2 = intRowNum
End Function




