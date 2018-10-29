'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2161 Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone
'@ Test Automation JIRA Task: PTAC-2409 E2E_8VAPURARM_Qualification 
'@ TestData: Loans, Milestone, E2E_Integration_Qualification
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Go to ATR/QM Managment. select DU and Enter DU Case ID/LP AUS Key# under Risk Assessment
	'2 Go to REGZ-LE form under Late charges
	'3 Click tools tab and select TQL services.
	'4 Click 'order' button next to 'compliance service orders'.
	'5 Click on alert - compliance review -had warning and click clear alert button.
	'6 Click the magnifying lens next to loan processor and select carollp.
	'7 Check the finished check box.
'@ ExpectedResult: 
	'1 Loan Data should be saved. TQL services will open
	'2 Order should be generated with status completed and result should be warning or pass, you can click on the document and it will open the report
	'3 Alert should be cleared
	'4 carollp should be selected as loan processor.
	'5 Qualification milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2161", "Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone", Null

Dim intComplianceReviewStatus, objData, objDataATR, objATRPage
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Qualification")

'------Navigate to loan tab-------
BIZ_Nav_SelectLoanTab()

'BIZ_DisclosureTrackingTool_UpdateClosingDisclosureDetails()

BIZ_Forms_Open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Qualification"
Set objDataATR = FRM_DS_GetTestData("Forms_ATRQMManagement", "SetQualification", "E2E_VAPURARM")
Set objATRPage = SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataATR, "1543_DU")) Then
   GUI_WebList_Select  objATRPage.WebList("html id:=DropdownBox1"), FRM_DS_GetValue(objDataATR, "1543_DU")
End If

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataATR, "DULPID")) Then	
   GUI_WebEdit_Set objATRPage.WebEdit("html id:=TextBox48","index:=0"), FRM_DS_GetValue(objDataATR, "DULPID") 	
End If

BIZ_Forms_Open "RegZ - LE"

'Enter the Late Charge Information  Details
BIZ_RegZ_LE_SetLateChargeInformation "E2E_VAPURARM"

intComplianceReviewStatus = BIZ_ComplianceReview_OrderNReview("Order")

If(intComplianceReviewStatus = 1) Then
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
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData    = Nothing
Set objDataATR = Nothing
Set objATRPage = Nothing
