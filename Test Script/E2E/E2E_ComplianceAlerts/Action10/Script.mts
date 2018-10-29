'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase : PTAC-1216 TC08-Verify the "Redisclose Closing Disclosure(Changed circumstance)"
'@ Test Automation JIRA Task:  PTAC-1503 Settings_PTAC1490_ComplianceAlerts_02
'@ TestData:
    'Settings_LoanSetup, Alerts,2145_RediscloseCDCC
	'Forms_ClosingDisclosurePage, SetClosingInformation,28531_ClosingInfo
	'Forms_RegZ_CD, SetLoanTerms,1490_DisclosureInfo
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
	'2 Go to Tools - Disclosure Tracking. Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with LE option, and click on OK button
	'3 Click on + Add a Disclosure Record, and choose the 'Disclosure Checkbox with CD option, and click on OK button
	'4 Go to CD page 1,check the 'Changed circumstance' check box.Check 'Changed circumstance eligibility' as reason.
       'Enter changes received date as one day less than system date. 
	'5 Verify that Redisclose closing disclosure(changed circumstance)alert is triggered.
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed. It navigates to Loan tab. The Loan is created.
	'2 It opens the 'Choose the LE Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)', record added with LE option as Yes
	'3 It opens the 'Choose the CD Date issue' pop up with option selected as 'Use Current date (1/10/2017)(Recommended)', record added with CD option as Yes 
    '4 Changed circumstance to be selected. Reason to be selected. The 'changes received date' should be displayed
	'5 The "Redisclose closing disclosure(changed circumstance)" alert is fired
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1216"," TC08-Verify the 'Redisclose Closing Disclosure(Changed circumstance)'",Null

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1932","Validate the implementation of the Compliance"&_
"alert 'Redisclose Closing Disclosure (Changed Circumstance)' into a loan file",Null

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1938","Validate the implementation of the compliance alert"&_
"'Good Faith Fee Variance Violated' into a loan file",Null
'enable Redisclose Closing Disclosure (Changed Circumstance)
BIZ_LoanSetup_Alerts_EditAlert "2145_RediscloseCDCC"
BIZ_LoanSetup_Alerts_EditAlert "Alerts_GoodFaithFeeVariance"
BIZ_LoanSetup_Alerts_EditAlert "Alerts_SendInitialDisc"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data for Borrower Summary - Origination 
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"
'1003 Page 2
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"
'set first payment date in RegZ LE
BIZ_RegZ_LE_SetDisclosureInformation "2145_Alerts_InitialDisclosures"
BIZ_RegZ_LE_SetLateChargeInformation "E2E_Integration"
'set Interest basis days to 360
BIZ_USDAMangement_SelectInterestBasisDays "Shared_BasisDays"

BIZ_Forms_Open "2015 Itemization"
Set obj2015Itemization=SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
'set interest from date in section 900 the same as To date
GUI_WebEdit_Set obj2015Itemization.WebEdit("html id:=l_L244"),_
GUI_Object_GetPropertyValue(obj2015Itemization.WebEdit("html id:=l_L245"),"value")
Set obj2015Itemization=Nothing

'set 748(closing data) as current date
BIZ_ClosingDisclosurePage1_SetClosingInformation "28531_ClosingInfo"
'BIZ_Loan_Save()

BIZ_Tools_Open "Disclosure Tracking"

'Add manual disclosure tracking entry for LE
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'Add manual disclosure tracking entry for CD
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False

Dim boolCDSent,boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

boolCDSent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"CD Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolCDSent,"CD Sent","Closing Disclosure is sent"

'Changed circumstance checkbox and Changed circumstance received date (one day less than system date)
BIZ_ClosingDisclosurePage1_SetDisclosureInfo "1490_DisclosureInfo"
BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Redisclose Closing Disclosure (Changed Circumstance)"
