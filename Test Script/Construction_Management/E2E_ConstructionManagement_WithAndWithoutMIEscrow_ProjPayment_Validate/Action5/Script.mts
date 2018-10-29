strRowID = Parameter("strRowID1")

'Navigate to the Pipeline>>Construction Management
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"

'Set input data in Comstruction Management Page/Form
'BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
'BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails Parameter("strRowID2")

'Set Disbursement Date in RegZ-CD Form
'BIZ_Forms_Open "RegZ - CD"
'BIZ_RegZ_CD_SetLoanInformation strRowID

'Set ARM data in RegZ-lE Form or Construction Management form
If Parameter("strLoanPurpose")="Purchase" Then
	'Set ARM data in RegZ-lE Form
	BIZ_Forms_Open "RegZ - LE"
	BIZ_RegZ_LE_SetAdjustableRateMortgage strRowID
ElseIf Parameter("strLoanPurpose")="ConstructionToPerm" Then
	BIZ_Forms_Open "Construction Management"
	BIZ_ConstructionManagement_SetLoanInfoDetails strRowID
Else
	FRM_Logger_ReportFailEvent "Set ARM Data","No data Found",Null
End If

'Navigate to CD page4 and Verify Loan Disclosure Escrow
'BIZ_Forms_Open "Closing Disclosure Page 1"
'BIZ_ClosingDisclosurePage1_SetClosingInformation strRowID

'Navigate to 1003 page1 and set Mortgage insurance details
BIZ_1003Page1_SetMiandPiDetails Parameter("strRowID2")

'Set Fee details in 2015 Itemization form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_2015Itemization_SetFeeDetails "903","1352_ConstrMgmt_EscrowMI78_903"
'BIZ_2015Itemization_SetFeeDetails "904","1352_ConstrMgmt_EscrowMI78_904"
'BIZ_2015Itemization_SetFeeDetails "906","1352_ConstrMgmt_EscrowMI78_906"
'
''Navigate to 1003 Page 2 and Edit Rate at Edit field value buttton
'BIZ_Forms_Open "1003 Page 2"
'BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate strRowID,"Insurance"
'
''Navigate to Aggrgate EscrowAccont page and Set Escrow Payment Basis
BIZ_AggregateEscrowAccount_SetData Parameter("strRowID2")

'Navigate to 2015 Itemization and set due date in Initial Escrow Account Window form
'BIZ_Forms_Open "2015 Itemization"
'BIZ_Forms_2015Itemization_InitiaEscrowAccWindow_SetDueDate strRowID

'BIZ_Loan_save
