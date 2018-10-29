'@**************************************************************************************************
'@ TestStory: Automate E2E_BusinessRule_Milestone Completion
'@ TestCase: Milestone Completions Rule without Conditon
'			 Milestone Completions Rule Set "Loan Purpose" Condition
'			 Milestone Completions Rule Set "Advanced Conditions" Condition
'			 Milestone Completions Rule Set "Doc Type" Condition
'			 Milestone Completions Rule Set "Loan Program" Condition
'			 Milestone Completions Rule Set "Loan Type" Condition
'			 Milestone Completions Rule Set "Loan Status" Condition
'			 Milestone Completions Rule Set "Property State" Condition
'			 Milestone Completions Rule Set "Rate" Condition
'			 Milestone Completions Rule Set "Current Role" Condition
'@ Test Automation JIRA Task: TA-4852 Automate E2E_BusinessRule_Milestone Completion
'@ TestData:	BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS1
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS2
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS3
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS4
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS5
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS6
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS7
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS8
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS9
'				BusinessRule_MilestoneCompletion, SetMilestoneCompletion, E2E_Setdata_TS10
'				
'@ Pre-conditions: NA
'@ Description:  
	'@ Test Step
	'1. Login to Encompass
	'2. Navigate to through Encompass Settings -> Business Rules -> Milestone Completion
	'3. Click New button to create new business rule
	'4. Enter business rule name
	'5. Select Channels
	'6. Select Conditon as "No" 
	'7. Click on Add button
	'8.Select Condition Type as "Preliminary".
	'9.Select condition name "Flood Letter" and click on Add button.
	'10. Click on Save button	
	'11. Verify the business rule and Activate new business rule
	'12. Create a new loan and click eFolder button,
	'13. Goto Condition Type seperately: Preliminary 
	'14. Click New icon, select "Add Milestone Completion", click OK button
	'15. Select some Conditions, click Add Selected button
	'16. Go to Business Rules and select business rule and click on Export button 
	'17. Select business rule and click on Delete button
	'18. Click on Import button
	'19. Select Business Rule XML
	'20. Click on Validata Dependencies button
	'21. Verify all the import fields are correct.
	'22. Click on Import Rule button
	'23. Activate Imported Rule
	'24. Create a new loan and click eFolder button,
	'25. Goto Condition Type seperately: Preliminary 
	'26. Click New icon, select "Add Milestone Completion", click OK button
	'27. Select some Conditions, click Add Selected button

'@Expected Results
	'-1) Verify "Milestone Completion" fucntionality in Business Rule is working fine.
'******************************************************************************************************************************************


Dim strRowId, strConditionName, strCondtition, strFileLocation

strRowId = "E2E_Setdata_TS" & Parameter("TestScenario")

Set objData = FRM_DS_GetTestData("BusinessRule_MilestoneCompletion", "SetMilestoneCompletion", strRowID)
strExecutionFlag = 	FRM_DS_GetValue(objData, "ExecutionFlag") 

If strExecutionFlag = "Y" Then
	
FRM_Logger_ReportStepEvent "Start new test case","Start BR scenario: " & Parameter("TestScenario"), Null
strConditionName = 	FRM_DS_GetValue(objData, "MilestoneCompletionName") 
strCondtition = FRM_DS_GetValue(objData, "ConditionName")

'===========Go to Settings -> Company/User Setup -> Milestones  ===============
BIZ_Nav_HierarchyTree "Company/User Setup", "Milestones"

GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvMilestones"),Null,"Milestone","Qualification",True, False,False,"Double"

strMilestoneName = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=MilestonePropertiesForm").SwfEdit("swfname:=txtDisplayBefore").GetROProperty("text")

SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=MilestonePropertiesForm").SwfButton("swfname:=btnCancel").Click

'========== Close the settings ============
BIZ_Nav_Settings_Close()

'===========Go to Settings -> Business Rules -> Milestone Completion ===============
BIZ_Nav_HierarchyTree "Business Rules", "Milestone Completion"

