'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3486 CONVCASHOUTREFIFIX Funding 1- Complete the funding worksheet 
'@ Test Automation JIRA Task: PTAC-3381 E2E_3CONVCASHOUTREFIFIX_Funding
'@ TestData: 
    '1 Loans,Milestone and E2E_CONVCASHOUTREFIFIX_Funding
    '2 Tools_FundingWorkSheet,SetFundingClosing and E2E_CONVCASHOUTREFIFIX
    '3 Tools_FundingWorkSheet,SetWireInformation and E2E_CONVCASHOUTREFIFIX
    '4 Tools_FundingWorkSheet,SetFundingSource and E2E_CONVCASHOUTREFIFIX
    '5 Loans, LoanTemplate and E2E_Funder
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login as Funder
    '2 Click on tools and click 'Funding worksheet'.
    '3 Complete the following fields in the funding worksheet:
	  'Under Funding/closing
	  'Funder
	  'Sent to Funder
	  'Funding Type
	  'Clear to close
	  'Funds ordered
    '4 Click on log and click on 'funding'.Under documents section check the check box for wiring instructions.
    '5 Click on magnifying lens next to Post closer and select 'Mary PCandShipper'.Click finish milestone.
'@ ExpectedResult:
    '1 Should be able to login and accept file.
    '2 Funding worksheet should open.
    '3 Total deductions value should populate when you select all check boxes under CD line.
    '4 Funding worksheet for funder user will open.It should show as received.
    '5 Milestone should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3486","CONVCASHOUTREFIFIX Funding 1- Complete the funding worksheet", Null

Dim  objData, blnWiringInstructionReceived

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Funder")

'Login to the Encompass as closer
BIZ_Login_UserLogin "E2E_funder"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS9Complete_CONVCASHOUTREFIFIX","Funding"
'Go to Tools->Funding Worksheet
BIZ_Tools_Open "Funding worksheet"

'Sets the function details 
BIZ_FundingWorksheet_SetFundingClosing "E2E_CONVCASHOUTREFIFIX"
BIZ_FundingWorksheet_SetFundingSource "E2E_CONVCASHOUTREFIFIX"
BIZ_FundingWorksheet_SetWireInformation "E2E_CONVCASHOUTREFIFIX"

'Select all checkboxes at the end of Funding Worksheet
BIZ_FundingWorksheet_CheckFeeLines()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Funding")

BIZ_Loan_FinishMilestone_AssignUser "Funding", FRM_DS_GetValue(objData, "NextUser")

blnWiringInstructionReceived = GUI_List_GetCellData(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage").SwfObject("swfname:=gridViewDocs"), 0, 1)

If (InStr(blnWiringInstructionReceived, "received") > 0)Then 
	FRM_Logger_ReportPassEvent "Check the check box for wiring instructions.","Wiring Instruction is received", Null
End If

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Funded")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS10Complete_CONVCASHOUTREFIFIX"
End If

'Exit the Loan Details
BIZ_Loan_Exit True

'Log out from Encompass
BIZ_Login_UserLogout()

Set objData 	= Nothing
