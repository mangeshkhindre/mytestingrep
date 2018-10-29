'@**************************************************************************************************
'@ TestStory: CTA-375 Change Of Circumstance Automation
'@ TestCase: 
    '1 NICE-9388 Changed Circumstance Loan Level Disclosures

'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Navigate to Settings > Loan Setup > Changed Circumstances Setup and confirm the Changed Circumstance Options list is populated. Add Reasons to the Options if not already configured and save any changes.
	'3 Navigate to Settings > Loan Setup > Disclosure Tracking Settings and uncheck the "Require fee level Changed Circumstances prior to disclosure" checkbox and save the change.
	'4 Create a non admin user if not exist
'@ Description:
'@ TestSteps:
	'Refer NICE-9388
'@ ExpectedResult:
	''Refer NICE-9388
'***************************************************************************************************

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
BIZ_Loan_Save()

FRM_Logger_ReportStepEvent "Step-3: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,True

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstance False,True
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_LE_DTReasons "LEPage1"

FRM_Logger_ReportStepEvent "Step-4: Initial LE","Send LE through manual disclosures", Null
'========= Send Initial LE =======
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
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"False","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance ======= 
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"False","Changed Circumstance"  
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields True,True,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details======= 
BIZ_CoC_LE_DTReasons "DisclosureDetails"	

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then
	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table is exist", null
Else
 	FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-6: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Reasons =======
BIZ_CoC_LE_DTReasons "LEPage1"

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_ChangedCircumstance False,True
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'====== select Changed Circumstance check box ======  
FRM_Logger_ReportStepEvent "Step-7: Loan Estimate Page 1","check 'Changed Circumstance' checkbox,choose Changed Circumstances and Make sure appropriate Reason checkboxes, all fields are populated", Null
BIZ_Forms_Open "Loan Estimate Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_3168_Ctrl")
'GUI_WebEdit_Set objPage.WebEdit("html id:=I_LE1X98"),Date

'=======select Changed Circumstance ===== 
FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_3169")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_LE_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Check 'Other' checkbox manually and add other reason", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_LE1X84_Ctrl")
GUI_WebEdit_Set objPage.WebEdit("html id:=I_LE1X85"),"Loan Level Disclosures"

'======= Fields in Changed Circumstance=======
BIZ_CoC_ChangedCircumstanceFields True,False,"CoC_LE_E2E"

'======= Reasons on LE Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_LE1X80_Ctrl"),"Revisions requested by the Consumer"

'========= Send Revised LE =======
FRM_Logger_ReportStepEvent "Step-8: Revised LE","Send Revised through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE", False, False

'======= Click on Revised LE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-9: Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures =======
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"False","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"True","Changed Circumstance"  
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields True,False,"CoC_LE_E2E" 

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason3"),"True","Revisions requested by the Consumer"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReason3"),"Revisions requested by the Consumer"

GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"True","Other"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"Other"
FRM_VerifyEqual GUI_Object_GetPropertyValue (objReasonTab.SwfEdit("swfname:=txtReasonOther"),"text"),"Loan Level Disclosures","Reason - Other","Reason - Other"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then
	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table is exist", null
Else
 	FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-10: Loan Estimate Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Loan Estimate Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_ChangedCircumstance False,True
BIZ_CoC_ChangedCircumstanceFields False,True,"CoC_LE_E2E"

'======= Reasons =======
BIZ_CoC_LE_DTReasons "lepage1"

'============================================= CD Flow =======================  
FRM_Logger_ReportStepEvent "Start Closing Disclosure flow here","Started Closing Disclosure flow here", Null
FRM_Logger_ReportStepEvent "Step-11: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
'======= Fee Level Disclosures =======
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Changed Circumstance Check Box  and Fields in Changed Circumstance=======
BIZ_CoC_CD_ChangedCircumstance False,True
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_CD_DTReasons "CDPage1"

'========= Send Initial CD =======
FRM_Logger_ReportStepEvent "Step-12: Initial CD","Send CD through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "CD", False, False

'======= Click on Initial CD Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Initial","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

FRM_Logger_ReportStepEvent "Step-13: Disclosure Details Reason Tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures ======= 
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"False","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"False","Changed Circumstance"  
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields True,True,"CoC_CD_E2E" 

'======= Reasons on Disclosure Details=======
BIZ_CoC_CD_DTReasons "DisclosureDetails"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then
	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table is exist", null
Else
 	FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-14: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_CD_ChangedCircumstance False,True
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_CD_DTReasons "CDPage1"

