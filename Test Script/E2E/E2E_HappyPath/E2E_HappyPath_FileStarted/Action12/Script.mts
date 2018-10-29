'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1096 HP File started 6- Product and Pricing
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: Tools_LockRequestForm, SetRateLockRequest, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Go to Borrower summary and click on "Product and Pricing button"
	'2 Select EPPS service & submit
	'3 Click on Continue in Product & Pricing Request  window after providing user credentials as per test data
	'4 In the  Encompass rate sheet select a rate and click. Update Encompass button at the end of this page.
	'5 Click ok in the pricing data imported window.
	'6 Check the Product & Pricing received under log tab with requested date
'@ ExpectedResult: 
	'1 Lock request form opens.
	'2 Encompass product and pricing service window should open with user login information.
	'3 Encompass  product and pricing rate sheet should open.
	'4 pricing data has been imported- window should open.
	'5 Encompass product and pricing service pricing import window will open and selected loan product
	'6 System should populate PP received date entry
	  'The below fields should populate with value 
	  'Lender:
	  'MERS MIN:
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case:  PTAC-1096","HP File started 6- Product and Pricing", Null

BIZ_Forms_Open "Borrower Summary - Origination"

SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Product and Pricing").Click

'Opens the Product and Pricing window 
BIZ_Services_LoginProductAndPricing()

If ((BIZ_LockRequestForm_PerformProductNPricing("E2E_HappyPath", "Float") = True)) Then 
	ProductAndPricingExistsInLog = BIZ_AlertsAndLog_VerifyRecordExist("Log", "File started", "Product and Pricing received")
	If (ProductAndPricingExistsInLog = true) then
		FRM_Logger_ReportPassEvent "Check for Record in Log", "Product and Pricing Received is displayed in Log", Null
		BIZ_BorrowerSummaryOrigination_CheckIfMERSMINValueExists()
	Else
		FRM_Logger_ReportFailEvent "Check for Record in Log", "Product and Pricing Received is not displayed in Log", Null
	End If
Else
	FRM_Logger_ReportFailEvent "Submit Product and Pricing", "The Lock Request has been not been submitted", Null
	ExitTest
End If
