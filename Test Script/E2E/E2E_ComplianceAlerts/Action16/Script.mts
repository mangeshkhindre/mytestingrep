'@**********************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1824 Validate the implementation of the Compliance alert "Residual Income Assessment Recommended" into a loan file.
'@ Test Automation JIRA Task:  PTAC-2214
'@ TestData:'"Settings_LoanSetup","Alerts","2145_ResidualIncome"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay_QM"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_NoSafeHarbor"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_SafeHarbor"
'@ Pre-conditions: "Residual Income Assessment Recommended" Alert should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3.	In ATR/QM Management form, Make sure that QM.X23 is Qualified Mortgage and QM.X25 = No and now save the loan.
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X25 = Yes by clicking the lock icon and then save the loan.
'@ ExpectedResult:
		'1. User should be able to login successfully.
		'2. "Residual Income Assessment Recommended" alert should trigger.
		'3. "Residual Income Assessment Recommended" alert should be removed.		
'**************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1824","Validate the implementation of the Compliance alert 'Residual Income Assessment Recommended' into a loan file",Null

BIZ_LoanSetup_Alerts_EditAlert "2145_ResidualIncome"
'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'set test data: QM.X23 to "Qualified Mortgage", QM.X25 to No
BIZ_ATRQMManagement_SetATRQMEligibility "2145_AbilityToRepay_QM"
BIZ_ATRQMManagement_SetATRQMEligibility "2145_NoSafeHarbor"

'verify alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Residual Income Assessment Recommended"

'set QM.X25 to yes
BIZ_ATRQMManagement_SetATRQMEligibility "2145_SafeHarbor"
BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Residual Income Assessment Recommended"




