'@***************************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase :
		'1 PTAC-1210 TC03_Verify the "Closing date violation alert" 
		'2 PTAC-2381 TC03_Verify the "Closing date violation alert"
'@ Test Automation JIRA Task:  PTAC-1502 Settings_PTAC1490_ComplianceAlerts_01
'@ TestData: 
		'Settings_LoanSetup,Alerts,Alerts_ClosingDate
		'Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1490_Settings_Alerts
		'Forms_BorrowerSummaryOrigination,SetProperty,Settings_Alerts_Propinfo
		'Forms_BorrowerSummaryOrigination,SetTransactionDetails,PTAC-1490_ClosingDateAlerts
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
	'2 In Borrower Summary Origination form, Enter "Est Closing Date"(763) field as Current date-1,Go to Tools - Disclosure Tracking
	'3 Click on + Add a Disclosure Record, and choose the 'Disclosure' Checkbox with 'LE' option, and click on OK button
	'4 Verify that the "Closing date violation" alert is triggered
'@ ExpectedResult:
	'1 Admin should be able to login successfully.New Loan pop up displayed.It navigates to Loan tab.The Loan is created
    '2 The date to be saved. The disclosure tracking screen should display
	'3 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/9/2017)(Recommended)'
	'4 "Closing date violation" alert is fired
'******************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1210","Test Case Name: TC03_Verify the 'Closing Date Violation' alert",Null

'Enable "Closing Date Violation" alert is enabled and required milestones are selected
BIZ_LoanSetup_Alerts_EditAlert "Alerts_ClosingDate"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"

'Enter Est.closing date as currentDate-1
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-1490_ClosingDateAlerts"
'BIZ_Loan_Save()
BIZ_Tools_Open "Disclosure Tracking"

'Add manual disclosure tracking entry for LE
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages", "Closing Date Violation"
