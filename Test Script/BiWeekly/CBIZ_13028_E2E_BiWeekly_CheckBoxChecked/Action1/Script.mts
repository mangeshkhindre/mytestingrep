'@**************************************************************************************************
'@ TestStory:CBIZ-13631
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: 
	'1 Forms_AggregateEscrowAccount, SetData, "CBIZ-13028"
	'2 Forms_BorrowerSummaryOrigination, SetHeadInfo, "CBIZ-13028"
	'4 Forms_BorrowerSummaryOrigination, SetBorrower, "CBIZ-13028"
	'5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, "CBIZ-13028"
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: Validate LE PAge 1 LE1.x29 Validate 3291='Biweekly' When Biweekly checkbox 329 Is checked.
	'1 Yearly Escrow = (Monthly Escrow Amount * 12)
	'2 Total Monthly Payment = Sum of Monthly Escrow amounts 
	'3 Escrowed Payment = Sum of Scheduled Monthly Escrowed amount:
 '@ TestSteps:
	'1 Create a new loan with basic borrower information as mentioned in the test data.
	'2 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'3 In the 'Aggregate Escrow Account' form:
	  '1 Select '1st Payment Date' as 1st of next calendar month.
	  '2 Enter the Monthly Escrow amount as per the test data.
	  '3 Check the Yearly Escrow amount
	'4 Click on 'Setup' button  in 'Aggregate Escrow Account' form.
	'5 In the 'Initial Escrow Account Setup' window: For all the escrow types, enter the 'Due Date 1' as '1st Payment Date' and click on tab.
	'8 Click on 'OK' in 'Initial Escrow Account Setup' window.
	'9 Go to Biweekly Loan Payment Summary Form tab and validate Total Bi-weekly Payment to Escrow
	'10 Go to 2015 Itemization form and Validate data in section 1000.
	'11 Go to LE  Page 2 and Verify Section G for all details
	'12 Verify Fields on CD page 1
	'13 Uncheck the Biweekly Checkbox and navigate to 2015 Itemisation and validate section 900.
	'14 Open LE  Page 2 and Verify Section G
	'15 Open CD  Page 2 and Verify Section G
'@ ExpectedResult:
	'1 A new loan with basic borrower information is created.
	'2 Payment Frequency (3291) Field Biweekly and Estimated Taxes,Insurance & Assessments=346
	'3 Total Bi-weekly Payment to Escrow' field should display the sum of Total Bi-weekly Payment to Escrow fees entered:
	'  Total Bi-weekly Payment to Escrow = (Tax + Hazard Insurance + Mortgage Insurance + Flood Insurance + City Property Tax)
	'4 'bwks' label should be present,Biweekly Fees((monthly Fees*12)/26)=46.15,(Periods*Biweekly Fees)=1153.75
	'5 Escrowed Payment' field should be empty.
	'6 'Initial Escrow Account Setup' window is opened.
	
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: CBIZ-13028", "Script Name - CBIZ_13028_E2E_BiWeekly_CheckBoxChecked", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:CBIZ-13028", " Validate LE PAge 1 LE1.x29 Validate 3291='Biweekly'", Null
BIZ_Nav_SelectPipelineTab()

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Open Borrower Summary - Origination Form ======
'====== Set Data in Borrower Summary - Origination Form ======

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "CBIZ-13028"
BIZ_BorrowerSummaryOrigination_SetProperty "CBIZ-13028"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CBIZ-13028"

'====== Navigate to FNMA Streamlined 1003 to set Biweekly ON  ======

BIZ_Forms_Open "FNMA Streamlined 1003"
Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
GUI_WebCheckbox_Set objFNMA.WebCheckBox("html id:=__cid_CheckBox9_Ctrl"),"ON"

'====== Open 1003 Page 2 ======

BIZ_Forms_Open "1003 Page 2"
wait g_LongWaitSmall
GUI_WebEdit_Set objFNMA.WebEdit("html id:=l_233"),"50"

