'@ ******************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-780 Submittal 1- Receive documents and finish milestone 
'@ Test Automation JIRA Task: PTAC-993 E2E_2CONVPURARM_Submittal
'@ TestData : 
	'1 Global, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'3 Loans, Milestone and E2E_CONVPURARM_Submittal
'@ Pre-conditions: NA
'@ Description   : NA  
'@ TestSteps     :
   '1 Under log click submittal milestone.
   '2 Under documents select one document by double clicking on it.
   '3 click browse and attach and select a pdf from local and attach.
   '4 Repeat steps 2 and 3 for the other 2 documents.
   '5 Under alerts:
      'click 2015 settlement provider and click browse and attach a pdf.
      'click compliance review had warning and click 'clear alert' button on top right .
   '6 click magnifying lens next to underwriter. select markusuw and click ok
      'click finished.
'@ ExpectedResult: 
   '1 Submittal worksheet will open for Markus Tava.
   '2 Document details window will open.
   '3 File should be attached(In document details window under files you should be able to see the file attachment.
   '4 markusuw should be selected and milestone should be finished.
'@ ********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-780","Submittal 1- Receive documents and finish milestone", Null

Dim  objData, objDataProcessing
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslp
BIZ_Login_UserLogin "E2E_markuslp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

'Retrieve the Loan Number 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_CONVPURARM","Submittal"
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"

Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_Submittal")

BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_CONVPURARM_Submittal"
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objDataProcessing, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_CONVPURARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objDataProcessing = Nothing
Set objData           = Nothing
