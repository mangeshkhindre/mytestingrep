'@**************************************************************************************************
'@ TestStory: PTAC-2802 - E2E_9VANoCORefiARM
'@ TestCase : PTAC-2319 - Qualification 1 - Assign the loan opener and loan officer and Accept file
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification
'@ TestData:
   '1 Global_Data, Login, E2E_carollo
   '2 Loans, LoanTemplate, E2E_LoanOfficer
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass as loan officer and go to your loan. Now click log tab
   '2 Click on qualification milestone and assign loan opener and loan officer(If applicable)
   '3 Accept file(Based on settings)	
'@ ExpectedResult: 
   '1 Loan should open. Log tab should open
   '2 Both users should be assign. Accept file(otherwise by default File will be accepted)
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2319","Qualification 1 - Assign the loan opener and loan officer and Accept file", Null

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollo"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Loan Officer - Default View","My Pipeline"

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS1Complete_VANoCORefiARM","Qualification"

BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"

'Verify whether Qualification worksheet is opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Qualification.*"),_
True,"Qualification Worksheet"