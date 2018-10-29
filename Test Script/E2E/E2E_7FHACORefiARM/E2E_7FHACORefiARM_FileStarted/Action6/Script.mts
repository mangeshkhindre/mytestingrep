'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2391 FHACOREFIARM Filestarted 6- Get EPPS pricing with LO comp plan and float
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   'Tools_LockRequestForm, SetRateLockRequest and E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
   '1 Click lock icon in the header section 
   '2 Click 'Get pricing'button 	
   '3 In this product and pricing window click continue 
   '4 In the  Encompass rate sheet select a rate and click 
   '5 'Float' button at the end of this page(Select a rate with '1.475' under the comp column
   '5 click ok in the pricing data imported window 
   '6 Click close in the encompass product and pricing service pricing import  window
'@ ExpectedResult:  
   '1 Lock request form opens 
   '2 Encompass product and pricing service window should open with user login information 
   '3 Encompass  product and pricing rate sheet should open
   '4 pricing data has been imported- window should open 
   '5 Encompass product and pricing service pricing import window will open
   '6 Should go back to lock request form   
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2391","FHACOREFIARM Filestarted 6- Get EPPS pricing with LO comp plan and float", Null

Dim strLoanNumber

If (BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_FHACORefiARM", "Float") = True) Then 
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
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If