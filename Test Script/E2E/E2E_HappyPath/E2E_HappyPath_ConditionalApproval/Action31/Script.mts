'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1141 HP Conditional Approval 5-Complete Secondary Registration 
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: NA
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description:  Order title and closing and finish milestone.
'@ TestSteps:
	'1 Reopen the loan, click on 'Tools' tab and select 'Secondary registraion'.
	'2 Go to 'SecondaryRegistration/Snapshot 'and select Lock request
	   'Click on ‘Copy from Request’ and click the ‘Lock and Confirm’ button. 
	   'Click the ‘Confirm’ button on pop up
	'3 Click "Update" button in the pop-up 
	'4 Click "Ok"
'@ ExpectedResult: 
	'1 System should populated Lock has been successfully confirmed
	'2 The Encompass Product and Pricing Service Pricing Import window should show 
	'3 It displays Encompass pop-up window "The lock has been successfully confirmed".
	'4 The pop-up should be closed. 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1141","TestCase Name - HP Conditional Approval 5-Complete Secondary Registration", Null

Dim strLoanNumber

BIZ_Nav_SelectPipelineTab()

If GUI_List_GetNumberofRows(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"))>0 Then
	GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,0,2,True,True,False,"Double"'Retrieve the Loan Number 
	BIZ_SecondaryRegistration_LockAndConfirm()
	GUI_Dialog_Encompass_OKX 30, ""
End If
