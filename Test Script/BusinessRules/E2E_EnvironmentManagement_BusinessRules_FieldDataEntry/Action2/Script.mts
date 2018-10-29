'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Environment Management_Business Rule_E2E testcases->Field Data Entry
'@ Test Automation JIRA Task: TA-4833
'@ TestData: "BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC1_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC2_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC3_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC4_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC5_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC6_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC7_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC8_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC9_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC10_FieldDataEntry"
'			"BusinessRule_FieldDataEntry.xlsx", "RuleDetails", "TC11_FieldDataEntry"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 go to settings->Business Rules->Field Data Entry
	'2 Delete existing rule FieldDataEntry
	'3 Create a new rule <TC number>_FieldDataEntry
	'4 Activate the newly created rule
	'5 Close the settings
	'6 Login as sven_officer
	'7 Add a new blank loan
	'8 go to form Borrower Summary - Origination
	'9 Enter data in the form so as to trigger the rule
	'10 Enter data in the field 4000
	'11 Verify that a popup for the field 4001 pre-required data comes up
	'12 Close the popup
	'13 Login as admin
	'14 Delete already existing exported business rule file
	'15 go to settings->Business Rules->Field Data Entry
	'16 Export the newly created rule
	'17 Delete the rule which was just exported
	'18 Import the rule which was just exported and activate it
	'19 Close the settings
	'20 Login as sven_officer
	'21 Add a new blank loan
	'22 go to form Borrower Summary - Origination
	'23 Enter data in the form so as to trigger the rule
	'24 Enter data in the field 4000
	'25 Verify that a popup for the field 4001 pre-required data comes up
	'26 Close the popup
	'27 Login as admin
	
'@ ExpectedResult: 
'********************************************************************************************
strTC = Parameter("strTestcase")
strCondition = Parameter("strCondition")

Set objData = FRM_DS_GetTestData("BusinessRule_FieldDataEntry", "RuleDetails", strTC & "_FieldDataEntry")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then
	
