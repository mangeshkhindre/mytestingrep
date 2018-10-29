'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase: PTAC-862 TC#3 (CBIZ-4509) - F2F & F2A Inclusive Scenarios - Construction-to-Perm Loans - Projected Payments table logic
'@ Test Automation JIRA Task: PTAC-2895 ConstructionManangement_ConstrPerm_F2F_F2AInclusive_ProjPayLogic
'@ TestData:
   '1 ConstructionManagement, SetBasicInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step3
   '2 ConstructionManagement, SetLoanInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Ste3
   '3 Forms_RegZ-LE, VerifyProjectedPayment, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step3
   '4 Forms_AggregateEscrowAccount, SetData, 1352_ConstrMgmt_F2F_ProjPayTable_774_Ste3
   '5 Forms_2015Itemization, SetFeeDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step3
   '6 Forms_RegZ-LE, SetMiandPiDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step3
   '7 Forms_1003Page1, 1003Page1, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step3
   '8 ConstructionManagement, SetBasicInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '9 ConstructionManagement, SetLoanInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '10 Forms_RegZ-LE, VerifyProjectedPayment, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '11 Forms_AggregateEscrowAccount, SetData, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '12 Forms_2015Itemization, SetFeeDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '13 Forms_RegZ-LE, SetMiandPiDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '14 Forms_1003Page1, 1003Page1, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step4
   '15 ConstructionManagement, SetBasicInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '16 ConstructionManagement, SetLoanInfoDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '17 Forms_RegZ-LE, VerifyProjectedPayment, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '18 Forms_AggregateEscrowAccount, SetData, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '19 Forms_2015Itemization, SetFeeDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '20 Forms_RegZ-LE, SetMiandPiDetails, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
   '21 Forms_1003Page1, 1003Page1, 1352_ConstrMgmt_F2F_ProjPayTable_774_Step7
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

BIZ_ConstructionManagement_SetLoanInfoDetails Parameter("strRowID")

If Parameter("strRowID") = "1352_ConstrMgmt_F2F_ProjPayTable_774_Step3" OR  Parameter("strRowID") = "1352_ConstrMgmt_F2F_ProjPayTable_703_Step3" OR  Parameter("strRowID") = "1352_ConstrMgmt_F2A_ProjPayTable_862_Step3" OR Parameter("strRowID") = "1352_ConstrMgmt_F2A_ProjPayTable_862_Step7" Then
	'Set input data in Aggregate Escrow Account Page/Form
	BIZ_AggregateEscrowAccount_SetData Parameter("strRowID")
	
	'Set input data in 2015 Itemization Page/Form
	BIZ_Forms_Open "2015 Itemization"
	BIZ_2015Itemization_SetFeeDetails "904",Parameter("strRowID")
	BIZ_2015Itemization_FeeDetails_ClickCheckbox "1004",Array("Escrowed")
	
	'Set input data in RegZ-LE Page/Form
	BIZ_Forms_Open "RegZ - LE"
	BIZ_Common_RegZLE_SetMiandPiDetails Parameter("strRowID")
End If


'Set input data in 1003 Page 1
BIZ_1003Page1_SetData Parameter("strRowID")

'Validate the Projected Payement Table  columns fields in RegZ-LE Page/Form
BIZ_RegZ_LE_VerifyProjectedPayment Parameter("strRowID")


