'@**************************************************************************************************
 '@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
 '@ TestCase : PTAC-3126 CONVCASHOUTREFIFIX Qualification 7 Order Encompass compliance service
 '@ Test Automation JIRA Task: PTAC-3372  E2E_3CONVCASHOUTREFIFIX_Qualification
 '@ TestData: 
 	'1 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVCASHOUTREFIFIX
 	'2 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Qualification
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '1 Click tools tab and select TQL services.
    '2 Click 'order' button next to 'compliance service orders'.
    '3 Click on 'log' and click on qualification.Under documents check the check boxes for all documents. 
    '4 Click the magnifying lens next to loan processor and select carollp.
    '5 Check the finished check box.
 '@ ExpectedResult:
    '1 TQL services will open
    '2 Order should be generated with status completed and result should be warning or pass. 
       'you can click on the document and it will open the report.The validation point: The results should be warning or pass
    '3 Qualification tab should open.All documents should be checked.
    '4 carollp should be selected as loan processor.
    '5 Qualification milestone should be finished.
 '**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : 3126","CONVCASHOUTREFIFIX Qualification 7 Order Encompass compliance service", Null

Dim objData, intComplianceReviewStatus
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Qualification")

intComplianceReviewStatus = BIZ_ComplianceReview_OrderNReview("Order")

If (ComplianceReviewStatus = 1) Then
    'Click on compliance review alert 
    BIZ_AlertsAndLog_ClickOnRecord "Alerts & Messages", "Compliance Review"
    'Clear alert for compliance review 
    GUI_SwfButton_Click objMainForm.objLoanPage.SwfButton("swfname:=btnClearAlert")
    'Verify if Compliance Review alert is cleared 
    BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Compliance Review"
End If

BIZ_Loan_FinishMilestone_AssignUser "Qualification", FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_CONVCASHOUTREFIFIX"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'===== To logout from Encompass =====
BIZ_Login_UserLogout() 
 
Set objData = Nothing