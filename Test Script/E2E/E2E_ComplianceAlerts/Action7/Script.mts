'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase : 
		'1 PTAC-1213 TC06_Verify the "Redisclose Loan Estimate(Changed Circumstance)"
		'2 PTAC-1930 Validate the implementation of the Compliance alert "Redisclose Loan Estimate (Changed Circumstance)" 
		'  into a loan file.
'@ Test Automation JIRA Task:  PTAC-1503 Settings_PTAC1490_ComplianceAlerts_02
'@ TestData:
    'Settings_LoanSetup, Alerts,2145_RediscloseLECC
	'Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1490_Settings_Alerts_noDOB
	'Forms_BorrowerSummaryOrigination,SetProperty,Settings_Alerts_Propinfo
	'Forms_BorrowerSummaryOrigination,SetTransactionDetails,Settings_Alerts_Trasactiondetails
	'Forms_2015Itemization, Set900Section,1490_ComplianceAlerts		
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
	'2 Go to Tools - Disclosure Tracking. Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
	'3 Go to 2015 itemization, and add some new fees in 900 section
	'4 Go to LE page 1 and check the checkbox labeled 'Changed circumstance' which is right side.
	'5 Enter one date less than the current system date in 3165 and verify that the alert Redisclose Loan estimate(COC) is generated
	'6 Verify the alert "Redisclose Loan Estimate (Changed Circumstance)" is generated
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed. It navigates to Loan tab. The Loan is created.
	'2 The disclosure tracking screen should display
	'3 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)'
	'4 Redisclose Loan Estimate (Changed Circumstance)"alert is generated in Alerts & Messages
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1213","TC06_Verify the 'Redisclose Loan Estimate(Changed Circumstance)'",Null

BIZ_LoanSetup_Alerts_EditAlert "2145_RediscloseLECC"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()

'Set test data in Borrower Summary origination and Base income in 1003 Page 2
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts_noDOB"
BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Settings_Alerts_Trasactiondetails"
'BIZ_Loan_Save()
BIZ_Tools_Open "Disclosure Tracking"

'Add manual disclosure tracking entry for LE
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'Verify LE Sent 
Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

BIZ_Forms_Open "2015 Itemization"

'Set property tax for Borrower
BIZ_2015Itemization_Set900Section "1490_ComplianceAlerts"
BIZ_Forms_Open "Loan Estimate Page 1"

'Set "Changed Circumstance' checkbox
GUI_WebCheckbox_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_chk_3168_Ctrl"), "ON"

'set "Changes Received Date" 
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=I_3165"),_
CDate(UTIL_Date_FormatDateByPattern(Now(), "mm/dd/yyyy"))-1

BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Redisclose Loan Estimate (Changed Circumstance)"
