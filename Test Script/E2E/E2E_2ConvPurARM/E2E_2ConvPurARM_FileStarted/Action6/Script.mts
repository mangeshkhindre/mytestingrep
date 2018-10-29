'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-316 File started 6-Get Rate Lock request and LO comp plan and Float.
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest, E2E_CONVPURARM	
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
    '01 Login to Encompass as Loan officer with the provided credentials.
	'02 Click lock icon in the header section 
	'03 Click 'Get pricing'button 	
	'04 In this product and pricing window click continue.
    '05 In the  Encompass rate sheet select a rate and click float button at the end of this page.
    '06 click ok in the pricing data imported window.
    '07 click close in the encompass product and pricing service pricing import  window.
    '08 In the lock request form click Submit request.
    '09 click manage borrowers button next to borrower information in lock request form and click self employed for both borrower and co-borrower.
    '10 click 'submit request' button.(get pricing step 2 and submit request should be done within 2 minutes. If not you can repeat the same steps from 2 to 9) 
    '11 click exit loan button in the popup window.
    '12 In pipeline select the same loan by double clicking on it.
'@ ExpectedResult:  
	'1 Lock request form opens 
	'2 Encompass product and pricing service window should open with user login information 
	'3 Encompass rate sheet should open 
	'4 pricing data has been imported- window should open 
    '5 Encompass product and pricing service pricing import window will open.
	'6 should go back to lock request form 
	'7 window opens which shows 'exit loan'and 'keep loan open' buttons 
	'8 Should go back to pipeline 
	'9 In the header section lcock requested message should be seen next to the lock icon  
      'Under the file started milestone price table- lock requested with the date should be seen 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-316","File started 6-Get Rate Lock request and LO comp plan and Float", Null

Dim strLockRequestedLabelText, strLoanNumber, blnProductNPricingReceived

If ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_CONVPURARM", "Float") = True)) Then 

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