'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3221 FHAPURCHASEFIX- Post Closing 1 - Add Post Closing conditions 
'@ Test Automation JIRA Task: PTAC-3287 E2E_4FHAPURCASHFIX_PostClosing
'@ TestData: 
	'1 Global, Login, E2E_closer
	'2 eFolder_Tab, AddConditionsFromSet, E2E_FHAPURCASHFIX
	'3 eFolder_Tab, SetPostClosingConditionsStatus, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as post closer. Click 'Accept File'.
	'2 Click on 'efolder'.
	'3 Select post closing conditions tab.
	'4 Select 'Add conditions' from condition sets and click 'ok'.
	'5 Select 'MERS mortgagees affidavit' and click add.Select 'Recorded deed of trust mortgage' and click add. Click 'Add' button in the condition sets window.
	'6 Now select each condition and check the checkbox for cleared.
'@ ExpectedResult: 
	'1 Should be able to login and accept file.
	'2 E-folder should open.
	'3 Add condition ' pop up should open.
	'4 Condition sets' window should open.
	'5 Conditions should be added to post closing conditions.
	'6 Should be able to mark cleared.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3221","FHAPURCHASEFIX- Post Closing 1 - Add Post Closing conditions ", Null

Dim strLoanNumber, objData, objDataUser

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
Set objDataUser = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_PostClosing")

FRM_RT_SetLoanNo_RT_PropFile()
'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_marypcs" 'Integration Environment 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
GUI_Dialog_Encompass_OKX 10, ""

'Get the Loan Number
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS10Complete_FHAPURCASHFIX","Post Closing"
Set objDataUser = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_PostClosing")
BIZ_Loan_AcceptFiles "Post Closing", FRM_DS_GetValue(objDataUser,"NextUser")
BIZ_Nav_eFolder_PostClosingConditions()

'Add the Closing Conditons
BIZ_PostClosingConditions_AddConditionsFromSet "E2E_FHAPURCASHFIX1"
'Clear the Closing Conditions
BIZ_PostClosingConditions_SetAllConditionsStatus "E2E_FHAPURCASHFIX"

'Closes the eFolder Screen
BIZ_Nav_eFoler_Close()

Set objData     = Nothing
Set objDataUser = Nothing
