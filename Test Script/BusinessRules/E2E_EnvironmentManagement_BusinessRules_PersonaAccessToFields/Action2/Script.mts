'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Environment Management_Business Rule_E2E testcases->Persona Access to Fields
'@ Test Automation JIRA Task: TA-4833
'@ TestData: "BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC1_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC2_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC3_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC4_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC5_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC6_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC7_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC8_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC9_PersonaAccessToFields"
'			"BusinessRule_PersonaAccessToFields.xlsx", "RuleDetails", "TC10_PersonaAccessToFields"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 go to settings->Business Rules->Persona Access to Fields
	'2 Delete existing rule PersonaAccesstoFields
	'3 Create a new rule PersonaAccesstoFields
	'4 Activate the newly created rule
	'5 Close the settings
	'6 Login as sven_officer
	'7 Add a new blank loan
	'8 go to form Borrower Summary - Origination
	'9 Enter data in the form so as to trigger the rule
	'10 Verify that the First name field is readonly
	'11 Login as admin
	'12 Delete already existing exported business rule file
	'13 go to settings->Business Rules->Persona Access to Fields
	'14 Export the newly created rule
	'15 Delete the rule which was just exported
	'16 Import the rule which was just exported and activate it
	'17 Close the settings
	'18 Login as sven_officer
	'19 Add a new blank loan
	'20 go to form Borrower Summary - Origination
	'21 Enter data in the form so as to trigger the rule
	'22 Verify that the First name field is readonly
	'23 Login as admin
	
'@ ExpectedResult: 
'********************************************************************************************
strTC = Parameter("strTestcase")
strCondition = Parameter("strCondition")

Set objData = FRM_DS_GetTestData("BusinessRule_PersonaAccessToFields", "RuleDetails", strTC & "_PersonaAccessToFields" )
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If strExecutionFlag = "Y" Then
	
FRM_Logger_ReportStepEvent strTC, "Persona Access to Fields Rule Export/Import " & strCondition, Null
'go to settings->Business Rules->Persona Access to Fields
BIZ_Nav_HierarchyTree "Business Rules", "Persona Access to Fields"
'Delete existing rule PersonaAccesstoFields
BIZ_BR_PersonaAccesstoFields_DeleteExisting "PersonaAccesstoFields"
'Create a new rule PersonaAccesstoFields
BIZ_BR_PersonaAccesstoFields_CreateRule "PersonaAccesstoFields", StrTC & "_PersonaAccessToFields"
wait 3
'Activate the newly created rule
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=activeBtn")
'Close the settings
BIZ_Nav_Settings_Close()

'Login as sven_officer
BIZ_Login_UserLogin "sven_officer"

'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"
'go to form Borrower Summary - Origination
BIZ_Forms_Open "Borrower Summary - Origination"
Set objData = FRM_DS_GetTestData("BusinessRule_PersonaAccessToFields", "RuleDetails", StrTC & "_PersonaAccessToFields")
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

FRM_Logger_ReportInfoEvent "Validating that the rule is triggered", "Verify that the Borrower First name field is readonly", Null
'Verify that the First Name field is readonly
GUI_Object_ValidateProperty SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_36"), "readonly", "1", "Borrower first name"

''Login as admin
'BIZ_Login_UserLogin "sven_admin"
'
''Delete already existing exported business rule file
'strFilePath = PathFinder.Locate("Test Report\")
''UTIL_File_Delete strFilePath & "BR_FieldAccess_PersonaAccesstoFields.zip", False
'strFileName = "BR_FieldAccess_PersonaAccesstoFields_" &  UTIL_Date_FormatDateByPattern(Now(), "mmddyyyy-HHnnss") 
''go to settings->Business Rules->Persona Access to Fields
'BIZ_Nav_HierarchyTree "Business Rules", "Persona Access to Fields"
'FRM_Logger_ReportInfoEvent "Exporting the rule", "Exporting the rule PersonaAccessToFields", Null
''Export the newly created rule
'GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"), Null, "Name", "PersonaAccesstoFields", True, False, False, "Single"
'GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=stdIconBtnExport")
'GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer").Dialog("text:=Save As"), 90
'GUI_WinEdit_Type SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetupContainer").Dialog("text:=Save As").WinEdit("nativeclass:=Edit","attached text:=File name:"), strFilePath & strFileName
'UTIL_Win_Sendkey "{ENTER}"
'If strTC <> "TC11" Then
'	'Delete the rule which was just exported
'	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=stdIconBtnDelete")
'	GUI_Dialog_Encompass_Yes ""
'	Wait 2
'End If
'FRM_Logger_ReportInfoEvent "Importing the rule", "Importing the rule PersonaAccessToFields", Null
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
'	bool = GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"), Null, "Name", "PersonaAccesstoFields", True, False, False, "Single")
'	If bool and (strTC <> "TC11") Then
'		GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=activeBtn")
'	End If
'Loop While Not bool
'
''close the settings
'BIZ_Nav_Settings_Close()
'
''login as sven_officer
'BIZ_Login_UserLogin "sven_officer"
'
''Add a new blank loan
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
''go to form Borrower Summary - Origination
'BIZ_Forms_Open "Borrower Summary - Origination"
''Enter data in the form so as to trigger the rule
'If strTC = "TC2" Then
'	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanPurpose")), "ON"
'ElseIf strTC = "TC3" Then
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_37"), "sample"
'ElseIf strTC = "TC4" Then
'	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox4"), ""
'	GUI_WinEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WinEdit("nativeclass:=Edit"), FRM_DS_GetValue(objData, "DocType")
'	UTIL_Win_SendKey "{TAB}"
'ElseIf strTC = "TC5" Then
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1401"), FRM_DS_GetValue(objData, "LoanProgram")
'ElseIf strTC = "TC6" Then
'	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
'ElseIf strTC = "TC8" Then
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_14"),  FRM_DS_GetValue(objData, "PropertyStateCode")
'ElseIf strTC = "TC9" Then
'	If FRM_DS_GetValue(objData, "Rate") = "Unlocked" Then
'		GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "OFF"
'	Else
'		GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox5_Ctrl"), "ON"
'	End If
'ElseIf strTC = "TC10" Then
'	GUI_SwfObject_SelectTab SwfWindow("swfname:=Mainform").SwfObject("swfname:=tabsLog"), "Log"
'	If GUI_List_TextExists(SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), 0, FRM_DS_GetValue(objData, "Milestone")) Then
'		GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone"), False, False, False, "Single"
'	Else
'		GUI_List_ClickRow SwfWindow("swfname:=Mainform").SwfObject("swfname:=gvLog"), Null, 0, FRM_DS_GetValue(objData, "Milestone") & " Expected", False, False, False, "Single"
'	End If
'	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
'	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
'	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"), 0, True, False, False, "Double"
'	GUI_SwfCheckBox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"), "ON"
'	BIZ_Forms_Open "Borrower Summary - Origination"
'ElseIf strTC = "TC11" Then
'	GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=" & FRM_DS_GetValue(objData, "LoanType")), "ON"
'End If
'
'FRM_Logger_ReportInfoEvent "Validating that the rule is triggered", "Verify that the Borrower First name field is readonly", Null
''Verify that the First Name field is readonly
'GUI_Object_ValidateProperty SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_36"), "readonly", "1", "Borrower first name"

'login as admin
BIZ_Login_UserLogin "sven_admin"


Set objData = Nothing

End If


