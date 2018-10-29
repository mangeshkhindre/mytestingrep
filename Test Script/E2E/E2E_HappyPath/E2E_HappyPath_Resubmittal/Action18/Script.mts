'@**************************************************************************************************
'@ TestStory: HP Resubmittal 3- Complete Resubmittal
'@ TestCase: PTAC-1153 - HP Resubmittal 3- Complete Resubmittal
'@ Test Automation JIRA Task: PTAC--1172
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on 'Log' tab > Resubmittal
	'2 Mark the ‘Finished’ checkbox. 
''@ ExpectedResult: 
	'1 Resubmittal today will open.
	'2 Should be able to check finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1153","TestCase Name - HP Resubmittal 3- Complete Resubmittal", Null

BIZ_AlertsAndLog_ClickOnRecord "Log", "Resubmittal"

GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"