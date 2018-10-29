'@**************************************************************************************************
'@ TestStory:PTAC-3688 Compliance Section-32 HOEPA
'@ TestCase:
	'1 PTAC-3358 Section 32 Points and Fees, Conventional MI - Rule #2 (Refundable, Paid to Broker) 
	'2 PTAC-3360 Section 32 Points and Fees, Conventional MI - Rule #4 (Not Refundable, Paid to Broker) 
'@ Test Automation JIRA Task: 
	
	'PTAC-3689 Section32PointAndFees_ConventionalMI_PaidToBroker 
'@ TestData: Add Test data file name, Sheet name and Row Id.
	'Settings_TablesFees, MITable, PTAC-3449_2
	'Forms_1003page, 1003Page1, "PTAC-3358"
	'Forms_2015Itemization, Set900Section, "PTAC-3360"
	'Forms_1003page, 1003Page1, "PTAC-3358"
	'Forms_2015Itemization, Set900Section, "PTAC-3360"
'@ Pre-conditions:
'@ Description: 
'PTAC-3358
'Rule 2: Refundable, Paid to Broker 
	'If Fee is Refundable (3262) and paid to Broker (SYS.X306)
	'Section 32 Value = Borrower Paid Amount (NEWHUD.X2191) + Broker Paid Amount (NEWHUD.X2197) + Other Paid Amount (NEWHUD2.X2203)  
	'      +  Lender Paid Amount (NEWHUD2.X2200) + Seller Paid Amount (NEWHUD2.X2194) - (1.75% * Loan Amount(1109))
	'If Section 32 Value < = 0, Section 32 Value = 0
'PTAC-3360
	'Rule4: Not Refundable, Paid to Broker
	'If Not Refundable and paid to = Broker 
	'Section 32 Value = SBorrower Paid Amount(NEWHUD.X2191) + Broker Paid Amount (NEWHUD.X2197) + Other Paid Amount (NEWHUD2.X2203)
	'	  + Lender Paid Amount (NEWHUD2.X2200) + Seller Paid Amount (NEWHUD2.X2194)
'@ TestSteps:
	'PTAC-3358
	'1 Log into Encompass and add a New Blank Loan.
	'2 Input data according to 'Test Data' column.
	'3 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'4 Open the MIP/PMI/Guarantee Fee Calculation Popup and change data according to 'Test Data' column.
	'5 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'6 Open the MIP/PMI/Guarantee Fee Calculation Popup and change data according to 'Test Data' column.
	'7 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'PTAC-3360
	'1 Log into Encompass and add a New Blank Loan.
	'2 Input data according to 'Test Data' column
	'3 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
	'4 Open the MIP/PMI/Guarantee Fee Calculation Popup and change data according to 'Test Data' column
	'5 Click on ATR/QM Management > Qualification Tab and validate the Expected Results.
'@ ExpectedResult:
	'PTAC-3358
	'1 New loan is opened.
	'2 Data is inputted on loan.
	'3 Validate S32DISC.X48 = $250.
	'4 F1107 (MIP) = 1.76% .
	'5 Validate S32DISC.X48 = $10.
	'6 F1107 (MIP) = 1.75%.
	'7 Validate S32DISC.X48 = Blank.
	'PTAC-3360
	'1 New loan is opened
	'2 Data is inputted on loan.
	'3 Validate S32DISC.X48 = $2000
	'4 F1107 (MIP) = 1.75%
	'5 Validate S32DISC.X48 = $1750
'***************************************************************************************************
strRowID2			=	"PTAC-3358"
strRowID_3          =   "PTAC-3358_3"
strRowID_4          =   "PTAC-3358_2"  
strRowID3			=	"PTAC-3360"
strRowID3_2			=	"PTAC-3360_2"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3358 ","Section 32 Points and Fees, Conventional MI - Rule #2 (Refundable, Paid to Broker)", Null
'====== 'Loan Creation' ======
BIZ_Loan_AddNewBlankLoan()
BIZ_1003Page1_SetData(strRowID2)
BIZ_1003Page1_MIDetails_SetTotLoanAmt "ON",strRowID2
BIZ_2015Itemization_Set900Section(strRowID2)
BIZ_Itemization2015_FeeDetails902(strRowID2)

'====== 'Verify ATRQMManagement TotalSection32PointsAndFees' ======
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID2)
BIZ_1003Page1_MIDetails_SetTotalLoanAmountPremium strRowID_4
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID_4)
BIZ_1003Page1_MIDetails_SetTotalLoanAmountPremium strRowID_3
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID_3)

'====== 'Loan Form Close' ======
BIZ_Loan_Save()
BIZ_Loan_Exit False

'====== Section 32 Points and Fees, Conventional MI - Rule #4 (Not Refundable, Paid to Broker)   ======
'====== 'Loan Creation' ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3360 "," Section 32 Points and Fees, Conventional MI - Rule #4 (Not Refundable, Paid to Broker) ", Null
BIZ_Loan_AddNewBlankLoan()
BIZ_1003Page1_SetData(strRowID3)
BIZ_1003Page1_MIDetails_SetTotLoanAmt "OFF",strRowID3
BIZ_2015Itemization_Set900Section(strRowID3)
BIZ_Itemization2015_FeeDetails902(strRowID3)

'====== 'Verify ATRQMManagement TotalSection32PointsAndFees' ======
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID3)
BIZ_1003Page1_MIDetails_SetTotalLoanAmountPremium strRowID3_2
BIZ_ATRQMManagement_Verify_TotalSection32PointsAndFees (strRowID3_2)

'====== 'Loan Form Close' ======
BIZ_Loan_Save()
BIZ_Loan_Exit False
