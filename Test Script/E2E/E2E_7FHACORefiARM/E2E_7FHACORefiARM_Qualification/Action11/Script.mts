'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2420 FHACOREFIARM Qualification 5. Order Encompass compliance service
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualification
'@ TestData: Loans, Milestone, E2E_Integration_Qualification
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
   '4 Markuslp should be selected as loan processor
   '5 Qualification milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2420", "FHACOREFIARM Qualification 5. Order Encompass compliance service", Null

Dim objMainForm,objLoanPage,objData,intComplianceReviewStatus
Set objMainForm 		= SwfWindow("swfname:=MainForm")
Set objLoanPage 		= objMainForm.SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objData 			= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_Qualification")

BIZ_Nav_SelectLoanTab()
'Open 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox67").Set ""

'Open 2015 Itemization form
BIZ_Forms_Open "FHA Management"
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_748").Set ""

BIZ_Loan_Save()
'
'BIZ_2015Itemization_Set1100Section "E2E_PREREQUISITE"
'BIZ_2015Itemization_Set1200Section "E2E_PREREQUISITE"
'BIZ_2015Itemization_Set1300Section "E2E_PREREQUISITE"

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

'Save the Loan Details 
BIZ_Loan_SaveLoanNumber()

Set objMainForm 		= Nothing
Set objLoanPage 		= Nothing
Set objData 			= Nothing
