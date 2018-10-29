﻿'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3490 CONVCASHOUTREFIFIX Shipping 1 - Complete shipping detail form
'@ Test Automation JIRA Task: PTAC-3383 E2E_3CONVCASHOUTREFIFIX_Shipping
'@ TestData: 
   '1 Tools_ShippingDetail, SetShippingDetail and E2E_CONVCASHOUTREFIFIX
   '2 Tools_ShippingDetail, SetShipTo and E2E_CONVCASHOUTREFIFIX
   '3 Tools_ShippingDetail, SetPhysicalFileStorage and E2E_CONVCASHOUTREFIFIX
   '4 Loans, LoanTemplate and E2E_PostCloser
   '5 Global_Data, Login, E2E_marypcs
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
   '4 Should be able to finish the milestone
   '5 Should be able to finish the milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3383","Script Name - E2E_3CONVCASHOUTREFIFIX_Shipping", Null

Dim objData,objDataShipping
'====== Login to the Encompass with user marypcs ======
BIZ_Login_UserLogin "E2E_marypcs"
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3490","CONVCASHOUTREFIFIX Shipping 1 - Complete shipping detail form", Null

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_PostCloser")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS11Complete_CONVCASHOUTREFIFIX","Shipping"
BIZ_Tools_Open "Shipping Detail"

BIZ_ShippingDetail_SetShippingDetail "E2E_CONVCASHOUTREFIFIX"
BIZ_ShippingDetail_SetShipTo "E2E_CONVCASHOUTREFIFIX"
BIZ_ShippingDetail_SelectAllCopyFromShipToButtons()
BIZ_ShippingDetail_SetPhysicalFileStorage "E2E_CONVCASHOUTREFIFIX"

'Scroll down the log tab and make the milestone visible
BIZ_AlertsAndLog_ClickOnRecord "Log", "Shipping"

'====== Selects the Processor and finishes the Milestone
Set objDataShipping = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Shipping")
BIZ_Loan_FinishMilestone_AssignUser "Shipping", FRM_DS_GetValue(objDataShipping, "NextUser")
	
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"	
GUI_Dialog_Encompass_OKX 5, ""

'Scroll down the log tab and make the milestone visible
BIZ_AlertsAndLog_ClickOnRecord "Log", "Completion"	
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckBox("swfname:=checkBoxFinished"),"ON"	
GUI_Dialog_Encompass_OKX 5, ""

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Shipping finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Complete_CONVCASHOUTREFIFIX"
	FRM_Logger_ReportPassEvent "E2E Shipping Milestone", "Shipping Milestone is finished", Null
Else
	FRM_Logger_ReportFailEvent "E2E Shipping Milestone", "Shipping Milestone is not finished", Null
End If

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Completed")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Complete_CONVCASHOUTREFIFIX"
	FRM_Logger_ReportPassEvent "E2E Completion Milestone", "Completion Milestone is finished", Null
Else
	FRM_Logger_ReportFailEvent "E2E Completion Milestone", "Completion Milestone is not finished", Null
End If

'Exit the Loan Details
BIZ_Loan_Exit True

'Log out of Encompass
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)

Set objData         = Nothing
Set objDataShipping = Nothing
