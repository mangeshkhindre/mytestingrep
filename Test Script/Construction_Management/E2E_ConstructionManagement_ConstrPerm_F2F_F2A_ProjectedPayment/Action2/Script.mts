'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase: PTAC-862 TC#3 (CBIZ-4509) - F2F & F2A Inclusive Scenarios - Construction-to-Perm Loans - Projected Payments table logic
'@ Test Automation JIRA Task: PTAC-2895 ConstructionManangement_ConstrPerm_F2F_F2AInclusive_ProjPayLogic 
'@ TestData:
   '1 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step1
   '2 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step1
   '3 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step1
   '4 ConstructionManagement, SetBasicInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step5
   '5 ConstructionManagement, SetLoanInfoDetails and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step5
   '6 Forms_RegZ-LE, VerifyProjectedPayment and 1352_ConstrMgmt_F2F_ProjPayTable_774_Step5
'@ Pre-conditions: 
'@ Description: F2F & F2A Inclusive Scenarios - Construction-to-Perm Loans - Projected Payments table logic
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save.
   '5 Go to RegZ-LE form, verify the Projected payments columns
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created
   '5 It should display field values under respective columns as below,
	'Year 
	'P&I Min
	'P&I Max
	'Interest Only
	'Mortgage Insurance
	'Estimated Escrows
	'Total Est. Monthly Payment Min
	'Total Est. Monthly Payment Max
'***************************************************************************************************

BIZ_Forms_Open "Construction Management"

'Set input data in Comstruction Management Page/Form

BIZ_ConstructionManagement_SetLoanInfoDetails  Parameter("strRowID")

'Validate the Projected Payement Table  columns fields in RegZ-LE Page/Form
BIZ_RegZ_LE_VerifyProjectedPayment Parameter("strRowID")


