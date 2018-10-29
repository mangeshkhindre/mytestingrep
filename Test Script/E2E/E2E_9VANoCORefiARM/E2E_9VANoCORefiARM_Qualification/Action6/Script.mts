'@**************************************************************************************************
'@ TestStory: PTAC-2802 - E2E_9VANoCORefiARM
'@ TestCase: 
   'PTAC-2323 - Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification 
'@ TestData:
   '1 Tools_TQLServices,SetValuationServiceOrder,E2E_VANoCORefiARM
   '2 Loans,Milestone,E2E_VANoCORefiARM_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '1 Click tools tab and select TQL services.Click 'order' button next to 'compliance service orders'
   '2 Click on alert - compliance review -had warning and click clear alert button
   '3 Click the magnifying lens next to loan processor and select carollp
   '4 Check the finished check box
'@ ExpectedResult: 
   '1 TQL services will open
   '2 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
   '3 An Alert should be cleared.carollp should be selected as loan processor
   '4 Qualification milestone should be finished	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2323", "Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone", Null

Dim intComplianceReviewStatus,objData,objParentObject,objDataATR,objATRPage,objDataLoanOrgFee
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_Qualification")

'------Navigate to loan tab-------
BIZ_Nav_SelectLoanTab()

BIZ_Forms_Open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Qualification"
Set objDataATR = FRM_DS_GetTestData("Forms_ATRQMManagement", "SetQualification", "E2E_VANoCORefiARM")
Set objATRPage = SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataATR, "1543_DU")) Then
   GUI_WebList_Select  objATRPage.WebList("html id:=DropdownBox1"), FRM_DS_GetValue(objDataATR, "1543_DU")
End If

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataATR, "DULPID")) Then	
   GUI_WebEdit_Set objATRPage.WebEdit("html id:=TextBox48","index:=0"), FRM_DS_GetValue(objDataATR, "DULPID") 	
End If

'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

Set objDataLoanOrgFee = FRM_DS_GetTestData("Forms_2015Itemization", "Set800Section", "E2E_VANoCORefiARM")
Set objParentObject   = SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0")

If  UTIL_String_IsNotEmpty(FRM_DS_GetValue(objDataLoanOrgFee, "801a_LoanOriginationFess")) Then
    GUI_WebEdit_Set objParentObject.WebEdit("html id:=TextBox12"), FRM_DS_GetValue(objDataLoanOrgFee, "801a_LoanOriginationFess")
End If 


intComplianceReviewStatus = BIZ_ComplianceReview_OrderNReview("Order")

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

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_VANoCORefiARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData    		  = Nothing
Set objDataATR 		  = Nothing
Set objATRPage   	  = Nothing
Set objDataLoanOrgFee = Nothing
Set objParentObject   = Nothing
