'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase: 
			'PTAC-1221 Verify "Disable alerts"			
'@ Test Automation JIRA Task:  PTAC-1504
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Settings_LoanSetup", "Alerts","Settings_Alerts"
			'"Settings_LoanSetup", "Alerts","Alerts_eConsent"
			'"Settings_LoanSetup", "Alerts","Alerts_eConsent_01"
			'"Forms_ClosingDisclosurePage", "SetClosingInformation","28531_ClosingInfo"
			'"Forms_RegZ_CD", "SetLoanTerms","1490_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts_noDOB"
			'"Forms_BorrowerSummaryOrigination","SetProperty","Settings_Alerts_Propinfo"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","Settings_Alerts_Trasactiondetails"
			'"Forms_2015Itemization", "Set900Section","1490_ComplianceAlerts"
			'"Forms_2015Itemization", "Set800Section","PTAC-1490_Alerts"
			'"Forms_2015Itemization", "Set800Section","PTAC-1490_Alerts_01"
			'"Forms_ClosingDisclosurePage", "SetClosingInformation","28531_ClosingInfo"
			'"Forms_RegZ_CD", "SetLoanTerms","1490_DisclosureInfo"
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Log into Encompass as Admin/password.Go to Settings > Loan setup> Alerts, select the below list of Alerts (9) and set Enable Alert = NO 
		'	Open "Send initial disclosures". Select 'Enable Alert' as 'No', click on Save
		'	Open "eConsent Not Yet Received".Select 'Enable Alert' as 'No', click on Save
		'	Open "Closing date violation".Select 'Enable Alert' as 'No', click on Save
		'	Open "Good Faith Fee Variance Violated" Alert.Select 'Enable Alert' as 'No', click on Save
		'	Open "Redisclose Loan Estimate (Rate Lock)".Select 'Enable Alert' as 'No', Click on Save
		'	Open "Redisclose Loan Estimate(Changed Circumstance)".Select 'Enable Alert' as 'No', Save
		'	Open "Redisclose Closing Disclosure (APR, Product, Prepay)".Select 'Enable Alert' as 'No', Save
		'	Open "Redisclose Closing Disclosure (Changed Circumstance)".Select 'Enable Alert' as 'No', Save
		'	Open "Loan Estimate Expires".Select 'Enable Alert' as 'No', Save
		'2. Click on "Close" Icon of Settings tab
		'3. Login to Encompass with admin, and Navigate to Pipeline tab > Click on New Loan icon (right corner) 
		'	Click on New Bank Loan button. Enter the test data 1 mentioned in Test Data column, save.Go to Settings- Loan setup-Alerts, select and open 'send initial disclosures'.
		'	Click on 'Add fields' icon. Enter 1402 in the Field ID, click on Add button, save.
		'	Navigate to Pipeline tab and click on create New loan.Enter test data 2 as mentioned and Verify that send initial disclosures alert
		'4. Navigate to Pipeline tab and click on create New loan and Verify that the 'E-consent not yet received' alert.
		'	Go to settings-Loan setup-Alerts. Select and open the 'eConsent Not Yet Received' Change the "Choose the trigger date" to "Application  Date:3142'. Save the settings
		'	Navigate to Pipeline tab and click on create New loan.Go to Tools - Disclosure tracking, uncheck the 'Application Date' field, enter the current date and verify the alert
		'5. Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the data mentioned in Test Data column, save.Enter test data 2 for date in 763 field as Current date-1, 
		'	Go to Tools - Disclosure Tracking.	Click on + Add a Disclosure Record, and choose the 'Disclosure' Checkbox with 'LE' option, and click on OK button
		'	Verify that the closing date violation alert
		'6. Navigate to Pipeline tab > Click on New Loan icon (right corner). Click on New Bank Loan button
		'	Enter the test data 1 mentioned in Test Data column, save.Enter Test data 2, and Go to 2015 itemization page and enter details given in respective section. Save the loan.
		'	Go to Tools - Disclosure Tracking. Click on + Add a Disclosure Record, and choose the 'Disclosure' Checkbox with 'LE' option, 
		'	Click on OK button on pop up, verify the 'LE sent' column. Enter Test data 3, and Go to 2015 itemization page and enter details given in respective section. Save the loan.
		'	Verify that Good faith Variance
		'7. Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the test data mentioned in Test Data column, save.Go to Tools - Disclosure Tracking
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
		'	Click on OK button on pop up, verify the 'LE sent' column.Go to ATR/QM Management> Qualification tab >APR / APOR section,  in the 761 (Rate Lock Date)field, "add any date more that system date" . Verify that "Redisclose loan Estimate(Rate lock)"
		'8. Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the test data 1 mentioned in Test Data column, save.Go to Tools - Disclosure Tracking
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
		'	Enter test data 2, and Go to 2015 itemization, and add some new fees in 900 section
		'	Go to LE page 1 and check the checkbox labeled Changed circumstance which is right side.
		'	Verify the alert "Redisclose Loan Estimate (Changed Circumstance)"
		'9. Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the data mentioned in Test Data column, save. Go to Tools - Disclosure Tracking
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with CD option, and click on OK button
		'	Go to RegZ-CD and enter 12 in 1177 field. Verify that "Redisclose Closing disclosure(APR,Product,Prepay)" alert 
		'10.Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the data mentioned in Test Data column, save.Go to Tools - Disclosure Tracking
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
		'	Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with CD option, and click on OK button
		'	Verify that "Redisclose closing disclosure(changed circumstance)" alert 
		'11.Navigate to Pipeline tab > Click on New Loan icon (right corner).Click on New Bank Loan button
		'	Enter the data mentioned in Test Data column, save.Go to Field LE1.X28 (LE Page 1 - Closing Costs Estimate Expiration Date)and set the date to current date and save the loan.(click on lock icon next to the field to edit it)
		'	Verify that "Loan estimate expires" alert. 		
