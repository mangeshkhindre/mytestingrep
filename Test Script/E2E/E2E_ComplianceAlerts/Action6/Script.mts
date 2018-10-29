'@***************************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase: 
		'1 PTAC-1212 Verify the "Redisclose Loan estimate(Rate lock)"	 
		'2 PTAC-2383 Verify the "Redisclose Loan estimate(Rate lock)" 
'@ Test Automation JIRA Task: PTAC-1502 Settings_PTAC1490_ComplianceAlerts_01
'@ TestData: 
	'Settings_LoanSetup,Alerts,2145_RediscloseLERateLock
	'Forms_ATRQMManagement, SetQualification,PTAC-1490
'@ Pre-conditions: Redisclose Loan estimate(Rate lock) alert should be enabled
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save. 
	'2 Go to Tools - Disclosure Tracking.Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
	'3 Click on OK button on pop up, verify the 'LE sent' column.
	'4	Go to ATR/QM Management> Qualification tab >APR / APOR section,  in the 761 (Rate Lock Date)field, 'add any date more that system date' . Verify that "Redisclose loan Estimate(Rate lock)" is fired.
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed.It navigates to Loan tab The Loan is created
	'2 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/9/2017)(Recommended)', 
	'3 The record added in the disclosure tracking and the 'LE Sent' column display with 'Yes'
	'4 "Redisclose Loan estimate (ratelock)" alert is fired in 'Alerts & messages'		
'******************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1212","Verify the 'Redisclose Loan estimate(Rate lock)'",Null

'Enable Redisclose Loan estimate(Rate lock) alert
BIZ_LoanSetup_Alerts_EditAlert "2145_RediscloseLERateLock"
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

'Verify LE Sent date is populated
Dim strExpected
strExpected = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname path:=txtDate;dpLESent;.*"),"text")
FRM_VerifyTrue UTIL_String_IsNotEmpty(strExpected), "LE Sent Date", "LE Sent Date is populated"

'verify LE Sent
Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"
'BIZ_Forms_ShowAll

'set rate lock date field to any date more than system date
BIZ_ATRQMManagement_SetQualification "PTAC-1490"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Redisclose Loan Estimate (Rate Lock)"

''Save current loan number to text file
'Dim strLoanNumber
'BIZ_Loan_SaveLoanNumber
'strLoanNumber = BIZ_Loan_GetLoanNumber()
'
''Delete loan
'BIZ_Loan_Exit "False"
'BIZ_Nav_SelectPipelineTab
'BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
'BIZ_Loan_DeleteLoan()
