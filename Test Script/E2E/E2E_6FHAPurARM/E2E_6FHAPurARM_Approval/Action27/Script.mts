'@**************************************************************************************************
'@ TestStory: PTAC-2010 - E2E_6FHAPURARM
'@ TestCase : PTAC-2050 - Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-2124 - E2E_FHAPURARM_Approval
'@ TestData: 
	'Global_Data, Login, E2E_janet
	'Loans, LoanTemplate, E2E_Underwriter
	'Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as janet. click accept file button. click ok.
	'2 Under tools tab click underwriter summary.
	'3 click UWP2 In the top right and fill the following fields as in test data.
'@ ExpectedResult: 
	'1 Milestone alert has been cleared will pop up.
	'2 Underwriter summary will open.
	'3 Should be able to enter all dates.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2050","Test Case Name - Approval 1 - Fill underwriter Summary", Null

Dim strLoanNumber, objData, objDataUser
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_markusuw"
FRM_RT_SetLoanNo_RT_PropFile()

'====== Retrieve the Loan Number ======
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Nav_SelectPipelineTab

Set objData        = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
Set objDataUser    = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Approval")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

GUI_Dialog_Encompass_OKX 1, "" 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_FHAPURARM","Approval"

BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")
BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_FHAPURARM"
