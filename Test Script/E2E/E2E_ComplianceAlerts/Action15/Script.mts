'@**********************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1819 Validate the implementation of the Compliance alert "QM Safe Harbor Eligibility Not Determined" into a loan file 
'@ Test Automation JIRA Task:  PTAC-2214
'@ TestData:'"Settings_LoanSetup","Alerts","2145_QMSafeHarbor"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay_QM"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankSafeHarbor"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_SafeHarbor"
'@ Pre-conditions: "QM Safe Harbor Eligibility Not Determined" Alert should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3.	In ATR/QM Management form, Make sure that QM.X23 is Qualified Mortgage and QM.X25 = Blank and now save the loan.
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X25 = Yes by clicking the lock icon and then save the loan.
'@ ExpectedResult:
		'1. User should be able to login successfully.
		'2. "QM Safe Harbor Eligibility Not Determined" alert should trigger.
		'3. "QM Safe Harbor Eligibility Not Determined" alert should be removed.		
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1819","Validate the implementation of the Compliance alert 'QM Safe Harbor Eligibility Not Determined' into a loan file",Null

'pre-requisite enable alert QM Safe Harbor Eligibility Not Determined and select first two milestones
BIZ_LoanSetup_Alerts_EditAlert "2145_QMSafeHarbor"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'set test data in ATR/QM Eligible tab under ATR/QM Management form
BIZ_ATRQMManagement_SetATRQMEligibility "2145_AbilityToRepay_QM"
BIZ_ATRQMManagement_SetATRQMEligibility "2145_BlankSafeHarbor"

'verify alert trigger
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","QM Safe Harbor Eligibility Not Determined"

'select yes for Safe Harbor
BIZ_ATRQMManagement_SetATRQMEligibility "2145_SafeHarbor"
BIZ_Loan_Save()

'verify 
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","QM Safe Harbor Eligibility Not Determined"
