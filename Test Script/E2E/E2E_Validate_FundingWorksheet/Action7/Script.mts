'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase : 
	'1 PTAC-2287 Workflow between 2015 Itemization and Funding Worksheet - 1100 Section
	'2 PTAC-2286 Workflow between 2015 Itemization and Funding Balancing Worksheet - 1100 Section
'@ Test Automation JIRA Task: PTAC-3769 E2E_Workflow2015Itemization_FundingWorksheet_1100Section_Validate
'@ TestData: 
   '01 Forms_BorrowerSummaryOrigination, SetBorrower, 2770_WorkFlow_2015Item_FundingSheet
   '02 Forms_BorrowerSummaryOrigination, SetProperty, 2770_WorkFlow_2015Item_FundingSheet
   '03 Forms_BorrowerSummaryOrigination, SetTransactionDetails, 2770_WorkFlow_2015Item_FundingSheet
   '04 Forms_1003Page1, SetMailingAddress, 2770_WorkFlow_2015Item_FundingSheet
   '05 Forms_2015Itemization, Set1100Section, 2770_WorkFlow_2015Item_Section1100_Borrower
   '06 Forms_2015Itemization, SetFeeDetails, 2770_WorkFlow_2015Item_Section1100a
   '07 Forms_2015Itemization, SetFeeDetails, 2770_WorkFlow_2015Item_Section1100b
   '08 Forms_2015Itemization, SetFeeDetails, 2770_WorkFlow_2015Item_Section1100c
   '07 Tools_FundingWorkSheet,VerifyFeeDetails,2770_WorkFlow_2015Item_FundingSheet_RowIds_1100
   '09 Tools_FundingBalancingWorKSheet, ValidateDebits, 2770_WorkFlow_2015Item_FundingSheet_1100
   '10 Tools_FundingBalancingWorKSheet, ValidateCredits, 2770_WorkFlow_2015Item_FundingSheet_1100   
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '01 Originate  a new loan from Pipeline -> click on the Pipeline tab 
      'click on the Add button to create a new loan file. click on the 'New Loan' button 
      'Go to Pipeline , choose the loan file created, click the edit button and save the loan
   '02 2015 Itemization  > Section 1100 > Line 1101b > Fee Details
      '2015 Itemization  > Section 1100 > Line 1101c > Fee Details
      '2015 Itemization  > Section 1100 > Line 1101a
      '2015 Itemization  > Section 1100 > Line 1101b
      '2015 Itemization  > Section 1100 > Line 1101c
   '03 Tools -> Funding Worksheet -> scroll down to the bottom of the worksheet to view the fees
   '04 Scroll down to the bottom of the worksheet to view the fees. click on the check boxes next to each of the CD Line #
   '05 Open the Loan which is created in PTAC-2287 -> Tools -> Funding Worksheet. 
   '06 Scroll down to the bottom of the worksheet to view the fees. click on the check boxes next to each of the CD Line #
       'enter $50 in the Overwire Amount (2005) field.
   '07 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
   '08 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
   '09 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
   '10 go back to the Funding Worksheet, scroll down to the bottom of the worksheet to view the fees
       'delete/remove the $50 in the Overwire Amount (2005) field. click on the Funding Balancing Worksheet
       'refer to the Credits side of the sheet
   '11 Tools > Disclosure Tracking > Disclose LE 
   '12 Click in Add icon. disclose LE. use the Current Date. click Ok
   '13 Tools > Disclosure Tracking > Disclose CD > Click in Add  icon disclose CD use the Current Date enter the date and click ok
   '14 eFolder -> send diclosures and save the loan.
