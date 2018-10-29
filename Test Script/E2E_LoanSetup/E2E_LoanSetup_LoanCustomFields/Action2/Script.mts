'@******************************************************************************************
'@ TestStory: KBYO2: Automate End to End flow on LE page and CD Page
'@ TestCase: CBIZ-14188 KBYO2 - Create and Set Display Fields for Closing Costs Expiration Date/Time/TimeZone
'@ Test Automation JIRA Task: CTA-280
'@ TestData: "Global_Data", "Login", "sven_admin"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_KBYO2"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "E2E_KBYO2"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "E2E_KBYO2"
'@ TestData: "Tools_DisclosureTracking", "DisclosureDetailBorrower", "E2E_KBYO2"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to the Encompass with Admin user
	'2 Create a new form CBIZ-14188 with fields LE1.XD28,LE1.XD8 and LE1.XD9
	'3 Go to Pipeline.Click New loan.Enter the values in loan as per the test data.Save the loan.
	'4 Go to Tools->Disclosure Tracking.Send LE 
	'5 Open the entry log from Disclosure History. Enter Actual Received Date and click on Intent to Proceed checkbox and click ok
	'6 Verify the fields in New form CBIZ-14188
	'7 Open the LE disclosure record again and uncheck the Intend to proceed.
	'8 Verify the values of LE1.X28, LE1.X8 and LE1.X9
	'9 Go to form CBIZ-14188 again.
'@ ExpectedResult: 
	'1. User should be able to logged in
	'2. Form should be created and should be visible for new loans
	'3. Loan should be saved successfully.
	'4. LE should be sent successfully. And record should be added in the DT
	'5. The Disclosure details pop up box should be closed.
	'6. In new form, should display the LE1.XD28: NULL, LE1.XD8 : NULL, LE1.XD9 : NULL
	'7. Checkbox should be unchecked.
	'8. Check values LE1.X28: Closing Costs Expiration Date, LE1.X8: Closing Costs Expiration Time and LE1.X9 : Closing Costs Expiration Time Zone
	'9.Verify the values in the field it should display as below
		'LE1.XD28: LE1.X28: Closing Costs Expiration Date
		'LE1.XD8 : LE1.X8: Closing Costs Expiration Time
		'LE1.XD9 : LE1.X9 : Closing Costs Expiration Time Zone
		'Both LE1.XD and LE1.X  field values should be same. 
'********************************************************************************************
'======== Go to Tools -> Disclosure Tracking, then open the record ========
BIZ_Tools_Open "Disclosure Tracking"

BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking("LE")

'====== Open LE Disclosure Record ======
BIZ_DisclosureTrackingTool_ClickRecord "Disclosure Type", "Initial", "Double"

BIZ_DisclosureTrackingTool_SetBorrower("E2E_KBYO2")

UTIL_Win_SendKey("{TAB}")

BIZ_DisclosureTrackingTool_SetIntentToProceed("ON")

BIZ_DisclosureTrackingTool_CloseDetailWindow()

strFormName= BIZ_GetCustomFormName("CBIZ-14188_Form","ValidateFields")

BIZ_Forms_Open strFormName
wait 7
verifyNewFormBlankValues()

'======== Go to Tools -> Disclosure Tracking, then open the record ========
BIZ_Tools_Open "Disclosure Tracking"

'====== Open LE Disclosure Record ======
BIZ_DisclosureTrackingTool_ClickRecord "Disclosure Type", "Initial", "Double"

BIZ_DisclosureTrackingTool_SetIntentToProceed("OFF")

BIZ_DisclosureTrackingTool_CloseDetailWindow()

verifyNewFormValues(strFormName)



