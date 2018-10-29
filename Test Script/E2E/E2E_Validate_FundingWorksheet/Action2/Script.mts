'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '1 PTAC-2278 Workflow between 2015 Itemization and Funding Worksheet - 800 Section
   '2 PTAC-2279 Workflow between 2015 Itemization and Funding Balancing Worksheet - 800 Section   
'@ Test Automation JIRA Task: PTAC-2887 E2E_Workflow2015Itemization_FundingWorksheet_800Section_Validate
'@ TestData: 
   '01 "Forms_BorrowerSummaryOrigination","SetBorrower","2770_WorkFlow_2015Item_FundingSheet"
   '02 "Forms_BorrowerSummaryOrigination","SetProperty","2770_WorkFlow_2015Item_FundingSheet"
   '03 "Forms_BorrowerSummaryOrigination,SetTransactionDetails,2770_WorkFlow_2015Item_FundingSheet
   '04 "Forms_1003Page1","SetMailingAddress","2770_WorkFlow_2015Item_FundingSheet"
   '05 "Forms_2015Itemization","SetFeeDetails","2770_WorkFlow_2015Item_FundingSheet"
   '06 "Forms_2015Itemization","SetFeeDetails","2770_WorkFlow_2015Item_FundingSheet_802e"
   '07 "Forms_2015Itemization","SetFeeDetails","2770_WorkFlow_2015Item_FundingSheet_802f"
   '08 "Forms_2015Itemization","SetFeeDetails","2770_WorkFlow_2015Item_FundingSheet_802g"
   '09 "Tools_FundingWorKSheet","VerifyFeeDetails","2770_WorkFlow_2015Item_FundingSheet"
   '10 "Tools_FundingBalancingWorKSheet","ValidateDebits","2770_WorkFlow_2015Item_FundingSheet"
   '11 "Tools_FundingBalancingWorKSheet","ValidateCredits","2770_WorkFlow_2015Item_FundingSheet"
   '12 "Forms_ClosingDisclosurePage","SetClosingInformation,"2770_WorkFlow_2015Item_FundingSheet"
   '13 "Forms_BorrowerSummaryOrigination","SetBorrower","2770_WorkFlow_2015Item_FundingSheet_1"
   '14 "Forms_BorrowerSummaryOrigination,"SetProperty","2770_WorkFlow_2015Item_FundingSheet_1"
   '15 "ConstructionManagement","SetLoanInfoDetails","2770_WorkFlow_2015Item_FundingSheet"
   '16 "Forms_RegZ_LE,SetConstruction","2770_WorkFlow_2015Item_FundingSheet"
   '17 "Forms_RegZ_LE,SetLateCharge","2770_WorkFlow_2015Item_FundingSheet"
   '18 "eFolder_Tab,SelectPackageTypeAndPlanCode","2770_WorkFlow_2015Item_FundingSheet"
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Originate  a new loan from Pipeline -> click on the Pipeline tab 
   '2 click on the Add button to create a new loan file ,click on the Add button to create a new loan file
   '3 Go to Pipeline , choose the loan file created, click the edit button and save the loan
   '4 Scroll down to the bottom of the worksheet to verify the fees on the check boxes next to each of the CD Line #
   '5 Click on the check boxes next to each of the CD Line # enter $50 in the Overwire Amount (2005) field 
   '6 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
   '7 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
   '8 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
   '9 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
   '10 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field click on the Funding Balancing Worksheetrefer to the Credits side of the sheet
   '11 Tools > Disclosure Tracking > Disclose LE 
   '12 Click in Add icon disclose LE use the Current Date click Ok
   '13  Tools > Disclosure Tracking > Disclose CD > Click in Add ico disclose CD use the Current Date enter the date and click ok
   '14 eFolder -> send diclosures and save the loan   
'@ ExpectedResult:
   '01 User able to update the loan 
   '02 CD Line: 801b:  A.02,801c:  A.03,801d:  A.04 
   '03 Itemization Line #: 801b 801c 801d
   '04 Fee Description: 801b:  Application Fees,801c:  Processing Fees,801d:  Underwriting Fees
   '05 Paid By: 801b:  Broker : 801b:  Seller,801c:  Lender 801c:  Seller,801d:  Other 801d:  Seller
   '06 Paid To: 801b:  Lender/Other, 801c:  Lender/Other,801d:  Lender/Other
   '07 Amount: 801b:  $75,801b:  $50,801c:  $75,801c:  $50,801d:  $75,801d:  $50,
   '08 PAC BROKER 801b:  $100
   '09 PAC LENDER 801c:  $100
   '10 PAC OTHER 801d:  $100
   '11 POC BROKER 801b:  $25
   '12 POC LENDER 801c:  $25
   '13 POC OTHER 801d:  $25
   '14 Wire Transfer Amount (1990):  $89,775.00
   '15 Lender Credits:  $125
   '16 Total Debits:  $90,125
   '17 "Credit Description:
		'801b:  Application Fees
		'801c:  Processing Fees 
		'801d:  Underwriting Fees
		'"Amount:
		'801b:  $125
		'801c:  $125
		'801d:  $125
		'Wire Transfer Amount:  $89,775.00
		'Total Credits:  $90,150.00
	'18 Total Credits:  $90,150 Wire Transfer Amount:  $89,725.00
	'19 LE Disclosure record information should display in the Disclosure History pane
	'20 CD Disclosure record information should display in the Disclosure History pane
	'21 Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab   
