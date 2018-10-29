'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARAM
'@ TestCase : PTAC-2130 Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2921 E2E_6FHAPURARM_DocsSigning
'@ TestData: 
	'1 Global_Data, Login and E2E_closer
	'2 eFolder_Tab, SetDocumentsStatus and E2E_FHAPURARM_AllDocument
	'3 Loans, LoanTemplate and E2E_Closer
	'4 Loans, Milestone, E2E_FHAPURARM_DocsSigning
'@ Pre-conditions: eFolder_Tab
'@ Description:  
'@ TestSteps:
	'1 Login as Closer.
	'2 Click on Accept file button
	'3 Go to your loan and click on e-folder.
	'4 Select 'Closing documents' from the 'Document Group ' dropdown.
	'5 Open each closing document and select 'Received' and 'Reviewed' for each
	'6 Click on magnifying lens and select 'funder user' as funder and click on finished.
'@ ExpectedResult: 
	'1 Should be able to login
	'2 system should accept 
	'3 E-folder should open.
	'4 Should be able to see a list of closing documents.
	'5 Should be able to click received and reviewed.
	'6 Should be able to finish the milestone
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2130","Docs Signing 1 - Receive Closing conditions", Null

Dim objData, objDataProcessing

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_closer" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_FHAPURARM","Docs Signing"

Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_DocsSigning")

BIZ_Loan_AcceptFiles "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_Documents_SetDocumentsStatus "E2E_FHAPURARM_AllDocument"

BIZ_Nav_eFoler_Close()
BIZ_Loan_FinishMilestone_AssignUser "Docs Signing", FRM_DS_GetValue(objDataProcessing, "NextUser")

'Exists the Loan Details
BIZ_Loan_Exit True
'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 		  = Nothing
Set objDataProcessing = Nothing
