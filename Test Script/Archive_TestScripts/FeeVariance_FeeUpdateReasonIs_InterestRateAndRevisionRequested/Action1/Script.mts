'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
	'1 PTAC-3096 Fee Variance_FeeUpdate_ReasonIsInterestRate
	'2 PTAC-3097 Fee Variance_FeeUpdate_ReasonIsRevisionRequested
'@ Test Automation JIRA Task: PTAC-3827 FeeVariance_FeeUpdateReasonIs_InterestRateAndRevisionRequested 
'@ TestData:
    '1 Global_Data, Login, admin_core2p
    '2 Forms_LoanEstimatePage, SetReasons, 3720_Reason_04
    '3 Tools_FeeVarianceWorksheet, VerifyItemsThatCannotDecrease, 3720_VerifyFeeVariance
    '4 Tools_FeeVarianceWorksheet, VerifyChargesThatCannotIncrease, 3720_Reason_Other
    '5 Tools_FeeVarianceWorksheet, VerifyChargesCannotIncreaseTenPercent, 3720_VerifyFeeVariance2
    '6 Tools_FeeVarianceWorksheet, VerifyChargesThatCanChange, 3720_Reason_Other
    '7 Tools_FeeVarianceWorksheet, VerifyTotalGoodFaithAmount, 3720_VerifyFeeVariance_02
    '8 Tools_FeeVarianceWorksheet, VerifyToleranceCure, 3720_VerifyFeeVariance_02
    '9 Forms_LoanEstimatePage, SetReasons, 3720_Reason_05
'@ Pre-conditions: Complete PTAC-3090. Already included in script.
'@ Description: FeeVariance_FeeUpdate_SettlementChargesAndDelayedConstruction 
'@ TestSteps:
	'PTAC-3096:
	'1 Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
	'2 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
	   'Go to Forms>>1003 page 3.
	'3 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
	   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
	   'Update Fees:Go to Form>>1003pg1, Change Interest Rate to 4.5%
	'4 Go to form>>2015 Itemization
    '5 Reduce Credit for Rate Go to 1000sGo to 1102c. 
    '6 Check Fee Variance: 
    '7 Go to Tools>>Fee Variance"."3168: checked (Changed Circumstance)
       'LE1.X81: checked ("Interest Rate Dependent Charges (Rate Lock))
    '8 Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History section, click  (+)
	'9 Check Fee Variance WS:Go to Tools>>Fee Variance
	'PTAC-3097: 
	'1 Follow steps 1 to 11. 
	'2 Go to Tools>>Fee Variance.3168: checked (Changed Circumstance)
	   'LE1.X81: checked ("Revision Requested")
	'3 Redisclose LE.Go to Tools>>Disclosure Tracking>> In the "Disclosure History" section, click  (+)
	'4 Check Fee Variance WS:Go to Tools>>Fee Variance
'@ ExpectedResult: 
	'1 Fee Variance Worksheet values are as expected in each section.
	'2 Fee Variance Worksheet vlaues are as expected in each section.
'*************************************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3827","Script Name: FeeVariance_FeeUpdateReasonIs_InterestRateAndRevisionRequested",Null

BIZ_Login_UserLogin "admin_core2p"
Dim strLoanNumber
'Navigate to selected Pipeline and and select Pipeline view and Loan Folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","My Pipeline"

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3096","Fee Variance_FeeUpdate_ReasonIsInterestRate",Null

'set baseline data 
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration

'update baseline data and validate Fee Variance Worksheet
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

'check Changed Circumstance and set reason as Interest Rate Dependent Charges
BIZ_LoanEstimatePage1_SetReason "3720_Reason_04"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'validate alert not present
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Good Faith Fee Variance Violated"
BIZ_Tools_Open "Fee Variance Worksheet"

'Validate data in Fee Variance after changing reason
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_VerifyFeeVariance_02"
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyFeeVariance_02"

'Save current loan number to text file
BIZ_Loan_SaveLoanNumber
strLoanNumber = BIZ_Loan_GetLoanNumber()

'Delete loan
BIZ_Loan_Exit "True"
BIZ_Nav_SelectPipelineTab
BIZ_Loan_SelectLoanByColumnValue "Loan Number", strLoanNumber
BIZ_Loan_DeleteLoan()

'=======================================================================================================
'Scenario Fee Variance_FeeUpdate_ReasonIsRevisionRequested
FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3097","Fee Variance_FeeUpdate_ReasonIsRevisionRequested",Null

'set baseline data 
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration

'update baseline data and validate Fee Variance Worksheet
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

'check Changed Circumstance and set reason as Interest Rate Dependent Charges
BIZ_LoanEstimatePage1_SetReason "3720_Reason_05"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
BIZ_Loan_Save()

'handling for sync issue. Sometimes GFE Alert is not removed immediately 
BIZ_Nav_LogAlerts_SelectTab "Log"
BIZ_Nav_LogAlerts_SelectTab "Alerts & Messages"
Wait g_ShortWaitSmall

'validate alert not existing
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Good Faith Fee Variance Violated"
BIZ_Tools_Open "Fee Variance Worksheet"

'validate data in Fee Variance, after setting reason as Interest Rate Dependent Charges
BIZ_FeeVariance_VerifyItemsThatCannotDecreaseSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyChargesCannotIncreaseTenPercentSection "3720_VerifyFeeVariance"
BIZ_FeeVariance_VerifyChargesThatCanChangeSection "3720_Reason_Other"
BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "3720_VerifyFeeVariance_02"
BIZ_FeeVariance_VerifyToleranceCure "3720_VerifyFeeVariance_02"

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