'========= Delete Milestone Completion =================
BIZ_BR_MilestoneCompletion_DeleteMilestoneCompletion strConditionName

'========= Create new Milestone Completion =================
BIZ_BR_MilestoneCompletion_CreateNew strRowId

'========= Activate Milestone Completion =================
BIZ_BR_AutomatedConditions_ActivateAutomatedCondition strConditionName

'====================Close Settings window ==========================
BIZ_Nav_Settings_Close

'=================== Login as cindy_officer =============
BIZ_Login_UserLogin "cindy_officer"

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

BIZ_Forms_Open "Borrower Summary - Origination"

If Parameter("TestScenario") = "2" Then
	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebCheckBox("html id:=__cid_CheckBox10_Ctrl"), "ON"
ElseIf Parameter("TestScenario") = "3" Then
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_37"), "s123"
ElseIf Parameter("TestScenario") = "4" Then	
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_1264"), "a"
	GUI_WinEdit_Type SwfWindow("swfname:=MainForm").Page("micclass:=Page").WinEdit("window id:=1001"), "(Q) One paystub"
ElseIf Parameter("TestScenario") = "5" Then
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_1401"), "30 Year Fixed"
ElseIf Parameter("TestScenario") = "6" Then
	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebCheckBox("html id:=__cid_CheckBox21_Ctrl"), "ON"
ElseIf Parameter("TestScenario") = "7" Then	
	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebList("html id:=DropdownBox1"), "Active Loan"
ElseIf Parameter("TestScenario") = "8" Then		
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_15"), "99682"
ElseIf Parameter("TestScenario") = "10" Then		
	BIZ_Nav_LogAlerts_SelectTab "Log"
	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	GUI_List_ClickRow objMainForm.SwfObject("swfname:=gvLog"),NULL,0,strMilestoneName,False,False,False,"Single"
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxCurrentLA")
	
	'==============Assign Loan officer====================
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"

	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")

	'=============Assign Processor=======================
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")

	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"

	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")

	'===================Finish the milestone=================
	GUI_SwfCheckbox_Set objMainForm.SwfCheckBox("swfname:=checkBoxFinished"),True
End If

If Parameter("TestScenario") <> "10" Then
	BIZ_Nav_LogAlerts_SelectTab "Log"
	
	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	GUI_List_ClickRow objMainForm.SwfObject("swfname:=gvLog"),NULL,0,strMilestoneName,False,False,False,"Single"
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxCurrentLA")
		
	'==============Assign Loan officer====================
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
	
	'=============Assign Processor=======================
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")
	
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
	
	'===================Finish the milestone=================
	objMainForm.SwfCheckBox("swfname:=checkBoxFinished").Click
	
	GUI_Dialog_VerifyStaticText SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Static("text:=Complete.*"),"Complete required items prior to finishing the milestone.","Dialog text"
	GUI_Dialog_Encompass_OK ""
	
	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetItemBounds(0).Height
	Y_axis = intItemHeight * 0.5 + 1
	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Click X_axis, Y_axis
	
	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetItemBounds(0).Height
	Y_axis = intItemHeight * 0.5 + 1
	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Click X_axis, Y_axis
	
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_36"), "Test"
	
	BIZ_Nav_LogAlerts_SelectTab "Log"
	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	If SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog").SwfScrollBar("swfname:=vPanelScrollBar").Exist Then
		SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog").SwfScrollBar("swfname:=vPanelScrollBar").PrevPage
	End If
	
	intRowNum = GUI_List_GetRowIndex (objMainForm.SwfObject("swfname:=gvLog"), 0, strMilestoneName)
	intRowNum = intRowNum + 2
	GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvLog"),intRowNum,False,False,False,"Single"
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxCurrentLA")
		
	'==============Assign Loan officer====================
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
	
	'=============Assign Processor=======================
	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")
	
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
	
	'===================Finish the milestone=================
	objMainForm.SwfCheckBox("swfname:=checkBoxFinished").Click

Else 
	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetItemBounds(0).Height
	Y_axis = intItemHeight * 0.5 + 1
	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Click X_axis, Y_axis
	
	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetItemBounds(0).Height
	Y_axis = intItemHeight * 0.5 + 1
	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Click X_axis, Y_axis
	
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_36"), "Test"
End if

BIZ_Loan_Exit False
BIZ_Login_UserLogout

''======== Login to the Encompass as Admin ========   
'BIZ_Login_UserLogin "admin_default"
'
''===========Go to Settings -> Business Rules -> Milestone Completion ===============
'BIZ_Nav_HierarchyTree "Business Rules", "Milestone Completion"
'
''=========== Export milestome =======================
'FRM_Logger_ReportInfoEvent "Export Milestone Completion", "Export Milestone Completion: " & strConditionName, null
'
'Set objMainContainer = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
'Set objScrollBar = objMainContainer.SwfScrollBar("swfname:=vPanelScrollBar")
'
'boolexist = GUI_List_ClickRow (objMainContainer.SwfObject("swfname:=listViewRule"), objScrollBar, 0, strConditionName, True, False, False, "Single")
'
'If boolexist Then
'	GUI_SwfObject_Click objMainContainer.SwfObject("swfname:=stdIconBtnExport")
'	GUI_Object_WaitTillExistX SwfWindow("swfname:=SetUpContainer").Dialog("text:=Save As"),30
'	'============================= Save the file in Test Report folder ============================
'	strFileLocation = FRM_RT_ReportDirPath & "BR_AutomatedCondition_" & strConditionName & "_" & UTIL_Date_Now_mmddyyyy_HHnnss
'	FRM_Logger_ReportInfoEvent "Save the file", "Save file at location: " & strFileLocation, Null
'	
'	Set myObj = Description.Create
'	myObj("micclass").value = "WinEdit"
'	myObj("attached text").value = "File name:"
'	Set objChildObject = SwfWindow("swfname:=MainForm").Swfwindow("swfname:=SetUpContainer").Dialog("text:=Save As").ChildObjects (myobj)
'	objChildObject(0).Type strFileLocation
'	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Swfwindow("swfname:=SetUpContainer").Dialog("text:=Save As").WinButton("text:=&Save")
'	
'	Set myObj = Nothing
'	Set objChildObject = Nothing
'Else
'	FRM_Logger_ReportInfoEvent "Export Milestone Completion", "Export Milestone Completion doesn't exist in Business Rule: " & strConditionName, null
'End If
'
'Set objMainContainer = Nothing
'Set objScrollBar = Nothing
'
''========= Delete Milestone Completion =================
'BIZ_BR_MilestoneCompletion_DeleteMilestoneCompletion strConditionName
'
''========= Import Milestone Completion =================
'BIZ_BR_MilestoneCompletion_ImportMilestoneCompletion strFileLocation
'
''========= Activate Milestone Completion =================
'BIZ_BR_AutomatedConditions_ActivateAutomatedCondition strConditionName
'
''====================Close Settings window ==========================
'BIZ_Nav_Settings_Close
'
''=================== Login as cindy_officer =============
'BIZ_Login_UserLogin "cindy_officer"
'
''======== Create new loan========
'FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'
'BIZ_Forms_Open "Borrower Summary - Origination"
'
'If Parameter("TestScenario") = "2" Then
'	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebCheckBox("html id:=__cid_CheckBox10_Ctrl"), "ON"
'ElseIf Parameter("TestScenario") = "3" Then
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_37"), "s123"
'ElseIf Parameter("TestScenario") = "4" Then	
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_1264"), "a"
'	GUI_WinEdit_Type SwfWindow("swfname:=MainForm").Page("micclass:=Page").WinEdit("window id:=1001"), "(Q) One paystub"
'ElseIf Parameter("TestScenario") = "5" Then
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_1401"), "30 Year Fixed"
'ElseIf Parameter("TestScenario") = "6" Then
'	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebCheckBox("html id:=__cid_CheckBox21_Ctrl"), "ON"
'ElseIf Parameter("TestScenario") = "7" Then	
'	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebList("html id:=DropdownBox1"), "Active Loan"
'ElseIf Parameter("TestScenario") = "8" Then		
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_15"), "99682"
'ElseIf Parameter("TestScenario") = "10" Then		
'	BIZ_Nav_LogAlerts_SelectTab "Log"
'	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
'	GUI_List_ClickRow objMainForm.SwfObject("swfname:=gvLog"),NULL,0,strMilestoneName,False,False,False,"Single"
'	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxCurrentLA")
'	
'	'==============Assign Loan officer====================
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
'
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
'
'	'=============Assign Processor=======================
'	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")
'
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
'
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
'
'	'===================Finish the milestone=================
'	GUI_SwfCheckbox_Set objMainForm.SwfCheckBox("swfname:=checkBoxFinished"),True
'End If
'
'If Parameter("TestScenario") <> "10" Then
'	BIZ_Nav_LogAlerts_SelectTab "Log"
'	
'	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
'	GUI_List_ClickRow objMainForm.SwfObject("swfname:=gvLog"),NULL,0,strMilestoneName,False,False,False,"Single"
'	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxCurrentLA")
'		
'	'==============Assign Loan officer====================
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
'	
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
'	
'	'=============Assign Processor=======================
'	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")
'	
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
'	
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
'	
'	'===================Finish the milestone=================
'	objMainForm.SwfCheckBox("swfname:=checkBoxFinished").Click
'	
'	GUI_Dialog_VerifyStaticText SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Static("text:=Complete.*"),"Complete required items prior to finishing the milestone.","Dialog text"
'	GUI_Dialog_Encompass_OK ""
'	
'	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
'	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetItemBounds(0).Height
'	Y_axis = intItemHeight * 0.5 + 1
'	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Click X_axis, Y_axis
'	
'	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
'	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetItemBounds(0).Height 
'	Y_axis = intItemHeight * 0.5 + 1
'	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Click X_axis, Y_axis
'	
'	BIZ_Forms_Open "Borrower Summary - Origination"
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_36"), "Test"
'	
'	BIZ_Nav_LogAlerts_SelectTab "Log"
'	Set objMainForm = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
'	If SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog").SwfScrollBar("swfname:=vPanelScrollBar").Exist Then
	'	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLog").SwfScrollBar("swfname:=vPanelScrollBar").PrevPage
