'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1407 CONVNOCASHREFIARM Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-1782 E2E_1ConvNoRefiARM_Approval
'@ TestData:
   '1 Forms_TransmittalSummary, SetProperty and E2E_ConvNoRefiARM
   '2 Loans, Milestone and E2E_ConvNoRefiARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on log tab and click on Approval milestone
   '2 Under document check the check box for Termite/Pest inspection
   '3 Under tasks check the check box next to Appraisal review expected	
   '4 Click on the magnifying lens next to closer and select 'JWCLOSER'.
'@ ExpectedResult: 
   '1 Approval worksheet for Markus Tavauw will open
   '2 Should be able to check the checkbox
   '3 Should be able to check the checkbox
   '4 jwcloser should be selected as closer
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1407","Approval 2 - Finish Approval Milestone", Null

Dim objData

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_Approval") 

BIZ_Loan_FinishMilestone_AssignUser  "Approval", FRM_DS_GetValue(objData, "NextUser")

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_ConvNoRefiARM"
End If

BIZ_Loan_Exit "True"
BIZ_Login_UserLogout

Set objData = Nothing
