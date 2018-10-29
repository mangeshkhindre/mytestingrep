'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1261 CONVNOCASHREFIARM- Filestarted 6- Get EPPS pricing with LO comp plan and float
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: 
    '1 Tools_LockRequestForm, SetRateLockRequest and E2E_ConvNoRefiARM
    '2 Tools_LockRequestForm, SetManageBorrowers and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
	'1 Click lock icon in the header section and click on 'Lock request Form'.	
	'2 Click' Get pricing' button.	
	'3 In this product and pricing window (credentials will be auto populated) click continue.	
	'4 In the Encompass rate sheet select a rate and click float button at the end of this page(Select a rate with '1.450' under the comp column).	
	'5 Click ok in the pricing data imported window.	
	'6 Click close in the encompass product and pricing service pricing import window.	
'@ ExpectedResult:  
	'1 Lock request form opens.
	'2 Encompass product and pricing service window should open with user login information.
	'3 Encompass product and pricing rate sheet should open.
	'4 Pricing data has been imported- window should open.
	'5 Encompass product and pricing service pricing import window will open.
	'6 Should go back to lock request form.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1261","CONVNOCASHREFIARM- Filestarted 6- Get EPPS pricing with LO comp plan and float", Null

Dim LockRequestedLabelText,  strLoanNumber, blnProductNPricingReceived

BIZ_LockRequestForm_ProductNPricingFromGetPricing "E2E_ConvNoRefiARM", "Float"

'Go to Pipeline Page
BIZ_Nav_SelectPipelineTab()

GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
LockRequestedLabelText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=lblLockInfo"), "text")

If (InStr(LockRequestedLabelText, "Lock Requested") > 0) Then 
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

'====== Saves the Loan Details ======
BIZ_Loan_Exit True

GUI_Dialog_Encompass_YesX 5, ""