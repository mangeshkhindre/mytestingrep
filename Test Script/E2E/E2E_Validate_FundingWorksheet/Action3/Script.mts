'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '1 PTAC-2280 Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Lender Paid Comp)			
   '2 PTAC-2281 Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Lender Paid Comp)
'@ T2st Automation JIRA Task: PTAC-2928 E2E_Workflow2015Itemization_FundingWorksheet_802Section_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetBorrower,2770_WorkFlow_2015Item_FundingSheet
   '2 Forms_BorrowerSummaryOrigination,SetProperty,2770_WorkFlow_2015Item_FundingSheet
   '3 Forms_BorrowerSummaryOrigination,SetTransactionDetails,2770_WorkFlow_2015Item_FundingSheet
   '4 Forms_1003Page1,SetMailingAddress,2770_WorkFlow_2015Item_FundingSheet
   '5 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet
   '6 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802e
   '7 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802f
   '8 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802g
   '9 Tools_FundingWorKSheet,VerifyFeeDetails,2770_WorkFlow_2015Item_FundingSheet
   '10 Tools_FundingBalancingWorKSheet,ValidateDebits,2770_WorkFlow_2015Item_FundingSheet
   '11 Tools_FundingBalancingWorKSheet,ValidateCredits,2770_WorkFlow_2015Item_FundingSheet
   '12 Forms_ClosingDisclosurePage,SetClosingInformation,2770_WorkFlow_2015Item_FundingSheet
   '13 Forms_BorrowerSummaryOrigination,SetBorrower,2770_WorkFlow_2015Item_FundingSheet_1
   '14 Forms_BorrowerSummaryOrigination,SetProperty,2770_WorkFlow_2015Item_FundingSheet_1
   '15 ConstructionManagement,SetLoanInfoDetails,2770_WorkFlow_2015Item_FundingSheet
   '16 Forms_RegZ_LE,SetConstruction,2770_WorkFlow_2015Item_FundingSheet
   '17 Forms_RegZ_LE,SetLateCharge,2770_WorkFlow_2015Item_FundingSheet
   '18 eFolder_Tab,SelectPackageTypeAndPlanCode,2770_WorkFlow_2015Item_FundingSheet
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Originate  a new loan from Pipeline -> click on the Pipeline tab 
   '2 click on the Add button to create a new loan file ,click on the Add button to create a new loan file
   '3 Go to Pipeline , choose the loan file created, click the edit button and save the loan
   '4 Scroll down to the bottom of the worksheet to view the fees on the check boxes next to each of the CD Line #
   '5 Click on the check boxes next to each of the CD Line # enter $50 in the Overwire Amount (2005) field 
   '6 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
   '7 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
   '8 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
   '9 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
   '10 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field click on the Funding Balancing Worksheetrefer to the Credits side of the sheet   
'@ ExpectedResult:
   '1 User able to update the loan 
   '2 CD Line: 802a:  J.02 802b:  J.02
   '3 Itemization Line #: 802a  802b
   '4 Fee Description: 802a:  Lender Compensation Credit
   '5 Paid By: Line 802a:  L Line 802b:  L
   '6 Paid To: 802a:  Broker  802b:  Lender/Other
   '7 Amount: 802a:  -$900,802b:  -$900
   '8 Total Deductions (1989):  -$1800
   '9 Lender Credits (4083):  $900
   '10 Wire Transfer Amount (1990):  $92,700.00
'***************************************************************************************************
Dim strRowIDCommon, objData,intRowVal,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2280","Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Lender Paid Comp)", Null
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

'Set Data in 802 Section 802a,802b
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "2770_WorkFlow_2015Item_Section802"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_802"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_802")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing 

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2281","Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Lender Paid Comp)",Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_802"

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
WorkFlow2015Itemization_FundingBalancingWorksheet_802Section_Credits_Validate_01 "2770_WorkFlow_2015Item_FundingSheet_802"

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

'Verify the Wire Transfer Amount and Total credits in Funding Balancing Worksheet
BIZ_WorkFlow2015Itemization_OverWireAmtNull_FundingBalancingWorkSheet_Credits_Validate "2770_WorkFlow_2015Item_FundingSheet_802"

'Exit Loan 
BIZ_Loan_Exit False

''Omiiting sending LE,CD and eDisclosure since we are not verifying anything after sending them
''Refer to CTA-332 for more details
''Send LE Disclosure and validate in in Grid
'BIZ_Tools_Open "Disclosure Tracking"
'BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking "LE"
'Wait g_LongWaitLarge+15																					'Explicit time is given to sync the object 	
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
'Wait g_LongWaitLarge+15																					'Explicit time is given to sync the object 
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
''Send Disclosuer from eFolder and verify in Documents pane and save loan
'BIZ_Nav_eFoler_Open()
'BIZ_Documents_SendeDisclosure "2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet"
'
''Close eFolder Window
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'Wait g_LongWaitLarge+15
'
''Validate eConsent send or not 
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
'boolVal = UTIL_String_IsNotEmpty(intRowVal)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
