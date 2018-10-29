'@**********************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1830 Validate the implementation of the compliance alert 'General QM DTI Exceeded' into a loan file.
'@ Test Automation JIRA Task:  PTAC-2214
'@ TestData:'"Settings_LoanSetup","Alerts","2145_GeneralQMDTI"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_SetTrasactionDetails"
			'"Forms_1003page","1003Page2","2145_Income"
			'"Forms_1003page","SetLiabilities","2145_SetLiability"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_GeneralQM"
			'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankQualifiedMortgage"
'@ Pre-conditions: General QM DTI Exceeded Alert should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3.	In ATR/QM Management form, Make sure that QM.X23 is Qualified Mortgage, QM.X119 > 43 and QM.X24 = General QM  and now save the loan.
		'4. Go to the forms --> ATR/QM Management --> ATR/QM /Eligibility and select field ID: QM.X24 = Blank by clicking the lock icon and then save the loan.
'@ ExpectedResult:
		'1. User should be able to login successfully.
		'2. "General QM DTI Exceeded" alert should trigger.
		'3. "General QM DTI Exceeded" alert should be removed.		
'**************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1830","Validate the implementation of the compliance alert 'General QM DTI Exceeded' into a loan file",Null

'Enable General QM DTI Exceeded Alert and select first two milestones
BIZ_LoanSetup_Alerts_EditAlert "2145_GeneralQMDTI"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"

'1003 Page 2 set base income
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_Income"

'set liabilities
BIZ_1003Page2_SetLiabilities "2145_SetLiability"

'ATR/QM Management form, ATR/QM Eligibility tab
BIZ_ATRQMManagement_SetATRQMEligibility "2145_GeneralQM"

'navigate to Qualification tab in ATR/QM Management form 
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Qualification"

'Display QM.X119 value
FRM_Logger_ReportInfoEvent "QM.X119 > 43","Value of QM.X119 ATR/QM Management,Qualification tab is "&_
GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox67"),"value"),Null

'verify General QM DTI Exceeded 
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","General QM DTI Exceeded"

'Set blank value fro Qualified Mortgage
BIZ_ATRQMManagement_SetATRQMEligibility "2145_BlankQualifiedMortgage"
BIZ_Loan_Save()
'verify alert trigger
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","General QM DTI Exceeded"
