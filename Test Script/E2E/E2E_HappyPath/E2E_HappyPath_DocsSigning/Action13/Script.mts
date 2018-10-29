'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase:  PTAC-1168  HP Docs Signing 3-Complete Docs Signing
'@ Test Automation JIRA Task: PTAC - 1174 - HappyPath_Docs Signing"
'@ TestData: NA
'@ Pre-conditions: 
'@ Description: Received signed Closing Docs
'@ TestSteps:
   '1 Under the log, click on the Doc signing milestone  
   '2 Click on the "Finished" milestone 
'@ ExpectedResult:
   '1 The Doc signing today should open 
   '2 The check box is selected
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1168","TestCase Name - HP Docs Signing 3-Complete Docs Signing", Null

'Click on Doc Signing alert 
BIZ_AlertsAndLog_ClickOnRecord "Log", "Docs Signing"

SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished").Set "On"