'====== Open Aggregate Escrow Account Form ======
'====== Set Data in Aggregate Escrow Account Form ======

BIZ_Forms_Open "Aggregate Escrow Account"
BIZ_AggregateEscrowAccount_SetData "CBIZ-13028"

'====== Set Data in Mortgage Insurance MIP ======

GUI_WebButton_Click objFNMA.WebButton("html id:=StandardButton8")
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("Swfname:=rateFundingTxt"),"1"
wait 2
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("Swfname:=rateMI1Txt"),"1"
wait 2
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("Swfname:=monthMI1Txt"),"360"
GUI_SwfButton_Click  SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfButton("Swfname:=okBtn")

'======= Setup initial Escrow Data ===========================
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "CBIZ-13028"
'SetCushion "CBIZ-13028"
'BIZ_Loan_Save()
'======= Verify LE1 page LE1.X29 and 3291 Fields  ===========================
BIZ_Forms_Open "Loan Estimate Page 1"
VerifyBiweekly_Loan_Payment_summary_Details("CBIZ_E2E_Biweekly")
'Added After Client comments
VerifyEstimated_Taxes_Insurances_and_Assessments("LE")

'==================================================================================================================================================================================================
'====== Verify 2015 Itemisation Fields ======

Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Forms_Open "2015 Itemization"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").swfButton("swfname:=btnCollapse")
GUI_WebButton_Click objFNMA.WebButton("html id:=btnSwitch1000")

Verify2015Itemisation("CBIZ_E2E_Biweekly")


'======= Verify LE2 page 2 G Section  ===========================
BIZ_Forms_Open "Loan Estimate Page 2"
VerifyLE2_G_SectionDetails("CBIZ_E2E_Biweekly_LE2")

'======= Verify CD2 page 2 G Section  ===========================

BIZ_Forms_Open "Closing Disclosure Page 2"
VerifyCD2_G_SectionDetails("CBIZ_E2E_Biweekly")


'======= Verify CD1 page 1 Details  ===========================
BIZ_Forms_Open "Closing Disclosure Page 1"
VerifyCD1Details("CBIZ_E2E_Biweekly")
VerifyEstimated_Taxes_Insurances_and_Assessments("CD")

'======= Navigate to RegZ-CD Page  ===========================
Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Forms_Open "RegZ - CD"

'======== Uncheck the Biweekly Checkbox ========================================

If GUI_WebCheckbox_IsChecked (objFNMA.WebCheckBox("html id:=__cid_CheckBox24_Ctrl")) Then
	GUI_WebCheckbox_Click objFNMA.WebCheckBox("html id:=__cid_CheckBox24_Ctrl")
	FRM_Logger_ReportPassEvent "Unchecked the Biweekly Checkbox","Successfully Unchecked the Biweekly Checkbox",null
Else
	FRM_Logger_ReportFailEvent "Uncheck Biweekly F423 Checkbox","Uncheck Biweekly F423 Checkbox",null
End if

'====== Verify 2015 Itemisation Fields ======

Set objFNMA = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Forms_Open "2015 Itemization"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").swfButton("swfname:=btnCollapse")
GUI_WebButton_Click objFNMA.WebButton("html id:=btnSwitch1000")
Verify2015ItemisationAfterBiweeklyUncheck("CBIZ_E2E_Biweekly_2015Unchecked")

'======= Verify LE2 page 2 G Section  ===========================

BIZ_Forms_Open "Loan Estimate Page 2"
VerifyLE2_G_SectionDetails_Uncheck("CBIZ_E2E_Biweekly_2015Unchecked")


'======= Verify CD2 page 2 G Section  ===========================

BIZ_Forms_Open "Closing Disclosure Page 2"
VerifyCD2_G_SectionDetailsUncheck("CBIZ_E2E_Biweekly_2015Unchecked")

'============== Loan Save =========================================

BIZ_Loan_Save ()

Set objFNMA = Nothing 

 
'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null) 