'************************************************************************************************************
Dim strRowIDCommon, objData,intRowVal,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2278","Workflow between 2015 Itemization and Funding Worksheet - 800 Section", Null

'====== Go to Pipeline>>NewLoanButton>>Forms ====== 
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

strRowIDCommon = "2770_WorkFlow_2015Item_FundingSheet"
'Set Borrower Information to create loan
BIZ_BorrowerSummaryOrigination_SetBorrower strRowIDCommon
BIZ_BorrowerSummaryOrigination_SetProperty strRowIDCommon
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowIDCommon
BIZ_1003Page1_SetMailingAddress strRowIDCommon
'Save the Loan
'BIZ_Loan_Save()

'Set Data in 801 Section 801b,801c,801d
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "2770_WorkFlow_2015Item_Section801"
BIZ_2015Itemization_SetFeeDetails "801b","2770_WorkFlow_2015Item_Section801b"
BIZ_2015Itemization_SetFeeDetails "801c","2770_WorkFlow_2015Item_Section801c"
BIZ_2015Itemization_SetFeeDetails "801d","2770_WorkFlow_2015Item_Section801d"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_801"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_801")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing 

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2279","Workflow between 2015 Itemization and Funding Balancing Worksheet - 800 Section",Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_801"
'Verify the Lender Credits and Wire Transfer Amount in Funding Worksheet for OverWire Amount 50
If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emToolMenuBox", "index:=0"),"Funding Worksheet") Then
	BIZ_Tools_Open "Funding Worksheet"	
	Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", strRowIDCommon)	
	GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtOverwireAmount"),FRM_DS_GetValue(objData, "2005_OverWireAmount")
	UTIL_Win_SendKey "{TAB}"
	GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits_OvrWire50"),"Lender Credits"
	GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt_OvrWire50"),"Wire Transfer Amount"
	Set objData = Nothing
Else
	FRM_Logger_ReportFailEvent "Verify the 'Funding Worksheet' form under tools tab","Required form doesn't exists",Null
End If

'Verify the Items Debit Grid of funding balancing WorkSheet
BIZ_WorkFlow2015Itemization_FundingBalancingWorksheet_Debits_Validate strRowIDCommon	

'Verify Items in Credit side of Grid in funding Balancing WorkSheet
WorkFlow2015Itemization_FundingBalancingWorksheet_801Section_Credits_Validate strRowIDCommon

'Set OverWireAmount in Fumding WorkSheet as Null
If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emToolMenuBox", "index:=0"),"Funding Worksheet") Then
	BIZ_Tools_Open "Funding Worksheet"	
	Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", strRowIDCommon)
	GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtOverwireAmount"),FRM_DS_GetValue(objData, "2005_OverWireAmount_Null")
	UTIL_Win_SendKey "{TAB}"
	Set objData = Nothing
Else
	FRM_Logger_ReportFailEvent "Verify the 'Funding Worksheet' form under tools tab","Required form doesn't exists",Null
End If

'Validate the Wire Transfer amount and Total Credits in Funding Balancing WorkSheet for OverWire Amount Null
BIZ_WorkFlow2015Itemization_OverWireAmtNull_FundingBalancingWorkSheet_Credits_Validate strRowIDCommon

'Exit Loan 
BIZ_Loan_Exit False
			
''Omiiting sending LE,CD and eDisclosure since we are not verifying anything after sending them
''Refer to CTA-332 for more details			
''Send LE Disclosure and validate in in Grid
'BIZ_Tools_Open "Disclosure Tracking"
'BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking "LE"
'Wait g_LongWaitLarge+15
'intRowVal = BIZ_GetRowOfDisclosureType ("Initial","Yes","LE")
'boolVal = UTIL_String_IsMatch(intRowVal,0)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Set Closing data in Closing Disclosure page 1
'BIZ_ClosingDisclosurePage1_SetClosingInformation "2770_WorkFlow_2015Item_FundingSheet"
'
''Send CD Disclosure and Validate in grid
'BIZ_Tools_Open "Disclosure Tracking"
'BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking "CD"
'Wait g_LongWaitLarge+15
'intRowVal = BIZ_GetRowOfDisclosureType ("Initial","Yes","CD")
'boolVal = UTIL_String_IsMatch(intRowVal,0)
'FRM_VerifyTrue boolVal,"Verify CD Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Set Borrower details,Email Id and Property Information
'BIZ_BorrowerSummaryOrigination_SetBorrower "2770_WorkFlow_2015Item_FundingSheet_1"
'BIZ_BorrowerSummaryOrigination_SetProperty "2770_WorkFlow_2015Item_FundingSheet_1"
'
''Set First Payment date in Construction Management form
'BIZ_Forms_Open "Construction Management"
'BIZ_ConstructionManagement_SetLoanInfoDetails "2770_WorkFlow_2015Item_FundingSheet"
'
''Set data in RegZ-LE Page 
'BIZ_RegZ_LE_SetConstructionMortgage "2770_WorkFlow_2015Item_FundingSheet"
'BIZ_RegZ_LE_SetLateChargeInformation "2770_WorkFlow_2015Item_FundingSheet"
'
''set data in 2015 
'BIZ_2015Itemization_Set900Section "2770_WorkFlow_2015Item_FundingSheet"
'
''Send Disclosure from eFolder and verify in Documents pane and save laon
'BIZ_Nav_eFoler_Open()
'BIZ_Documents_SendeDisclosure "2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet"
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
''Close eFolder Window
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'
'Wait g_LongWaitLarge+15
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
'boolVal = UTIL_String_IsNotEmpty(intRowVal)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
