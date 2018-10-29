﻿'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2251 Funding 1- Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC - 2401 - E2E_VAPURARM_Funding
'@ TestData: 
	'1 Loans, Milestone and E2E_VAPURARM_Funding
	'2 Tools_FundingWorkSheet, SetFundingClosing and E2E_VAPURARM
	'3 Tools_FundingWorkSheet, SetWireInformation and E2E_VAPURARM
	'4 Tools_FundingWorkSheet, SetFundingSource and E2E_VAPURARM
	'5 Loans, LoanTemplate and E2E_Funder
	'6 Global_Data, Login and E2E_funder
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login as Funder
	'2 Click on tools and click 'Funding worksheet'.
	'3 Complete the following fields in the funding worksheet:
	   'Under Funding/closing
	   'Funder:
	   'Sent to Funder:
	   'Funding Type:
	   'Clear to close:
	   'Funds ordered: 
	'4 Click on log and click on 'funding'. Under documents section check the check box for wiring instructions.
	'5 Click on magnifying lens next to Post closer and select 'Mary PCandShipper'. Click finish milestone.
'@ ExpectedResult:
	'1 Should be able to login and accept file.
	'2 Funding worksheet should open.
	'3 Total deductions value should populate when you select all check boxes under CD line.
	'4 Funding worksheet for funder user will open. It should show as received.
	'5 Milestone should be finished.
'@**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2251","Funding 1- Complete the funding worksheet", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Funder")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_funder" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_VAPURARM","Funding"

'Go to Tools->Funding Worksheet
BIZ_Tools_Open "Funding worksheet"

'Sets the function details 
BIZ_FundingWorksheet_SetFundingClosing "E2E_VAPURARM"
BIZ_FundingWorksheet_SetFundingSource "E2E_VAPURARM"
BIZ_FundingWorksheet_SetWireInformation "E2E_VAPURARM"

'Select all checkboxes at the end of Funding Worksheet
BIZ_FundingWorksheet_CheckFeeLines()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Funding")
BIZ_Loan_FinishMilestone_AssignUser "Funding", FRM_DS_GetValue(objData, "NextUser")

blnWiringInstructionReceived = GUI_List_GetCellData(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfObject("swfname:=gridViewDocs"), 0, 1)
If(InStr(blnWiringInstructionReceived, "received") > 0)Then 
	FRM_Logger_ReportPassEvent "Check the check box for wiring instructions.","Wiring Instruction is received", Null
End If

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Funded") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS10Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
