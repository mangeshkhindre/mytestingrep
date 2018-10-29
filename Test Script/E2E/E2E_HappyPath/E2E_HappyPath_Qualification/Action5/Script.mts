'@********************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E 
'@ TestCase:  PTAC-1123 HP Qualification 4 - Assign Loan opener and Finish the milestone   
'@ Test Automation JIRA Task:  PTAC-1133
'@ TestData: 
	'1 Loans,Milestone,E2E_HappyPath_Qualification"
'@ Pre-conditions: 
'@ Description:  Assign Loan opener and Finish the milestone
'@ TestSteps:
	'1 Click on 'Qualification' and select 'cindy opener' as loan opener
	'2 Check the finished Checkbox
	'3 Click ok on milestone alert popup
'@ ExpectedResult: 
	'1 Should be able to finish the milestone
'***********************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1123","HP Qualification 4 - Assign Loan opener and Finish the milestone", Null

Dim objData

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Qualification")

'Assign next user for processing milestone
BIZ_Loan_AssignUser "NextUser", "Qualification", FRM_DS_GetValue(objData, "NextUser")

'Click on finished checkbox to complete the milestone
BIZ_Loan_CompleteQualification()

Dim boolFinished, strLEReceived

'Update borrower middle name if Milestone finished checkbox and LE Received validations are met
boolFinished = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"checked")


'LE Received Date
BIZ_Tools_Open "Disclosure Tracking"
strLEReceived=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname path:=txtDate;dpLEReceived;.*"),"text")


'Update borrower's middle name to MS2Complete if conditions are met
If UTIL_String_IsNotEmpty(strLEReceived) and boolFinished Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_HappyPath"	
End If

Set objData = Nothing
