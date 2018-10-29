'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3487 CONVCASHOUTREFIFIX Post Closing 1 - Add Post Closing conditions 
'@ Test Automation JIRA Task: PTAC-3382 E2E_3CONVCASHOUTREFIFIX_PostClosing
'@ TestData: 
    '1 Global, Login, E2E_closer
    '2 eFolder_Tab, AddConditionsFromSetand and E2E_CONVCASHOUTREFIFIX
    '3 eFolder_Tab, SetPostClosingConditionsStatusand E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as post closer. Click 'Accept File'.
	'2 Click on 'efolder'.
	'3 Select post closing conditions tab and then click on new condition icon.
	'4 Select 'Add conditions' from condition sets and click 'ok'.
	'5 Select 'MERS Transfer' and click add.Select 'Recorded mortgage deed of trust'and click add.Click 'Add' button in the condition sets window.
	'6 Now select each condition and check the checkbox for cleared.
'@ ExpectedResult: 
	'1 Should be able to login and accept file.
	'2 E-folder should open.
	'3 Add condition ' pop up should open.
	'4 Condition sets' window should open.
	'5 Conditions should be added to post closing conditions.
	'6 Should be able to mark cleared.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3487","CONVCASHOUTREFIFIX Post Closing 1 - Add Post Closing conditions", Null

Dim  objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
Set objDataUser = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_PostClosing")

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_marypcs"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS10Complete_CONVCASHOUTREFIFIX","Post Closing"


BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataUser,"NextUser")
BIZ_Nav_eFolder_PostClosingConditions()

'Add the Closing Conditons
BIZ_PostClosingConditions_AddConditionsFromSet "E2E_CONVCASHOUTREFIFIX1"

'Clear the Closing Conditions
BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_CONVCASHOUTREFIFIX"

'Closes the eFolder Screen
BIZ_Nav_eFoler_Close()
