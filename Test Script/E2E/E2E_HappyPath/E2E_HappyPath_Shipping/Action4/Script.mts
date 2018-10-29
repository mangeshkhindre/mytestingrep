'@**************************************************************************************************
'@ TestStory: HP Shipping 3- Complete Shipping- Loan file Complete 
'@ TestCase:  PTAC-1183 HP Shipping 3- Complete Shipping- Loan file Complete 
'@ Test Automation JIRA Task:  PTAC-1177 E2E_HappyPath_Shipping
'@ TestData: None
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Under the log, click on the Shipping milestone 
	'2 Click on magnifier icon next to "Closure" and select "All Users(Group)"
	'3 Click on the "Finished" milestone
'@ ExpectedResult: 
	'1 The Shipping worksheet should open
	'2 The selected user should be displayed
	'3 The check box is selected
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1183","HP Shipping 3- Complete Shipping- Loan file Complete", Null

BIZ_AlertsAndLog_ClickOnRecord "Log", "Shipping"

GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Shipping.*"),_
True,"Shipping Worksheet.*"

SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished").Set "ON"