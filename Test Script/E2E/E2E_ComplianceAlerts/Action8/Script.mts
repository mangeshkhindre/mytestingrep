'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase : 
		'1 PTAC-1214 TC07_Verify the "Redisclose Closing disclosure(APR,Product,Prepay)"
		'2 PTAC-2384 TC07_Verify the "Redisclose Closing disclosure(APR,Product,Prepay)"
'@ Test Automation JIRA Task:  PTAC-1503 Settings_PTAC1490_ComplianceAlerts_02
'@ TestData:
    'Settings_LoanSetup, Alerts,2145_RediscloseCD
	'Forms_ClosingDisclosurePage, SetClosingInformation,28531_ClosingInfo
	'Forms_RegZ_CD, SetLoanTerms,1490_Alerts
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
	'2 Go to Tools - Disclosure Tracking. Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
	'3 Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with CD option, and click on OK button
	'4 Go to RegZ-CD>Interest Only section, enter 12 in 1177 field.
	'5 Verify that "Redisclose Closing disclosure(APR,Product,Prepay)" alert is generated
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed. It navigates to Loan tab. The Loan is created.
	'2 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)', record added with LE option as Yes
	'3 It opens the 'Choose the CD Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)',
       'record added with CD option as Yes 
	'4 "Redisclose Closing disclosure(APR,Product,Prepay)" alert is generated in Alerts & Messages
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1214","Test case Name:TC07_Verify the 'Redisclose Closing disclosure(APR,Product,Prepay)'",Null

'Enable Redisclose Closing disclosure(APR,Product,Prepay)" alert
BIZ_LoanSetup_Alerts_EditAlert "2145_RediscloseCD"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data for Borrower Summary - Origination 
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"
'1003 Page 2
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"
'closing date as current data
BIZ_ClosingDisclosurePage1_SetClosingInformation "28531_ClosingInfo"
'BIZ_Loan_Save()
BIZ_Tools_Open "Disclosure Tracking"

'Add manual disclosure tracking entry for LE
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'Add manual disclosure tracking entry for CD
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
'BIZ_Loan_Save()

'Verify LE Sent 
Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

'Verify CD Sent? shows as Yes in Disclosure history
Dim boolCDSent
boolCDSent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"CD Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolCDSent,"CD Sent","Closing Disclosure is sent"

'enter 12 in Interest Only section, field 1177						
BIZ_Forms_Open "RegZ - CD"
'interest only section, set 12
BIZ_RegZ_CD_SetLoanTerms "1490_Alerts"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Redisclose Closing Disclosure (APR, Product, Prepay)"
