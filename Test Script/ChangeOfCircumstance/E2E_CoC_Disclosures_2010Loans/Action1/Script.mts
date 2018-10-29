'@**************************************************************************************************
'@ TestStory: CTA-375 Change Of Circumstance Automation
'@ TestCase: 
    '1 NICE-9698 E2E_CoC_Disclosures_2010Loans

'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetTransactionDetails, strRowID
	
'@ Pre-conditions:
	'1 Login as Admin user  
	'2 Navigate to Settings > Loan Setup > Changed Circumstances Setup and confirm the Changed Circumstance Options list is populated. Add Reasons to the Options if not already configured and save any changes.
	'3 Navigate to Settings > Loan Setup > Disclosure Tracking Settings and uncheck the "Require fee level Changed Circumstances prior to disclosure" checkbox and save the change.
	'4 Create a non admin user if not exist
'@ Description:
'@ TestSteps:
	'Refer NICE-9698
'@ ExpectedResult:
	''Refer NICE-9698
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
FRM_Logger_ReportStepEvent "Step-3: Create New Loan","From the Forms dropdown set RESPA-TILA Form Version = RESPA 2010 GFE and HUD-1 and Complete basic loan info on Borrower Summary - Origination form", Null
BIZ_Login_UserLogin "CoC_NonAdmin"

'============ Create an mew loan with basic details
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","Automation"

FRM_Logger_ReportInfoEvent "select Form Version = RESPA 2010 GFE and HUD-1","From the Forms dropdown set RESPA-TILA Form Version = RESPA 2010 GFE and HUD-1", Null
Set objMianMenu = SwfWindow("swfname:=MainForm").SwfToolbar("swfname:=mainMenu")
GUI_SwfToolbar_ShowDropdown objMianMenu,"Forms"		
GUI_SwfToolbar_Select objMianMenu, "Forms;RESPA-TILA Form Version;RESPA 2010 GFE and HUD-1"

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CoC"
BIZ_Loan_Save()

'========= Send Initial GFE =======
FRM_Logger_ReportStepEvent "Step-4: Send Initial 2010 GFE and REGZ-TIL through manual disclosures","Send Initial 2010 GFE and REGZ-TIL through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
DisclosureTrackingTool_2010Loans_AddDisclosure True, "GFE-REGZ"

'======= Click on Initial GFE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), 0, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-5: Desclosure Details Window","Verify Reason tab on Desclosure Details Window", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfTab("swfname:=tcDisclosure")
If objReasonTab.GetItemsCount=1 and objReasonTab.GetContent="Details" Then
	FRM_Logger_ReportPassEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab does not exist on Desclosure Details window", Null	
Else
	FRM_Logger_ReportFailEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab exists on Desclosure Details window", Null	
End If

'====click on close button=====  
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfButton("swfname:=btnClose")

'===============Go to 2010 GFE and Define Changed Circumstances
FRM_Logger_ReportStepEvent "Step-6: 2010 GFE Form","Go to 2010 GFE Form and define Changed Circumstances", Null
BIZ_Forms_Open "2010 GFE"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_CheckBox38_Ctrl")
GUI_WebButton_Click objPage.WebButton("html id:=StandardButton4")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_LE_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

'========= Send Revised GFE =======
FRM_Logger_ReportStepEvent "Step-7: Send Revised 2010 GFE and REGZ-TIL through manual disclosures","Send Revised 2010 GFE and REGZ-TIL through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
DisclosureTrackingTool_2010Loans_AddDisclosure True, "GFE-REGZ"

'======= Click on Revise GFE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), 0, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-8: Desclosure Details Window","Verify Reason tab on Desclosure Details Window", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfTab("swfname:=tcDisclosure")
If objReasonTab.GetItemsCount=1 and objReasonTab.GetContent="Details" Then
	FRM_Logger_ReportPassEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab does not exist on Desclosure Details window", Null	
Else
	FRM_Logger_ReportFailEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab exists on Desclosure Details window", Null	
End If


'====click on close button=====  
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfButton("swfname:=btnClose")

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()

'====== Login to the Encompass as admin =====
FRM_Logger_ReportStepEvent "Step-9: Login into Encompass using Admin User","Logged into Encompass using Admin User", Null
BIZ_Login_UserLogin "admin_core2p"

