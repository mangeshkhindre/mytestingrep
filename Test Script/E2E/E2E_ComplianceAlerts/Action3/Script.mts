'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase : 
		'1 PTAC-1202 TC02_Verify the "E-consent not yet Received" Alert in Alert & Messages tab
		'2 PTAC-1920 Validate the implementation of the Compliance alert "eConsent Not Yet Received"		
'@ Test Automation JIRA Task:  PTAC-1502 Settings_PTAC1490_ComplianceAlerts_01
'@ TestData: 
	'Settings_LoanSetup,Alerts,2145_eConsentAlertEnable
	'Settings_LoanSetup,Alerts,Alerts_eConsent
	'Settings_LoanSetup,Alerts,Alerts_eConsent_01
	'Tools_DisclosureTracking, SetComplianceTimeline,OtherAlerts_data
'@ Pre-conditions: "E-consent not yet Received" Alert should be enabled
'@ Description:  
'@ TestSteps: 
	'1 Login to encompass by entering valid credentials. Go to settings-Loan setup-Alerts. Select and open the 'eConsent Not Yet Received'.
	'2 Verify the 'File started Date(MS.START) and Enable Alert options. Navigate to Pipeline tab and click on create New loan
	'3 Verify that the 'E-consent not yet received' alert is generated.
	'4 Go to settings-Loan setup-Alerts.Select and open the 'eConsent Not Yet Received'.
       'Change the "Choose the trigger date" to "Application  Date:3142'. Save the settings
	'5 Navigate to Pipeline tab and click on create New loan. Go to Tools - Disclosure tracking, uncheck the 'Application Date' field, enter the current date and 
       'verify the "E-Consent not Yet Received" alert is generated.
'@ ExpectedResult:
	'1 User should be able to login in encompass successfully.It displays the 'Encompass Alert settings' pop up window
	'2 Below options are enabled,File Started Date option: <selected>.Enabled Alert: <Selected>
	'3 User should be able to Go to Pipeline tab. On the "New Loan" window, user should be able to select "New Blank loan" option
	'4 "E-Consent not Yet Received" alert is generated in the 'Alerts & messages' for a new loan.	
'******************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1202","Test case Name: TC02_Verify the 'E-consent not yet Received' Alert in Alert & Messages tab", Null

'Set trigger Date in "eConsent Not Yet Received" Alert to File Started Date and enable alert
BIZ_LoanSetup_Alerts_EditAlert "2145_eConsentAlertEnable"
BIZ_LoanSetup_Alerts_EditAlert "Alerts_eConsent"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()

'Validate Alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages", "eConsent Not Yet Received"

'Set test data for Borrower Summary - Origination 
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"

'1003 Page 2
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"

'Set trigger Date in "eConsent Not Yet Received" Alert to Application Date
BIZ_LoanSetup_Alerts_EditAlert "Alerts_eConsent_01"
'BIZ_Loan_AddNewBlankLoan()
BIZ_Tools_Open "Disclosure Tracking"

'enter current date for Application data
BIZ_DisclosureTrackingTool_SetComplianceTimeline "OtherAlerts_data"
BIZ_Loan_Save()

'Validate Alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages", "eConsent Not Yet Received"
