'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM 
'@ TestCase : PTAC-2365 Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2922 E2E_VANoCORefiARM_Approval
'@ TestData: 
    '1 Loans, Milestone and E2E_VANoCORefiARM_Approval
    '2 Loans, MilestoneDocument and E2E_VANoCORefiARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click on 'log' tab and click on 'Approval' milestone.
    '2 Under document check the check box for Termite/Pest inspection.
    '3 Under tasks check the check box next to 'Appraisal review expected'.
    '4 Click on the magnifying lens next to closer and select 'JWCLOSER'.
'@ ExpectedResult: 
    '1 Approval worksheet will open.
    '2 Should be able to check the checkbox.
    '3 Should be able to check the checkbox.
    '4 closer should be selected as jwcloser.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2365","Approval 2 - Finish Approval milestone", Null

BIZ_AlertsAndLog_ClickOnRecord "Log","Approval"
Dim objData
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_Approval")

BIZ_Document_AttachMandatoryDocuments "Approval", "E2E_VANoCORefiARM_Approval"
BIZ_Loan_FinishMilestone_AssignUser "Approval", FRM_DS_GetValue(objData, "NextUser")

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_VANoCORefiARM"
End If

BIZ_Loan_Exit "True"
BIZ_Login_UserLogout

Set objData = Nothing
