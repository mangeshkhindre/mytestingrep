'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E  
'@ TestCase:  PTAC-1106 HP Qualification 2-Fill 2015 Itemization  
'@ Test Automation JIRA Task:  PTAC-1133
'@ TestData: 
    '1 Forms_2015Itemization,Set800Section,E2E_HPQualification3
    '2 Forms_2015Itemization,Set900Section,E2E_HPQual3
    '3 Forms_2015Itemization,Set1000Section,E2E_HPQual3
	'4 Forms_2015Itemization,Set1100Section,E2E_HPQual3
	'5 Forms_2015Itemization,Set1200Section,E2E_HPQual3
'@ Pre-conditions: 
'@ Description:  Fill 2015 Itemization
'@ TestSteps:
	'1 In forms, select 2015 Itemization form 
	'2 Enter test data
'@ ExpectedResult: 
	'1 2015 Itemization Form should open. Test data should be entered
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1106","HP Qualification 2-Fill 2015 Itemization", Null

'Open 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"

'Input section 800 test data
BIZ_2015Itemization_Set800Section "E2E_HPQualification3"

'Input section 900 test data
BIZ_2015Itemization_Set900Section "E2E_HPQual3"

'Input section 1000 test data
BIZ_2015Itemization_Set1000Section "E2E_HPQual3"

'Input section 1100 test data
BIZ_2015Itemization_Set1100Section "E2E_HPQual3"

'Input section 1200 test data
BIZ_2015Itemization_Set1200Section "E2E_HPQual3"

If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm")._
    Page("title:=.*","index:=0").WebEdit("html id:=TextBox35"),"value")) Then
	FRM_Logger_ReportPassEvent "Fill 2015 Itemization", "Details are entered in 2015 Itemization form", Null
Else
	FRM_Logger_ReportFailEvent "Fill 2015 Itemization", "Details are entered in 2015 Itemization form", Null
End If