'	End If

'	intRowNum = GUI_List_GetRowIndex (objMainForm.SwfObject("swfname:=gvLog"), 0, strMilestoneName)
'	intRowNum = intRowNum + 2
'	GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvLog"),intRowNum,False,False,False,"Single"
'	
'	'=============Assign Processor=======================
'	GUI_SwfObject_Click objMainForm.SwfObject("swfname:=pictureBoxNextLA")
'	
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Single"
'	
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfButton("swfname:=okBtn")
'	
'	'===================Finish the milestone=================
'	objMainForm.SwfCheckBox("swfname:=checkBoxFinished").Click
'Else 
'	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
'	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Object.GetItemBounds(0).Height
'	Y_axis = intItemHeight * 0.5 + 1
'	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewDocs").Click X_axis, Y_axis
'	
'	X_axis = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetSubItemBounds(0,1).Width * 0.01 + 20
'	intItemHeight = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Object.GetItemBounds(0).Height
'	Y_axis = intItemHeight * 0.5 + 1
'	SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewTasks").Click X_axis, Y_axis
'	
'	BIZ_Forms_Open "Borrower Summary - Origination"
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=l_36"), "Test"
'End if
'
'BIZ_Loan_Exit False
'BIZ_Login_UserLogout
'
'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"

'===========Go to Settings -> Business Rules -> Milestone Completion ===============
BIZ_Nav_HierarchyTree "Business Rules", "Milestone Completion"

'==================== Delete Milestone Completion ==========================
BIZ_BR_MilestoneCompletion_DeleteMilestoneCompletion strConditionName

'====================Close Settings window ==========================
BIZ_Nav_Settings_Close

End if 
