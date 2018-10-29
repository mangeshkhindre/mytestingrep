'@***************************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1919 Validate the implementation of the Compliance alert "Send Initial Disclosures" 
'@ Test Automation JIRA Task:  2215
'@ TestData:'"Settings_LoanSetup","Alerts","Alerts_SendInitialDisc"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
			'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_SetTrasactionDetails" 
			'"Forms_1003Page","1003Page2","2145_BaseIncomeBorrower"
			'"Forms_RegZ-LE","SetDisclosureInformation","2145_Alerts_InitialDisclosures"
			'"Forms_RegZ-LE","SetLateCharge","E2E_Integration"
			'"Forms_USDAManagement","SelectInterestBasisDays","Shared_BasisDays"
'@ Pre-conditions: "Send Initial Disclosures" should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Go to the pipeline and create loan with the test data as mentioned in the "Test Data" column, Save
		'3. Click on eFolder button and click on the eDisclosures button.
		'4. Select any plan code and click on "Order eDisclosures" button.
		'5. Select and send Loan Estimate
		'6. Save the loan and verify
'@ ExpectedResult:
		'1.	User should be able to login successfully.
		'2.	The Loan should be created and the 'Send Initial Disclosures' alert will be displayed.
		'3. Send eDisclosures window box should open.
		'4. The LE record will be created under Disclose History section.
		'5. LE disclosure package should be sent.
		'6. Send Initial Disclosure' alert should be removed.
'*****************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1919","Validate the implementation of the Compliance alert 'Send Initial Disclosures'",Null

'enable alert
BIZ_LoanSetup_Alerts_EditAlert "Alerts_SendInitialDisc"

'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_SetTrasactionDetails"
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2145_BaseIncomeBorrower"

'set RegZ-LE test data
BIZ_RegZ_LE_SetDisclosureInformation "2145_Alerts_InitialDisclosures"

BIZ_RegZ_LE_SetLateChargeInformation "E2E_Integration"

'set Interest Basis Days to 360
BIZ_USDAMangement_SelectInterestBasisDays "Shared_BasisDays"

BIZ_Forms_Open "2015 Itemization"
Set obj2015Itemization=SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

'set interest from date in section 900 the same as To date
GUI_WebEdit_Set obj2015Itemization.WebEdit("html id:=l_L244"),_
GUI_Object_GetPropertyValue(obj2015Itemization.WebEdit("html id:=l_L245"),"value")

Set obj2015Itemization=Nothing

'BIZ_Loan_Save()

BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Send Initial Disclosures"

BIZ_Nav_eFoler_Open()
BIZ_Documents_SendeDisclosure "Shared_AllFixedRateConv","CFUN81_DisclosureDocs","2145_SendLE"

BIZ_Nav_eFoler_Close()

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Send Initial Disclosures"



