'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase:  PTAC-1166  HP Doc Signing 1-Assign to Loan Officer & Accept File
'@ Test Automation JIRA Task: PTAC - 1174  HappyPath_Docs Signing
'@ TestData: 
	'1 Loans, LoanTemplate and E2E_HappyPath 
	'2 Loans, Milestone and E2E_HappyPath_DocsSigning
	'3 Global_Data, Login and E2E_HappyPath_Admin
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on Log > click on Doc Signing
	'2 Click the magnify glass and select the default "Funder User"
	   'Select ‘Accept File’ button
'@ ExpectedResult: ogin as Closer.
	'1 System should give alert message as 'Milestone alert has been cleared'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1166","TestCase Name - HP Doc Signing 1-Assign to Loan Officer & Accept File", Null

Dim strLoanNumber, objDataCondApp, objData
Set objData 		= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objDataCondApp  = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_DocsSigning")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
''Retrieve the Loan Number 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS8Complete_HappyPath","Docs Signing"

GUI_Dialog_Encompass_YesX 2, ""

BIZ_Loan_AcceptFiles "Docs Signing", FRM_DS_GetValue(objDataCondApp, "NextUser")

Set objData 		= Nothing
Set objDataCondApp  = Nothing
