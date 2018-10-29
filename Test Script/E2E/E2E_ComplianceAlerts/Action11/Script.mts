'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase :
		'1 PTAC-1217 TC09_Verify the "Loan estimate Expires alert" 
		'2 PTAC-2382 TC09_Verify the "Loan estimate Expires alert"
'@ Test Automation JIRA Task:  PTAC-1503 Settings_PTAC1490_ComplianceAlerts_02
'@ TestData: Settings_LoanSetup, Alerts,2145_LEExpires
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Log into Encompass as Admin/password.Navigate to Pipeline tab > Click on New Loan icon (right corner) 
       'Click on New Bank Loan button. Enter the data mentioned in Test Data column, save.
	'2 Go to Field LE1.X28 (LE Page 1 - Closing Costs Estimate Expiration Date)and set the date to current 
       'date and save the loan.(click on lock icon next to the field to edit it)
	'3 Verify that "Loan estimate expires" alert is fired
'@ ExpectedResult:
	'1 Admin should be able to login successfully. New Loan pop up displayed. It navigates to Loan tab. The Loan is created.
	'2 Expiration date is entered manually.
	'3 "Loan estimate expires" alert is generated
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1217","Verify the Loan estimate Expires alert",Null

'Enable "Loan estimate expires" alert
BIZ_LoanSetup_Alerts_EditAlert "2145_LEExpires"
'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination and Base income in 1003 Page 2
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts_noDOB"
BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Settings_Alerts_Trasactiondetails"
BIZ_Forms_Open "Loan Estimate Page 1"
Dim objLEPage, strLoanNumber
'set closing costs expiration date as current date
Set objLEPage= SwfWindow("swfname:=MainForm").Page("index:=0")

If GUI_Object_GetPropertyValue(objLEPage.WebEdit("html id:=I_LE1X28"),"readonly")=1 Then
   GUI_WebButton_Click objLEPage.WebButton("html id:=FieldLock19")
   GUI_WebEdit_Set objLEPage.WebEdit("html id:=I_LE1X28"), CDate(UTIL_Date_FormatDateByPattern(Now(), "mm/dd/yyyy"))
End If

Set objLEPage= Nothing

BIZ_Loan_Save()
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Loan Estimate Expires"


