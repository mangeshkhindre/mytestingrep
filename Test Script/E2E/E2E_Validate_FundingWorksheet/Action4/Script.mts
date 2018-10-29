'@**************************************************************************************************
'@ TestStory: PTAC-2770 WorkFlowItemization
'@ TestCase:
   '1 PTAC-2256 Workflow between 2015 Itemization and Funding Worksheet - 700 Section
   '2 PTAC-2277 Workflow between 2015 Itemization and Funding Balancing Worksheet - 700 Section 
'@ Test Automation JIRA Task: PTAC-2773 E2E_Workflow2015Itemization_FundingWorksheet_700Section_Validate
'@ TestData: 
   '01 Forms_BorrowerSummaryOrigination,SetBorrower,2770_WorkFlow_2015Item_FundingSheet
   '02 Forms_BorrowerSummaryOrigination,SetProperty,2770_WorkFlow_2015Item_FundingSheet
   '03 Forms_BorrowerSummaryOrigination,SetTransactionDetails,2770_WorkFlow_2015Item_FundingSheet
   '04 Forms_1003Page1,SetMailingAddress,2770_WorkFlow_2015Item_FundingSheet
   '05 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet
   '06 Forms_2015Itemization,Set700Section,2770_WorkFlow_2015Item_Section700
   '07 Tools_FundingWorKSheet,VerifyFeeDetails,2770_WorkFlow_2015Item_FundingSheet_700
   '08 Tools_FundingBalancingWorKSheet,ValidateDebits,2770_WorkFlow_2015Item_FundingSheet
   '09 Tools_FundingBalancingWorKSheet,ValidateCredits,2770_WorkFlow_2015Item_FundingSheet
   '10 Forms_ClosingDisclosurePage,SetClosingInformation,2770_WorkFlow_2015Item_FundingSheet
   '11 Forms_BorrowerSummaryOrigination,SetBorrower,2770_WorkFlow_2015Item_FundingSheet_1
   '12 Forms_BorrowerSummaryOrigination,SetProperty,2770_WorkFlow_2015Item_FundingSheet_1
   '13 ConstructionManagement,SetLoanInfoDetails,2770_WorkFlow_2015Item_FundingSheet
   '14 Forms_RegZ_LE,SetConstruction,2770_WorkFlow_2015Item_FundingSheet
   '15 Forms_RegZ_LE,SetLateCharge,2770_WorkFlow_2015Item_FundingSheet
   '16 eFolder_Tab,SelectPackageTypeAndPlanCode,2770_WorkFlow_2015Item_FundingSheet   
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '01 Originate  a new loan from Pipeline -> click on the Pipeline tab 
   '02 click on the Add button to create a new loan file ,click on the Add button to create a new loan file
   '03 Go to Pipeline , choose the loan file created, click the edit button and save the loan
   '04 Scroll down to the bottom of the worksheet to view the fees on the check boxes next to each of the CD Line #
   '05 Click on the check boxes next to each of the CD Line # enter $50 in the Overwire Amount (2005) field 
   '06 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
   '07 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
   '08 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
   '09 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
   '10 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field click on the Funding Balancing Worksheetrefer to the Credits side of the sheet
   '11 Tools > Disclosure Tracking > Disclose LE 
   '12 Click in Add icondisclose LEuse the Current Date click Ok
   '13 Tools > Disclosure Tracking > Disclose CD > Click in Add ico disclose CD use the Current Date enter the date and click ok
   '14 eFolder -> send diclosures and save the loan
'@ ExpectedResult:
   '01 User able to update the loan 
   '02 CD Line: 704:  H.01 ,  701:  H.02,702:  H.03
   '03 Itemization Line #: 704 701,702
   '04 Fee Description: 704:  Blank, 701:  Real Estate Commission,702:  Real Estate Commission
   '05 Paid By: 704:  Borrower,701:  Borrower,702:  Borrower
   '06 Paid To: 704:  Lender/Other,701:  Lender/Other,702:  Lender/Other 
   '07 Amount: 704:  $100,701:  $100,702:  $100
   '08 Total Deductions (1989):  $300
   '09 Wire Transfer Amount (1990):  $89700.00
   '10 Total Loan Amount:  $90,000
   '11 Total Debits:  $90,000
   '12 Total Debits:  $90,025.00
   '13 "Credit Description:
		'701:  Real Estate Commission
		'702:  Real Estate Commission
		'704:  Blank
		'"Amount:
		'701:  $100
		'702:  $100
		'704:  $100
		'Wire Transfer Amount:  $89,750
		'Total Credits:  $90,050
	'14 Total Credits:  $90,000 Wire Transfer Amount:  $89700
	'15 LE Disclosure record information should display in the Disclosure History pane
	'16 CD Disclosure record information should display in the Disclosure History pane
	'17 Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab
'************************************************************************************************************
Dim strRowIDCommon, objData,intColIndex,intRowVal,strFeeDesc,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2256","Workflow between 2015 Itemization and Funding Worksheet - 700 Section", Null
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

'Set Data in 700 Section 
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set700Section "2770_WorkFlow_2015Item_Section700"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_700"

'Validate the 704 line Fee description column value																												'To validate the Balnk value in Table grid written teh below code explicitly out of above function
intColIndex = GUI_List_GetColumnIndex( SwfWindow("swfname:=MainForm").SwfObject("swfname:=borderPanel1").SwfObject("swfname:=gridFees2015"),"Fee Description")
strFeeDesc = GUI_List_GetCellData(SwfWindow("swfname:=MainForm").SwfObject("swfname:=borderPanel1").SwfObject("swfname:=gridFees2015"), 0, intColIndex)
boolVal	   = UTIL_String_IsEmpty(strFeeDesc)
FRM_VerifyTrue boolVal,"Verify Fee Description for 704","Fee Description is Blank"

'Check the Fee Lines
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_700")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2277","Workflow between 2015 Itemization and Funding Balancing Worksheet - 700 Section",Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_700"

'Verify the Lender Credits and Wire Transfer Amount in Funding Worksheet for OverWire Amount 50
If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emToolMenuBox", "index:=0"),"Funding Worksheet") Then
	BIZ_Tools_Open "Funding Worksheet"
	
	Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", strRowIDCommon)
	
	GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtOverwireAmount"),FRM_DS_GetValue(objData, "2005_OverWireAmount")
	UTIL_Win_SendKey "{TAB}"

Set objData = Nothing

Else
	FRM_Logger_ReportFailEvent "Verify the 'Funding Worksheet' form under tools tab","Required form doesn't exists",Null
End If

'Verify the Items Debit Grid of funding balancing WorkSheet
BIZ_WorkFlow2015Itemization_FundingBalancingWorksheet_Debits_Validate strRowIDCommon

'Verify Items in Credit side of Grid in funding Balancing WorkSheet
WorkFlow2015Itemization_FundingBalancingWorksheet_700Section_Credits_Validate strRowIDCommon

Wait g_ShortWaitMedium																					

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

'Verify the Items Credit Grid of funding balancing WorkSheet
BIZ_WorkFlow2015Itemization_OverWireAmtNull_FundingBalancingWorkSheet_Credits_Validate "2770_WorkFlow_2015Item_FundingSheet_700"

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



