'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARAM
'@ TestCase: PTAC-889 Approval 3 - Order Encompass compliance services
'@ Test Automation JIRA Task: PTAC-1024 E2E_2CONVPURARM_Approval
'@ TestData: 
   '1 Loans, Milestone, E2E_CONVPURARM_Approval
   '2 Loans, MilestoneDocument, E2E_CONVPURARM_Approval 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click tools tab and select TQL services.
	'2 Click 'order' button next to 'compliance service orders'.
	'3 Click on Loan Processor and select jwcloser.
	'4 Click ignore in the error window
	'5 Check the box next to finished
'@ ExpectedResult: 
	'1 TQL services will open
	'2 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
	'3 Application error window will open.
	'4 Window should close.
	'5 Milestone should be finished.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case PTAC-889","Test Case Name: Approval 3 - Order Encompass compliance services", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_Approval")

BIZ_TQLServices_SubmitOrder "Compliance Service", ""
BIZ_Document_AttachMandatoryDocuments "Approval", "E2E_CONVPURARM_Approval"
BIZ_Loan_FinishMilestone_AssignUser "Approval", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_CONVPURARM"
End If

BIZ_Loan_Exit "True"
BIZ_Login_UserLogout

Set objData = Nothing
