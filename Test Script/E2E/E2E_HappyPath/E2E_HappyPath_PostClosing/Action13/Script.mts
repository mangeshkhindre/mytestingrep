'@**************************************************************************************************
'@ TestStory: PTAC-1129 - HAPPYPATH_E2E
'@ TestCase: PTAC-1180 - HP Post Closing 3- Complete Post-Closing
'@ Test Automation JIRA Task: PTAC-1173 E2E_HappyPath_PostClosing
'@ TestData: NA
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1  Under the log, click on the Post Closing milestone 
 	'2  Click on the "Finished" milestone
'@ ExpectedResult:
	'1  The Post closing today should open
	'2  The check box is selected
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1180","TestCase Name - PTAC-1180 - Complete Post-Closing", Null

BIZ_AlertsAndLog_ClickOnRecord "Log", "Post Closing"

If Not UTIL_String_IsEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname:=boxNextLA"),"text")) Then
	GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"
Else
	FRM_Logger_ReportFailEvent "Finish Post Closing Milestone","Users are not assigned for the Milestone", Null
End If
