'@**************************************************************************************************
'@ TestStory: CTA-375 Change Of Circumstance Automation
'@ TestCase: 
    '1 NICE-9700 E2E_CoC_LoanLvlDisclosures_FeatureDisabled

'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Navigate to Settings > Loan Setup > Changed Circumstances Setup and confirm the Changed Circumstance Options list is populated. Add Reasons to the Options if not already configured and save any changes.
	'3 Navigate to Settings > Loan Setup > Disclosure Tracking Settings and uncheck the "Require fee level Changed Circumstances prior to disclosure" checkbox and save the change.
	'4 Create a non admin user if not exist
'@ Description:
'@ TestSteps:
	'Refer NICE-9700
'@ ExpectedResult:
	''Refer NICE-9700
'***************************************************************************************************

FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin =====
FRM_Logger_ReportStepEvent "Step-1: Login into Encompass using Admin User","Logged into Encompass using Admin User", Null
BIZ_Login_UserLogin "admin_core2p"

'=================================== Pre-Requisites========= ===============
'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"
BIZ_LoanSetup_ComplianceCalendar_OurCompanyCalendar("E2E_DisclosureTracking")

'======Setup Changed Circumstances======
FRM_Logger_ReportStepEvent "Step-2: Pre-Requisites","Setup Changed Circumstances and Uncheck 'Loan Level Changed Circumstances' Checkbox", Null
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_LE_E2E"
BIZ_ChangedCircumstances_ChangedCircumstanceSetup "CoC_CD_E2E"

'======Setting of Loan Level Changed Circumstances======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Disclosure Tracking Settings"
Set objSettings=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
If GUI_Object_IsExistX(objSettings.SwfCheckBox("swfname:=chkCoCPriorDisclosure"),3) Then	
	FRM_Logger_ReportFailEvent "Verify 'Require fee level Changed Circumstances prior to disclosure' Checkbox", "'Require fee level Changed Circumstances prior to disclosure' Checkbox exists", null 					
Else 
	FRM_Logger_ReportPassEvent "Verify 'Require fee level Changed Circumstances prior to disclosure' Checkbox", "'Require fee level Changed Circumstances prior to disclosure' Checkbox does not exist", null 					 
End If

'======== Create non admin use ========
BIZ_OrganizationUsers_CreateUser "CoC_NonAdmin"

'=======LogOut=======
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non admin =====
FRM_Logger_ReportInfoEvent "Create New Loan","Login into Encompass using Non Admin user and Create a new loan with basic details", Null
BIZ_Login_UserLogin "CoC_NonAdmin"

'============ Create an mew loan with basic details
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","Automation"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_CoC"
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetData "PTAC-18"
BIZ_Loan_Save()

FRM_Logger_ReportStepEvent "Step-3: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, 'Date Fee Changed' Field, 'Changed Circumstance' Checkbox, Reasons and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
CoC_ValidateNewFields 

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
CoC_ChangedCircumstance False,True
CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
CoC_LE_DisclosureReason "LEPage1"

FRM_Logger_ReportStepEvent "Step-4: Initial LE and Verfiy all fields on Disclosure Details Reasons tab","Send LE through manual disclosures and and validate all fields on Disclosure Details Reasons tab", Null
'========= Send Initial LE =======
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", False, False

'======= Click on Initial LE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Initial","Yes","LE")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportInfoEvent "Desclosure Details Reason tab","Verify Reason Check boxes and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'============ Fields in Changed Circumstance  ============= 
CoC_DisclosureDetails_ChangedCircumstanceFields True,True,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details======= 
CoC_LE_DisclosureReason "DisclosureDetails"	

'==============Click on OK button =================
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-5:Increase Fee on 2015 Itemization and Verify Good Faith Fee Variance Violated Alert appears in the Alerts & Messages list","On 2015 Itemization form, Increase one fee that cannot increase and Validate Good Faith Fee Variance Violated Alert appears in the Alerts & Messages list", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.25"
BIZ_Loan_Save()

'====== Validate GFE Alert =======  
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'====== select Changed Circumstance check box ======  
FRM_Logger_ReportStepEvent "Step-6: Loan Estimate Page 1","Verify Reason Check boxes and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_3168_Ctrl")

CoC_ValidateNewFields
CoC_ChangedCircumstance True,True   
CoC_ValidateChangedCircumstanceFields True,True

'======= Reasons =======
CoC_LE_DisclosureReason "LEPage1"

'=======select Changed Circumstance ===== 
FRM_Logger_ReportStepEvent "Step-7: Loan Estimate Page 1","select Changed Circumstances and Make sure appropriate Reason checkboxes, all fields are populated", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_3169")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_LE_Disclosures ",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Check 'Other' checkbox manually and add other reason", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_LE1X84_Ctrl")
GUI_WebEdit_Set objPage.WebEdit("html id:=I_LE1X85"),"Loan Level Disclosures"

'======= Fields in Changed Circumstance=======
CoC_ChangedCircumstanceFields True,False,"CoC_LE_E2E"

'======= Reasons on LE Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),"Revisions requested by the Consumer"

