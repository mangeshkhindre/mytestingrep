'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
		'PTAC-3090 Fee Variance_Initial Disclosure
		'PTAC-3091 Fee Variance_ReDisclosure_ReasonIsOther
		'PTAC-3093 Fee Variance_FeeUpdate_ReasonIsSettlementCharges
		'PTAC-3094 Fee Variance_FeeUpdate_ReasonIsEligibility
		'PTAC-3096 Fee Variance_FeeUpdate_ReasonIsInterestRate
		'PTAC-3097 Fee Variance_FeeUpdate_ReasonIsRevisionRequested
		'PTAC-3098 Fee Variance_FeeUpdate_ReasonIsExpiration 
		'PTAC-3099 Fee Variance_FeeUpdate_ReasonIsDelayedConstruction
'@ Test Automation JIRA Task:   PTAC-3721 FeeVariance_Disclosures
'@ TestData:
        'Forms_1003page, SetBorrower, 3720_SetBorrower
        'Forms_1003page, 1003Page1, 3720_FeeVariance
        'Forms_1003page, 1003Page2, 3720_FeeVariance
        'Forms_1003page, SetDetailsTransaction, 3720_FeeVariance
        'Forms_2015Itemization, Set800Section, 3720_FeeVariance
        'Forms_2015Itemization, SetFeeDetails, 3720_804FeeDetails
        'Forms_2015Itemization, Set900Section, 3720_FeeVariance
        'Forms_2015Itemization, Set1100Section, 3720_FeeVariance
        'Forms_2015Itemization, Set1200Section, 3720_FeeVariance
        'Forms_2015Itemization, SetFeeDetails, 3720_1206FeeDetails 
'@ Pre-conditions:  
'@ Description: This is common action for pre-requisite Baseline data entry required for Fee Variance scenarios
	'@ TestSteps:
		'1 Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
		'2 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
		   'Go to Forms>>1003 page 3.
		'3 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
		   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
'@ ExpectedResult: 
		'1 Test data should be entered successfully.
'*************************************************************************************************************************

BIZ_Loan_AddNewBlankLoan()

FRM_Logger_ReportInfoEvent "Set pre-requisite data", "Settings pre-requisite data for Fee Variance scenario",Null

BIZ_Forms_ShowAll
BIZ_Forms_Open "1003 Page 1"

'set borrower information First Name, Last Name
BIZ_1003Page1_SetBorrower "3720_SetBorrower"

'set borrower data for Purchase price, loan amount
BIZ_1003Page1_SetData "3720_FeeVariance"

'set hazard insurance and RE Taxes
BIZ_Forms_Open "1003 Page 2"
BIZ_1003Page2_SetMonthlyIncomeExpensesData "3720_FeeVariance"

'set Lender Credit as 1000$ 
BIZ_Forms_Open "1003 Page 3"
BIZ_1003Page3_SetDetailsTransaction "3720_FeeVariance"

'set data in 800 section  
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "3720_FeeVariance"

'set 450 in POC for 804 Fee Details
BIZ_2015Itemization_SetFeeDetails "804","3720_804FeeDetails"

'set data in 900 section 
BIZ_2015Itemization_Set900Section "3720_FeeVariance"

'check "Property Taxes" in 907 FeeDetails
BIZ_2015Itemization_FeeDetails_ClickCheckbox "907",Array("Property Taxes")

'check "Borrower Can Shop" checkbox in 910 FeeDetails
BIZ_2015Itemization_FeeDetails_ClickCheckbox "910",Array("Borrower Can Shop")

'set data in 1100 section
BIZ_2015Itemization_Set1100Section "3720_FeeVariance"

'check "Borrower Can Shop" checkbox in 1101a
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1101a",Array("Borrower Can Shop")

'NEWHUD2.X3130 -- True -- line 1102c FeeDetails
BIZ_Common_2015Itemization_FeeDetails_SetCheckBox SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("html id:=ImageButton12"),Array("Borrower Can Shop")

'NEWHUD2.X3361 -- True -- line 1104 FeeDetails
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1104",Array("Borrower Can Shop")

'NEWHUD2.X3394
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1109",Array("Borrower Can Shop")

'set data in 1200 section
BIZ_2015Itemization_Set1200Section "3720_FeeVariance"

'NEWHUD2.X3782, set 50 
BIZ_2015Itemization_SetFeeDetails "1206","3720_1206FeeDetails"

'set data in 1300 section
BIZ_2015Itemization_Set1300Section "3720_FeeVariance"

BIZ_Loan_Save()

'Send "LE" manually through Disclosure Tracking
BIZ_Tools_Open "Disclosure Tracking"

'include Safe Harbor, Settlement Service Provider List, Disclosure
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",True,True