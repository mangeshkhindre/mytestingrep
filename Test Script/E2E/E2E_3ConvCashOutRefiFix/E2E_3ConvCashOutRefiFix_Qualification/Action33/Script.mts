'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3307 CONVCASHOUTREFIFIX Qualification 2 - Get Rate Lock request and LO comp plan and Float.
'@ Test Automation JIRA Task:  PTAC-3372 E2E_3CONVCASHOUTREFIFIX_Qualification
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest, E2E_CONVCASHOUTREFIFIX	
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
	'1 In the loan header section
      '1 Right Click lock icon in the header section and select 'Lock request form'.
      '2 Click' Get pricing' button in the lock request form.
      '3 In this product and pricing window give user credentials(If not auto populating) and click continue.
      '4 In the  Encompass rate sheet select a rate with LO comp as 1.45 and click float button at the end of this page.
      '5.Click ok in the pricing data imported window.
      '6.Click close in the encompass product and pricing service pricing import  window.
      '7.In the lock request form click 'Submit request' button.
      '8.Click 'Exit loan' in the pop up.
      '9.Now select your loan from the pipeline view by double clicking on it.
        '(get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9) 
    '2 After saving the loan exit encompass.   
'@ ExpectedResult:  
	'01 Lock request form opens 
	'02 Encompass product and pricing service window should open 
	'03 Encompass  product and pricing rate sheet should open.
	'04 pricing data has been imported- window should open 
	'05 Encompass product and pricing service pricing import window will open.
    '06 Should go back to lock request form
	'07 A new window opens with the following message : Lock request has been submitted. Lock desk cannot process until you exit the loan.
	'07 Should go back to pipeline 
	'08 Loan will close and will navigate to pipeline view.
    '09 In the header section lock requested message should be seen next to the lock icon. 
    '10 Loan should be saved.  
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3307","CONVCASHOUTREFIFIX Qualification 2 - Get Rate Lock request and LO comp plan and Float.", Null

Dim strLockRequestedLabelText, strLoanNumber, blnProductNPricingReceived

If ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_CONVCASHOUTREFIFIX", "Float") = True)) Then 
	'Go to Pipeline Page
	 BIZ_Nav_SelectPipelineTab()
	 GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	 strLoanNumber  = BIZ_Loan_GetLoanNumber()
	 BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
	 
	 Wait g_LongWaitLarge + g_LongWaitLarge
	 
	strLockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")	
	If (InStr(strLockRequestedLabelText, "Lock Requested") > 0) Then 
	    FRM_Logger_ReportPassEvent "Rate Lock", "In the header section lock requested message should be seen next to the lock icon", Null
	Else
	    FRM_Logger_ReportFailEvent "Rate Lock", "In the header section lock requested message is not seen next to the lock icon", Null
	End If
	
	blnProductNPricingReceived = BIZ_AlertsAndLog_VerifyRecordExist("Log", "File Started", "Price Table - Lock Request received") 
	
	If blnProductNPricingReceived Then 
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
