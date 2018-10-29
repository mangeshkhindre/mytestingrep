'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase	: PTAC-1881 Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone 
'@ Test Automation JIRA Task:  PTAC-2120 E2E_6FHAPURARM_Qualification
'@ TestData:  Loans, Milestone, E2E_Integration_Qualification
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click tools tab and select TQL services
   '2 Click 'order' button next to 'compliance service orders'
   '3 Click on alert - compliance review -had warning and click clear alert button
   '4 Click the magnifying lens next to loan processor and select markuslp
   '5 Check the finished check box
'@ ExpectedResult: 
   '1 TQL services will open
   '2 Order should be generated with status completed and result should be warning or pass, you can click on the document and it will open the report
   '3 Alert should be cleared
   '4 carollp  should be selected as loan processor
   '5 Qualification milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1881", "Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone", Null

Dim objMainForm, objLoanPage, objData, ComplianceReviewStatus

Set objMainForm 		= SwfWindow("swfname:=MainForm")
Set objLoanPage 		= objMainForm.SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objData 			= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Qualification")

'------Navigate to loan tab-------
BIZ_Nav_SelectLoanTab()

ComplianceReviewStatus = BIZ_ComplianceReview_OrderNReview("Order")

If (ComplianceReviewStatus = 1) Then
	'Click on compliance review alert 
	BIZ_AlertsAndLog_ClickOnRecord "Alerts & Messages", "Compliance Review"
	'Clear alert for compliance review 
	GUI_SwfButton_Click objMainForm.objLoanPage.SwfButton("swfname:=btnClearAlert")
	'Verify if Compliance Review alert is cleared 
	BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Compliance Review"
End If

'Go to Qualification, AssignUser & check Finish check box ON
BIZ_Loan_FinishMilestone_AssignUser "Qualification", FRM_DS_GetValue(objData, "NextUser")

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_FHAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objMainForm 		= Nothing
Set objLoanPage 		= Nothing
Set objData 			= Nothing
