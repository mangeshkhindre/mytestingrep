'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '1 PTAC-2290 Workflow between 2015 Itemization and Funding Worksheet - 1300 Section
   '2 PTAC-2291 Workflow between 2015 Itemization and Funding Balancing Worksheet - 1300 Section
'@ Test Automation JIRA Task: PTAC-3815 E2E_Workflow2015Itemization_FundingWorksheet_1300Section_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetBorrower and 2770_WorkFlow_2015Item_FundingSheet
   '2 Forms_BorrowerSummaryOrigination,SetProperty and2770_WorkFlow_2015Item_FundingSheet
   '3 Forms_BorrowerSummaryOrigination,SetTransactionDetails and 2770_WorkFlow_2015Item_FundingSheet
   '4 Forms_1003Page1,SetMailingAddress and 2770_WorkFlow_2015Item_FundingSheet
   '5 Forms_2015Itemization,Set1300Section and 2770_WorkFlow_2015Item_Section1300_Borrower
   '6 Forms_2015Itemization,SetFeeDetails and 2770_WorkFlow_2015Item_Section1302
   '7 Forms_2015Itemization,SetFeeDetails and 2770_WorkFlow_2015Item_Section1303
   '8 Forms_2015Itemization,Set1300Section and 2770_WorkFlow_2015Item_Section1300_Seller
   '9 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1302
   '10 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1303
   '11 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1304
   '12 Tools_FundingWorkSheet,VerifyFeeDetails and 2770_WorkFlow_2015Item_FundingSheet_1300
   '13 Tools_FundingWorkSheet,VerifyFeeDetails and 2770_WorkFlow_2015Item_FundingSheet_RowIds_1300
   '14 Tools_FundingBalancingWorkSheet,ValidateCredits and 2770_WorkFlow_2015Item_FundingSheet_1300
   '15 Tools_FundingBalancingWorkSheet,ValidateDebits and 2770_WorkFlow_2015Item_FundingSheet_1300
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '01 Originate a new loan from Pipeline -> click on the Pipeline tab 
   '02 click on the Add button to create a new loan file ,click on the Add button to create a new loan file
   '03 Go to Pipeline , choose the loan file created, click the edit button and save the loan
   '04 Scroll down to the bottom of the worksheet to view the fees on the check boxes next to each of the CD Line 
   '05 Open the Loan which is created in PTAC-2290 -> Tools -> Funding Worksheet
   '06 Scroll down to the bottom of the worksheet to view the fees click on the check boxes next to each of the CD Line # enter $50 in the Overwire Amount (2005) field 
   '07 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
   '08 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
   '09 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
   '10 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
   '11 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field click on the Funding Balancing Worksheetrefer to the Credits side of the sheet
   '12 Tools > Disclosure Tracking > Disclose LE 
   '13 Click in Add icondisclose LEuse the Current Date click Ok
   '14 Tools > Disclosure Tracking > Disclose CD > Click in Add ico disclose CD use the Current Date enter the date and click ok
   '15 eFolder -> send diclosures and save the loan
'@ ExpectedResult:
   '01 User able to update the loan 
   '02 CD Line: 1302:  B.01   1303:  B.02 1304:  B.03
   '03 Itemization Line #: 1302 1303 1304
   '04 Fee Description: 1302.:  Blank  1303.:  Blank
   '05 Paid By: 1302.  Borrower,1302.  Seller,1303.  Borrower,1303.  Seller,1304.  Borrower,1304.  Seller
   '06 Paid To: 1302.   Lender/Other ,1303.   Lender/Other,1304.Lender/Other
   '07 Amount: 1302:  $75.00,1303:  $75.00,1304:  $75.00
   '08 POC BROKER 1302:  $25.00  
   '09 POC LENDER 1303:  $25.00
   '10 POC OTHER 1304:  $25.00
   '11 PAC BROKER 1302:  $25.00 
   '12 PAC LENDER 1303:  $25.00
   '13 PAC OTHER 1304:  $25.00
   '14 Wire Transfer Amount (1990):  $89,700.00
   '15 Lender Credits:  $50.00
   '16 Total Debits:  $90,050.00
   '17 "Credit Description:
		'1302.:  Blank
		'1303.:  Blank 
		'1304.:  Blank
		'"Amount:
		'1302:  $125
		'1303:  $125
		'1304:  $125
		'Wire Transfer Amount:  $89,700.00
		'Total Credits:  $90,075.00
	'18 Total Credits:  $90,000 Wire Transfer Amount:  $89,625.00
	'19 LE Disclosure record information should display in the Disclosure History pane
	'20 CD Disclosure record information should display in the Disclosure History pane
	'21 Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab   
'***************************************************************************************************
Dim strRowIDCommon, objData,intRowVal,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2290","Workflow between 2015 Itemization and Funding Worksheet - 1300 Section", Null

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

'Set Data in 1302 ,1303,1304 Sections 
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1300Section "2770_WorkFlow_2015Item_Section1300_Borrower"
BIZ_2015Itemization_SetFeeDetails "1302","2770_WorkFlow_2015Item_Section1302"
BIZ_2015Itemization_SetFeeDetails "1303","2770_WorkFlow_2015Item_Section1303"
BIZ_2015Itemization_SetFeeDetails "1304","2770_WorkFlow_2015Item_Section1304"
BIZ_2015Itemization_Set1300Section "2770_WorkFlow_2015Item_Section1300_Seller"

'Validate Feedetails in Fee PopUp window
BIZ_2015Itemization_ValidateFeeDetails "1302","2770_WorkFlow_2015Item_Section1302"
BIZ_2015Itemization_ValidateFeeDetails "1303","2770_WorkFlow_2015Item_Section1303"
BIZ_2015Itemization_ValidateFeeDetails "1304","2770_WorkFlow_2015Item_Section1304"

'Validate data in 1301 line
Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "VerifyFeeDetails", "2770_WorkFlow_2015Item_Section1301")
Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox17"),FRM_DS_GetValue(objData , "1301_BorrowerPaid"),"Borrower Paid"
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox147"),FRM_DS_GetValue(objData , "1301_SellerPaid"),"Seller Paid"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_1300"
WorkFlow2015Itemization_FundingWorksheet_CreditDescription_Validate "2770_WorkFlow_2015Item_FundingSheet_1300"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_1300")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData , "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData , "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData , "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing 
Set objPage = Nothing

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2291","Workflow between 2015 Itemization and Funding Balancing Worksheet -1300 Section",Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_1300"

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

Wait g_ShortWaitMedium																					

'Verify Items in Credit side of Grid in funding Balancing WorkSheet
WorkFlow2015Itemization_FundingBalancingWorksheet_1300Section_Credits_Validate strRowIDCommon

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
''Send Disclosur from eFolder and verify in Documents pane and save laon
'BIZ_Nav_eFoler_Open()
'
''Close eFolder Window
'BIZ_Documents_SendeDisclosure "2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet"
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'
'Wait g_LongWaitLarge+15
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
'boolVal = UTIL_String_IsNotEmpty(intRowVal)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
