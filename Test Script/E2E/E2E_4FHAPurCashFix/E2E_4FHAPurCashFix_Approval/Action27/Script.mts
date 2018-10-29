'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3180 FHAPURCHASEFIX- Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-3247 E2E_4FHAPURCASHFIX_Approval
'@ TestData: 
	'1 Global_Data, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_FHAPURCASHFIX
	'4 Loans, Milestone and E2E_FHAPURCASHFIX_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as Markusuw. click accept file button. click ok.
	'2 Under tools tab click underwriter summary.
	'3 click UWP2 In the top right and fill the following fields as in test data.
'@ ExpectedResult: 
	'1 Milestone alert has been cleared will pop up.
	'2 Underwriter summary will open.
	'3 Should be able to enter all dates.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3180","FHAPURCHASEFIX- Approval 1 - Fill underwriter Summary", Null

Dim objData, objDataUser
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"
BIZ_Nav_SelectPipelineTab

Set objData     = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
Set objDataUser	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_Approval")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

GUI_Dialog_Encompass_OKX 1, "" 

'Retrieve the Loan Number Approval
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_FHAPURCASHFIX","Approval"
BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")
BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_FHAPURCASHFIX"

Set objData 	= Nothing
Set objDataUser	= Nothing