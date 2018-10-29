﻿'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1406 CONVNOCASHREFIARM - Approval 1 - Fill underwriter Summary
'@ Test Automation JIRA Task: PTAC-1782 E2E_1ConvNoRefiARM_Approval
'@ TestData:
   '1 Global_Data, Login and E2E_marksuw
   '2 Loans, LoanTemplate and E2E_Underwriter
   '3 Loans, Milestone and E2E_ConvNoRefiARM_Approval
   '4 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as Markusuw.click accept file button. click ok
   '2 Under tools tab click underwriter summary
   '3 Click UWP2 In the top right and fill the following fields as in test data
'@ ExpectedResult: 
   '1 Milestone alert has been cleared will pop up
   '2 Underwriter summary will open
   '3 Should be able to enter all dates
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1406","Test Case Name : CONVNOCASHREFIARM - Approval 1 - Fill underwriter Summary", Null

Dim strLoanNumber,objData, objDataUser
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'====== Search the Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS7Complete_ConvNoRefiARM","Approval"

'==== Click on "Accept File" button and click OK
Set objDataUser	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_Approval")

BIZ_Loan_AcceptFiles "Approval", FRM_DS_GetValue(objDataUser, "NextUser")
BIZ_Tools_ShowInOrder
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_ConvNoRefiARM"

Set objData 	= Nothing
Set objDataUser	= Nothing
