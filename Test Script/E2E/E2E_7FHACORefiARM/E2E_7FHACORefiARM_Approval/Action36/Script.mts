'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2683 FHACOREFIARM Approval 2 - Finish Approval milestone
'@ Test Automation JIRA Task: PTAC-2720 E2E_7FHACORefiARM_Approval
'@ TestData:
	'1 Forms_TransmittalSummary, SetProperty and E2E_FHACORefiARM
	'2 Loans, Milestone and E2E_FHACORefiARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on log tab and click on Approval milestone
   '2 Under document check the check box for Termite/Pest inspection
   '3 Under tasks check the check box next to Appraisal review expected	
   '4 Click on the magnifying lens next to closer and select 'JWCLOSER'
   '5 Click on finished checkbox. 
'@ ExpectedResult: 
   '1 Approval worksheet for Markus Tavauw will open
   '2 Should be able to check the checkbox
   '3 Should be able to check the checkbox
   '4 jwcloser should be selected as closer
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2683","FHACOREFIARM Approval 2 - Finish Approval milestone", Null

Dim objData

BIZ_TransmittalSummary_SetProperty "E2E_FHACORefiARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_Approval") 

BIZ_Loan_FinishMilestone_AssignUser  "Approval", FRM_DS_GetValue(objData, "NextUser")

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_FHACORefiARM"
End If

BIZ_Loan_Exit "True"

BIZ_Login_UserLogout

Set objData = Nothing
