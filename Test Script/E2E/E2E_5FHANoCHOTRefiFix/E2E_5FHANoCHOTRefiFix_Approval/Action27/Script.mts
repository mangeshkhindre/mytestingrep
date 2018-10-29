'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-2022 FHANOCHOTREFIFIX Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-2707 E2E_5FHANoCHOTRefiFix_Approval
'@ TestData: 
   '1 Global_Data, Login, E2E_marksuw
   '2 Loans, LoanTemplate, E2E_Underwriter
   '3 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as Markusuw. click accept file button. click ok
   '2 Under tools tab click underwriter summary
   '3 click UWP2 In the top right and fill the following fields as in test data
'@ ExpectedResult: 
   '1 Milestone alert has been cleared will pop up
   '2 Underwriter summary will open
   '3 Should be able to enter all dates
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2022","FHANOCHOTREFIFIX Approval 1 - Fill underwriter Summary", Null

Dim strLoanNumber,objData,objDataUser
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"

FRM_RT_SetLoanNo_RT_PropFile()

'====== Retrieve the Loan Number ======
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Nav_SelectPipelineTab

Set objData     = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
Set objDataUser	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_Approval")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

GUI_Dialog_Encompass_OKX 10, "" 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_FHANOCHOTREFIFIX","Approval"

'==== Click on "Accept File" button and click OK
BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")

BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_FHANoCHOTRefiFix"

Set objData     = Nothing
Set objDataUser = Nothing