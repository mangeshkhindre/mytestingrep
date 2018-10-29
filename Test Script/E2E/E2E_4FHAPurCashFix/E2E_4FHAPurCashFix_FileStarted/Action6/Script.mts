'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : 
	 '1 PTAC-3008 FHAPURCHASEFIX - File Started 5-Get EPPS pricing with LO comp plan and float.
	 '2 PTAC-3077 FHAPURCHASEFIX - File Started 6-Get Rate Lock request
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest, E2E_FHAPURCASHFIX	
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
	'1 Click lock icon in the header section and click on 'Lock request Form'.
	'2 Click 'Get pricing'button 	
	'3 In this product and pricing window (credentials will be auto populated) click continue.
	'4 In the  Encompass rate sheet select a rate and click float button at the end of this page(Select a rate with '1.450' under the comp column).
	'5 click ok in the pricing data imported window 
	'6 Click close in the encompass product and pricing service pricing import  window. 
'@ ExpectedResult:  
	'1 Lock request form opens 
	'2 Encompass product and pricing service window should open with user login information 
	'3 Encompass rate sheet should open 
	'4 pricing data has been imported- window should open 
	'5 Encompass product and pricing service pricing import window will open.
    '6 Should go back to lock request form.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3008","FHAPURCHASEFIX - File Started 5-Get EPPS pricing with LO comp plan and float.", Null
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3077","FHAPURCHASEFIX - File Started 6-Get Rate Lock request", Null
Dim strLockRequestedLabelText, strLoanNumber,blnProductNPricingReceived

If  ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_FHAPURCASHFIX", "Float") = True)) Then 
	'Go to Pipeline Page
	BIZ_Nav_SelectPipelineTab()
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	
	strLoanNumber             = BIZ_Loan_GetLoanNumber()
	BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
	strLockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")
	
	If (InStr(strLockRequestedLabelText, "Lock Requested") > 0) Then 
	   FRM_Logger_ReportPassEvent "Rate Lock", "In the header section lock requested message should be seen next to the lock icon", Null
	Else
	   FRM_Logger_ReportFailEvent "Rate Lock", "In the header section lock requested message is not seen next to the lock icon", Null
	End If
	
	blnProductNPricingReceived = BIZ_AlertsAndLog_VerifyRecordExist("Log", "File Started", "Price Table - Lock Request received") 
	blnProductNPricingReceived2 = BIZ_AlertsAndLog_VerifyRecordExist("Log", "Qualification", "Price Table - Lock Request received") 
	blnProductNPricingReceived3 = BIZ_AlertsAndLog_VerifyRecordExist("Log", "Disclosure Tracking", "Price Table - Lock Request received") 
	blnProductNPricingReceived4 = BIZ_AlertsAndLog_VerifyRecordExist("Log", "Processing", "Price Table - Lock Request received") 
	If  blnProductNPricingReceived or blnProductNPricingReceived2 or blnProductNPricingReceived3 or blnProductNPricingReceived4 Then 
		FRM_Logger_ReportPassEvent "Validate Product and Pricing is Log", "Price Table- Lock Request is displayed in Log", Null
	Else
		FRM_Logger_ReportFailEvent "Validate Product and Pricing is Log", "Price Table- Lock requested is not displayed in Log", Null
	End If

	BIZ_Loan_Exit True
	
	'Logs out of Encompass
	BIZ_Login_UserLogout()
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If
