'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3258 CONVCASHOUTREFIFIX Conditional Approval 4 - Finish Milestone
'@ Test Automation JIRA Task: PTAC-3376 E2E_3CONVCASHOUTREFIFIX_ConditionalApproval
'@ TestData:  Loans, Milestone and E2E_CONVCASHOUTREFIFIX_ConditionalApproval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Under log tab click on conditional approval
   '2 Under documents section there will be four documents. select one by clicking on it
   '3 Check the received box.If there was a attachment required icon next to it in the documents section then click browse and attach icon in the document details window and attach any pdf document to it.
   '4 Repeat the process for other three documents
   '5 Click the magnifying lens next to loan processor and select markuslp
   '6.Click finish milestone button
'@ ExpectedResult: 
	'1 Conditional approval window will open for MarkusTavaUW
	'2 Document details window will open
	'3 You should be able to see the attached document in the files section of the document detail window
    '4 Same results as step 3 should be seen.
	'5 Carollp should be selected as Loan Processor
	'6 Milestone should be finished
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3258","CONVCASHOUTREFIFIX Conditional Approval 4 - Finish Milestone", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_ConditionalApproval")

BIZ_Document_AttachMandatoryDocuments "Cond. Approval", "E2E_CONVCASHOUTREFIFIX_ConditionalApproval"

'====== Selects the Processor and finishes the Milestone
BIZ_Loan_FinishMilestone_AssignUser "Cond.Approval", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Cond. Approval finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS6Complete_CONVCASHOUTREFIFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing