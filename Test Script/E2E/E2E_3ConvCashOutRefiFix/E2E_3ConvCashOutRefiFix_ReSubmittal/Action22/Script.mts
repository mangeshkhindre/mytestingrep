'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3322 CONVCASHOUTREFIFIX Resubmittal 1- Finish Milestone 
'@ Test Automation JIRA Task: PTAC-3377 E2E_CONVCASHOUTREFIFIX_ReSubmittal
'@ TestData: 
    '1 Global, Login and E2E_markuslp
    '2 Loans, LoanTemplate and E2E_LoanProcessorDefaults
    '3 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_ReSubmittal
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Under log tab click on resubmittal
   '2 Under documents section there will be four documents. select one by clicking on it
   '3 Check the received box.If there was a "attachment required icon' next to it in the documents section 
      'then click browse and attach icon in the document details window and attach any pdf document to it
   '4 Repeat the process for other three documents
   '5 Click the magnifying lens next to loan processor and select markuslp
   '6 Check the box next to finished
'@ ExpectedResult: 
   '1 Resubmittal worksheet will open for carollp
   '2 Document details window will open
   '3 You should be able to see the attached document in the files section of the document detail window
   '4 Window should close
   '5 Milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3322","CONVCASHOUTREFIFIX Resubmittal 1- Finish Milestone", Null
Dim objDataResubmittal, objData

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with Loan Processor
BIZ_Login_UserLogin "E2E_Clarklp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS6Complete_CONVCASHOUTREFIFIX","Resubmittal"

Set objDataResubmittal 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_ReSubmittal")

BIZ_Document_AttachMandatoryDocuments "Resubmittal", "E2E_CONVCASHOUTREFIFIX_ReSubmittal"

'====== Selects the Processor and finishes the Milestone
BIZ_Loan_FinishMilestone_AssignUser "Resubmittal", FRM_DS_GetValue(objDataResubmittal, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Resubmittal finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS7Complete_CONVCASHOUTREFIFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData             = Nothing
Set objDataResubmittal 	= Nothing
