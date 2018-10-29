'@**************************************************************************************************
'@ TestStory: CTA-418 Loan Level Fee Variance
'@ TestCase:
   '1 CTA-419 Loan Level Fee Variance
   
'@ Pre-conditions: 
 '01 Setup ChangedCircumstances
 '02 Create a Non Admin User
'@ Description:  FeeVariance_Disclosures
'@ TestSteps:
	'01 Create New Loan.Go to Forms>>1003 page 1. Enter loan Data.
	'02 Enter Haz Ins and Tax.Go to Forms>>1003 page 2. Enter Lender Credit
	   'Go to Forms>>1003 page 3.
	'03 Enter Fees Go to Forms>>2015 Itemization. Disclosure Initial LE
	   'Go to Tools>>Disclosure Tracking. In the Disclosure History section, click (+)
	'04 Verify Fee Variance Worksheet
	'05 Send Revised Disclosure with invalid CoC reason
	'06 Verify Fee Variance Worksheet
	'07 Send Revised Disclosure with valid CoC reason
	'08 Verify Fee Variance Worksheet
	'09 Send Initial CD
	'10 Increase,Descreass Fees as per Test Data Sheet
	'11 Send Revised Disclosure with invalid CoC reason
	'12 Verify Fee Variance Worksheet
	'13 Send Revised Disclosure with valid CoC reason
	'14 Verify Fee Variance Worksheet
'@ ExpectedResult: 
		'1 Fee Variance Worksheet values are as expected in each section.
		
'*************************************************************************************************************************

FRM_RT_SetupTest(Null)

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=================================== Pre-Requisites========= ===============
'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'======Setup Changed Circumstances======
FRM_Logger_ReportStepEvent "Step-1: Pre-Requisites","Setup Changed Circumstances, Uncheck 'Loan Level Changed Circumstances' Checkbox and Create a Non Admin User", Null
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_LE_E2E"
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_CD_E2E"
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_LE_Invalid"
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_CD_Invalid"

'======Setting of Loan Level Changed Circumstances======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Disclosure Tracking Settings"
BIZ_Settings_ChangedCircumstance False

'====== Go to Settings/Company/User Setup/;User Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"

'=============add CoC options to User Group =======
BIZ_UserGroup_AddCoCOptions "FV_UserGroup"

'======== Create non admin use ========
'BIZ_OrganizationUsers_CreateUser "CoC_NonAdmin"

'=======LogOut=======
BIZ_Login_UserLogout()


'====== Login to the Encompass as Non admin =====
FRM_Logger_ReportStepEvent "Step-2: Login into Encompass","Login into Encompass using Non Admin user and Create a new loan with basic details", Null
'BIZ_Login_UserLogin "CoC_NonAdmin"
BIZ_Login_UserLogin "admin_core2p"

'============ Create an new loan with basic details
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CoC"

'============= Fill the details in 2015 Itemization form ===========
FRM_Logger_ReportStepEvent "Step-3: Set Baseline Data for Fee Variance", "Set Baseline Data for Fee Variance",Null
BIZ_FeeVariance_Baseline "3720_FeeVariance"
BIZ_Loan_Save()

'====== Send Initial LE =====
FRM_Logger_ReportStepEvent "Step-4: Send Intial LE", "Started sending Initial LE",Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'============ Verify the Items in Fee Variance Worksheet=============
FRM_Logger_ReportStepEvent "Step-5: Verify Items in Fee Variance Worksheet after Initial LE", "Validating Items in Fee Variance Worksheet after Initial LE",Null
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Initial_LE"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Initial_LE"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Initial_LE"
BIZ_FeeVariance_InitialLE "Initial_LE"


'==========Update baseline test data==============
FRM_Logger_ReportStepEvent "Step-6: Update Fees that Cannot Descrease, Cannot Increase and Cannot Increase more than 10% in Fee Variance Worksheet and Verify GFE Alert", "Updated Fees that Cannot Descrease, Cannot Increase and Cannot Increase more than 10%",Null
BIZ_FeeVariance_BaselineUpdate "FeeVariance_LE"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
FRM_Logger_ReportStepEvent "Step-7: Verify Current Itemization in Fee Variance Worksheet after baseline Fees updated and GFE Alert", "Validating Current Itemization in Fee Variance Worksheet after baseline Fees updated and GFE Alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "LE_Baseline_Update"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "LE_Baseline_Update"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "LE_Baseline_Update"
BIZ_FeeVariance_CurrentItemization "LE_Baseline_Update"


'====== Check Changed Circumstance and select invalid CoC reason ======
FRM_Logger_ReportStepEvent "Step-8: Select invalid CoC reason and send Revised LE", "Selected invalid CoC reason and Started sending Revised LE",Null
BIZ_Forms_Open "Loan Estimate Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_3168_Ctrl")
BIZ_CoC_SelectReason "CoC_LE_Disclosures_Invalid","lepage"

'====== Send Revised LE =====
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'====== Validate GFE Alert =======  
FRM_Logger_ReportStepEvent "Step-9: Verify Current Itemization in Fee Variance Worksheet after Revised LE with invalid CoC reason and GFE Alert", "Validating Current Itemization in Fee Variance Worksheet and GFE Alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Revised_LE_InvalidReason"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Revised_LE_InvalidReason"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Revised_LE_InvalidReason"
BIZ_FeeVariance_CurrentItemization "Revised_LE_InvalidReason"

'======check Changed Circumstance and select valid reason======
FRM_Logger_ReportStepEvent "Step-10: Select valid CoC reason and send Revised LE", "Selected valid CoC reason and Started sending Revised LE",Null
BIZ_Forms_Open "Loan Estimate Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_3168_Ctrl")
BIZ_CoC_SelectReason "CoC_LE_Disclosures","lepage"

'====== Send Revised LE =====
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'====== Validate GFE Alert =======
FRM_Logger_ReportStepEvent "Step-11: Verify LE Baseline in Fee Variance Worksheet after Revised LE with valid CoC reason and GFE alert", "Validating LE Baseline in Fee Variance Worksheet after Revised LE with valid CoC reason and GFE alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====  
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Revised_LE_ValidReason"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Revised_LE_ValidReason"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Revised_LE_ValidReason"
BIZ_FeeVariance_LEBaseline "Revised_LE_ValidReason" 

'====== Send Initial LE =====
FRM_Logger_ReportStepEvent "Step-12: Send Intial CD", "Started sending Initial CD",Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False

'============ Verify the Items in Fee Variance Worksheet=============
FRM_Logger_ReportStepEvent "Step-13: Verify CD Baseline in Fee Variance Worksheet after Initial CD", "Validating CD Baseline in Fee Variance Worksheet after Initial CD",Null
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Initial_CD"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Initial_CD"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Initial_CD"
BIZ_FeeVariance_CDBaseline "Initial_CD" 

'==========Update baseline test data==============
FRM_Logger_ReportStepEvent "Step-14: Update Fees that Cannot Descrease, Cannot Increase and Cannot Increase more than 10% in Fee Variance Worksheet and Verify GFE Alert", "Updated Fees that Cannot Descrease, Cannot Increase and Cannot Increase more than 10%",Null
BIZ_FeeVariance_BaselineUpdate "FeeVariance_CD"
BIZ_Loan_Save()

'====== Validate GFE Alert =======  
FRM_Logger_ReportStepEvent "Step-15: Verify Items in Fee Variance Worksheet after CD baseline Fees updated and GFE Alert", "Validating Items in Fee Variance Worksheet after baseline Fees updated and GFE Alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "CD_Baseline_Update"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "CD_Baseline_Update"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "CD_Baseline_Update"
BIZ_FeeVariance_CurrentItemization "CD_Baseline_Update"


'======check Changed Circumstance and set reason as Other======
FRM_Logger_ReportStepEvent "Step-16: Select invalid CoC reason and send Revised CD", "Selected invalid CoC reason and Started sending Revised CD",Null
BIZ_Forms_Open "Closing Disclosure Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X61_Ctrl")
BIZ_CoC_SelectReason "CoC_CD_Disclosures_Invalid","cdpage"

'====== Send Revised LE =====
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False

'====== Validate GFE Alert =======  
FRM_Logger_ReportStepEvent "Step-17: Verify Items in Fee Variance Worksheet after Revised CD with invalid reason and GFE alert", "Validating Items in Fee Variance Worksheet after Revised CD and GFE alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Revised_CD_InvalidReason"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Revised_CD_InvalidReason"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Revised_CD_InvalidReason"
BIZ_FeeVariance_CurrentItemization "Revised_CD_InvalidReason"

'======check Changed Circumstance and select valid reason======
FRM_Logger_ReportStepEvent "Step-18: Select valid CoC reason and send Revised CD", "Selected valid CoC reason and Started sending Revised CD",Null
BIZ_Forms_Open "Closing Disclosure Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X61_Ctrl")
BIZ_CoC_SelectReason "CoC_CD_Disclosures","cdpage"

'====== Send Revised LE =====
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False

'====== Validate GFE Alert =======
FRM_Logger_ReportStepEvent "Step-19: Verify Items in Fee Variance Worksheet after Revised CD with valid CoC Reason and GFE alert", "Validating Items in Fee Variance Worksheet after Revised CD with valid CoC Reason and GFE alert",Null
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'============ Verify the Items in Fee Variance Worksheet=============
BIZ_Tools_Open "Fee Variance Worksheet"
''=====verify Items That Cannot Decrease section in Fee Variance Worksheet====
'BIZ_FeeVariance_ItemsThatCannotDecreaseSection "Revised_CD_ValidReason"
''verify Charges That Cannot Increase section in Fee Variance Worksheet  
'BIZ_FeeVariance_ChargesThatCannotIncreaseSection "Revised_CD_ValidReason"
''verify Charges Cannot Increase TenPercent sectionin Fee Variance Worksheet
'BIZ_FeeVariance_ChargesCannotIncreaseTenPercentSection "Revised_CD_ValidReason"
BIZ_FeeVariance_CDBaseline "Revised_CD_ValidReason" 

BIZ_Loan_Save()
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
