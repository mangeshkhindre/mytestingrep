'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E 
'@ TestCase:  PTAC-1140 HP Conditional Approval 4-Rate Lock
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: "Tools_LockRequestForm/SetRateLockRequest/E2E_HappyPath
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description: Order title and closing and finish milestone.
'@ TestSteps:
	'1 Click on 'Tools' tab and select 'Lock Form Request'.
	'2 Go to 'Transaction Details' -> 'Impound Types' label and select 'Taxes and Insurance (T&I) from drop down list.
	'3 Click on 'Get Pricing' button and select the loan product in EPPS.	
	'4 Update the Lock date and Lock Expiration date and click on 'Submit Request' button.	
	'5 Click on 'Exit Loan' button in the Encompass dialog box to initiate the lock desk process.
'@ ExpectedResult: 
	'1 After Step 3, 
	'2 Lock Request status is updated.
	'3 After Step 4, Encompass dialog box with message 'The lock request had been submitted. The lock desk cannot process
	'4 After step 5, the loan gets closed.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1140","TestCase Name - HP Conditional Approval 4-Rate Lock", Null

Dim objStatusOnlineDialog
Set objStatusOnlineDialog 	= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=StatusOnlineDialog")
If(BIZ_LockRequestForm_ProductNPricingFromGetPricing("E2E_HappyPath", "Float"))Then 
	FRM_Logger_ReportPassEvent "Submit Product and Pricing", "The Lock Request has been submitted sucessfully", null
End If
Set objStatusOnlineDialog   = Nothing 
