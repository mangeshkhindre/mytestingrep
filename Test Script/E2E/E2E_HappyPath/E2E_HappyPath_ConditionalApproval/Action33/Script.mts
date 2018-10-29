'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1143 HP Conditional Approval 7-Complete Conditional Approval
'@ Test Automation JIRA Task: PTAC - 1134 Happy Path Conditional Approval
'@ TestData: "Loans/Milestone/E2E_HapppyPath_ConditionalApproval"
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description: Order title and closing and finish milestone 
'@ TestSteps:
    '1 Click on Log tab > Conditional Approval and 
	'2 Click the magnifier icon next to the Loan Processor and select Processor user
    '3 Mark the ‘Finished’ checkbox. 
'@ ExpectedResult: 
	'1 The Processor user should be selected.
	'2 Conditional approval milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1143","TestCase Name - HP Conditional Approval 7-Complete Conditional Approval", Null

Dim objDataCondApp
Set objDataCondApp = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HapppyPath_ConditionalApproval")

BIZ_Loan_FinishMilestone_AssignUser "Cond. Approval", FRM_DS_GetValue(objDataCondApp, "NextUser")

Set objDataCondApp = Nothing



