'@**********************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1814 Validate the implementation of the compliance alert "Qualified Mortgage Type Not Determined" into a loan file.  
'@ Test Automation JIRA Task:  PTAC-2214
'@ TestData:'"Settings_LoanSetup","Alerts","2145_QMType"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankQualifiedMortgage"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay_QM"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_FHAQualifiedMortgage"
'@ Pre-conditions: "Qualified Mortgage Type Not Determined" Alert should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3.	In ATR/QM Management form, Make sure that QM.X23 is Qualified Mortgage and QM.X24 = Blank and now save the loan.
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X24 = FHA/ QM by clicking the lock icon and then save the loan.
'@ ExpectedResult:
		'1. User should be able to login successfully.
		'2. "Qualified Mortgage Type Not Determined" alert should trigger.
		'3. "Qualified Mortgage Type Not Determined" alert should be removed.		
'**************************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1814","Validate the implementation of the compliance alert 'Qualified Mortgage Type Not Determined' into a loan file",Null

'Enable alert for pre-requisite
BIZ_LoanSetup_Alerts_EditAlert "2145_QMType"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'set QM.X23 as Qualified Mortgage
BIZ_ATRQMManagement_SetATRQMEligibility "2145_BlankQualifiedMortgage"
'set QM.x24 to blank
BIZ_ATRQMManagement_SetATRQMEligibility "2145_AbilityToRepay_QM"
'verify alert triggered
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Qualified Mortgage Type Not Determined"
'select yes for FHAQualified Mortgage
BIZ_ATRQMManagement_SetATRQMEligibility "2145_FHAQualifiedMortgage"
BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Qualified Mortgage Type Not Determined"
