'@**************************************************************************************************
'@ TestStory: PTAC-1129 - E2E Happy Path
'@ TestCase: PTAC-1158 HP Approval 3- Complete Approval Process
'@ Test Automation JIRA Task: PTAC-1234  
'@ TestData: None
'@ Pre-conditions: 
'@ Description: Order title and closing and finish milestone
'@ TestSteps:
   '1 Click on Log tab >  Approval, Under the Documents section, Check checkbox the "Closing Disclosure Received" 
   '2 Click the magnifier icon next to the Loan Processor and select Processor user. 
   '3 Check the ‘Finished’ checkbox. 
'@ ExpectedResult: 
   '1 The Checkbox is selected.
   '2 The Processor user should be selected.Approval milestone is finished.
   '3 Conditional approval milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1158 ","HP Approval 3- Complete Approval Process", Null

BIZ_AlertsAndLog_ClickOnRecord "Log","Approval"

'Finish milestone
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"), "ON"
