﻿
'@******************************************************************************************
'@ TestStory:CBIZ-12965: KBYO2: TC02: KBYO2 End to End flow for Construction Management page
'@ TestCase:CBIZ-14739 KBYO2 - TC #1 (CBIZ-12965) : Calculate 3rd Party Payments not Otherwise Disclosed (KBYO2) LE2.X29 - Initial Acquisition Scenario1
'			CBIZ-14740 KBYO2 - TC #2 (CBIZ-12965) : Calculate 3rd Party Payments not Otherwise Disclosed (KBYO2) CD3.X80
'@ Test Automation JIRA Task: CTA-368
'CBIZ-12556: 
'@ TestData: "Global_Data", "Login", "admin_core2p"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "AmortizationSchedule"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "AmortizationSchedule"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "Amortization_Conv_ARMPurchase"
'@ TestData: "Forms_RegZ-LE", "SetARM", "Amortization_Conv_ARMPurchase"	
'@ TestData: "Settings_Loansetup", "FormBuilderFields", "ValidateFields"
'@ TestData: "Settings_Loansetup", "CustomFields",  "CBIZ-12556_KBYO.XD4113" 
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.NEWHUDXD555"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD799"    
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.LE3XD16"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD689"   
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD3"     
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD1699"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD2625"
'@ TestData: "Settings_Loansetup", "CustomFields","CBIZ-12556_KBYO.XD697"
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD695"
'For CBIZ-12551:
'@ TestData: "Global_Data", "Login", "admin_core2p"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "CBIZ_12551"
'@ TestData: "Forms_RegZ-LE", "SetConstruction", "CBIZ_12551"
'@ TestData: "Forms_2015Itemization", "Set900Section", "CBIZ_12551"
'@ TestData: "Forms_2015Itemization", "Set1000Section", "CBIZ_12551_903SetRate"
'@ TestData: "Forms_2015Itemization", "Set1000Section", "CBIZ_12551"	
'@ TestData: "Forms_AggregateEscrowAccount", "SetData", "CBIZ_12551"
'@ Pre-conditions: CBIZ-12556: An ARM loan should be created by entering values in Reg-Z LE form.
'CBIZ-12551:Login credentials for Encompass with Admin user is available.
'@ Description: CBIZ-12556: Update Rounding Rules for Display and Document Request only
'1. Round to 3 decimal places (4.2558 would render as 4.256%)
'2. Drop trailing zeroes (4.250 would render as 4.25%, 4.2501 would also render as 4.25%, 4.100 would render as 4.1%)
'3. Truncate at decimal if whole number (4.000 would be 4%)
'Update UI to render Document Request Fields on LE and CD
'1. Core fields should not be impacted outside of LE and CD
'2. UI should show Display fields on LE Pages
'3. UI should show Display fields on CD Pages
'CBIZ-12551: Impacts fields: LE1.X30, LE1.X31, LE1.X32, CD1.X4, CD1.X5, CD1.X6
'For each, update rules for partially escrowed to display "Some" instead of "Yes, Some."
'No change to current rules for determining if escrow line is partially escrowed, this update is just for verbiage rendered in the fields.
'CBIZ-12556:
'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Go to LE page of the ARM loan and verify the 12 new Display field IDs mentioned in CBIZ-12556. (2 virtual fields are out of scope) 
	'3 Go to CD page of the ARM loan and verify the 12 new Display field IDs mentioned in CBIZ-12556. (2 virtual fields are out of scope)
	'4 Create a new custom form with 10 KBYO fields.
	'5 Goto custom form and check whether KBYO fields are rounded.
'@ ExpectedResult: 
	'1. User should be able to log in.
	'2. Fields Updates should match and updated value should be displayed in the fields.
	'3. Fields Updates should match and updated value should be displayed in the fields.
	'4. New custom form with 10 KBYO fields is created.
	'5. KBYO fields should be rounded in custom form.
