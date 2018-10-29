'@******************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2250 Docs Signing 1 - Receive Closing conditions
'@  Test Automation JIRA Task: PTAC-2888 E2E_8VAPURARM_DocsSigning
'@ TestData: 
   '1 Global_Data, Login and E2E_closer
   '2 eFolder_Tab, SetDocumentsStatus and E2E_VAPURARM
   '3 Loans, LoanTemplate and E2E_Closer
   '4 Loans, Milestone and E2E_VAPURARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as Closer.
   '2 Go to your loan and click on e-folder.
   '3 Select 'Closing documents' from the 'Document Group ' dropdown.
   '4 Open each closing document and select 'Received' and 'Reviewed' for each
   '5 Click on magnifying lens and select 'funder user' as funder and click on finished.
'@ ExpectedResult: 
   '1 Should be able to login
   '2 E-folder should open.
   '3 Should be able to see a list of closing documents.
   '4 Should be able to click received and reviewed.
   '5 Should be able to finish the milestone
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2250","Docs Signing 1 - Receive Closing conditions", Null

Dim objData, objDataProcessing

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_closer" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

GUI_Dialog_Encompass_OKX 20, ""
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_VAPURARM","Docs Signing"

Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_DocsSigning")

BIZ_Loan_AcceptFiles "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_Documents_SetDocumentsStatus "E2E_VAPURARM_AllDocument"
BIZ_Nav_eFoler_Close()
BIZ_Loan_FinishMilestone_AssignUser "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")


'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData			  = Nothing
Set objDataProcessing = Nothing