'========= Send Revised LE =======
FRM_Logger_ReportStepEvent "Step-8: Revised LE and Verfiy all fields on Disclosure Details Reasons tab","Send Revised through manual disclosures and Validate all fields on Disclosure Details Reasons tab", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE", False, False

'======= Click on Revised LE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportInfoEvent "Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'============ Fields in Changed Circumstance  ============= 
CoC_DisclosureDetails_ChangedCircumstanceFields True,False,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason3"),"True","Revisions requested by the Consumer"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReason3"),"Revisions requested by the Consumer"

GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"True","Other"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"Other"
FRM_VerifyEqual GUI_Object_GetPropertyValue (objReasonTab.SwfEdit("swfname:=txtReasonOther"),"text"),"Loan Level Disclosures","Reason - Other","Reason - Other"

'==============Click on OK button =================
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'====== Validate GFE Alert and fields on LE Page1=======
FRM_Logger_ReportInfoEvent "Loan Estimate Page 1","Verify GFE Alert,'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"

'======= Fee Level Disclosures =======
CoC_ValidateNewFields

'======= Changed Circumstance and Fields in Changed Circumstance =======
CoC_ChangedCircumstance False,True
CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
CoC_LE_DisclosureReason "lepage1"

boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'============================================= CD Flow =======================  
FRM_Logger_ReportStepEvent "Start Closing Disclosure flow here","Started Closing Disclosure flow here", Null
FRM_Logger_ReportStepEvent "Step-9: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, 'Date Fee Changed' Field, 'Changed Circumstance' Checkbox, Reasons and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
CoC_CD_ValidateNewFields

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
CoC_CD_ChangedCircumstance False,True
CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
CoC_CD_DisclosureReason "CDPage1"

'========= Send Initial CD =======
FRM_Logger_ReportStepEvent "Step-10: Initial CD and Verfiy all fields on Disclosure Details Reasons tab","Send CD through manual disclosures and Validate all fields on Disclosure Details Reasons tab", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "CD", False, False

'======= Click on Initial CD Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Initial","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

FRM_Logger_ReportInfoEvent "Disclosure Details Reason Tab","Verify Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'============ Fields in Changed Circumstance  ============= 
CoC_DisclosureDetails_ChangedCircumstanceFields True,True,"CoC_CD_E2E" 

'======= Reasons on Disclosure Details=======
CoC_CD_DisclosureReason "DisclosureDetails"

'==============Click on OK button =================
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportStepEvent "Step-11:Increase Fee on 2015 Itemization and Verify Good Faith Fee Variance Violated Alert appears in the Alerts & Messages list","On 2015 Itemization form, Increase one fee that cannot increase and Validate Good Faith Fee Variance Violated Alert appears in the Alerts & Messages list", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.50"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-12: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, 'Date Fee Changed' Field, 'Changed Circumstance' Checkbox, Reasons and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X61_Ctrl")
CoC_CD_ValidateNewFields

'======= Changed Circumstance and Fields in Changed Circumstance =======
CoC_CD_ChangedCircumstance True,True
CoC_CD_ValidateChangedCircumstanceFields True,True

'======= Reasons =======
CoC_CD_DisclosureReason "CDPage1"

'====== select Changed Circumstance check box ======  
FRM_Logger_ReportStepEvent "Step-13: Closing Disclosure Page 1","select Changed Circumstances and Make sure appropriate Reason checkboxes, all fields are populated", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_CD1X64")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_CD_Disclosures ",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Check 'Other' checkbox manually and add other reason", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X59_Ctrl")
GUI_WebEdit_Set objPage.WebEdit("html id:=I_CD1X60"),"Loan Level Disclosures"

'======= Fields in Changed Circumstance=======
CoC_CD_ChangedCircumstanceFields True,False,"CoC_CD_E2E"

'======= Reasons on CD Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_CD1X57_Ctrl"),1,"Tolerance Cure"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_CD1X57_Ctrl"),"Tolerance Cure"

'========= Send Revised CD =======
FRM_Logger_ReportStepEvent "Step-14: Revised CD and Verfiy all fields on Disclosure Details Reasons tab","Send Revised through manual disclosures and Validate all fields on Disclosure Details Reasons tab", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD", False, False

'======= Click on Revised Cd Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportInfoEvent "Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'============ Fields in Changed Circumstance  ============= 
CoC_DisclosureDetails_ChangedCircumstanceFields True,False,"CoC_CD_E2E"

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason9"),"True","Tolerance Cure"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReason9"),"Tolerance Cure"

GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"True","Other"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"Other"
FRM_VerifyEqual GUI_Object_GetPropertyValue (objReasonTab.SwfEdit("swfname:=txtReasonOther"),"text"),"Loan Level Disclosures","Reason - Other","Reason - Other"

'==============Click on OK button =================
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Validate GFE Alert and fields on CD Pag1=======
FRM_Logger_ReportInfoEvent "Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, 'Date Fee Changed' Field, 'Changed Circumstance' Checkbox, Reasons and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"

'======= Fee Level Disclosures =======
CoC_CD_ValidateNewFields

'======= Changed Circumstance and Fields in Changed Circumstance =======
CoC_CD_ChangedCircumstance False,True
CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
CoC_CD_DisclosureReason "CDPage1"

boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
