'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase:  PTAC-2971 CONVCASHOUTREFIFIX File started 4 - Get EPPS pricing with LO comp plan and float
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest, E2E_CONVCASHOUTREFFIX	
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
	'1 Lock request form opens.
	'2 Encompass product and pricing service window should open with user login information. 
	'3 Encompass  product and pricing rate sheet should open.
	'4 Pricing data has been imported- window should open.
	'5 Encompass product and pricing service pricing import window will open.
	'6 Should go back to lock request form.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2971","CONVCASHOUTREFIFIX File started 4 - Get EPPS pricing with LO comp plan and float", Null

Dim strLockRequestedLabelText, strLoanNumber,blnProductNPricingReceived

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If  ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_CONVCASHOUTREFFIX", "Float") = True)) Then 
	'Go to Pipeline Page
	BIZ_Nav_SelectPipelineTab()
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	
	SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtBox","index:=1").Set ""
	UTIL_Win_SendKey "{ENTER}"
	strLoanNumber = BIZ_Loan_GetLoanNumber()
	BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
	
	strLockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")
	
	If (InStr(strLockRequestedLabelText, "Lock Requested") > 0) Then 
	    FRM_Logger_ReportPassEvent "Rate Lock", "In the header section lock requested message should be seen next to the lock icon", Null
	Else
	    FRM_Logger_ReportFailEvent "Rate Lock", "In the header section lock requested message is not seen next to the lock icon", Null
	End If
	
	blnProductNPricingReceived = BIZ_AlertsAndLog_VerifyRecordExist("Log", "File Started", "Price Table - Lock Request received") 
	
	If  blnProductNPricingReceived Then 
		FRM_Logger_ReportPassEvent "Validate Product and Pricing is Log", "Price Table- Lock Request is displayed in Log", Null
	Else
		FRM_Logger_ReportFailEvent "Validate Product and Pricing is Log", "Price Table- Lock requested is not displayed in Log", Null
	End If
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If
