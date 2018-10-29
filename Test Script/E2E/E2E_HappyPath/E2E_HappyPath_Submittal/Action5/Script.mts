'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1136  HP Submittal 4- Complete Submittal
'@ Test Automation JIRA Task: PTAC-1145
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  Complete Submittal
'@ TestSteps:
	'1 Click on 'Log' tab > Submittal.Click the magnifier icon next to the Underwriter user  and select "Underwriter" user
	'2 Mark the ‘Finished’ checkbox
'@ ExpectedResult: 
	'1 Should be able to finish the milestone and save
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC--1136","HP Submittal 4- Complete Submittal", Null

'Assign next user and click on Finished checkbox on Submittal worksheet
BIZ_Loan_FinishMilestone_AssignUser "Submittal", "underwriter"

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_HappyPath"
End If

