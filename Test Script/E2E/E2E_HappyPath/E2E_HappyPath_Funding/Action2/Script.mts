'@**************************************************************************************************
'@ TestStory: PTAC-1129 - HAPPYPATH_E2E
'@ TestCase: PTAC-1169 HP Funding 1- Assign to Loan Officer & Accept File
'@ Test Automation JIRA Task:  PTAC-1176 E2E_HappyPath_Funding
'@ TestData: 
	'1 Global_Data,Login,E2E_HappyPath_Admin
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1 Click on Log > click on Funding"
	'2 Click the magnify glass and select the default "Funder User"
	'3 Select ‘Accept File’ button.
'@ ExpectedResult: System should give alert message as  'Milestone alert has been cleared'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1169 ","HP Funding 1- Assign to Loan Officer & Accept File", Null

'Variable declaration
Dim strLoanNumber, objData, objUserInfo
Set objData 	= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath")
Set objUserInfo = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Funding")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin"

'Validate Encompass home page
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

'Navigate to selected pipeline view and Loan folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_HappyPath","Funding"

BIZ_AlertsAndLog_ClickOnRecord "Log","Funding"

GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Funding.*"),_
True,"Funding Worksheet.*"

'Assign next user and accept file
BIZ_Loan_AssignUser "NextUser", "Funding", FRM_DS_GetValue(objUserInfo, "NextUser")
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")
GUI_Dialog_Encompass_OKX 10, ""

Set objData 	= Nothing
Set objUserInfo = Nothing