'====== select Changed Circumstance check box ======  
FRM_Logger_ReportStepEvent "Step-15: Closing Disclosure Page 1","check 'Changed Circumstance' checkbox,choose Changed Circumstances and Make sure appropriate Reason checkboxes, all fields are populated", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X61_Ctrl")
'GUI_WebEdit_Set objPage.WebEdit("html id:=I_CD1X75"),Date

'=======select Changed Circumstance ===== 
FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")
GUI_WebButton_Click objPage.WebButton("html id:=stdbtn_CD1X64")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_CD_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Check 'Other' checkbox manually and add other reason", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_chk_CD1X59_Ctrl")
GUI_WebEdit_Set objPage.WebEdit("html id:=I_CD1X60"),"Loan Level Disclosures"

'======= Fields in Changed Circumstance=======
BIZ_CoC_CD_ChangedCircumstanceFields True,False,"CoC_CD_E2E"

'======= Reasons on CD Page1=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_Object_ValidateChecked objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),1,"Revisions requested by the Consumer"
GUI_Object_ValidateDisabled objPage.WebCheckBox("html id:=__cid_chk_CD1X66_Ctrl"),"Revisions requested by the Consumer"

'========= Send Revised CD =======
FRM_Logger_ReportStepEvent "Step-16: Revised CD","Send Revised through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD", False, False

'======= Click on Revised Cd Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
intInitialCDRow	=	BIZ_GetRowOfDisclosureType ("Revised","Yes","CD")
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intInitialCDRow, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-17: Disclosure Details Reason tab","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_SwfTab_Click objReasonTab.SwfTab("swfname:=tcDisclosure"), "Reasons"

'======= Fee Level Disclosures ======= 
FRM_Logger_ReportInfoEvent "'Fee Level Disclosures' Checkbox","Verify 'Fee Level Disclosures' Checkbox", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"False","Fee Level Disclosures"
GUI_Object_ValidateDisabled objReasonTab.SwfCheckBox("swfname:=feeLevelIndicatorChkBx"),"Fee Level Disclosures"

'======= Changed Circumstance =======
FRM_Logger_ReportInfoEvent "'Changed Circumstance' Checkbox","Verify 'Changed Circumstance' Checkbox", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015")
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"True","Changed Circumstance"  
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=changedCircumstancesChkBx"),"Changed Circumstance"

'============ Fields in Changed Circumstance  ============= 
BIZ_CoC_DT_ChangedCircumstanceFields True,False,"CoC_CD_E2E"

'======= Reasons on Disclosure Details=======
FRM_Logger_ReportInfoEvent "'Reason' Checkbox","Appropriate Reason checkboxes are checked", Null
GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReason6"),"True","Revisions requested by the Consumer"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReason6"),"Revisions requested by the Consumer"

GUI_Object_ValidateChecked objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"True","Other"
GUI_Object_ValidateEnabled objReasonTab.SwfCheckBox("swfname:=chkReasonOther"),"Other"
FRM_VerifyEqual GUI_Object_GetPropertyValue (objReasonTab.SwfEdit("swfname:=txtReasonOther"),"text"),"Loan Level Disclosures","Reason - Other","Reason - Other"

'===============Fee Changes Table=================
FRM_Logger_ReportInfoEvent "'Fee Changes' table","Verify 'Fee Changes' table", Null
If GUI_Object_IsExistX(objReasonTab.swfObject("swfname:=feeDetailsGV"),2) Then
	FRM_Logger_ReportFailEvent "Verify Fee Changes Table","Fee Changes Table is exist", null
Else
 	FRM_Logger_ReportPassEvent "Verify Fee Changes Table", "Fee Changes Table does not exist", null
End If

'==============Click on OK button =================
'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK").Object.PerformClick
GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"

'======= Fee Level Disclosures =======
FRM_Logger_ReportStepEvent "Step-18: Closing Disclosure Page 1","Verify 'Fee Level Disclosures' Checkbox, Reasons, 'Changed Circumstance' Checkbox and Fields in Changed Circumstance", Null
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_CoC_FeeLevelDisclosures False,False

'======= Changed Circumstance and Fields in Changed Circumstance =======
BIZ_CoC_CD_ChangedCircumstance False,True
BIZ_CoC_CD_ChangedCircumstanceFields False,True,"CoC_CD_E2E"

'======= Reasons =======
BIZ_CoC_CD_DTReasons "CDPage1"

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
