﻿'***************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3176 FHAPURCHASEFIX- Resubmittal 1-Get Rate Lock request and LO comp plan and Float.
'@ Test Automation JIRA Task: PTAC-3156  E2E_4FHAPURCASHFIX_ReSubmittal
'@ TestData: 
    '1 Global, Login, E2E_markuslp
    '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
    '3 Loans, Milestone, E2E_FHAPURCASHFIX_Processing
'@ Pre-conditions:   
'@ Description:  
'@ TestSteps:
    '01 Login to Encompass as Loan Processor and click Accept File( If applicable based on User Role)
    '02 Navigate to your loan.In the loan header section
    '03 Right Click lock icon in the header section and select Lock request form
    '04 Click Get pricing button in the lock request form
    '05 In this product and pricing window give user credentials(If not auto populating) and click continue
    '06 In the  Encompass rate sheet select a rate with LO comp as 1.45 and click float button at the end of this page
    '07 Click ok in the pricing data imported window
    '08 Click close in the encompass product and pricing service pricing import  window
    '09 In the lock request form click 'Submit request' button
    '10 Click Exit loan in the pop up
    '11 Now select your loan from the pipeline view by double clicking on it
        'get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9
    '12 After saving the loan exit encompass.
'@ ExpectedResult:
    '01 Milestone alert has been cleared pop up will appear
    '02 Lock request form opens
    '03 Encompass product and pricing service window should open
    '04 Encompass  product and pricing rate sheet should open
    '05 pricing data has been imported- window should open
    '06 Encompass product and pricing service pricing import window will open
    '07 Should go back to lock request form.
    '08 A new window opens with the following message : Lock request has been submitted. Lock desk cannot process until you exit the loan
    '09 Loan will close and will navigate to pipeline view
    '10 In the header section < no of> days remaining message should be seen next to the lock icon. 
	'11 Loan should be saved.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3176","FHAPURCHASEFIX- Resubmittal 1-Get Rate Lock request and LO comp plan and Float.", Null

Dim objData, strLoanNumber, strLockRequestedLabelText

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Gets the Loan Number and Search the Loan in the Pipeline Tab
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS6Complete_FHAPURCASHFIX","Resubmittal"

If ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_FHAPURCASHFIX", "Float") = True)) Then 
    'Go to Pipeline Page
    BIZ_Nav_SelectPipelineTab()
    GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
    strLoanNumber = BIZ_Loan_GetLoanNumber()
    BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
    strLockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")
    
    If (InStr(strLockRequestedLabelText, "days") > 0) Then 
        FRM_Logger_ReportPassEvent "Rate Lock", "In the header section number of days remaining message should be seen next to the lock icon", Null
    Else 
        FRM_Logger_ReportFailEvent "Rate Lock", "In the header section number of days remaining message is not seen next to the lock icon", Null
    End If    
    BIZ_Loan_SaveLoanNumber()
    'Exists the Loan Details
    BIZ_Loan_Exit True
    
    'Logs out of Encompass
    BIZ_Login_UserLogout()
Else
    FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
    ExitTest
End If

Set objData = Nothing
