'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: PTAC-1154 HP Approval 1- Assign to Loan Processor & Accept File
'@ Test Automation JIRA Task: PTAC-1234  
'@ TestData: 
	'1 Global_Data,Login,E2E_HappyPath_Admin
	'2 Loans,LoanTemplate,E2E_HappyPath
	'3 Loans,Milestone,E2E_HappyPath_Approval
'@ Pre-conditions: 
'@ Description: Assign to Loan Processor & Accept File
'@ TestSteps:
	'1 Log into Encompass and open the pre-requisite loan identified by loan number.
	'2 Click on Log > Approval. Click the magnify glass and select the default Loan Processor.
	'3 Select ‘Accept File’ button.
'@ ExpectedResult: System should give alert message as 'Milestone alert has been cleared'.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1154","HP Approval 1- Assign to Loan Processor & Accept File", Null

'Variables declaration
Dim strLoanNumber, objData,objUserInfo
Set objData 	= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objUserInfo = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Approval")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin"
 
'Validate Encompass home page
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

'Navigate to selected pipeline view and Loan folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS6Complete_HappyPath","Approval"

If(GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Static("text:=You only have read-only access to this loan file.*"), 40))Then 
	FRM_Logger_ReportFailEvent "Open the Loan Number", "Loan is opened in Read-Only Mode", null
	'====== User Logout ======
	BIZ_Login_UserLogout()
	FRM_RT_TearDownTest(Null)
	ExitTest
End If

BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objUserInfo, "NextUser")

Set objUserInfo  = Nothing
Set objData      = Nothing

