'@**************************************************************************************************
'@ TestStory:PTAC-3688 Compliance Section-32 HOEPA
'@ TestCase:
	'1 PTAC-3355 Section 32 Points and Fees, Conventional MI - Rule #1 (Refundable, Not Paid to Broker) 
	'2 PTAC-3359 Section 32 Points and Fees, Conventional MI - Rule #3 (Not Refundable, Not Paid to Broker) 
'@ Test Automation JIRA Task: PTAC-3702
'@ TestData: Add Test data file name, Sheet name and Row Id.
	'Settings_TablesFees, MITable, PTAC-3449_2
	'Forms_1003page, 1003Page1, "PTAC-3358"
	'Forms_2015Itemization, Set900Section, "PTAC-3360"
	'Forms_1003page, 1003Page1, "PTAC-3358"
	'Forms_2015Itemization, Set900Section, "PTAC-3360"
'@ Pre-conditions:
'@ Description:
	'PTAC-3355
	'Rule3: Not Refundable, Not Paid to Broker 
	'If *Not Refundable* and paid to != *Broker* 
	'Section 32 Value = Sum (Borrower Paid (NEWHUD.X2191) + Broker Paid (NEWHUD.X2197) + Other Paid (NEWHUD2.X2203)) 
'@ TestSteps:
	'PTAC-3355
	'1 Log into Encompass and add a New Blank Loan.
	'2 Input data according to 'Test Data' column.
	'3 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'4 Click back on 2015 Itemization Form and change Field SYS.X306 according to 'Test Data'.
	'5 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'6 Repeat steps 4 & 5 selecting each option for Field SYS.X306, except Broker.
	'7 Click on 2015 Itemization Form & Fee Details for Fee 902 and enter data according to 'Test Data' column.
	'8 Log into Encompass and add a New Blank Loan.
	'9 Input data according to 'Test Data' column.
	'10 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'11 Click back on 2015 Itemization Form and change Field SYS.X306 according to 'Test Data'.
	'12 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'13 Repeat steps 4 & 5 selecting each option for Field SYS.X306, except Broker.
	'14 Click on 2015 Itemization Form & Fee Details for Fee 902 and enter data according to 'Test Data' column.
	'PTAC-3359
	'1 Log into Encompass and add a New Blank Loan.
	'2 Input data according to 'Test Data' column.
	'3 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'4 Click back on 2015 Itemization Form and change Field SYS.X306 according to 'Test Data'.
	'5 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'6 Repeat steps 4 & 5 selecting each option for Field SYS.X306, except Broker.
	'7 Click on 2015 Itemization Form & Fee Details for Fee 902 and enter data according to 'Test Data' column.
	'8 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'9 Click back on 2015 Itemization Form and change Field SYS.X306 according to 'Test Data'.
	'10 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'11 Repeat steps 9 & 10 selecting each option for Field SYS.X306, except Broker.
'@ ExpectedResult:
	'PTAC-3355
	'1 New loan is opened.
	'2 Data is inputted on loan.
	'3 Validate S32DISC.X48 = $250.
	'4 MIP "Paid To" Change to Investor.
	'5 Validate S32DISC.X48 = $250.
	'6 Validate S32DISC.X48 = $250 for each selection of SYS.X306 .
	'7 MIP has $250 paid by Lender & Seller.
	'8 New loan is opened.
	'9 Data is inputted on loan.
	'10 Validate S32DISC.X48 = $250.
	'11 MIP "Paid To" Change to Investor.
	'12 Validate S32DISC.X48 = $250.
	'13 Validate S32DISC.X48 = $250 for each selection of SYS.X306 .
	'14 MIP has $250 paid by Lender & Seller.
	'PTAC-3359
	'1 New loan is opened.
	'2 Data is inputted on loan.
	'3 Validate S32DISC.X48 = $2000.
	'4 MIP "Paid To" Change to Investor.
	'5 Validate S32DISC.X48 = $2000.
	'6 Validate S32DISC.X48 = $2000 for each selection of SYS.X306
	'7 MIP has $250 paid by Lender & Seller.
	'8 Validate S32DISC.X48 = $1750.
	'9 MIP "Paid To" Change to Investor.
	'10 Validate S32DISC.X48 = $1750.
	'11 Validate S32DISC.X48 = $1750 for each selection of SYS.X306
'***************************************************************************************************

Dim strRowID2,strRowID5
strRowID2 = parameter("strRowId1")
strRowID5 = parameter("strRowId2")


BIZ_Loan_AddNewBlankLoan()
BIZ_1003Page1_SetData(strRowID2)
BIZ_1003Page1_MIDetails_SetTotLoanAmt parameter("chkRefund"),strRowID2
BIZ_2015Itemization_Set900Section(strRowID2)
BIZ_Itemization2015_FeeDetails902(strRowID2)

''====== 'Verify ATRQMManagement TotalSection32PointsAndFees' ======
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)
Itemization2015_FeeDetails902PaidTo("I")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)
Itemization2015_FeeDetails902PaidTo("A")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)
Itemization2015_FeeDetails902PaidTo("S")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)
Itemization2015_FeeDetails902PaidTo("O")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)

'====== 'Update Section 900 line 902 Values' ======
BIZ_2015Itemization_Set900Section(strRowID5)
BIZ_Itemization2015_FeeDetails902(strRowID5)

''====== 'Verify ATRQMManagement TotalSection32PointsAndFees' ======
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID5)
Itemization2015_FeeDetails902PaidTo("I")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID5)
Itemization2015_FeeDetails902PaidTo("A")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID5)
Itemization2015_FeeDetails902PaidTo("S")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID5)
Itemization2015_FeeDetails902PaidTo("O")
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID5)

BIZ_Loan_Save()
BIZ_Loan_Exit False
