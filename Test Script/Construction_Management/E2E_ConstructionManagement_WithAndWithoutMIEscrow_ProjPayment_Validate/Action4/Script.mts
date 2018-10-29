'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
	'1 PTAC-3229 TC 6 - CBIZ-7310 - Non Construction-To-Perm loan with ARM (e.g Purchase), Escrow payment and MI but MI is stopped at 78%
	'2 PTAC-3207 TC 3 - CBIZ-7310 - Construction-To-Perm loan with MI and stopped at 78%, Escrow payment
'@ Test Automation JIRA Task: PTAC-3691 ConstructionManagement_ConstructionToPerm_Purchase_MI_Escrow_Stoppedat78percent_ProjectedPayment_Validate
'@ TestData:
	'1 Forms_BorrowerSummaryOrigination,SetBorrower,1352_ConstrMgmt_EscrowMI78
	'2 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrMgmt_EscrowMI78
	'3 Forms_BorrowerSummaryOrigination,SetTransaction,1352_ConstrMgmt_EscrowMI78_3229
	'4 Forms_BorrowerSummaryOrigination,SetTransaction,1352_ConstrMgmt_EscrowMI78_3207
	'5 Forms_RegZ-CD,SetLoanInformation,1352_ConstrMgmt_EscrowMI78_3229
	'6 Forms_RegZ-LE,SetARM,1352_ConstrMgmt_EscrowMI78
	'7 ConstructionManangement,SetLoanInfo,1352_ConstrMgmt_EscrowMI78
	'8 Forms_ClosingDisclosurePage,SetClosingInformation,1352_ConstrMgmt_EscrowMI78
	'9 Forms_2015Itemization,SetFeeDetails,1352_ConstrMgmt_EscrowMI78_903
	'10 Forms_2015Itemization,SetFeeDetails,1352_ConstrMgmt_EscrowMI78_904
	'11 Forms_2015Itemization,SetFeeDetails,1352_ConstrMgmt_EscrowMI78_905
	'12 Forms_2015Itemization,1000Section,1352_ConstrMgmt_EscrowMI78
	'13 Forms_AggregateEscrowAccount,SetData,1352_ConstrMgmt_EscrowMI78_3229
'@ Pre-condition
'@ Description:  ConstructionManagement ConstructionToPerm,Purchase MIandEscrow Stoppedat78percent ProjectedPayment Validate
'@ TestSteps:
	'1 Log into Encompass as Admin/password
	'2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
	'3 Click on New Bank Loan button
	'4 Enter the data mentioned in Test Data column, save.
	'5 Navigate to RegZ-LE form and Enter data
	'6 Navigate to 1003 page 1 form and click on Edit field of (field id 1045), Enter data pop up
	'7 Navigate to 2015 Itemization form and Enter data pop up, save
	'8 Navigate to Aggregate Escrow form and Enter data
	'9 On Aggregate Escrow form, click on Setup,enter test data 
	'10 Navigate to LE page 1 and check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72 ,Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'11 Click on Print button and Preview the LE PDF file.. check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72 Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'12 Navigate to CD page 1 and check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X38,Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
	'13 Click on Print button and Preview the CD PDF file.. check the Projected Payment table, verify the values of Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X3 and Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
'@ ExpectedResult:
	'1 Admin should be able to login successfully
	'2 New Loan pop up displayed
	'3 It navigates to Loan tab
	'4 The Loan is created 
	'5 Values should be entered and loan should be saved successfully.
	'6 Values should be entered and loan should be saved successfully.
	'7 Values should be entered and loan should be saved successfully.
	'8 Values should be entered and loan should be saved successfully.
	'9 All fields should show “some amount” except LE1.X63, LE1.X72 should have "-"Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'10 All fields should show “some amount” except LE1.X63, LE1.X72 should have "-" Mortgage Insurance Payment fields: LE1.X45, LE1.X54, LE1.X63, LE1.X72 Escrow Payment fields: LE1.X46, LE1.X55, LE1.X64, LE1.X73
	'11 All fields should show “some amount” except CD1.X29, CD1.X38 should have "-" Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X3 Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
	'12 All fields should show “some amount” except CD1.X29, CD1.X38 should have "-" Mortgage Insurance Payment fields: CD1.X11, CD1.X20, CD1.X29, CD1.X38 Escrow Payment fields: CD1.X12, CD1.X21, CD1.X30, CD1.X39
'***************************************************************************************************

strRowID = Parameter("strRowID1")

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails Parameter("strRowID2")


'Set ARM data in RegZ-lE Form or Construction Management form
If Parameter("strLoanPurpose")="Purchase" Then
	'Set ARM data in RegZ-lE Form
	BIZ_Forms_Open "RegZ - LE"
	BIZ_RegZ_LE_SetAdjustableRateMortgage strRowID
End If

If Parameter("strRowID2") = "1352_ConstrMgmt_EscrowMI78_3229" Then
	'Navigate to 1003 page1 and set Mortgage insurance details
	BIZ_1003Page1_SetMiandPiDetails strRowID
End If

'Set Fee details in 2015 Itemization form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_2015Itemization_SetFeeDetails "903","1352_ConstrMgmt_EscrowMI78_903"
'BIZ_2015Itemization_SetFeeDetails "904","1352_ConstrMgmt_EscrowMI78_904"
'BIZ_2015Itemization_SetFeeDetails "906","1352_ConstrMgmt_EscrowMI78_906"
'
'Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
'BIZ_Forms_Open "1003 Page 2"
'BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate strRowID,"Insurance"
'
'Navigate to Aggrgate EscrowAccont page and Set Escrow Payment Basis
BIZ_AggregateEscrowAccount_SetData Parameter("strRowID2")

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate strRowID
'
'Save loan
'BIZ_Loan_Save()