'======Setting of Loan Level Changed Circumstances======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Disclosure Tracking Settings"
BIZ_Settings_ChangedCircumstance True

'=======LogOut=======
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non admin =====
FRM_Logger_ReportStepEvent "Step-10: Create New Loan","From the Forms dropdown set RESPA-TILA Form Version = RESPA 2010 GFE and HUD-1 and Complete basic loan info on Borrower Summary - Origination form", Null
BIZ_Login_UserLogin "CoC_NonAdmin"

'============ Create an mew loan with basic details
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","Automation"

FRM_Logger_ReportInfoEvent "select Form Version = RESPA 2010 GFE and HUD-1","From the Forms dropdown set RESPA-TILA Form Version = RESPA 2010 GFE and HUD-1", Null
Set objMianMenu = SwfWindow("swfname:=MainForm").SwfToolbar("swfname:=mainMenu")
GUI_SwfToolbar_ShowDropdown objMianMenu,"Forms"		
GUI_SwfToolbar_Select objMianMenu, "Forms;RESPA-TILA Form Version;RESPA 2010 GFE and HUD-1"

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CoC"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CoC"
BIZ_Loan_Save()

'========= Send Initial GFE =======
FRM_Logger_ReportStepEvent "Step-11: Send Initial 2010 GFE and REGZ-TIL through manual disclosures","Send Initial 2010 GFE and REGZ-TIL through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
DisclosureTrackingTool_2010Loans_AddDisclosure True, "GFE-REGZ"

'======= Click on Initial GFE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), 0, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-12: Desclosure Details Window","Verify Reason tab on Desclosure Details Window", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfTab("swfname:=tcDisclosure")
If objReasonTab.GetItemsCount=1 and objReasonTab.GetContent="Details" Then
	FRM_Logger_ReportPassEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab does not exist on Desclosure Details window", Null	
Else
	FRM_Logger_ReportFailEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab exists on Desclosure Details window", Null	
End If

'====click on close button=====  
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfButton("swfname:=btnClose")

'===============Go to 2010 GFE and Define Changed Circumstances
FRM_Logger_ReportStepEvent "Step-13: 2010 GFE Form","Go to 2010 GFE Form and define Changed Circumstances", Null
BIZ_Forms_Open "2010 GFE"
Set objPage = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objCCList= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfObject("swfname:=listViewOptions")

FRM_Logger_ReportInfoEvent "Changed Circumstances","Changed Circumstances spyglass clicked and CoC options selected", Null
GUI_WebCheckbox_Click objPage.WebCheckBox("html id:=__cid_CheckBox38_Ctrl")
GUI_WebButton_Click objPage.WebButton("html id:=StandardButton4")
GUI_List_ClickRow objCCList,objCCList.SwfScrollBar("swfname:=vPanelScrollBar"),"Changed Circumstance","CoC_LE_Disclosures",True,False,False,"Signle"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ChangeCircumstanceSelector").SwfButton("swfname:=btnOK")

'========= Send Revised GFE =======
FRM_Logger_ReportStepEvent "Step-14: Send Revised 2010 GFE and REGZ-TIL through manual disclosures","Send Revised 2010 GFE and REGZ-TIL through manual disclosures", Null
BIZ_Tools_Open "Disclosure Tracking"
DisclosureTrackingTool_2010Loans_AddDisclosure True, "GFE-REGZ"

'======= Click on Revise GFE Record =====
Set objMainForm    =    SwfWindow("swfname:=MainForm") 
GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), 0, True, False, False, "Double"
GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"

'=========Navigate to Reasons Tab========
FRM_Logger_ReportStepEvent "Step-15: Desclosure Details Popup","Verify Reason tab on Desclosure Details window", Null
Set objReasonTab=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfTab("swfname:=tcDisclosure")
If objReasonTab.GetItemsCount=1 and objReasonTab.GetContent="Details" Then
	FRM_Logger_ReportPassEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab does not exist on Desclosure Details window", Null	
Else
	FRM_Logger_ReportFailEvent "Verify 'Reasons' Tab on Desclosure Details window", "'Reasons' Tab exists on Desclosure Details window", Null	
End If

'====click on close button=====  
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog").SwfButton("swfname:=btnClose")

'=======LogOut=======
BIZ_Loan_Exit True
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
