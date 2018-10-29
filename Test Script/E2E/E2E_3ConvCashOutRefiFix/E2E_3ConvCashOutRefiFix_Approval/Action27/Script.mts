'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3325 CONVCASHOUTREFIFIX Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-3378 E2E_3CONVCASHOUTREFIFIX_Approval
'@ TestData: 
   '1 Global_Data, Login, E2E_marksuw
   '2 Loans, LoanTemplate, E2E_Underwriter
   '3 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Approval
   '4 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as Markusuw.click accept file button. click ok
   '2 Under tools tab click underwriter summary
   '3 Click UWP2 In the top right and fill the following fields as in test data
'@ ExpectedResult: 
   '1 Milestone alert has been cleared will pop up
   '2 Underwriter summary will open
   '3 Should be able to enter all dates
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3325","CONVCASHOUTREFIFIX Approval 1 - Fill underwriter Summary", Null

Dim ObjData, objDataUser
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'====== Search the Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_CONVCASHOUTREFIFIX","Approval"

'==== Click on "Accept File" button and click OK
Set objDataUser	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Approval")

BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")
BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_CONVCASHOUTREFIFIX"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Approval") 

BIZ_Loan_FinishMilestone_AssignUser  "Approval", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_CONVCASHOUTREFIFIX"
End If

BIZ_Loan_Exit "True"
BIZ_Login_UserLogout

Set objData     = Nothing
Set objDataUser	= Nothing