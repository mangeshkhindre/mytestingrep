'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
   '1 PTAC-3090 Fee Variance_Initial Disclosure
   '2 PTAC-3091 Fee Variance_ReDisclosure_ReasonIsOther 
'@ Test Automation JIRA Task: PTAC-3721 FeeVariance_Disclosures 
'@ TestData:
	'Global_Data, Login ,admin_core2p
	'Tools_FeeVarianceWorksheet, VerifyItemsThatCannotDecrease, 3720_InitialDisclosure
	'Tools_FeeVarianceWorksheet, VerifyChargesThatCannotIncrease, 3720_InitialDisclosure
	'Tools_FeeVarianceWorksheet, VerifyChargesCannotIncreaseTenPercent, 3720_InitialDisclosure
	'Tools_FeeVarianceWorksheet, VerifyChargesThatCanChange, 3720_InitialDisclosure
	'Tools_FeeVarianceWorksheet, VerifyTotalGoodFaithAmount, 3720_InitialDisclosure
	'Forms_LoanEstimatePage, SetReasons, 3720_Reason
	'Tools_FeeVarianceWorksheet, VerifyItemsThatCannotDecrease, 3720_Reason_Other 
	'Tools_FeeVarianceWorksheet, VerifyChargesThatCannotIncrease, 3720_Reason_Other
	'Tools_FeeVarianceWorksheet, VerifyChargesCannotIncreaseTenPercent, 3720_VerifyFeeVariance2
	'Tools_FeeVarianceWorksheet, VerifyChargesThatCanChange, 3720_Reason_Other
	'Tools_FeeVarianceWorksheet, VerifyTotalGoodFaithAmount, 3720_Reason_Other
	'Tools_FeeVarianceWorksheet, VerifyToleranceCure, 3720_VerifyUpdate
'@ Pre-conditions:  
'@ Description:  FeeVariance_Disclosures
'@ TestSteps:
	'01 Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
	'02 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
	   'Go to Forms>>1003 page 3.
	'03 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
	   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
	'04 Verify Fee Variance Worksheet
	'05 (PTAC-3091)
	   'Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
	'06 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
	   'Go to Forms>>1003 page 3.
	'07 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
	   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
	'08 Update Fees:Go to Form>>1003pg1, Change Interest Rate to 4.5%
	'09 Go to form>>2015 Itemization
    '10 Reduce Credit for Rate Go to 1000sGo to 1102c. 
    '11 Check Fee Variance: Go to Tools>>Fee Variance.3168: checked (Changed Circumstance)LE1.X84: checked (""Other)
    '12 Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History"" section, click  (+)
	'13 Check Fee Variance WS:Go to Tools>>Fee Variance
'@ ExpectedResult: 
		'1 Fee Variance Worksheet values are as expected in each section.
		'2 (PTAC-3091)
		'3 Fee Variance Worksheet vlaues are as expected in each section.
'*************************************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3721","Script Name: FeeVariance_Disclosures",Null

BIZ_Login_UserLogin "admin_core2p"

'Navigate to selected Pipeline and and select Pipeline view and Loan Folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","My Pipeline"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3090","Fee Variance_Initial Disclosure",Null

'pre-requisite test data 
RunAction "FeeVariance_Baseline", oneIteration

BIZ_Tools_Open "Fee Variance Worksheet"
Dim strLoanNumber
'verify Items That Cannot Decrease section in Fee Variance Worksheet
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_InitialDisclosure"
'verify Charges That Cannot Increase section in Fee Variance Worksheet
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_InitialDisclosure"
'verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_InitialDisclosure"
'verify Charges That Can Change section in Fee Variance Worksheet
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_InitialDisclosure"
'verify Total Good Faith Amount section
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_InitialDisclosure"

'Save current loan number to text file
BIZ_Loan_SaveLoanNumber
strLoanNumber = BIZ_Loan_GetLoanNumber()

'Delete loan
BIZ_Loan_Exit "True"
BIZ_Nav_SelectPipelineTab
BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
BIZ_Loan_DeleteLoan()

'=====================================================================================================
'Scenario - Fee Variance_ReDisclosure_ReasonIsOther
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3091","Fee Variance_ReDisclosure_ReasonIsOther",Null

'baseline test data 
RunAction "FeeVariance_Baseline", oneIteration

'update baseline test data
RunAction "FeeVariance_BaselineUpdate", oneIteration

'check Changed Circumstance and set reason as Other
BIZ_LoanEstimatePage1_SetReason "3720_Reason"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
BIZ_Loan_Save()

'validate Good Faith Alert
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"
BIZ_Tools_Open "Fee Variance Worksheet"

'validate Fee Variance Worksheet after changing the reason as Other
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyFeeVariance2"
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyUpdate"

'Save current loan number to text file
BIZ_Loan_SaveLoanNumber
strLoanNumber = BIZ_Loan_GetLoanNumber()

'Delete loan
BIZ_Loan_Exit "True"
BIZ_Nav_SelectPipelineTab
BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)