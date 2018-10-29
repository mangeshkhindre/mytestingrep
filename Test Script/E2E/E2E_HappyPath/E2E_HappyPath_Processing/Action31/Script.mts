'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1148 - Processing5_Assign Loan processor and finishing the milestone
'@ Test Automation JIRA Task: PTAC-1134 Order flood Certification
'@ TestData: 
	'1 Loans, Milestone, E2E_HappyPath_Processing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click the magnifier icon next to the Loan Processor and select Processor user  
	'2 Click Finished button
	'3 Click on ok
'@ ExpectedResult: 
	'1 The Processor user should be selected. 
	'2 The milestone cleared pop up should be displayed 
	'3 The pop-up should be closed.
	   'Note: If you get "Milestone log change" screen. then ignore this page and continue with next step 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1148","TestCase Name - Processing5_Assign Loan processor and finishing the milestone", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Processing")

BIZ_AlertsAndLog_ClickOnRecord "Log", "Processing"

GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"

Set objData = Nothing
