'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase	: PTAC-1877 Qualification 1 - Assign the loan opener and loan officer and Accept file
'@ Test Automation JIRA Task:  PTAC-2120 E2E_6FHAPURARM_Qualification
'@ TestData: Loans, LoanTemplate, E2E_FHAPURARM
'@ Pre-conditions: N/A
'@ Description	 : N/A 
'@ TestSteps:
   '1 Login to Encompass as loan officer and go to your loan.
   '2 Now click log tab
   '3 Click qualification milestone and assign loan opener and loan officer(If applicable)
   '4 Accept file(Based on settings)
'@ ExpectedResult: 
   '1 Loan should open
   '2 Log tab should open
   '3 both users should be assign
   '4 Accept file(otherwise by default File will be accepted)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1877","Qualification 1 - Assign the loan opener and loan officer and Accept file", Null

Dim objData

'Login to Encompass with user carollo
BIZ_Login_UserLogin "E2E_Carollo" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
GUI_Dialog_Encompass_OKX 10, ""

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS1Complete_FHAPURARM","Qualification"
BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"

'Verify whether Qualification worksheet is opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Qualification.*"),_
True,"Qualification Worksheet"

Set objData = Nothing 