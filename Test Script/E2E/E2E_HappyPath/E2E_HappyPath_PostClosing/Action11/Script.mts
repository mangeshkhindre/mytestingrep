'@**************************************************************************************************
'@ TestStory: PTAC-1129 - HAPPYPATH_E2E
'@ TestCase: PTAC-1178 HP Post Closing 1- Assign to Shipper & Accept File
'@ Test Automation JIRA Task: PTAC - 1173 HappyPath_PostClosing
'@ TestData: "
'	"Global_Data,Login,E2E_HappyPath_Admin"
'	"Loans,Milestone,E2E_HappyPath_PostClosing"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on Log > click on Post closing"
  	'2 Click the magnify glass and select the default "Shipper User"
  	   'Select ‘Accept File’ button.
	'3 Click ok
'@ ExpectedResult: 
	'1 System should give alert message as  'Milestone alert has been cleared'.
	'2 The pop up window should be closed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1178","Test Case Name - HP Post Closing 1- Assign to Shipper & Accept File", Null

Dim strLoanNumber, objDataCondApp, objData
Set objData 		= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objDataCondApp  = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_PostClosing")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
'Retrieve the Loan Number 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS10Complete_HappyPath","Post Closing"

GUI_Dialog_Encompass_YesX 2, ""

BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataCondApp, "NextUser")

Set objData 		= Nothing
Set objDataCondApp  = Nothing

