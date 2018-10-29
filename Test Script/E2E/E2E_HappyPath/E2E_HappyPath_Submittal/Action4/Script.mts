'@******************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1135 HP Submittal 3- Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-1145
'@ TestData: Forms_TransmittalSummary,SetProperty,E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  Complete Transmittal Summary
'@ TestSteps:
	'1 Note: Under the forms, check the checkbox "Show All") -> Go to 'Forms' tab and select 'Transmittal Summary'
	'2 Select the 'Risk assessment' as per the test data.
	'3 Select the 'Property Form Type' from drop down list.
	'4 Select the 'Property Review'from drop down list.
	'5 Enter the Underwriter comments.Click on 'Save' button.
'@ ExpectedResult: 
	'1 Transmittal Summary page changes are saved.
'********************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1135", "HP Submittal 3- Complete Transmittal Summary", Null

'Set Show all checkbox under forms tab
BIZ_Forms_ShowAll

'Open Transmittal Summary and input propery section
BIZ_TransmittalSummary_SetProperty "E2E_HappyPath"

'Set Escrow T&I checkbox in Transmittal Summary
GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox26_Ctrl"), "ON"

If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("index:=0")._
    WebEdit("html id:=l_1216"),"value")) Then
	FRM_Logger_ReportPassEvent "Fill Transmittal Summary", "Test data is entered in 'Transmittal Summary' form", Null
Else
	FRM_Logger_ReportFailEvent "Fill Transmittal Summary", "Test data is entered in 'Transmittal Summary' form", Null
End If
