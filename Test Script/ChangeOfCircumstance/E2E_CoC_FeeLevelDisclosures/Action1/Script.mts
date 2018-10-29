'@**************************************************************************************************
'@ TestStory: CTA-375 Change Of Circumstance Automation
'@ TestCase: 
    '1 NICE-9461 Changed Circumstance Fee Level Disclosures

'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Navigate to Settings > Loan Setup > Changed Circumstances Setup and confirm the Changed Circumstance Options list is populated. Add Reasons to the Options if not already configured and save any changes.
	'3 Navigate to Settings > Loan Setup > Disclosure Tracking Settings and uncheck the "Require fee level Changed Circumstances prior to disclosure" checkbox and save the change.
	'4 Create a non admin user if not exist
'@ Description:
'@ TestSteps:
	'Refer NICE-9461 
'@ ExpectedResult:
	''Refer NICE-9461 
'**********************************************************************************************

FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=================================== Pre-Requisites========= ===============
'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"
BIZ_LoanSetup_ComplianceCalendar_OurCompanyCalendar("E2E_DisclosureTracking")

'======Setup Changed Circumstances======
FRM_Logger_ReportStepEvent "Step-1: Pre-Requisites","Setup Changed Circumstances and Uncheck 'Loan Level Changed Circumstances' Checkbox", Null
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_LE_E2E"
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_CD_E2E"

'======Setting of Loan Level Changed Circumstances======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Disclosure Tracking Settings"
BIZ_Settings_ChangedCircumstance False

'======== Create non admin use ========
BIZ_OrganizationUsers_CreateUser "CoC_NonAdmin"
GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer") 

'====== Go to Settings/Company/User Setup/;User Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"

'=============add CoC options to User Group =======
BIZ_UserGroup_AddCoCOptions "CoC_UserGroup"

'=======LogOut=======
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non admin =====
FRM_Logger_ReportStepEvent "Step-2: Create New Loan","Login into Encompass using Non Admin user and Create a new loan with basic details", Null
BIZ_Login_UserLogin "CoC_NonAdmin"

'============ Create an mew loan with basic details
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","Automation"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_CoC"
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetData "PTAC-18"

FRM_Logger_ReportStepEvent "Step-3: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Check 'Fee Level Disclosures' checkbox", Null
Set objLEPage1 = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_4461_Ctrl"),"ON"
  
GUI_Dialog_Encompass_YesX 5,"Any changes to Disclosure Information you have made will be cleared. Would you like to continue?"
BIZ_Loan_Save()

'======= Validate Fee Level Disclosures checkbox =======
BIZ_CoC_FeeLevelDisclosures True,True

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstance False,False
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlLE_DTReasons "LEPage1"

'========= Send Initial LE =======
FRM_Logger_ReportStepEvent "Step-4: Initial LE","Send LE through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", False, False

'======= Click on Initial LE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Initial","Yes","LE")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-5: Desclosure Details Reason Tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures ======= 
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"True","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance ======= 
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"False","Changed Circumstance"  
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields False,True,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details======= 
BIZ_CoC_FeeLvlLE_DTReasons "DisclosureDetails"	

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then	
	Set objFeeList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfObject("swfname:=feeDetailsGV")
	If GUI_List_GetNumberofRows (objFeeList)=0 Then 
		FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table is exist with empty", null
	Else
		FRM_Logger_ReportFailEvent "Verify Fee Changes Table", "Fee Changes Table is exist with Fee Change records", null
	End If
Else 	
 	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-6: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_ChangedCircumstance False,False
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlLE_DTReasons "LEPage1"

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-7:Increase Fee on 2015 Itemization","On 2015 Itemization form, Increase one fee that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.25"
BIZ_Loan_Save()

'====== Validate GFE Alert =======  
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'========define Fee Details for the fee======
BIZ_CoC_GFE_FeeDetails "PTAC-18_OrigFee_1.25","CoC_LE_E2E"      

'======= Fields in Changed Circumstance LE Page 1=======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_ChangedCircumstanceFields False,False,"CoC_LE_E2E"

'======= Reasons on LE Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),"Revisions requested by the Consumer"

'====== Remove Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-8: Remove Fee on 2015 Itemization","On 2015 Itemization form remove the increase for the one fee that was increased", Null
BIZ_Forms_Open "2015 Itemization"
Set obj2015ItemzationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
GUI_WebEdit_Set obj2015ItemzationPage.WebEdit("html id:=TextBox12"), ""
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'======= Fields in Changed Circumstance LE Page 1=======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons on LE Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are unchecked and disabled", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),0,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),"Revisions requested by the Consumer"

'====== Increase fee for two fields====== 
FRM_Logger_ReportStepEvent "Step-9:Increase Fee for more than one fields on 2015 Itemization","On 2015 Itemization form, Increase fee for more than one fields that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "CoC_LE_TwoFees"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'========define Fee Details for the fee======
BIZ_CoC_GFE_FeeDetails "CoC_LE_TwoFees","CoC_LE_E2E"      

