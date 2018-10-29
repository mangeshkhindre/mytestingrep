'@******************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARAM
'@ TestCase : PTAC-2226 Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-2403 E2E_8VAPURARM_Approval
'@ TestData: 
	'1 Global_Data, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_Underwriter
	'3 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VAPURARM
	'4 Loans, Milestone and E2E_VAPURARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as Carollp. click accept file button. click ok.
	'2 Under tools tab click underwriter summary.
	'3 click UWP2 In the top right and fill the following fields as in test data.
'@ ExpectedResult: 
	'1 Milestone alert has been cleared will pop up.
	'2 Underwriter summary will open.
	'3 Should be able to enter all dates.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2226","Test Case Name - Approval 1 - Fill underwriter Summary", Null

Dim objData, objDataUser

'Login to the Encompass as underwriter
BIZ_Login_UserLogin "E2E_markusuw"
BIZ_Nav_SelectPipelineTab

Set objData     = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
Set objDataUser	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Approval")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search the Loan 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_VAPURARM","Approval"
BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")
BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_VAPURARM"

Set objData     = Nothing
Set objDataUser	= Nothing
