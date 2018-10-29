'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2394 Post Closing 1 - Add Post Closing conditions
'@ Test Automation JIRA Task: PTAC-2943 E2E_9VANoCORefiARM_PostClosing
'@ TestData: 
	'1 Global,Login and E2E_closer
	'2 eFolder_Tab,AddConditionsFromSet and E2E_VANoCORefiARM
	'3 eFolder_Tab,SetPostClosingConditionsStatus and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as post closer. Click 'Accept File'.
	'2 Click on 'efolder'.
	'3 Select post closing conditions tab.
	'4 Select 'Add conditions' from condition sets and click 'ok'.
	'5 Select 'Final Title Policy' and click add.
	  'Select 'MERS Transfer' and click add.
	  'Click 'Add' button in the condition sets window.
	'6 Now select each condition and check the checkbox for cleared.
'@ ExpectedResult: 
	'1 Should be able to login and accept file.
	'2 E-folder should open.
	'3 Add condition ' pop up should open.
	'4 Condition sets' window should open.
	'5 Conditions should be added to post closing conditions.
	'6 Should be able to mark cleared.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2394","Post Closing 1 - Add Post Closing conditions", Null

Dim strLoanNumber, objData
Set objData 	=	FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
Set objDataUser = 	FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_PostClosing")

FRM_RT_SetLoanNo_RT_PropFile()

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_marypcs" '@ Integration Environment 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS11Complete_VANoCORefiARM","Post Closing"

BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataUser,"NextUser")
BIZ_Nav_eFolder_PostClosingConditions()

'Add the Closing Conditons
BIZ_PostClosingConditions_AddConditionsFromSet "E2E_VANoCORefiARM2"

'Clear the Closing Conditions
BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_VANoCORefiARM"

'Closes the eFolder Screen
BIZ_Nav_eFoler_Close()

Set objData 	= Nothing
Set objDataUser = Nothing	
