'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '1 PTAC-2288 Workflow between 2015 Itemization and Funding Worksheet - 1200 Section
   '2 PTAC-2289 Workflow between 2015 Itemization and Funding Balancing Worksheet -1200 Section   
'@ Test Automation JIRA Task: 3789 E2E_2015Itemization_FundingWorkSheet_Section1200_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetProperty and 2770_WorkFlow_2015Item_FundingSheet
   '2 Forms_1003Page1,1003Page1 and 2770_WorkFlow_2015Item_FundingSheet
   '3 Forms_2015Itemization,Set1200Section and E2E_2015Itemization_Section1200
   '4 Forms_2015Itemization,Set1200Section and E2E_2015Itemization_Section1200_1
   '5 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and 2770_WorkFlow_2015Item_Section1202
   '6 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and 2770_WorkFlow_2015Item_Section1203
   '7 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and 2770_WorkFlow_2015Item_Section1204
   '8 Forms_2015Itemization,Set1100Section and 2770_WorkFlow_2015Item_Section1200_Seller
   '9 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1200_Seller
   '10 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1202
   '11 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1203
   '12 Forms_2015Itemization,VerifyFeeDetails and 2770_WorkFlow_2015Item_Section1204
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 actual steps
    '01 Originate a new loan from Pipeline->click on the Pipeline tab->click on the Add button to create a new loan file->click on the 'New Loan' button 
    '02 Go to Pipeline , choose the loan file created, click the edit button and save the loan
	'03 2015 Itemization  > Section 1200 > Seller Paid (Lines 1202-1204)
	'   2015 Itemization  > Section 1200 > Line 1202 > Fee Details
	'   2015 Itemization  > Section 1200 > Line 1204 > Fee Details
	'   2015 Itemization  > Section 1200 > Line 1201
	'   2015 Itemization  > Section 1200 > Line 1202
	'   2015 Itemization  > Section 1200 > Line 1203
	'   2015 Itemization  > Section 1200 > Line 1204
    '04 Tools -> Funding Worksheet -> scroll down to the bottom of the worksheet to view the fees
    '05  Scroll down to the bottom of the worksheet to view the fees click on the check boxes next to each of the CD Line #
    '06  Open the Loan which is created in PTAC-2288 -> Tools -> Funding Worksheet 
    '07 Scroll down to the bottom of the worksheet to view the fees click on the check boxes next to each of the CD Line #
	'   enter $50 in the Overwire Amount (2005) field 
    '08 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
    '09 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
    '10 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
    '11 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 
	'   in the Overwire Amount (2005) field click on the Funding Balancing Worksheet
    '12 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
	'   go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field 
	'   click on the Funding Balancing Worksheet refer to the Credits side of the sheet
    '13 Tools > Disclosure Tracking > Disclose LE 
    '14 Click in Add icon disclose LE use the Current Date click Ok
    '15 Tools > Disclosure Tracking > Disclose CD > Click in Add  icon disclose CD use the Current Date enter the date and click ok
    '16 eFolder -> send diclosures and save the loan.    
'@ ExpectedResult:
  'Step1 Expected steps
    '1 User able to update the loan
  'Step2 Expected steps
    '1 Total Broker Amount Paid (Field NEWHUD2.X3649 & NEWHUD2.X3656):  $25 
    ' Total Fee Amount (Field NEWHUD2.X3633):  $150
	' Section 32 Points and Fees (Field NEWHUD2.X3657):   $75"
	' "Total Lender Amount Paid (Field NEWHUD2.X3685 & NEWHUD2.X3689):  $25.00
	' Total Fee Amount (Field NEWHUD2.X3666):  $150.00
	' Section 32 Points and Fees (Field NEWHUD2.X3690):   $75.00"
	' Total Other Amount Paid (Field NEWHUD2.X3721 & NEWHUD2.X3722):  $25.00
	' Total Fee Amount (Field NEWHUD2.X3699):  $150.00"
	' Field NEWHUD.X607:  $75.00
	' Field NEWHUD.X799:  $50.00
	' Field 390:  $100.00
	' Field 587:  $50.00
	' Field NEWHUD.X731:  $100.00
	' Field NEWHUD.X787:  $50.00
	' Field 647:  $100.00
	' Field 593:  $50.00
  'Step3 Expected steps
    '1 Total Lender Amount Paid (Field NEWHUD2.X2893 & NEWHUD2.X2897):  $25.00
    ' "CD Line:
	' 1202:  E.01  
	' 1202:  E.01
	' 1204:  E.02
	' 1204:  E.02
	' 1203:  E.03
	' 1203:  E.03
	'2 Itemization Line #:
	' 1202.:  
	' 1202.:  
	' 1204.:  
	' 1204.:  
	' 1203.:  
	' 1203.: 
	'3 Fee Description:
	' 1202.:  Recording Fees  
	' 1202.:  Recording Fees  
	' 1204.:  City/County Tax/Stamps
	' 1204.:  City/County Tax/Stamps
	' 1203.:  Transfer Taxes
	' 1203.:  Transfer Taxes"
	'4 Paid By:
	' 1202.  Borrower
	' 1202.  Seller
	' 1204.  Borrower
	' 1204.  Seller
	' 1203.  Borrower
	' 1203.  Seller"
	'5 Paid To:
	' 1202.  Lender/Other  
	' 1202.  Lender/Other  
	' 1204.  Lender/Other  
	' 1204.  Lender/Other  
	' 1203.  Lender/Other  
	' 1203.  Lender/Other
	' Amount:
	' 1202:  $75.00
	' 1202:  $50.00
	' 1204:  $75.00
	' 1204:  $50.00
	' 1203:  $75.00
	' 1203:  $50.00
  'Step4 Expected steps
    '1 The Font for each of the Fee Line descriptions should turn Red.  
    ' Total Deductions (1989): $400.00"
    ' Lender Credits (4083):  $25.00
    ' Wire Transfer Amount (1990):  $89,625.00
'***************************************************************************************************  
Dim strRowIDCommon, objData
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2288","Workflow between 2015 Itemization and Funding Worksheet - 1200 Section", Null
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

'Set Data in 1200 Section  1202,1203,1204
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1200Section "2770_WorkFlow_2015Item_Section1200_Borrower"
BIZ_2015Itemization_SetFeeDetails "1202","2770_WorkFlow_2015Item_Section1202"
BIZ_2015Itemization_SetFeeDetails "1203","2770_WorkFlow_2015Item_Section1203"
BIZ_2015Itemization_SetFeeDetails "1204","2770_WorkFlow_2015Item_Section1204"
BIZ_2015Itemization_Set1200Section "2770_WorkFlow_2015Item_Section1200_Seller"

'Validate Feedetails in Fee PopUp window
BIZ_2015Itemization_ValidateFeeDetails "1202","2770_WorkFlow_2015Item_Section1202"
BIZ_2015Itemization_ValidateFeeDetails "1203","2770_WorkFlow_2015Item_Section1203"
BIZ_2015Itemization_ValidateFeeDetails "1204","2770_WorkFlow_2015Item_Section1204"

''Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_1200"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_1200")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing 

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2289","Workflow between 2015 Itemization and Funding Balancing Worksheet -1200 Section",Null
strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_1200"

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

'Verify line items in Credit side of Funding Balancing WorkSheet
WorkFlow2015itemization_FundingBalancingWorksheet_1200Section_Credits_Validate strRowIDCommon

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

'Verify the Credits grid Items in Funding Balancing Worksheet for OverWire Amount Null
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
''Set data in 2015 
'BIZ_2015Itemization_Set900Section "2770_WorkFlow_2015Item_FundingSheet"
'
''Send Disclosur from eFolder and verify in Documents pane and save laon
'BIZ_Nav_eFoler_Open()
'
''Close eFolder Window
'BIZ_Documents_SendeDisclosure "2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet"
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'Wait g_LongWaitLarge+15
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
'boolVal = UTIL_String_IsNotEmpty(intRowVal)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
