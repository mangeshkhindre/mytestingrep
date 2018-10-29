
'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
	'1 PTAC-3093 Fee Variance_FeeUpdate_ReasonIsSettlementCharges
	'2 PTAC-3099 Fee Variance_FeeUpdate_ReasonIsDelayedConstruction
'@ Test Automation JIRA Task: PTAC-3776 FeeVariance_FeeUpdate_SettlementChargesAndDelayedConstruction 
'@ TestData:
	'1 Global_Data, Login, admin_core2p
	'2 Forms_LoanEstimatePage, SetReasons,3720_Reason_02
	'3 Tools_FeeVarianceWorksheet, VerifyItemsThatCannotDecrease, 3720_Reason_Other
	'4 Tools_FeeVarianceWorksheet, VerifyChargesThatCannotIncrease, 3720_Reason_Other
	'5 Tools_FeeVarianceWorksheet, VerifyChargesCannotIncreaseTenPercent, 3720_VerifyFeeVariance2
	'6 Tools_FeeVarianceWorksheet, VerifyChargesThatCanChange, 3720_Reason_Other
	'7 Tools_FeeVarianceWorksheet, VerifyTotalGoodFaithAmount, 3720_VerifyFeeVariance
	'8 Tools_FeeVarianceWorksheet, VerifyToleranceCure, 3720_VerifyFeeVariance
	'9 Forms_LoanEstimatePage, SetReasons, 3720_Reason_07
'@ Pre-conditions: Complete PTAC-3090. Already included in script.
'@ Description: FeeVariance_FeeUpdate_SettlementChargesAndDelayedConstruction 
	'@ TestSteps:
		'PTAC-3093:		
		'01 Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
		'02 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
		   'Go to Forms>>1003 page 3.
		'03 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
		   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
		'04 Update Fees:Go to Form>>1003pg1, Change Interest Rate to 4.5%
		'05 Go to form>>2015 Itemization
    	'06 Reduce Credit for Rate Go to 1000sGo to 1102c. 
    	'07 Check Fee Variance: 
    	'08 Go to Tools>>Fee Variance"."3168: checked (Changed Circumstance)LE1.X78: checked ("Settlement Charges)
    	'09 Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History"" section, click  (+)
		'10 Check Fee Variance WS:Go to Tools>>Fee Variance"
		'PTAC-3099:
		'1 Follow steps 1 to 11. 
		'2 Go to Tools>>Fee Variance"."3168: checked (Changed Circumstance)LE1.X83: checked 
		   '("Delayed Settlement on Construction Loans")
		'3 Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History"" section, click  (+)
		'4 Check Fee Variance WS:Go to Tools>>Fee Variance
'@ ExpectedResult: 
		'1 Fee Variance Worksheet values are as expected in each section.
		'2 (PTAC-3099)
		   'Fee Variance Worksheet vlaues are as expected in each section.
'*************************************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3776","Script Name: FeeVariance_FeeUpdate_SettlementChargesAndDelayedConstruction",Null
Dim strLoanNumber
BIZ_Login_UserLogin "admin_core2p"

'Navigate to selected Pipeline and and select Pipeline view and Loan Folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","My Pipeline"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3093","Fee Variance_FeeUpdate_ReasonIsSettlementCharges",Null

'Pre-requisite data entry
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

'check Changed Circumstance and set reason as Settlement Charges
BIZ_LoanEstimatePage1_SetReason "3720_Reason_02"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"
BIZ_Tools_Open "Fee Variance Worksheet"

'verify data in Fee Variance Worksheet
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyFeeVariance"

'Save current loan number to text file
BIZ_Loan_SaveLoanNumber
strLoanNumber = BIZ_Loan_GetLoanNumber()

'Delete loan
BIZ_Loan_Exit "True"
BIZ_Nav_SelectPipelineTab
BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
BIZ_Loan_DeleteLoan()

'=====================================================================================================
'Scenario FeeUpdate_ReasonIsDelayedConstruction
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3099","Fee Variance_FeeUpdate_ReasonIsDelayedConstruction",Null

'baseline data entry
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration

'update baseline data entry and verify Fee Variance
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

'check Changed Circumstance and set reason as Settlement Charges
BIZ_LoanEstimatePage1_SetReason "3720_Reason_07"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"
BIZ_Tools_Open "Fee Variance Worksheet"

'verify data in Fee Variance Worksheet for Delayed Construction Reason
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyFeeVariance"

'Save current loan number to text file
BIZ_Loan_SaveLoanNumber
strLoanNumber = BIZ_Loan_GetLoanNumber()

'Delete loan
BIZ_Loan_Exit "True"
'BIZ_Nav_SelectPipelineTab
'BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
'BIZ_Loan_DeleteLoan()

BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)