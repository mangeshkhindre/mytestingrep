'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2132 Post Closing 1 - Add Post Closing conditions
'@ Test Automation JIRA Task: PTAC-2260 E2E_6FHAPURARM_PostClosing
'@ TestData: 
   '1 Global, Login,E2E_closer
   '2 eFolder_Tab, AddConditionsFromSet, E2E_FHAPURARM
   '3 eFolder_Tab, SetPostClosingConditionsStatus, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as post closer. Click 'Accept File'
	'2 Click on 'efolder'.
	'3 Select post closing conditions tab
	'4 Select 'Add conditions' from condition sets and click 'ok'
	'5 Select 'Final Title Policy' and click add
	   'Select 'MERS Transfer' and click add
	   'Click 'Add' button in the condition sets window
	'6 Now select each condition and check the checkbox for cleared
'@ ExpectedResult: 
	'1 Should be able to login and accept file.
	'2 E-folder should open.
	'3 Add condition ' pop up should open.
	'4 Condition sets' window should open.
	'5 Conditions should be added to post closing conditions.
	'6 Should be able to mark cleared.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2132","Post Closing 1 - Add Post Closing conditions", Null

Dim objData, objDataUser

Set objData     = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
Set objDataUser = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_PostClosing")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_marypcs" 'Integration Environment 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS11Complete_FHAPURARM","Post Closing"

BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataUser,"NextUser")
BIZ_Nav_eFolder_PostClosingConditions()

'Add the Closing Conditons
BIZ_PostClosingConditions_AddConditionsFromSet "E2E_FHAPURARM"

'Clear the Closing Conditions
BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_FHAPURARM"

'Closes the eFolder Screen
BIZ_Nav_eFoler_Close()

Set objData     = Nothing
Set objDataUser = Nothing
