'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2416 FHACOREFIARM Qualification 1 - Access the assigned Loan as "Loan Processer"
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualification
'@ TestData:
   '1 Loans, LoanTemplate and E2E_LoanOfficer
   '2 Global_Data, Login and E2E_markuslo
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with user markuslo
   '2 Now click log
   '3 Click qualification milestone
'@ ExpectedResult: 
   '1 Loan should open
   '2 Log tab should open
   '3 Qualification worksheet should open
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2416","FHACOREFIARM Qualification 1 - Access the assigned Loan as Loan Processer", Null

Dim objData

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Clarklo" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS1Complete_FHACORefiARM","Qualification"
BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"

'Verify whether Qualification worksheet is opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Qualification.*"),_
True,"Qualification Worksheet"

Set objData = Nothing
