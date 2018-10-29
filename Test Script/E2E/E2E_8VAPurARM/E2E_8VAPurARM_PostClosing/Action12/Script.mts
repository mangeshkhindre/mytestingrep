'@**************************************************************************************************
'@ TestStory : PTAC-2398 E2E_8VAPURARM
'@ TestCase  :PTAC-2254 - Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2400 - E2E_8VAPURARM_PostClosing
'@ TestData: 
	'1 Loans, Milestone and E2E_VAPURARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as shipper.
	'2 Click tools tab and select TQL services.
	'3 Click 'order' button next to 'compliance service orders'.
	'4 Click on magnifying lens next to shipper and select 'Mary PCandShipper' as shipper. Click finish milestone.
'@ ExpectedResult: 
	'1 Should be logged in as marypcs.
	'2 TQL services will open.
	'3 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
	'4 Milestone should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2254","Post Closing 3 - Order Encompass Compliance services", Null

Dim objData

BIZ_TQLServices_SubmitOrder "Compliance Service","" 

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_PostClosing")

BIZ_Loan_FinishMilestone_AssignUser "Post Closing",  FRM_DS_GetValue(objData,"NextUser")

Set objData = Nothing

If  BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Post Closing finished") Then
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS11Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
