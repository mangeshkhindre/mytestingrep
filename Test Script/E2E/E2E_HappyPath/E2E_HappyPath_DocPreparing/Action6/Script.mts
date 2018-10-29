'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HappyPath
'@ TestCase: PTAC-1165 HP Doc Preparing 5-Complete Doc Preparation
'@ Test Automation JIRA Task: PTAC-1175
'@ TestData: None
'@ Pre-conditions: 
'@ Description: Complete Doc Preparation
'@ TestSteps:
	'1 Under log, select "Send to Doc Prep".
	'2 Click finished checkbox	
'@ ExpectedResult: 
	'1 The Doc Prep worksheet should open
	'2 checkbox should be selected
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1165 ","HP Doc Preparing 5-Complete Doc Preparation ", Null

BIZ_AlertsAndLog_ClickOnRecord "Log","Doc Preparation"

'Verify Doc preparation opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Doc Preparation.*"),_
True,"Doc Preparation Worksheet"

'Finish milestone
SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished").Set "ON"