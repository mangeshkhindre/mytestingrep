'@******************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1132 HP Submittal 2- Complete Underwriter Summary
'@ Test Automation JIRA Task: PTAC-1145
'@ TestData: 
    'Tools_UnderwriterSummary,UWP1_SetUnderWriterDetails,E2E_Submittal2
	'Tools_UnderwriterSummary,UWP2_SetHeaderData,E2E_Submittal2_UWp2
'@ Pre-conditions: 
'@ Description:  Complete Underwriter Summary
'@ TestSteps:
	'1 Go to 'Tools' tab and select 'Underwriter Summary'.Enter the data in 'Date' field.
	'2 Go to 'Escrow Information' - > 'Impounds Required' label and select 'Not Waived' from the drop down list.
	'3 Go to 'Underwriting Decision', and enter the test data.
'@ ExpectedResult: 
	'1 Should be able to enter data in Underwriter Summary and data should be displayed.
'********************************************************************************************************


FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1132", "HP Submittal 2- Complete Underwriter Summary", Null

'Open Tools >> Underwriter Summary
BIZ_Tools_Open "Underwriter Summary"

'Input Underwriter Summary details in page 1
BIZ_UnderwriterSummary_SetUnderWriterDetails "E2E_Submittal2"

If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("index:=0")._
    WebList("html id:=DropdownBox6"),"selection")) Then
	FRM_Logger_ReportPassEvent "Fill Underwriter Summary Page 1", "Test data is entered in 'Underwriter Summary' UW P1", Null
Else
	FRM_Logger_ReportFailEvent "Fill Underwriter Summary Page 1", "Test data is entered in 'Underwriter Summary' UW P1", Null
End If

'Input underwriter summary details in page 2
BIZ_UnderwriterSummary_SetAppraisalAUSDetails "E2E_Submittal2_UWp2"

If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("index:=0")._
    WebEdit("html id:=TextBox47"),"value")) Then
	FRM_Logger_ReportPassEvent "Fill Underwriter Summary Page 2", "Test data is entered in 'Underwriter Summary' UW P2", Null
Else
	FRM_Logger_ReportFailEvent "Fill Underwriter Summary Page 2", "Test data is entered in 'Underwriter Summary' UW P2", Null
End If
