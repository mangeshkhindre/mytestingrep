'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
		'PTAC-3091 Fee Variance_ReDisclosure_ReasonIsOther
		'PTAC-3093 Fee Variance_FeeUpdate_ReasonIsSettlementCharges
		'PTAC-3094 Fee Variance_FeeUpdate_ReasonIsEligibility
		'PTAC-3096 Fee Variance_FeeUpdate_ReasonIsInterestRate
		'PTAC-3097 Fee Variance_FeeUpdate_ReasonIsRevisionRequested
		'PTAC-3098 Fee Variance_FeeUpdate_ReasonIsExpiration 
		'PTAC-3099 Fee Variance_FeeUpdate_ReasonIsDelayedConstruction
'@ Test Automation JIRA Task:   PTAC-3721 FeeVariance_Disclosures
'@ TestData:
        'Forms_1003page, 1003Page1, 3720_FeeVariance_IntRate
        'Forms_2015Itemization, Set800Section,3720_Credit
        'Forms_2015Itemization, Set1000Section,3720_FeeUpdate
        'Forms_2015Itemization, Set1100Section,3720_UpdateEscrow
        'Tools_FeeVarianceWorksheet, VerifyItemsThatCannotDecrease, 3720_VerifyUpdate
        'Tools_FeeVarianceWorksheet, VerifyChargesThatCannotIncrease, 3720_VerifyUpdate
        'Tools_FeeVarianceWorksheet, VerifyChargesCannotIncreaseTenPercent, 3720_VerifyUpdate
        'Tools_FeeVarianceWorksheet, VerifyChargesThatCanChange, 3720_VerifyUpdate
        'Tools_FeeVarianceWorksheet, VerifyTotalGoodFaithAmount, 3720_VerifyUpdate
        'Tools_FeeVarianceWorksheet, VerifyToleranceCure, 3720_VerifyUpdate
'@ Pre-conditions:  
'@ Description: This is common action for updating Baseline data entry (Steps 1-2) required for Fee Variance scenarios
'@ TestSteps:
		'1 Update Fees:Go to Form>>1003pg1, Change Interest Rate to 4.5%
		'2 Go to form>>2015 Itemization. Reduce Credit for Rate to 0.75%. Go to 1000s. 1387 1 month @ 55$
		   '1386 1 month @ 75$. 
		   'Go to 1102c. NEWHUD2.X3109: Other, NEWHUD.X808: 1102
		'3 Check Fee Variance: Go to Tools>>Fee Variance".
'@ ExpectedResult: 
		'1 GFE Variance Violated Alert.
		'2 Values are as expected in Fee Variance Worksheet.
'*************************************************************************************************************************
BIZ_Forms_ShowAll
BIZ_Forms_Open "1003 Page 1"

'change Interest rate to 4.5%
BIZ_1003Page1_SetData "3720_FeeVariance_IntRate"

'reduce origination credit to 0.75%
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "3720_Credit"
BIZ_Loan_Save()

'verify Good Faith Alert exists
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"

'set 1 month in 1387 and 1386
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section "3720_FeeUpdate"

'increase escrow to 1102 and PaidTo "O"
BIZ_2015Itemization_Set1100Section "3720_UpdateEscrow"
BIZ_Tools_Open "Fee Variance Worksheet"

'verify data in Items Than Cannot Decrease Section
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_VerifyUpdate"

'verify data in Charges That Cannot Increase Section
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_VerifyUpdate"

'verify data in Charges Cannot Increase Ten Percent Section
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyUpdate"

'verify data in Charges That Can Change Section
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_VerifyUpdate"

'verify data in Total Good Faith Amount Section
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_VerifyUpdate"

'verify data in Tolerance Cure section
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyUpdate"