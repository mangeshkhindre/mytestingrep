'@**************************************************************************************************
'@ TestStory: CTA-375 Change Of Circumstance Automation
'@ TestCase: 
    '1 NICE-10215 - Changed Circumstance Fee Level Disclosures Checkbox when DT log entries are excluded for Automation

'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Navigate to Settings > Loan Setup > Changed Circumstances Setup and confirm the Changed Circumstance Options list is populated. Add Reasons to the Options if not already configured and save any changes.
	'3 Navigate to Settings > Loan Setup > Disclosure Tracking Settings and uncheck the "Require fee level Changed Circumstances prior to disclosure" checkbox and save the change.
	'4 Create a non admin user if not exist
'@ Description:
'@ TestSteps:
	'Refer NICE-10215 
'@ ExpectedResult:
	''Refer NICE-10215 
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

'======== Set the access right to EDocument for loan officer=========
BIZ_Nav_Settings_EDocumentManagement
BIZ_EDocManagement_AccessRight Array("coc_user")

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

BIZ_Forms_Open "Closing Disclosure Page 1"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetDisclosureInformation "E2E_DisclosureTracking"
BIZ_RegZ_LE_SetLateChargeInformation "E2E_DisclosureTracking"

BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set900Section "E2E_DisclosureTracking"
BIZ_Loan_Save()


FRM_Logger_ReportStepEvent "Step-2: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Check 'Fee Level Disclosures' checkbox", Null

'======= Validate Fee Level Disclosures checkbox =======
BIZ_CoC_FeeLevelDisclosures False,True

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstance False,True
BIZ_CoC_ChangedCircumstanceFields False,True,""

'======= Reasons =======
BIZ_CoC_LE_DTReasons "LEPage1"

'========= Send Initial LE =======
FRM_Logger_ReportStepEvent "Step-3: Send Initial LE","Send LE through eDisclosures and Verify 'Fee Level Disclosures' checkbox on LE Page1", Null
BIZ_DisclosureTracking_SendeDisclosure "CoC_eDisclosure","CoC_LE_eDisclosure"
BIZ_DisclosureTracking_SetAuthenticationCode "CoC_eDisclosure"

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'========= Exclude Initial LE =======
FRM_Logger_ReportStepEvent "Step-4: Exclude Initial LE","Exclude Initial LE and Verify 'Fee Level Disclosures' checkbox on LE Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Initial","LE",True

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,True

'========= Include Initial LE =======
FRM_Logger_ReportInfoEvent "Include Initial LE","Include Initial LE", Null
BIZ_DT_LEorCD_IncludeExclude "Initial","LE",False

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportInfoEvent "Increase Fee on 2015 Itemization","On 2015 Itemization form, Increase one fee that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.25"
BIZ_Loan_Save()

'====== Validate GFE Alert =======  
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'=======select Changed Circumstance ===== 
BIZ_Forms_Open "Loan Estimate Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_3168_Ctrl")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_3169")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_LE_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

'======= Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstanceFields True,False,"CoC_LE_E2E"

'======= Reasons on LE Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),"Revisions requested by the Consumer"

'========= Send Revised LE =======
FRM_Logger_ReportStepEvent "Step-5: Send Revised LE","Send Revised through eDisclosures and Verify 'Fee Level Disclosures' checkbox on LE Page1", Null
BIZ_DisclosureTracking_SendeDisclosure "CoC_eDisclosure","CoC_LE_eDisclosure"
BIZ_DisclosureTracking_SetAuthenticationCode "CoC_eDisclosure"

'======= Fee Level Disclosures =======
FRM_Logger_ReportInfoEvent "Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_ChangedCircumstance False,True
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_LE_DTReasons "lepage1"

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyFalse boolGFEAlert, "GFE Alert", "The GFE alert cleared"

'========= Exclude Revised LE =======
FRM_Logger_ReportStepEvent "Step-6: Exclude Revised LE","Exclude Revised LE and Verify 'Fee Level Disclosures' checkbox on LE Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Revised","LE",True
BIZ_Loan_Save()

