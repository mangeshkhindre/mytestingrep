﻿'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2327 Shipping 1 - Complete shipping detail form
'@ Test Automation JIRA Task: PTAC-2399 E2E_8VAPURARM_Shipping
'@ TestData: 
	'1 Tools_ShippingDetail, SetShippingDetail and E2E_VAPURARM
	'2 Tools_ShippingDetail, SetShipTo and E2E_VAPURARM
	'3 Tools_ShippingDetail, SetPhysicalFileStorage and E2E_VAPURARM
	'4 Global_Data, Login and E2E_marypcs
	'5 Loans, LoanTemplate and E2E_PostCloser
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:
'@ TestSteps:
    '1 Login as Shipper and navigate to your loan
    '2 Click on tools and click on Shipping Detail
    '3 Enter the following details in the shipping detail form
    '4 Go to log and click on shipping.Then check the checkbox for finished
    '5 Go to log tab and click on completion.Then check the checkbox for finished
'@ ExpectedResult:
    '1 Should be able to login as shipper and navigate to your loan
    '2 Shipping detail should open
    '3 Should be able to enter all the fields
    '4 Should be able to finish the milestone ( Shipping)
    '5 Should be able to finish the milestone ( Completion)
'***************************************************************************************************

FRM_RT_SetupTest(Null)
	
Dim  objData
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2399","Script Name: E2E_8VAPURARM_Shipping", Null

'====== Login to the Encompass with user marypcs ======
BIZ_Login_UserLogin "E2E_marypcs"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2327","Shipping 1 - Complete shipping detail form", Null

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS11Complete_VAPURARM","Shipping"

BIZ_Tools_Open("Shipping Detail")

BIZ_ShippingDetail_SetShippingDetail "E2E_VAPURARM"
BIZ_ShippingDetail_SetShipTo "E2E_VAPURARM"
BIZ_ShippingDetail_SetPhysicalFileStorage "E2E_VAPURARM"
	
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Shipping")
BIZ_Loan_FinishMilestone_AssignUser "Shipping", FRM_DS_GetValue(objData, "NextUser")
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"	
GUI_Dialog_Encompass_OKX 5, ""

'Scroll down the log tab and make the milestone visible
BIZ_AlertsAndLog_ClickOnRecord "Log", "Completion"
	
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"	
GUI_Dialog_Encompass_OKX 5, ""

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Shipping finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Complete_VAPURARM"
	FRM_Logger_ReportPassEvent "E2E Shipping Milestone", "Shipping Milestone is finished", Null
Else
	FRM_Logger_ReportFailEvent "E2E Shipping Milestone", "Shipping Milestone is not finished", Null
End If

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Completed")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Complete_VAPURARM"
	FRM_Logger_ReportPassEvent "E2E Completion Milestone", "Completion Milestone is finished", Null
Else
	FRM_Logger_ReportFailEvent "E2E Completion Milestone", "Completion Milestone is not finished", Null
End If
	
'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing

FRM_RT_TearDownTest(Null)