'CBIZ-12551:
'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Go to Borrower Summary - Origination page and enter the test data as given in Test data column of CTA-282, step 22.
	'3 Go to 2015 Itemization form. Enter the test data as given in Test Data column of CTA-282, step 23.
	'4 Go to Line 1011. Click Aggregate Set up. Enter data as per Test data column of CTA-282, step 24.
	'5 Go to Loan Estimate page 1, Verify LE1.X30, LE1.X31, LE1.X32
	'6 Go to Closing Disclosure page 1, verify CD1.X4, CD1.X5, CD1.X6
'@ ExpectedResult: 
	'1. User should be able to log in.
	'2. Loan should be created and saved
	'3. Data should be entered successfully.
	'4. Data should be entered successfully.
	'5. It should display "Some".
	'6. It should display "Some".
'********************************************************************************************




FRM_Logger_ReportInfoEvent "Start Test Case: CBIZ-12965", "Script Name - E2E_KBYO2_3rdParty_Payments_Calculations_for_LE&CD ", Null



'Commented for Testing
'====== Automation Folder Check ================
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'=============================== Select Automation Loan Checkbox for User Group Setting =======================
FRM_Logger_ReportStepEvent "Automation Loan Folder setup","Automation Loan Folder setup ",null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If
'Set objSettingWindow   = Nothing
BIZ_Nav_Settings_Close
'Commented for Testing
'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "TC #1 (CBIZ-12965) : Calculate 3rd Party Payments not Otherwise Disclosed (KBYO2) LE2.X29 ","Verify the field value for LE2.X29 ",null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Navigate to Construction Management Form ======
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objPayoffPayment=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PayoffsAndPaymentsDialog")

BIZ_ConstructionManagement_SetLoanInfo "E2E_KBYO2_CBIZ_12965"

'=========================== Set the origination Fee as 1% on 2015 Itemisation ==============================================================


BIZ_Forms_Open "2015 Itemization"
wait 2
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0").WebEdit("html id:=TextBox12"), "1"

'====== Navigate to CD page 1 Form ======
BIZ_Forms_Open "Closing Disclosure Page 1"
validateCD1_Feilds "E2E_KBYO2_CBIZ_12965"

'====== Navigate to 1003 Page 2 Form ======
FRM_Logger_ReportStepEvent "Setting the Liabilities","Setting the Liabilities",Null
BIZ_Forms_Open "1003 Page 2"
BIZ_1003Page2_SetLiabilities "E2E_KBYO2_CBIZ_12965"

'====== Navigate to LE Page 2 Form ======
BIZ_Forms_Open "Loan Estimate Page 2"

'====== Verification of Payoffs Popup ======
validatePaymentPayoffs()

'====== Navigate to CD Page 3 Form ======
validateCD3_Feilds "E2E_KBYO2_CBIZ_12965"

'====== Navigate to LE Page 2 Form ======
validateLE2_Feilds "E2E_KBYO2_CBIZ_12965"

'====== Navigate to CD Page 3 Form ======
BIZ_Forms_Open "Closing Disclosure Page 3"

FRM_Logger_ReportStepEvent " 7 Verification of CD3 Total Payoffs and Payments CD3.X80","Verification of CD3 Total Payoffs and Payments CD3.X80",Null
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox206"),"value"),"200,000.00","Validate Field Value","Validate CD1 Total closing cost value"

'====== Refactor the TestData ======
FRM_Logger_ReportStepEvent " 8 Refactor the TestData","Refactor the TestData",Null
BIZ_ConstructionManagement_SetLoanInfo "E2E_KBYO2_CBIZ_12965_1"
'Set LotStatus as Refinance
GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox12_Ctrl"), "ON"

'====== Navigate to 1003 Page 2 Form ======
FRM_Logger_ReportStepEvent "Setting the Liabilities","Setting the Liabilities",Null
BIZ_Forms_Open "1003 Page 2"
BIZ_1003Page2_SetLiabilities "E2E_KBYO2_CBIZ_12965_1"

'====== Add NON-VOL Adjustment ======
intPayoffval=addLiabilitiestoNonVOL() 

FRM_Logger_ReportStepEvent "10 Validate Fields CD3.X80,LE2.X31","Validate Fields CD3.X80,LE2.X31",Null
validateCD3_LE2 "E2E_KBYO2_CBIZ_12965",intPayoffval
'====== Save The Loan ======
BIZ_Loan_Save()

