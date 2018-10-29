'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARAM
'@ TestCase : PTAC- 2227 - Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2403 E2E_8VAPURARM_Approval
'@ TestData: 
    '1 Forms_TransmittalSummary, SetProperty and E2E_VAPURARM
    '2 Loans, MilestoneDocument and E2E_VAPURARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    'Click on 'log' tab and click on 'Approval' milestone.
    'Under document check the check box for Termite/Pest inspection.
    'Under tasks check the check box next to 'Appraisal review expected'.
    'Click on the magnifying lens next to closer and select 'JWCLOSER'.
'@ ExpectedResult: 
    'Approval worksheet will open.
    'Should be able to check the checkbox.
    'Should be able to check the checkbox.
    'jwcloser should be selected as closer.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2227","Approval 2 - Finish Approval milestone", Null

BIZ_AlertsAndLog_ClickOnRecord "Log","Approval"

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Approval")

BIZ_Document_AttachMandatoryDocuments "Approval", "E2E_VAPURARM_Approval"
BIZ_Loan_FinishMilestone_AssignUser "Approval", FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_VAPURARM"    
End If

BIZ_Loan_Exit "True"
BIZ_Login_UserLogout

Set objData = Nothing
