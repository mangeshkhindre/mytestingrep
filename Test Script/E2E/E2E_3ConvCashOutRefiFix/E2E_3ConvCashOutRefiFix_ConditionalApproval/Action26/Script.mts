'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3231 CONVCASHOUTREFIFIX Conditional Approval 1- Complete Underwriter Summary
'@ Test Automation JIRA Task: PTAC-3376 E2E_3CONVCASHOUTREFIFIX_ConditionalApproval
'@ TestData: 
   '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails, E2E_CONVCASHOUTREFIFIX
   '2 Tools_UnderwriterSummary, UWP2_SetHeaderData, E2E_CONVCASHOUTREFIFIX
   '3 Global_Data, Login, E2E_marksuw
   '4 Loans,  LoanTemplate,  E2E_Underwriter	 
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

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3231","CONVCASHOUTREFIFIX Conditional Approval 1- Complete Underwriter Summary", Null

Dim objData

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_marksuw"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search for loans with MS5Completed as borrowers middle na
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS5Complete_CONVCASHOUTREFIFIX","Cond. Approval"

If (GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("index:=0").WinButton("text:=&Yes","nativeclass:=Button"))) Then 
    GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("index:=0").WinButton("text:=&Yes","nativeclass:=Button")
End If

'====== Go to Tools->Disclosure Tracking ======
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_SetUnderWriterDetails "E2E_CONVCASHOUTREFIFIX"
BIZ_UnderwriterSummary_SetAppraisalAUSDetails "E2E_CONVCASHOUTREFIFIX"

Set objData = Nothing