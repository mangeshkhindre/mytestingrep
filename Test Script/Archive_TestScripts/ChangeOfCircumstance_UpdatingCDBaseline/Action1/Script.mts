'@**************************************************************************************************
'@ TestStory: PTAC-3763 Change Of Circumstance
'@ TestCase: 
    '1 PTAC-18 Updating CD Baseline (COC Reasons - CD1.X52 or CD1.X53 or CD1.X54)
'@ Test Automation JIRA Task: PTAC-3768 ChangeOfCircumstance_UpdatingCDBaseline
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	'2 Forms_2015Itemization, SetBasicData, strRowID
	'3 Tools_FeeVarianceWorksheet, Baseline, strRowID
	'4 Forms_BorrowerSummaryOrigination, SetBorrower, strRowID
	'5 Forms_RegZ_CD, RegZ_CD, strRowID
	'6 Forms_2015Itemization, Set1100Section, strRowID
	'7 Forms_2015Itemization, SetFeeDetails, strRowID
	'8 Forms_ClosingDisclosurePage, SetDisclosureInfo, strRowID
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Pre-Conditions:Loan Amount = $100,000In 2015 Itemization form fillLoan 
	'3 origination fee : 1.00%Application Fee : 200Processing Fee:300Underwriting Fee : 999
'@ Description:
'@ TestSteps:
	'1 Open the loan created in Pre-Condition steps, Enter Closing Date in field 748
    '2 Go to Disclosure Tracking Tool, In Disclosure History section, click on (+) to add a record, Check ""Disclosure"" and check 'LE'
    '3 Check ""Settlement Service Provider List, Check ""Safe Harbor"", Click OK to the message.
	'4 Go to 2015 Itemization: Change Origination fee to 1.25%, Add inspection fee of $1000 and mark it as "Can Shop For"
	'5 Go to Forms Tab, select CD page 1, Check Changed Circumstance Box, Check Changed Settlement Charges"
	'6 Go to Disclosure Tracking Tool, In Disclosure History section, click on (+) to add a record, Check 'Disclosure' and check 'CD' and click OK
	'7 Go to Tools tab the select "Fee Variance" form
	'8 Go to 2015 Itemization: Change Origination fee to 1.50%, Add inspection fee of $1500 and mark it as "Can Shop For"
	'9 Go to Forms Tab, select CD page 1, Check Changed Circumstance Box, Check "Changed Settlement Charges"
	'10 Go to Disclosure Tracking Tool, In Disclosure History section, click on (+) to add a record, Check 'Disclosure' and check 'CD' and click OK
	'11 Go to Tools tab and select "Fee Variance" form
'@ ExpectedResult:
	'1 This will ensure LE Baseline (reference point) is set with Closing DATE no more than 7 days from Issue Date.
    '2 GFE Alert Fires, clicking on the alert shows 2 tolerances
    '3 The GFE alert for both tolerances are cleared.
	'4 CD Baseline updated with the increased Origination of $250 and the additional Inspection Fee of $1000.  CD Baseline matches the Current Column 
	'5 The GFE alert for both tolerances are cleared.
	'6 CD Baseline updated with the increased Origination of $250 and the additional Inspection Fee of $1500.  CD Baseline matches the Current Column 
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3768","Script Name: ChangeOfCircumstance_UpdatingCDBaseline", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-18","Updating CD Baseline (COC Reasons - CD1.X52 or CD1.X53 or CD1.X54)", Null

Dim strRowID, strRowID1, strRowID2, objMain, objParentObject, objData, objData1

strRowID					=	"PTAC-18"
strRowID1					=	"PTAC-18_OrigFee_1.25"
strRowID2					=	"PTAC-18_OrigFee_1.50"
Set objMain					=	SwfWindow("swfname:=MainForm")
Set objParentObject 		= 	objMain.Page("title:=.*","index:=0")
Set objData 				= 	FRM_DS_GetTestData("Tools_FeeVarianceWorksheet", "Baseline", strRowID1)
Set objData1 				= 	FRM_DS_GetTestData("Tools_FeeVarianceWorksheet", "Baseline", strRowID2)

'====== Pre-Conditions ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_2015Itemization_SetE2EBasicData strRowID

