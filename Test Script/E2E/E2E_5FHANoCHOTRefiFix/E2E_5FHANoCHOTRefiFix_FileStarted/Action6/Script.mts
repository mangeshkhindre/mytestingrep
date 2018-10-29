'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1513 FHANOCHOTREFIFIX File started 6 Get EPPS pricing with LO comp plan and float
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData:  Tools_LockRequestForm, SetRateLockRequest and E2E_FHANoCHOTRefiFixs
'@ Pre-conditions: 
'@ Description: Get Rate Lock and LO comp plan and Float
'@ TestSteps:
   '1 Click lock icon in the header section 
   '2 Click 'Get pricing'button 	
   '3 In this product and pricing window click continue 
   '4 In the  Encompass rate sheet select a rate and click Float button at the end of this page(Select a rate with '1.450' under the comp column).
   '5 click ok in the pricing data imported window 
   '6 Click close in the encompass product and pricing service pricing import  window
'@ ExpectedResult:  
   '1 Lock request form opens 
   '2 Encompass product and pricing service window should open with user login information 
   '3 Encompass  product and pricing rate sheet should open
   '4 Pricing data has been imported- window should open
   '5 Encompass product and pricing service pricing import window will open
   '6 Should go back to lock request form 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1513","Filestarted 6 Get EPPS pricing with LO comp plan and float", Null

Dim  strLoanNumber

If ((BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_FHANoCHOTRefiFix", "Float") = True)) Then
	'Go to Pipeline Page
	BIZ_Nav_SelectPipelineTab()
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"), 120,  "Pipe Line Tab is opened"
	strLoanNumber = BIZ_Loan_GetLoanNumber()
	BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=closeBtn")
	GUI_Dialog_Encompass_YesX 40, ""
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If