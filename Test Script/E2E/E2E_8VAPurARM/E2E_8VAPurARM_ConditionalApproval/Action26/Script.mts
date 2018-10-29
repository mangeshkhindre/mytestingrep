'@**************************************************************************************************
'@ TestStory : PTAC-2398 E2E_8VAPURARM
'@ TestCase  : PTAC-2207 Conditional Approval 1- Complete Underwriter Summary
'@ Test Automation JIRA Task: PTAC-2405 E2E_8VAPURARM_ConditionalApproval
'@ TestData: 
    '1 Tools_UnderwriterSummary, UWP1_SetUnderWriterDetails and E2E_VAPURARM
    '2 Tools_UnderwriterSummary, UWP2_SetHeaderData and E2E_VAPURARM
    '3 Global_Data, Login and E2E_marksuw
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to encompass as Markusuw.
	'2 Go to your loan and click accept file button.
	'3 click ok.
	'4 Under tools click Underwriter summary
	'5 Enter the data as in test data column
'@ ExpectedResult: 
	'1 should be able to login.
	'2 The milestone alert has been cleared message will pop-up
	'3 Pop up should close.
	'4 Underwriter summary page will open.
	'5 Should be able to enter all the fields.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2207","Conditional Approval 1- Complete Underwriter Summary", Null

Dim objData

'====== Login to the Encompass as marksuw ======
BIZ_Login_UserLogin "E2E_marksuw"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OK("")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS5Complete_VAPURARM","Cond. Approval"

If(GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("index:=0").WinButton("text:=&Yes","nativeclass:=Button"))) Then 
   GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("index:=0").WinButton("text:=&Yes","nativeclass:=Button")
End If
 
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_ConditionalApproval")
 
BIZ_Loan_AcceptFiles "Cond.Approval", FRM_DS_GetValue(objData, "NextUser")
'====== Go to Tools->Disclosure Tracking ======
BIZ_Tools_Open "Underwriter Summary"
BIZ_UnderwriterSummary_SetUnderWriterDetails "E2E_VAPURARM"
BIZ_UnderwriterSummary_SetAppraisalAUSDetails "E2E_VAPURARM"

Set objData = Nothing
