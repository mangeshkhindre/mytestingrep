'@******************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1131 HP Submittal 1- Assign UnderWriter & Accept File
'@ Test Automation JIRA Task: PTAC-1145
'@ TestData:  
	'Global_Data,Login,E2E_HappyPath_Admin
	'Loans,LoanTemplate,E2E_HappyPath 
'@ Pre-conditions: 
'@ Description:  Assign UnderWriter & Accept File
'@ TestSteps:
	'1 Click on Log > Submittal.
	'2 Click the magnify glass and select the default Underwriter.Select ‘Accept File’ button.
'@ ExpectedResult: 
	'1 System should give alert message as 'Milestone alert has been cleared'.
'********************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1131","HP Submittal 1- Assign UnderWriter & Accept File", Null

'Login to Encompass 
BIZ_Login_UserLogin "E2E_HappyPath_Admin"

'Validate Encompass home page
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

'Navigate to selected pipeline view and Loan folder
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
Set objData = Nothing

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_HappyPath","Submittal"

'Accept loan file and assign next user
BIZ_Loan_AcceptFiles "Submittal", "underwriter"
