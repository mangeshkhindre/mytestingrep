'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2157 Qualification 1 - Assign the loan opener and loan officer and Accept file
'@ Test Automation JIRA Task: PTAC-2409 E2E_8VAPURARM_Qualification 
'@ TestData:
	'1 Loans, LoanTemplate and E2E_LoanOfficer
	'2 Global_Data, Loan and E2E_carollo
	'3 Loans, Milestone and E2E_VAPURARM_Qualification
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass with user markuslo
	'2 Now click log
	'3 Click on qualification milestone and assign loan opener and loan officer(If applicable)
	'4 Accept file(Based on settings)
'@ ExpectedResult: 
	'1 Loan should open
	'2 Log tab should open
	'3 both users should be assign
	'4 Accept file(otherwise by default File will be accepted)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2157","Qualification 1 - Assign the loan opener and loan officer and Accept file", Null

Dim objData

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_carollo" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS1Complete_VAPURARM","Qualification"

BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"

'Verify whether Qualification worksheet is opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Qualification.*"),_
True,"Qualification Worksheet"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Qualification")

'Go to Qualification and Assign Opener
BIZ_Loan_AssignUser "CurrentUser", "Qualification", FRM_DS_GetValue(objData, "CurrentUser")

Set objData = Nothing