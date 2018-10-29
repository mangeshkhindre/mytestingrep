'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-1868 File started 6-Get Rate Lock request and LO comp plan and Float
'@ Test Automation JIRA Task: PTAC-2011 E2E_6FHAPURARM_Filestarted
'@ TestData: 
   'Tools_LockRequestForm, SetRateLockRequest, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
	'01 Click lock icon in the header section 
	'02 Click 'Get pricing'button 	
	'03 In this product and pricing window click continue 
	'04 In the  Encompass rate sheet select a rate and click float button at the end of this page 
	'05 click ok in the pricing data imported window.
    '06 click close in the encompass product and pricing service pricing import  window.
    '07 In the lock request form click Submit request.
    '08 click manage borrowers button next to borrower information in lock request form and click self employed for both borrower and co-borrower.
    '09 click 'submit request' button.(get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9) 
    '10 click exit loan button in the popup window.
    '11 In pipeline select the same loan by double clicking on it.
'@ ExpectedResult:  
	'01 Lock request form opens 
	'02 Encompass product and pricing service window should open with user login information 
	'03 Encompass rate sheet should open 
	'04 pricing data has been imported- window should open 
	'05 Encompass product and pricing service pricing import window will open.
    '06 should go back to lock request form.
    '07 a popup window will open with the following fields not filled: experian,transunion and equifax.
    '08 all the credit score values will be populated.
    '09 A new window opens with the following message : Lock request has been submitted. Lockdesk cannot process until you exit the loan.
    '10 Should go back to pipeline.
    '11 In the header section lock requested message should be seen next to the lock icon. Under log and under file started milestone "price table- lock requested" with the date should be seen. 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1868","File started 6-Get Rate Lock request and LO comp plan and Float", Null

Dim strLockRequestedLabelText, strLoanNumber, blnProductNPricingReceived

If((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_FHAPURARM", "Float") = True)) Then 

	'Go to Pipeline Page
	BIZ_Nav_SelectPipelineTab()
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	strLoanNumber = BIZ_Loan_GetLoanNumber()
	BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
	strLockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")
	
	If (InStr(strLockRequestedLabelText, "Lock Requested") > 0) Then 
		FRM_Logger_ReportPassEvent "Rate Lock", "In the header section lock requested message should be seen next to the lock icon", Null
	Else
		FRM_Logger_ReportFailEvent "Rate Lock", "In the header section lock requested message is not seen next to the lock icon", Null
	End If 
	
	blnProductNPricingReceived = BIZ_AlertsAndLog_VerifyRecordExist("Log", "File Started", "Price Table - Lock Request received") 
	
	If (blnProductNPricingReceived = True) Then 
		FRM_Logger_ReportPassEvent "Validate Product and Pricing is Log", "Price Table- Lock Request is displayed in Log", Null
	Else
		FRM_Logger_ReportFailEvent "Validate Product and Pricing is Log", "Price Table- Lock requested is not displayed in Log", Null
	End If
	
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=closeBtn")
	GUI_Dialog_Encompass_YesX 40, ""
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog").SwfButton("swfname:=btnClose")
	
	'Exists the Loan Details
	BIZ_Loan_Exit True
	
	'Logs out of Encompass
	BIZ_Login_UserLogout()
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If