'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2266 File started 7-Get Rate Lock request and LO comp plan and Float
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_Filestarted
'@ TestData: Tools_LockRequestForm, SetRateLockRequest and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass as Loan officer with the provided credentials
   '2 Click lock icon in the header section and click on 'Lock request form'
   '3 Click' Get pricing' button. In this product and pricing window click continue
   '4 In the  Encompass rate sheet select a rate and click float button at the end of this page
   '5 click ok in the pricing data imported window. click close in the encompass product and pricing service pricing import  window
   '6 In the lock request form click Submit request. click manage borrowers button next to borrower information in lock request form and click self employed for both borrower and co-borrower
   '7 Click 'submit request' button.(get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9) 
   '8 Click exit loan button in the popup window. In pipeline select the same loan by double clicking on it. 
'@ ExpectedResult: 
   '1 Lock request form opens.Encompass product and pricing service window should open with user login information
   '2 Encompass  product and pricing rate sheet should open
   '3 pricing data has been imported- window should open
   '4 Encompass product and pricing service pricing import window will open.should go back to lock request form
   '5 A popup window will open with the following fields not filled: experian,transunion and equifax
   '6 All the credit score values will be populated
   '7 A new window opens with the following message : Lock request has been submitted. Lockdesk cannot process until you exit the loan
   '8 Should go back to pipeline
   '9 In the header section lock requested message should be seen next to the lock icon. 
	  'Under log and under file started milestone "price table- lock requested" with the date should be seen
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2266","File started 7-Get Rate Lock request and LO comp plan and Float", Null

Dim strLoanNumber, strLockRequestedLabelText, blnProductNPricingReceived

BIZ_Loan_SaveLoanNumber()

If ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_VANoCORefiARM", "Float") = True)) Then
	 'Go to Pipeline Page
	 BIZ_Nav_SelectPipelineTab()
	 GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	 strLoanNumber 			   = BIZ_Loan_GetLoanNumber()
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
	 
	 'Exit the Loan Details
	 BIZ_Loan_Exit True
	 
	 'Logout From Encompass
	 BIZ_Login_UserLogout()
Else
	 FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	 ExitTest
End If
