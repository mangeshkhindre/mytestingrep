'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase:  PTAC-1171 HP Funding 3- Complete Funding
'@ Test Automation JIRA Task:  PTAC-1176 E2E_HappyPath_Funding
'@ TestData: NA
'@ Pre-conditions: 
'@ Description:  HP Funding 3- Complete Funding
'@ TestSteps:
	'1 Under the log, select funding.
	'2 Check the "Finished checkbox"
'@ ExpectedResult: 
	'1 Funding sheet should open. 
	'2 checkbox should be selected.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1171","HP Funding 3- Complete Funding",Null

BIZ_AlertsAndLog_ClickOnRecord "Log", "Funding"

GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Funding.*"),_
True,"Funding Worksheet.*"

'Finish milestone
SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished").Set "ON"