'======= Fields in Changed Circumstance LE Page 1=======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_ChangedCircumstanceFields False,False,"CoC_LE_E2E"

'========= Send Revised LE =======
FRM_Logger_ReportStepEvent "Step-10: Revised LE","Send Revised through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE", False, False

'======= Click on Revised LE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-11: Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures =======
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"True","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"True","Changed Circumstance"  
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields False,False,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason3"),"True","Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=chkReason3"),"Revisions requested by the Consumer"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then	
	Set objFeeList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfObject("swfname:=feeDetailsGV")
	If GUI_List_GetNumberofRows (objFeeList)=0 Then 
		FRM_Logger_ReportFailEvent "Verify Fee Changes Table", "Fee Changes Table is exist with empty", null
	Else
		FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table is exist with Fee Change records", null 					
	End If
Else 	
 	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table does not exist", null
End If

'=========Validating Fee Changes Table=========
BIZ_CoC_FeeChangesValidation "LE_FeeChanges"	

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-12: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_ChangedCircumstance False,False
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlLE_DTReasons "lepage1"

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"



'============================================= CD Flow =======================  
FRM_Logger_ReportStepEvent "Start Closing Disclosure flow here","Started Closing Disclosure flow here", Null
FRM_Logger_ReportStepEvent "Step-13: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_CD_ChangedCircumstance False,False
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlCD_DTReasons "CDPage1"

'========= Send Initial CD =======
FRM_Logger_ReportStepEvent "Step-14: Initial CD","Send CD through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "CD", False, False

'======= Click on Initial CD Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Initial","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

FRM_Logger_ReportStepEvent "Step-15: Disclosure Details Reason Tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures ======= 
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"True","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason6"),"False","Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=chkReason6"),"Revisions requested by the Consumer"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields False,True,"CoC_CD_E2E" 

'======= Reasons on Disclosure Details=======
BIZ_CoC_FeeLvlCD_DTReasons "DisclosureDetails"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then	
	Set objFeeList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfObject("swfname:=feeDetailsGV")
	If GUI_List_GetNumberofRows (objFeeList)=0 Then 
		FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table is exist with empty", null
	Else
		FRM_Logger_ReportFailEvent "Verify Fee Changes Table", "Fee Changes Table is exist with Fee Change records", null
	End If
Else 	
 	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-16: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_CD_ChangedCircumstance False,False
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlCD_DTReasons "CDPage1"

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-17:Increase Fee on 2015 Itemization","On 2015 Itemization form, Increase one fee that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.50"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'========define Fee Details for the fee======
BIZ_CoC_GFE_FeeDetails "PTAC-18_OrigFee_1.50","CoC_CD_E2E"   

'======= Fields in Changed Circumstance - CD Page1=======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_CD_ChangedCircumstanceFields False,False,"CoC_CD_E2E"

'======= Reasons on CD Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),"Revisions requested by the Consumer"

'====== Remove Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-18: Remove Fee on 2015 Itemization","On 2015 Itemization form remove the increase for the one fee that was increased", Null
Set obj2015ItemzationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
BIZ_2015Itemization_SetE2EBasicData "CoC_LE_TwoFees"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'======= Fields in Changed Circumstance CD Page 1=======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons on CD Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are unchecked and disabled", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),0,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),"Revisions requested by the Consumer"

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-19:Increase Fee for more than one fields on 2015 Itemization","On 2015 Itemization form, Increase fee for more than one fields that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "CoC_CD_TwoFees"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'========define Fee Details for the fee======
BIZ_CoC_GFE_FeeDetails "CoC_CD_TwoFees","CoC_CD_E2E"

'======= Fields in Changed Circumstance LE Page 1=======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_CD_ChangedCircumstanceFields False,False,"CoC_CD_E2E"

'========= Send Revised CD =======
FRM_Logger_ReportStepEvent "Step-20: Revised CD","Send Revised through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD", False, False

'======= Click on Revised Cd Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-21: Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures ======= 
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"True","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"True","Changed Circumstance"  
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields False,False,"CoC_CD_E2E"

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason6"),"True","Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=chkReason6"),"Revisions requested by the Consumer"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then	
	Set objFeeList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfObject("swfname:=feeDetailsGV")
	If GUI_List_GetNumberofRows (objFeeList)=0 Then 
		FRM_Logger_ReportFailEvent "Verify Fee Changes Table", "Fee Changes Table is exist with empty", null
	Else
		FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table is exist with Fee Change records", null 					
	End If
Else 	
 	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table does not exist", null
End If

'=========Validating Fee Changes Table=================
BIZ_CoC_FeeChangesValidation "CD_FeeChanges"	

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-22: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_CD_ChangedCircumstance False,False
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlCD_DTReasons "CDPage1"

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)

