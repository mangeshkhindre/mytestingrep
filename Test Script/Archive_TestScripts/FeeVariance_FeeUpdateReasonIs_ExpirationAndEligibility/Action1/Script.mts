'@**************************************************************************************************
'@ TestStory: PTAC-3720 Fee Variance
'@ TestCase:
		'PTAC-3094 Fee Variance_FeeUpdate_ReasonIsEligibility
		'PTAC-3098 Fee Variance_FeeUpdate_ReasonIsExpiration 
'@ Test Automation JIRA Task: PTAC-3828 FeeVariance_FeeUpdateReasonIs_ExpirationAndEligibility 
'@ TestData:"Global_Data","Login","admin_core2p"
'			"Forms_LoanEstimatePage", "SetReasons","3720_Reason_06"
'			"Tools_FeeVarianceWorksheet", "VerifyItemsThatCannotDecrease","3720_Reason_Other"
'			"Tools_FeeVarianceWorksheet", "VerifyChargesThatCannotIncrease","3720_Reason_Other"
'			"Tools_FeeVarianceWorksheet","VerifyChargesCannotIncreaseTenPercent","3720_VerifyFeeVariance"
'			"Tools_FeeVarianceWorksheet","VerifyChargesThatCanChange","3720_Reason_Other"
'			"Tools_FeeVarianceWorksheet","VerifyTotalGoodFaithAmount","3720_VerifyFeeVariance"
'			"Tools_FeeVarianceWorksheet","VerifyToleranceCure","3720_VerifyFeeVariance"
'			"Forms_LoanEstimatePage", "SetReasons","3720_Reason_03"
'			"Tools_FeeVarianceWorksheet", "VerifyItemsThatCannotDecrease","3720_VerifyFeeVariance"
'			"Tools_FeeVarianceWorksheet","VerifyTotalGoodFaithAmount","3720_VerifyFeeVariance_02"
'			"Tools_FeeVarianceWorksheet","VerifyToleranceCure","3720_VerifyFeeVariance_02"
'@ Pre-conditions:  Complete PTAC-3090. Already included in script.
'@ Description:  FeeVariance_FeeUpdate_SettlementChargesAndDelayedConstruction 
	'@ TestSteps:
		'1. (PTAC-3098)
		'	Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
		'2. Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
		'	Go to Forms>>1003 page 3.
		'3. Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
		'	Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
		'8. "Update Fees:Go to Form>>1003pg1, Change Interest Rate to 4.5%
		'9. "Go to form>>2015 Itemization
    	'10.Reduce Credit for Rate Go to 1000sGo to 1102c. 
    	'11."Check Fee Variance: 
    	'12. Go to Tools>>Disclosure Tracking.
    	'	Edit Initial Disclosure RecordSet Intent to Proceed Date 10 days after presumed received date.
    	'13. Go to Tools>>Fee Variance"."3168: checked (Changed Circumstance)
    	'	LE1.X782: checked ; ""Expiration (Intent to Proceed received after 10 business days)
    	'14."Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History"" section, click  (+) "
		'15."Check Fee Variance WS:Go to Tools>>Fee Variance"
		'16.(PTAC-3094) Follow steps 1 to 11. 
		'17.Enter Changed Circumstance. Go to Forms>>LE page 1
		'	3168: checked (Changed Circumstance)LE1.X79: checked ("Changed Circumstance -Eligibility")
		'18."Redisclose LE.Go to Tools>>Disclosure Tracking>> In the ""Disclosure History"" section, click  (+) "
		'19."Check Fee Variance WS:Go to Tools>>Fee Variance"	
'@ ExpectedResult: 
		'1. Fee Variance Worksheet data is as expected in each section.
		'2. (PTAC-3094)
		'	Fee Variance Worksheet data is as expected in each section.
'*************************************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-3828","Script Name: FeeVariance_FeeUpdateReasonIs_ExpirationAndEligibility",Null

BIZ_Login_UserLogin "admin_core2p"

'Navigate to selected Pipeline and and select Pipeline view and Loan Folder
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","My Pipeline"

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3098","Fee Variance_FeeUpdate_ReasonIsExpiration",Null

'set baseline data
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration

'update baseline data and validate Fee Variance Worksheet
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

BIZ_Tools_Open "Disclosure Tracking"

'edit existing Disclosure Record
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")._
SwfObject("swfname:=gvHistory"),Null,"# of Disclosed Docs","6",True,False,False,"Double"



'handle pop-up
GUI_Dialog_Encompass_OKX 10, "day will be used."

Dim strPresumedReceivedDate,strIntentDate

Set objDisclosureDetails = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")

'move back "Sent Date" 10 days from today
If GUI_Object_GetPropertyValue(objDisclosureDetails.SwfCalendar("swfname:=dtDisclosedDate"),"enabled")=False Then
	GUI_SwfObject_Click objDisclosureDetails.SwfObject("swfname path:=pbIcon;lbtnSentDate;.*")
	GUI_SwfCalendar_SetDate objDisclosureDetails.SwfCalendar("swfname:=dtDisclosedDate"),Date()-10
Else 
	GUI_SwfCalendar_SetDate objDisclosureDetails.SwfCalendar("swfname:=dtDisclosedDate"),Date()-10
End If

'handle pop-up
GUI_Dialog_Encompass_OKX 30, "Sundays and legal holidays"

'displayed Presumed Received Data
strPresumedReceivedDate = GUI_Object_GetPropertyValue(objDisclosureDetails.SwfEdit("swfname path:=txtDate;dpBorrowerReceivedDate;panel2;.*"),"text")

'set IntentDate 11 business days after Presumed Received Date
strIntentDate = UTIL_Date_AddBusinessDay(CDate(strPresumedReceivedDate),11)
GUI_SwfCheckbox_Set objDisclosureDetails.SwfCheckBox("swfname:=chkIntent"),"ON"
GUI_SwfCalendar_SetDate objDisclosureDetails.SwfCalendar("swfname:=dpIntentDate"),strIntentDate

'Code added by for hiding the toolbaar
cSendKeyValue = "%u" ' Alt+u = Auto-hide the taskbar 
Set WshShell = CreateObject("Wscript.shell") 
Set oShell = CreateObject("Shell.Application") 
oShell.TrayProperties 
wait 5
WshShell.SendKeys cSendKeyValue                        
wait 1 
WshShell.SendKeys "{ENTER}"           ' Enter to Close Properties
GUI_SwfButton_Click objDisclosureDetails.SwfButton("swfname:=btnOK")

Set WshShell=nothing
Set oShell=nothing

'check Changed Circumstance and set reason as Expiration
BIZ_LoanEstimatePage1_SetReason "3720_Reason_06"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages","Good Faith Fee Variance Violated"

BIZ_Tools_Open "Fee Variance Worksheet"

'validate Fee Variance Worksheet data
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


'Scenario Fee Variance_FeeUpdate_ReasonIsEligibility
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3094","Fee Variance_FeeUpdate_ReasonIsEligibility",Null

'set baseline data
RunAction "FeeVariance_Baseline [FeeVariance_Disclosures]", oneIteration

'set baseline update and validate Fee Variance Worksheet
RunAction "FeeVariance_BaselineUpdate [FeeVariance_Disclosures]", oneIteration

'check Changed Circumstance and set reason as Eligibility
BIZ_LoanEstimatePage1_SetReason "3720_Reason_03"
BIZ_Loan_Save()

'Redisclose LE
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"

BIZ_Tools_Open "Fee Variance Worksheet"

'validate Fee Variance Worksheet data
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

FRM_RT_TearDownTest(null)



