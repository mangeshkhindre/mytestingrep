'@**************************************************************************************************
'@ TestStory: PTAC-1129 - E2E_HappyPath
'@ TestCase: PTAC-1159 HP Doc Preparing 1-Assign to Loan Officer & Accept File  
'@ Test Automation JIRA Task: PTAC-1175
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
	'1 Loans,LoanTemplate,E2E_HappyPath
	'2 Loans,Milestone,E2E_HappyPath_DocPreparing
'@ Pre-conditions: 
'@ Description: Assign to Loan Officer & Accept File
'@ TestSteps:
	'1 Log into Encompass and open the pre-requisite loan identified by loan number.
	'2 Click on Log > Doc Preparation. Click the magnify glass and select the default Loan Processor.
	'3 Select ‘Accept File’ button.
'@ ExpectedResult: 
   'System should give alert message as 'Milestone alert has been cleared'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1159 ","HP Doc Preparing 1-Assign to Loan Officer & Accept File ", Null

'Variable declaration
Dim strLoanNumber, objData
Set objData 					= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objProcessorSelectionDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog")
Set objUserInfo 				= FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_DocPreparing")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin"

'Validate Encompass home page
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

'Navigate to selected pipeline view and Loan folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_HappyPath","Doc Preparation"

BIZ_AlertsAndLog_ClickOnRecord "Log","Doc Preparation"

'Validate worksheet opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfObject("swfname:=MilestoneWS").SwfLabel("swfname:=label1", "text:=Doc Preparation.*"),_
True,"Doc Preparation Worksheet"


'Accept loan file and assign next user
If UTIL_String_IsEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname:=boxNextLA"),"text")) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
	BIZ_Loan_SelectMilestoneUser(FRM_DS_GetValue(objUserInfo, "NextUser"))
End If

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfWindow("swfname:=LoanTeamMemberConflictDialog"),10) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog")._
	SwfWindow("swfname:=LoanTeamMemberConflictDialog").SwfButton("swfname:=btnOk")
End If

'Accept file
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")

GUI_Dialog_Encompass_OKX 10, ""

Set objUserInfo 				= Nothing
Set objData 					= Nothing
Set objProcessorSelectionDialog = Nothing