'====== Step 1 ====== 
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetData strRowID
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", True, True
Wait g_ShortWaitMedium '@ Due To Sync Issue We Are Explicitly Passing Wait Statement 

'@ Validation 
dateToday				=	UTIL_Date_FormatDateByPattern (now,"mm/dd/yyyy")
dateClosing				=	UTIL_Date_AddBusinessDays_RegZCalendar (dateToday,7)
dateClosing				=	UTIL_Date_FormatDateByPattern (dateClosing,"mm/dd/yyyy")
dateClosingInApp		=	GUI_Object_GetPropertyValue (objMain.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpClosingDate;gcCompliance;panel1;.*"), "text")
dateClosingInApp		=	UTIL_Date_FormatDateByPattern (dateClosingInApp,"mm/dd/yyyy")

FRM_VerifyEqual dateClosing, dateClosingInApp, "Closing DATE no more than 7 days from Issue Date","Closing Date In Disclosure Tracking"

'====== Step 2 ====== 
BIZ_2015Itemization_SetE2EBasicData strRowID1
BIZ_2015Itemization_Set1100Section strRowID1
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1101a", Array("Borrower Can Shop")
BIZ_2015Itemization_SetFeeDetails "1101a", strRowID1
Wait g_ShortWaitMedium '@ Due To Sync Issue We Are Explicitly Passing Wait Statement 
BIZ_Loan_Save()

'@ Validation
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "GFE Alert Fired"

'====== Step 3 ======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_ClosingDisclosurePage1_SetDisclosureInfo strRowID1

'====== Step 4 ======
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD", False, False
wait TinyWaitMedium	'@ Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_Loan_Save()
wait TinyWaitMedium	'@ Due To Sync Issue We Are Explicitly Passing Wait Statement

'@ Validation
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert for both tolerances are cleared"

'====== Step 5 ======
BIZ_Tools_Open "Fee Variance Worksheet"

'@ Validation
GUI_Object_WaitTillExistX objParentObject.WebEdit("html id:=TextBox51"), 60	'@ Handling Sync
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox51"), FormatNumber(FRM_DS_GetValue(objData, "FV.X51_DiffInLEAndCDBaseline")),_
"CD Baseline updated with the increased Origination of $250"

GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox62"), FormatNumber(FRM_DS_GetValue(objData, "FV.X64_CDBaseline")),_
"additional Inspection Fee of $1000"

'====== Step 6 ======
BIZ_2015Itemization_SetE2EBasicData strRowID2
BIZ_2015Itemization_Set1100Section strRowID2
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1101a", Array("Borrower Can Shop")
BIZ_2015Itemization_SetFeeDetails "1101a", strRowID2
Wait g_ShortWaitMedium '@ Due To Sync Issue We Are Explicitly Passing Wait Statement 
BIZ_Loan_Save()

'====== Step 7 ======
BIZ_Forms_Open "Closing Disclosure Page 1"
wait TinyWaitMedium	'@ Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_ClosingDisclosurePage1_SetDisclosureInfo strRowID2

'====== Step 8 ======
BIZ_Tools_Open "Disclosure Tracking"
wait TinyWaitMedium	'@ Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD", False, False
wait TinyWaitMedium	'@ Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_Loan_Save()

'@ Validation
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert for both tolerances are cleared"

'====== Step 9 ======
BIZ_Tools_Open "Fee Variance Worksheet"

'@ Validation
GUI_Object_WaitTillExistX objParentObject.WebEdit("html id:=TextBox51"), 60	'@ Handling Sync
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox51"), FormatNumber(FRM_DS_GetValue(objData1, "FV.X51_DiffInLEAndCDBaseline")),_
"CD Baseline updated with the increased Origination of $250"

GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox62"), FormatNumber(FRM_DS_GetValue(objData1, "FV.X64_CDBaseline")),_
"additional Inspection Fee of $1500"

'===== Exit Loan & Delete =====
BIZ_Loan_Save()

Set objMain					=	Nothing
Set objParentObject 		= 	Nothing
Set objData 				= 	Nothing
Set objData1 				= 	Nothing

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Nav_SelectHomeTab()

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
