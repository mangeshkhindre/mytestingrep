'@******************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC - 1468 - CONVNOCASHREFIARM - Post Closing 1 - Add Post Closing conditions
'@ Test Automation JIRA Task: PTAC-1795 E2E_1ConvNoRefiARM_PostClosing
'@ TestData: 
	'1 Global, Login and E2E_closer
	'2 eFolder_Tab, AddConditionsFromSetand and E2E_ConvNoRefiARM
	'3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_ConvNoRefiARM
	'4 Loans, LoanTemplate and E2E_PostCloser
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as post closer. Click 'Accept File'.
	'2 Click on 'efolder'.
	'3 Select post closing conditions tab and then click on new condition icon.
	'4 Select 'Add conditions' from condition sets and click 'ok'.
	'5 Select 'MERS Transfer' and click add. Select 'Recorded mortgage deed of trust'and click add. Click 'Add' button in the condition sets window.
	'6 Now select each condition and check the checkbox for cleared.
'@ ExpectedResult: 
	'1 Should be able to login and accept file.
	'2 E-folder should open.
	'3 Add condition ' pop up should open.
	'4 Condition sets' window should open.
	'5 Conditions should be added to post closing conditions.
	'6 Should be able to mark cleared.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1468","CONVNOCASHREFIARM - Post Closing 1 - Add Post Closing conditions", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
Set objDataUser = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_PostClosing")

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_marypcs"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS10Complete_ConvNoRefiARM","Post Closing"
BIZ_AlertsAndLog_ClickOnRecord "Log","Post Closing"

BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataUser,"NextUser")
'
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")

BIZ_Nav_eFolder_PostClosingConditions()

'Add the Closing Conditons
BIZ_PostClosingConditions_AddConditionsFromSet "E2E_ConvNoRefiARM1"
'Clear the Closing Conditions
BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_ConvNoRefiARM"
'Closes the eFolder Screen
BIZ_Nav_eFoler_Close()

Set objData = Nothing
