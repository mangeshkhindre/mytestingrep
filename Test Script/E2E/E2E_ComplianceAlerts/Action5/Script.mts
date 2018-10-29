'@***************************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase: PTAC-1211 TC04_Verify the "Good faith Fee variance alert" 
'@ Test Automation JIRA Task: PTAC-1502 Settings_PTAC1490_ComplianceAlerts_01
'@ TestData: 
	'Settings_LoanSetup,Alerts,Alerts_GoodFaithFeeVariance
	'Forms_2015Itemization, Set800Section,PTAC-1490_Alerts 
	'Forms_2015Itemization, Set800Section,TAC-1490_Alerts_01 
'@ Pre-conditions: "Good faith Fee variance alert should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password. Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save
	'2 Go to 2015 itemization page and enter details given in respective section. Save the loan.
	'3 Go to Tools - Disclosure Tracking. Click on + Add a Disclosure Record, and choose the 'Disclosure' Checkbox with 'LE' option,
	'4 Click on OK button on pop up, verify the 'LE sent' column
	'5 Go to 2015 itemization page and enter details given in respective section. Save the loan.
	'6 Verify that "Good faith Variance" is fired
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed.It navigates to Loan tab The Loan is created
	'2 Loan is saved disclosure tracking screen should display.
	'3 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/9/2017)(Recommended)',
	'4 The record added in the disclosure tracking and the 'LE Sent' column display with 'Yes' 
	'5 Loan is saved. The "Good Faith Fee Variance" alert is triggered in 'Alerts & messages'.
'******************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1211","Test Case Name: TC04_Verify the 'Good faith Fee variance alert'",Null

'Enable "Good Faith Fee Variance Violated" alert if not enabled and select required milestones
BIZ_LoanSetup_Alerts_EditAlert "Alerts_GoodFaithFeeVariance"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "PTAC-1490_Alerts"
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

'Change test data in 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "PTAC-1490_Alerts_01"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"