FRM_Logger_ReportStepEvent strTC, "Field Data Entry Rule Export/Import " & strCondition, Null
'go to settings->Business Rules->Field Data Entry
BIZ_Nav_HierarchyTree "Business Rules", "Field Data Entry"
'Delete existing rule FieldDataEntry
BIZ_BR_FieldDataEntry_DeleteExisting "FieldDataEntry"
'Create a new rule <TC number>_FieldDataEntry
BIZ_BR_FieldDataEntry_CreateRule "FieldDataEntry", StrTC & "_FieldDataEntry"
wait 3
'Activate the newly created rule
BIZ_BR_FieldDataEntry_ActivateRule "FieldDataEntry"
'Close the settings
BIZ_Nav_Settings_Close()


	'Login as sven_officer
	BIZ_Login_UserLogin "sven_officer"
	
	'Add a new blank loan
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"
	'go to form Borrower Summary - Origination
	BIZ_Forms_Open "Borrower Summary - Origination"
	Set objData = FRM_DS_GetTestData("BusinessRule_FieldDataEntry", "RuleDetails", StrTC & "_FieldDataEntry")
	'Enter data in the form so as to trigger the rule
	If strTC = "TC2" Then
		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanPurpose")), "ON"
	ElseIf strTC = "TC3" Then
		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_37"), "sample"
	ElseIf strTC = "TC4" Then
		GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox4"), ""
		GUI_WinEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WinEdit("nativeclass:=Edit"), FRM_DS_GetValue(objData, "DocType")
		UTIL_Win_SendKey "{TAB}"
	ElseIf strTC = "TC5" Then
		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1401"), FRM_DS_GetValue(objData, "LoanProgram")
	ElseIf strTC = "TC6" Then
		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
	ElseIf strTC = "TC8" Then
		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_14"),  FRM_DS_GetValue(objData, "PropertyStateCode")
	ElseIf strTC = "TC9" Then
		If FRM_DS_GetValue(objData, "Rate") = "Unlocked" Then
			GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "OFF"
		Else
			GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "ON"
		End If
	ElseIf strTC = "TC10" Then
		GUI_SwfObject_SelectTab SwfWindow("swfname:=Mainform").SwfObject("swfname:=tabsLog"), "Log"
		If GUI_List_TextExists(SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), 0, FRM_DS_GetValue(objData, "Milestone")) Then
			GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone"), False, False, False, "Single"
		Else
			GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone") & " Expected", False, False, False, "Single"
		End If
		
		GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
		GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
		GUI_SwfCheckBox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"), "ON"
		BIZ_Forms_Open "Borrower Summary - Origination"
	ElseIf strTC = "TC11" Then
		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
	End If
	'Enter data in the field 4000
	GUI_WebButton_click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=PickList1")
	SwfWindow("swfname:=MainForm").SwfWindow("regexpwndtitle:=FieldRuleDropdownDialog","swfname:=FieldRuleDropdownDialog").SwfList("swfname:=listBoxValues").Select "test1" @@ hightlight id_;_12782740_;_script infofile_;_ZIP::ssf16.xml_;_
	'Verify that a popup for the field 4001 pre-required data comes up
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc"), 4, "Pre-required fields dialog"
	'Close the popup
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfButton("swfname:=closeBtn")
'	'Login as admin
'	BIZ_Login_UserLogin "sven_admin"
'
''Delete already existing exported business rule file
'strFilePath = PathFinder.Locate("Test Report\")
''UTIL_File_Delete strFilePath & "BR_FieldRules_FieldDataEntry.zip", False
'strFileName = "BR_FieldRules_FieldDataEntry_" &  UTIL_Date_FormatDateByPattern(Now(), "mmddyyyy-HHnnss") 
''go to settings->Business Rules->Field Data Entry
'BIZ_Nav_HierarchyTree "Business Rules", "Field Data Entry"
'FRM_Logger_ReportInfoEvent "Exporting the rule", "Exporting the rule FieldDataEntry", Null
''Export the newly created rule
'GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"), Null, "Name", "FieldDataEntry", True, False, False, "Single"
'GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=stdIconBtnExport")
'GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer").Dialog("text:=Save As"), 90
'GUI_WinEdit_Type SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer").Dialog("text:=Save As").WinEdit("attached text:=File name:", "nativeclass:=Edit"), strFilePath & strFileName
'UTIL_Win_Sendkey "{ENTER}"
'If strTC <> "TC11" Then
'	'Delete the rule which was just exported
'	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=stdIconBtnDelete")
'	GUI_Dialog_Encompass_Yes ""
'	Wait 2
'End If
'FRM_Logger_ReportInfoEvent "Importing the rule", "Importing the rule FieldDataEntry", Null
''Import the rule which was just exported and activate it
'Do
'	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=stdIconBtnImport")
'	GUI_WinEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Open").WinEdit("nativeclass:=Edit","attached text:=File &name:"), strFilePath & strFileName
'	GUI_WinButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Open").WinButton("text:=&Open")
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=ImportBusinessRuleDialog").SwfButton("swfname:=btnValidateImport")
'	If strTC = "TC11" Then
'		GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=ImportBusinessRuleDialog").Dialog("text:=Rule Import"), 20, "Import rule popup"
'		GUI_WinButton_Click  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=ImportBusinessRuleDialog").Dialog("text:=Rule Import").WinButton("text:=&Yes") 
'	End If
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=ImportBusinessRuleDialog").SwfButton("swfname:=btnValidateImport")
'	wait 5
'	bool = GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"), Null, "Name", "FieldDataEntry", True, False, False, "Single")
'	If bool and (strTC <> "TC11") Then
'		GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=activeBtn")
'	End If
'Loop While Not bool
'
''close the settings
'BIZ_Nav_Settings_Close()
'
'
'	'login as sven_officer
'	BIZ_Login_UserLogin "sven_officer"
'	
'	'Add a new blank loan
'	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'	'go to form Borrower Summary - Origination
'	BIZ_Forms_Open "Borrower Summary - Origination"
'	'Enter data in the form so as to trigger the rule
'	If strTC = "TC2" Then
'		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanPurpose")), "ON"
'	ElseIf strTC = "TC3" Then
'		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_37"), "sample"
'	ElseIf strTC = "TC4" Then
'		GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox4"), ""
'		GUI_WinEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WinEdit("nativeclass:=Edit"), FRM_DS_GetValue(objData, "DocType")
'		UTIL_Win_SendKey "{TAB}"
'	ElseIf strTC = "TC5" Then
'		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1401"), FRM_DS_GetValue(objData, "LoanProgram")
'	ElseIf strTC = "TC6" Then
'		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
'	ElseIf strTC = "TC8" Then
'		GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_14"),  FRM_DS_GetValue(objData, "PropertyStateCode")
'	ElseIf strTC = "TC9" Then
'		If FRM_DS_GetValue(objData, "Rate") = "Unlocked" Then
'			GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "OFF"
'		Else
'			GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "ON"
'		End If
'	ElseIf strTC = "TC10" Then
'		GUI_SwfObject_SelectTab SwfWindow("swfname:=Mainform").SwfObject("swfname:=tabsLog"), "Log"
'		If GUI_List_TextExists(SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), 0, FRM_DS_GetValue(objData, "Milestone")) Then
'			GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone"), False, False, False, "Single"
'		Else
'			GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone") & " Expected", False, False, False, "Single"
'		End If
'		
'		GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
'		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
'		GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
'		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
'		GUI_SwfCheckBox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"), "ON"
'		BIZ_Forms_Open "Borrower Summary - Origination"
'	ElseIf strTC = "TC11" Then
'		GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
'	End If
'	
'	'Enter data in field 4000
'	GUI_WebButton_click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=PickList1")
'	SwfWindow("swfname:=MainForm").SwfWindow("regexpwndtitle:=FieldRuleDropdownDialog","swfname:=FieldRuleDropdownDialog").SwfList("swfname:=listBoxValues").Select "test1" @@ hightlight id_;_12782740_;_script infofile_;_ZIP::ssf16.xml_;_
'	'Verify that a popup for the field 4001 pre-required data comes up
'	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfLabel("swfname:=labelDesc"), 4, "Pre-required fields dialog"
'	'Close the popup
'	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PreRequiredDialog").SwfButton("swfname:=closeBtn")
	'login as admin
	BIZ_Login_UserLogin "sven_admin"
	
	'go to settings->Business Rules->Field Data Entry
	BIZ_Nav_HierarchyTree "Business Rules", "Field Data Entry"
	'Delete existing rule FieldDataEntry
	BIZ_BR_FieldDataEntry_DeleteExisting "FieldDataEntry"
	
	'Close the settings
	BIZ_Nav_Settings_Close()
	
Set objData = Nothing


End if

