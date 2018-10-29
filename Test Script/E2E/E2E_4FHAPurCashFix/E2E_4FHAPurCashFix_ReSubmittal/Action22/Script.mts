'***************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase	: PTAC-3179 FHAPURCHASEFIX- Resubmittal 4- Finish Milestone
'@ Test Automation JIRA Task: PTAC-3156  E2E_4FHAPURCASHFIX_ReSubmittal
'@ TestData: 
	'1 Loans, MilestoneDocument and E2E_FHAPURCASHFIX_ReSubmittal
	'2 Loans, Milestone and E2E_FHAPURCASHFIX_ReSubmittal
'@ Pre-conditions: N/A 
'@ Description: N/A 
'@ TestSteps:
   '1 Under log tab click on resubmittal.
   '2 Under documents section there will be four documents. select one by clicking on it.
   '3 Check the received box.If there was a "attachment required icon" next to it in the documents section then 
     'click browse and attach icon in the document details window and attach any pdf document to it.
   '4 Repeat the process for other three documents.
   '5 Click the magnifying lens next to loan processor and select markuslp.
   '6 Check the box next to finished
'@ ExpectedResult: 
   '1 Resubmittal worksheet will open for Markuslp.
   '2 Document details window will open.
   '3 You should be able to see the attached document in the files section of the document detail window.
   '4 Same as step 3.
   '5 Underwriter UW should assigned
   '6 Milestone should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3179","FHAPURCHASEFIX- Resubmittal 4- Finish Milestone", Null

Dim objDataResubmittal

Set objDataResubmittal 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_ReSubmittal")

BIZ_Document_AttachMandatoryDocuments "Resubmittal", "E2E_FHAPURCASHFIX_ReSubmittal"

'Selects the Processor and finishes the Milestone
BIZ_Loan_FinishMilestone_AssignUser "Resubmittal", FRM_DS_GetValue(objDataResubmittal, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Resubmittal finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS7Complete_FHAPURCASHFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objDataResubmittal = Nothing