'@ ExpectedResult:
		'1. Admin should be able to login successfully. All the listed Alerts should be disabled
		'2. The Settings tab should be closed.
		'3. When all the mentioned fields are entered the "Send initial disclosures" alert should NOT generate.
		'4. E-Consent not Yet Received alert should NOT generate in 'Alerts & messages' for a new loan
		'5. Closing date violation" alert should NOT fired
		'6. The "Good Faith Fee Variance" alert should NOT triggered in 'Alerts & messages'
		'7. "Redisclose Loan estimate (ratelock)" alert should NOT fired in 'Alerts & messages'
		'8. Redisclose Loan Estimate (Changed Circumstance)" alert should NOT generate in Alerts & Messages
		'9. Redisclose Closing disclosure(APR,Product,Prepay)" alert should NOT generated in Alerts & Messages
		'10.The "Redisclose closing disclosure(changed circumstance)" alert should NOT fired
		'11.Loan estimate expires" alert should NOT generate.
		
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1221","Verify 'Disable alerts'", Null

'====== disable alerts ======
FRM_Logger_ReportInfoEvent "Disable Alerts","Pre-requisite step for disabling required alerts",Null
BIZ_Alerts_DisableAlert "Send Initial Disclosures"
BIZ_Alerts_DisableAlert "eConsent Not Yet Received"
BIZ_Alerts_DisableAlert "Closing Date Violation"
BIZ_Alerts_DisableAlert "Good Faith Fee Variance Violated"
BIZ_Alerts_DisableAlert "Redisclose Loan Estimate (Rate Lock)"
BIZ_Alerts_DisableAlert "Redisclose Loan Estimate (Changed Circumstance)"
BIZ_Alerts_DisableAlert "Redisclose Closing Disclosure (APR, Product, Prepay)"
BIZ_Alerts_DisableAlert "Redisclose Closing Disclosure (Changed Circumstance)"
BIZ_Alerts_DisableAlert "Loan Estimate Expires"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'====== set borrower info ====== 
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts_noDOB"
BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Settings_Alerts_Trasactiondetails"
BIZ_1003Page2_SetMonthlyIncomeExpensesData "Settings_Alerts_BaseIncome"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Send Initial Disclosures"

'====== edit send initial disclosure alert ======
BIZ_LoanSetup_Alerts_EditAlert "Settings_Alerts"

BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Send Initial Disclosures"

'====== set trigger date for "eConsent Not Yet Received" Alert to File Started date ======
BIZ_LoanSetup_Alerts_EditAlert "Alerts_eConsent"

'BIZ_Loan_AddNewBlankLoan()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "eConsent Not Yet Received"
'BIZ_Loan_Exit "False"
'BIZ_Nav_SelectPipelineTab

'====== Set trigger Date in "eConsent Not Yet Received" Alert to Application Date ======
BIZ_LoanSetup_Alerts_EditAlert "Alerts_eConsent_01"

'BIZ_Loan_AddNewBlankLoan()

BIZ_Tools_Open "Disclosure Tracking"

BIZ_DisclosureTrackingTool_SetComplianceTimeline "OtherAlerts_data"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "eConsent Not Yet Received"

'====== set trigger date back to original date ======
BIZ_LoanSetup_Alerts_EditAlert "Alerts_eConsent"

BIZ_Forms_Open "Borrower Summary - Origination"

BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"

BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"

'====== Enter Est.closing date as currentDate-1 ======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-1490_ClosingDateAlerts"

'BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"

'====== Add manual disclosure tracking entry for LE ======
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
'BIZ_Loan_Save()

Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Closing Date Violation"


BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "PTAC-1490_Alerts"
'BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"

boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

'====== Change test data in 2015 Itemization form ======
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "PTAC-1490_Alerts_01"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Good Faith Fee Variance Violated"


'BIZ_Forms_ShowAll
'====== in field 761, any date morethan system date ======
BIZ_ATRQMManagement_SetQualification "PTAC-1490"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Redisclose Loan Estimate (Rate Lock)"



BIZ_Tools_Open "Disclosure Tracking"

boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

BIZ_Forms_Open "2015 Itemization"

'====== Set property tax for Borrower ======
BIZ_2015Itemization_Set900Section "1490_ComplianceAlerts"

BIZ_Forms_Open "Loan Estimate Page 1"

'====== Set "Changed Circumstance' checkbox ======
GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_chk_3168_Ctrl"), "ON"

'====== set "Changes Received Date ====== 
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=I_3165"),_
CDate(UTIL_Date_FormatDateByPattern(Now(), "mm/dd/yyyy"))+1

'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Redisclose Loan Estimate (Changed Circumstance)"




''====== Save current loan number to text file ======
'BIZ_Loan_SaveLoanNumber
'strLoanNumber = BIZ_Loan_GetLoanNumber()
'
''====== Delete loan ======
'BIZ_Loan_Exit "False"
'BIZ_Nav_SelectPipelineTab
'BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
'BIZ_Loan_DeleteLoan()
'
''====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
'BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Prolifics"
'
'BIZ_Loan_AddNewBlankLoan()
'
'BIZ_Forms_ShowAll
'BIZ_Forms_Open "Borrower Summary - Origination"


'====== Set test data in Borrower Summary origination and Base income in 1003 Page 2 ======
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts_noDOB"

BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"

BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Settings_Alerts_Trasactiondetails"
'BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"

'====== Add manual disclosure tracking entry for LE ======
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
'BIZ_Loan_Save()

boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

'====== Add manual disclosure tracking entry for CD ======
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
'BIZ_Loan_Save()

Dim boolCDSent
boolCDSent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"CD Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolCDSent,"CD Sent","Closing Disclosure is sent"

BIZ_Forms_Open "RegZ - CD"

'====== set interest only section ======
BIZ_RegZ_CD_SetLoanTerms "1490_Alerts"

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Redisclose Closing Disclosure (APR, Product, Prepay)"



'====== closing date======  
BIZ_ClosingDisclosurePage1_SetClosingInformation "28531_ClosingInfo"
'BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"


'====== verify LE Sent as yes ======
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

'====== verify CD Sent as yes ======
boolCDSent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"CD Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolCDSent,"CD Sent","Closing Disclosure is sent"

'====== change of circumstance info ======
BIZ_ClosingDisclosurePage1_SetDisclosureInfo "1490_DisclosureInfo"
'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Redisclose Closing Disclosure (Changed Circumstance)"


BIZ_Forms_Open "Loan Estimate Page 1"

'====== set closing costs estimation expiration date ======
Set objLEPage= SwfWindow("swfname:=MainForm").Page("index:=0")
If GUI_Object_GetPropertyValue(objLEPage.WebEdit("html id:=I_LE1X28"),"readonly")=1 Then
	GUI_WebButton_Click objLEPage.WebButton("html id:=FieldLock19")
	GUI_WebEdit_Set objLEPage.WebEdit("html id:=I_LE1X28"), CDate(UTIL_Date_FormatDateByPattern(Now(), "mm/dd/yyyy"))
End If

BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Loan Estimate Expires"

'====== enable alerts back after test steps are complete ======
BIZ_Alerts_EnableAlert "Send Initial Disclosures"
BIZ_Alerts_EnableAlert "eConsent Not Yet Received"
BIZ_Alerts_EnableAlert "Closing Date Violation"
BIZ_Alerts_EnableAlert "Good Faith Fee Variance Violated"
BIZ_Alerts_EnableAlert "Redisclose Loan Estimate (Rate Lock)"
BIZ_Alerts_EnableAlert "Redisclose Loan Estimate (Changed Circumstance)"
BIZ_Alerts_EnableAlert "Redisclose Closing Disclosure (APR, Product, Prepay)"
BIZ_Alerts_EnableAlert "Redisclose Closing Disclosure (Changed Circumstance)"
BIZ_Alerts_EnableAlert "Loan Estimate Expires"

