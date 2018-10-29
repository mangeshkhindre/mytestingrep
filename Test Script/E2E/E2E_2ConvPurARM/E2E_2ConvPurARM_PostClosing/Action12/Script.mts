'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase: PTAC- 1068 - Post Closing 3 - Order Encompass Compliance Services
'@ Test Automation JIRA Task: PTAC-1071 E2E_2CONVPURARM_PostClosing
'@ TestData: None
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as shipper.
    '2 Click tools tab and select TQL services.
	'3 Click 'order' button next to 'compliance service orders'.
	'4 Click on magnifying lens next to shipper and select 'Mary PCandShipper' as shipper. Click finish milestone.
'@ ExpectedResult: 
	'1 TQL services will open.
	'2 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
	'3 Milestone should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1068","Test Case Name : Post Closing 3 - Order Encompass Compliance Services", Null

Dim objData

BIZ_TQLServices_SubmitOrder "Compliance Service","" 

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_PostClosing")

BIZ_Loan_FinishMilestone_AssignUser "Post Closing",  FRM_DS_GetValue(objData,"NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Post Closing finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination" 
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS11Complete_CONVPURARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True
BIZ_Login_UserLogout()

Set objData = Nothing
