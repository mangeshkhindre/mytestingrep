'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1392 - CONVNOCASHREFIARM - Conditional Approval 1- Complete Underwriter Summary
'@ Test Automation JIRA Task: PTAC-1783 - E2E_1ConvNoRefiARM_ConditionalApproval
'@ TestData: 
   '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_ConvNoRefiARM
   '2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_ConvNoRefiARM
   '3 Global_Data, Login and E2E_marksuw
   '4 Loans, LoanTemplate and E2E_Underwriter	 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to encompass as Markusuw.
   '2 Go to your loan and click accept file button
   '3 click ok
   '4 Under tools click Underwriter summary
   '5 Enter the data as in test data column
'@ ExpectedResult: 
   '1 Should be able to login
   '2 The milestone alert has been cleared message will pop-up
   '3 Pop up should close
   '4 Underwriter summary page will open
   '5 Should be able to enter all the fields
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1392","Test Case Name : CONVNOCASHREFIARM - Conditional Approval 1- Complete Underwriter Summary", Null

Dim strLoanNumber, objData

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS5Complete_ConvNoRefiARM","Cond. Approval"

'====== Go to Tools->Disclosure Tracking ======
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_SetUnderWriterDetails "E2E_ConvNoRefiARM"
BIZ_UnderwriterSummary_SetAppraisalAUSDetails "E2E_ConvNoRefiARM"

Set objData = Nothing