'@ ExpectedResult:
   '01 User able to update the loan 
   '02 Total Lender Amount Paid (Field NEWHUD2.X2893 & NEWHUD2.X2897):  $25.00
      'Total Fee Amount (Field NEWHUD2.X2874):  $150.00
      'Section 32 Points and Fees (Field NEWHUD2.X2898):   $75.00
      'Total Other Amount Paid (Field NEWHUD2.X2929 & NEWHUD2.X2930):  $25.00
      'Total Fee Amount (Field NEWHUD2.X2907):  $150.00
      'Section 32 Points and Fees (Field NEWHUD2.X2931):   $75.00
   '03 CD Line:
      '1101a:  B.01  
      '1101a:  B.01
      '1101b:  B.02
      '1101b:  B.02
      '1101c:  B.03
      '1101c:  B.03
      'Itemization Line #:
      '1101a.
      '1101a.
      '1101b.
      '1101b.
      '1101c.
      '1101c.
      'Fee Description:
      '1101a.  Title -
      '1101a.  Title -
      '1101b.  Title -
      '1101b.  Title -
      '1101c.  Title -
      '1101c.  Title -
      'Paid By:
      '1101a.  Borrower
      '1101a.  Seller
      '1101b.  Borrower
      '1101b.  Seller
      '1101c.  Borrower
      '1101c.  Seller"
      'Paid To:
      '1101a.  Lender/Other  
      '1101a.  Lender/Other  
      '1101b.  Lender/Other  
      '1101b.  Lender/Other  
      '1101c.  Lender/Other  
      '1101c.  Lender/Other
      'Amount:
      '1101a.  $75
      '1101a.  $50
      '1101b.   $75
      '1101b.  $50
      '1101c.  $75
      '1101c.  $50
   '04 The Font for each of the Fee Line descriptions should turn Red. 
      'POC BROKER 1101a:  $25.00 
      'POC LENDER 1101b:  $25.00
      'POC OTHER 1101c:  $25.00
      'The Font for each of the Fee Line descriptions should turn Red. 
      'Total Deductions (1989)   : $400.00"
      'Lender Credits (4083)     : $25.00
      'Wire Transfer Amount(1990):  $89,625.00
   '05 Wire Transfer Amount (1990):  $89,675.00
   '06 Lender Credits:  $25.00
   '07 Total Loan Amount:  $90,000.00 Total Debits:  $90,025.00
   '08 Wire Transfer Amount:  $89,675.00 Total Credits:  $90,950.00
   '09 Credit Description:
      '1101a:  Blank
      '1101b.:  Blank
      '1101c.:  Blank
      'Amount:
      '1101a:  $125.00
      '1101b.:  $125.00
      '1101c.:  $125.00
      'Wire Transfer Amount:  $89,625.00
      'Total Credits:  $90,000.00
   '10 Total Credits:  $90,000 Wire Transfer Amount:  $89,625.00
   '11 LE Disclosure record information should display in the Disclosure History pane
   '12 CD Disclosure record information should display in the Disclosure History pane
   '13 Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab
'***************************************************************************************************
Dim strRowIDCommon, objData,intRowVal,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2287","Workflow between 2015 Itemization and Funding Worksheet - 1100 Section", Null

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

'Set Data in 1100 Section 1101a,1101b,1101c
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1100Section "2770_WorkFlow_2015Item_Section1100_Borrower"
BIZ_2015Itemization_SetFeeDetails "1101a","2770_WorkFlow_2015Item_Section1100a"
BIZ_2015Itemization_SetFeeDetails "1101b","2770_WorkFlow_2015Item_Section1100b"
BIZ_2015Itemization_SetFeeDetails "1101c","2770_WorkFlow_2015Item_Section1100c"
BIZ_2015Itemization_Set1100Section "2770_WorkFlow_2015Item_Section1100_Seller"

'Validate Feedetails in Fee PopUp window
BIZ_2015Itemization_ValidateFeeDetails "1101b","2770_WorkFlow_2015Item_Section1100b"
BIZ_2015Itemization_ValidateFeeDetails "1101c","2770_WorkFlow_2015Item_Section1100c"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_1100"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_1100")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2286","Workflow between 2015 Itemization and Funding Balancing Worksheet - 1100 Section",Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_1100"

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

'Verify the Items Credit Grid of funding balancing WorkSheet
BIZ_WorkFlow2015Itemization_FundingBalancingWorksheet_Credits_Validate strRowIDCommon

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

'Verify Items in Credit side of Grid in funding Balancing WorkSheet
WorkFlow2015Itemization_FundingBalancingWorksheet_1100Section_Credits_Validate strRowIDCommon
		
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
''Save Laon
'BIZ_Loan_Save