'====== Validate GFE Alert =======  
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'========= Include Revised LE =======
FRM_Logger_ReportStepEvent "Step-7: Include Revised LE","Exclude Revised LE and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Revised","LE",False
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'============== Send Initial CD ===========
FRM_Logger_ReportStepEvent "Step-8: Send Initial CD","Send CD through eDisclosures and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DisclosureTracking_SendeDisclosure "CoC_eDisclosure","CoC_CD_eDisclosure"
BIZ_DisclosureTracking_SetAuthenticationCode "CoC_eDisclosure"

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======Exclude Initial CD======
FRM_Logger_ReportStepEvent "Step-9: Exclude Initial CD","Exclude Initial CD and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Initial","CD",True

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======Include Initial CD======
FRM_Logger_ReportInfoEvent "Include Initial CD","Include Initial CD and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Initial","CD",False

'====== Increase Loan Origination Fee ====== 
FRM_Logger_ReportInfoEvent "Increase Fee on 2015 Itemization","On 2015 Itemization form, Increase one fee that cannot increase", Null
BIZ_2015Itemization_SetE2EBasicData "PTAC-18_OrigFee_1.50"
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'=======select Changed Circumstance ===== 
BIZ_Forms_Open "Closing Disclosure Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X61_Ctrl")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_CD1X64")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_CD_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

'======= Fields in Changed Circumstance=======
BIZ_CoC_CD_ChangedCircumstanceFields True,False,"CoC_CD_E2E"

'======= Reasons on CD Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),"Revisions requested by the Consumer"

'========= Send Revised CD =======
FRM_Logger_ReportStepEvent "Step-10: Send Revised CD","Send Revised through manual disclosures and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DisclosureTracking_SendeDisclosure "CoC_eDisclosure","CoC_CD_eDisclosure"
BIZ_DisclosureTracking_SetAuthenticationCode "CoC_eDisclosure"

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
GUI_Object_ValidateEnabled objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),"Revisions requested by the Consumer"

'========= Exclude Revised CD =======
FRM_Logger_ReportStepEvent "Step-11: Exclude Revised CD","Exclude Revised LE and Verify 'Fee Level Disclosures' checkbox on CD Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Revised","CD",True
BIZ_Loan_Save()

'====== Validate GFE Alert =======
boolGFEAlert	=	BIZ_AlertsAndLog_ClickOnRecord ("Alerts & Messages", "Good Faith Fee Variance Violated")
FRM_VerifyTrue boolGFEAlert, "GFE Alert", "The GFE Alert Fired"

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'========= Exclude all disclosures =======
FRM_Logger_ReportStepEvent "Step-12: Exclude All Disclosures","Exclude All Disclosures and Verify 'Fee Level Disclosures' checkbox on LE Page1 and CD Page1", Null
BIZ_DT_LEorCD_IncludeExclude "Initial","LE",True
BIZ_DT_LEorCD_IncludeExclude "Initial","LE",True
BIZ_DT_LEorCD_IncludeExclude "Initial","CD",True

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,True

'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,True

FRM_Logger_ReportStepEvent "Step-13: Check 'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Check 'Fee Level Disclosures' checkbox", Null
Set objLEPage1 = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Set objLEPage1.WebCheckBox("html id:=__cid_chk_4461_Ctrl"),"ON"  
GUI_Dialog_Encompass_YesX 5,"Any changes to Disclosure Information you have made will be cleared. Would you like to continue?"

'======= Validate Fee Level Disclosures checkbox =======
BIZ_CoC_FeeLevelDisclosures True,True

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstance False,False
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_FeeLvlLE_DTReasons "LEPage1"

'========= Send Initial LE =======
FRM_Logger_ReportStepEvent "Step-14: Send Initial LE","Send LE through eDisclosures and Verify 'Fee Level Disclosures' checkbox on LE Page1", Null
BIZ_DisclosureTracking_SendeDisclosure "CoC_eDisclosure","CoC_LE_eDisclosure"
BIZ_DisclosureTracking_SetAuthenticationCode "CoC_eDisclosure"

BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures True,False

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
