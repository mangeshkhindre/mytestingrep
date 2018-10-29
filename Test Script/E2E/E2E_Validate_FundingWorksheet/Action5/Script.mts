'@**************************************************************************************************
'@ TestStory: PTAC-2770 WorkFlow 2015Itemization
'@ TestCase : 
	'1 PTAC-2282 Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Orig Disc Pts)	
	'2 PTAC-2283 Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Orig Disc Pts)	
'@ Test Automation JIRA Task: PTAC-3764 Workflow2015Itemization_FundingWorksheet802Section_OrigDiscPts_Validate
'@ TestData: 
    '01 Forms_BorrowerSummaryOrigination,SetBorrower,2770_WorkFlow_2015Item_FundingSheet
    '02 Forms_BorrowerSummaryOrigination,SetProperty,2770_WorkFlow_2015Item_FundingSheet
    '03 Forms_BorrowerSummaryOrigination,SetTransactionDetails,2770_WorkFlow_2015Item_FundingSheet
    '04 Forms_1003Page1,SetMailingAddress,2770_WorkFlow_2015Item_FundingSheet
    '05 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet
    '06 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802e
    '07 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802f
    '08 Forms_2015Itemization,SetFeeDetails,2770_WorkFlow_2015Item_FundingSheet_802g
    '09 Tools_FundingWorKSheet,VerifyFeeDetails,2770_WorkFlow_2015Item_FundingSheet
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
    '01 Originate  a new loan from Pipeline -> click on the Pipeline tab 
       'click on the Add button to create a new loan file 
       'click on the 'New Loan' button
    '02 Go to Pipeline , choose the loan file created, click the edit button and save the loan
    '03 Tools -> Funding Worksheet -> scroll down to the bottom of the worksheet to view the fees
    '04 Scroll down to the bottom of the worksheet to view the fees on the check boxes next to each of the CD Line # 
    '05 Click on the check boxes next to each of the CD Line # enter $50 in the Overwire Amount (2005) field 
    '06 Click on the Funding Balancing Worksheet refer to the Debits side of the sheet
    '07 Funding Worksheet > Funding Balancing Worksheet > Debits side of the sheet
    '08 Funding Worksheet > Funding Balancing Worksheet > Credits side of the sheet
    '09 Funding Worksheet > Delete Overwire Amount>Funding Balancing Worksheet > Credits side of the sheet
    '10 Go back to the Funding Worksheet scroll down to the bottom of the worksheet to view the fees delete/remove the $50 in the Overwire Amount (2005) field click on the Funding Balancing Worksheetrefer to the Credits side of the sheet
    '11 Tools > Disclosure Tracking > Disclose LE 
    '12 Click in Add icondisclose LEuse the Current Date click Ok
    '13  Tools > Disclosure Tracking > Disclose CD > Click in Add ico disclose CD use the Current Date enter the date and click ok
    '14 eFolder -> send diclosures and save the loan
'@ ExpectedResult:
   '01 User able to update the loan 
   '02 CD Line: 
        '802e:  A.01  
        '802f:  A.02 
        '802g:  A.03
      'Itemization Line #:
        '802e 
        '802f 
        '802g
      'Fee Description:
        '802e:  1% of Loan Amount (Points)  
        '802f:  Blank  
        '802g:  Blank
      'Paid By:
        '802e:  Broker  
        '802f:  Lender  
        '802g:  Other
      'Paid To:
        '802e:  Lender/Other  
        '802f:  Lender/Other  
        '802g:  Lender/Other
      'Amount:
        '802e:  $875  
        '802f:  $875   
        '802g:  $875 
        'PAC BROKER
        '802e:  $900 
        'PAC LENDER 
        '802f:  $900
        'PAC OTHER
        '802g:  $900
        'POC BROKER
        '802e:  $25 
        'POC LENDER 
        '802f:  $25
        'POC OTHER
        '802g:  $25
   '03 Total Deductions (1989): 
        '$2650
        'Lender Credits (4083):  $925
        'Wire Transfer Amount (1990):  $88,275.00
    '04 Wire Transfer Amount (1990):  $88,325.00
    '05 Lender Credits:  $925
    '06 Total Debits:  $90,925
    '07 Credit Description:
		'802e:  1% of Loan Amount (Points)  
		'802f:  Blank  
		'802g:  Blank
		'Amount:
		'802e:  $875
		'802f:  $875 
		'802g:  $875
		'Wire Transfer Amount:  $88,325
		'Total Credits:  $90,950
	'08 Total Credits:  $90,900 Wire Transfer Amount:  $88,275
	'09 LE Disclosure record information should display in the Disclosure History pane
	'10 CD Disclosure record information should display in the Disclosure History pane
	'11 Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab        
'********************************************************************************************************
Dim objData, intRowVal, boolVal

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2282","Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Orig Disc Pts)", Null

'====== Go to Pipeline>>NewLoanButton>>Forms ====== 
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
'Set Borrower Information to create loan
BIZ_BorrowerSummaryOrigination_SetBorrower "2770_WorkFlow_2015Item_FundingSheet"
BIZ_BorrowerSummaryOrigination_SetProperty "2770_WorkFlow_2015Item_FundingSheet"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2770_WorkFlow_2015Item_FundingSheet"
BIZ_1003Page1_SetMailingAddress "2770_WorkFlow_2015Item_FundingSheet"

'Save the Loan
'BIZ_Loan_Save()

'Set Data in 800 section,802e,802f,802g sections
BIZ_Forms_Open "2015 Itemization"

WorkFlow2015Itemization_FeeDetails_SetData "2770_WorkFlow_2015Item_FundingSheet"
BIZ_2015Itemization_800SectionImageBtn_SetFeeDetails "ImageButton5","2770_WorkFlow_2015Item_FundingSheet_802e"
BIZ_2015Itemization_800SectionImageBtn_SetFeeDetails "ImageButton6","2770_WorkFlow_2015Item_FundingSheet_802f"
BIZ_2015Itemization_800SectionImageBtn_SetFeeDetails "ImageButton7","2770_WorkFlow_2015Item_FundingSheet_802g"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions,

Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData , "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData , "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData , "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData = Nothing 


FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2283","Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Orig Disc Pts)", Null
'Verify the Lender Credits and Wire Transfer Amount in Funding Worksheet for OverWire Amount 50

If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emToolMenuBox", "index:=0"),"Funding Worksheet") Then
   BIZ_Tools_Open "Funding Worksheet"
	
   Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet")
      
   GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtOverwireAmount"),FRM_DS_GetValue(objData , "2005_OverWireAmount")
   UTIL_Win_SendKey "{TAB}"
   GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits_OvrWire50"),"Lender Credits"
   GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt_OvrWire50"),"Wire Transfer Amount"

   Set objData = Nothing
Else
   FRM_Logger_ReportFailEvent "Verify the 'Funding Worksheet' form under tools tab","Required form doesn't exists",Null
End If

'Verify the Items Debit Grid of funding balancing WorkSheet
BIZ_WorkFlow2015Itemization_FundingBalancingWorksheet_Debits_Validate "2770_WorkFlow_2015Item_FundingSheet"

'Verify Items in Credit side of Grid in funding Balancing WorkSheet
WorkFlow2015itemization_FundingBalancingWorksheet_802Section_Credits_Validate_02 "2770_WorkFlow_2015Item_FundingSheet"

'Set OverWireAmount in Fumding WorkSheet as Null
If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emToolMenuBox", "index:=0"),"Funding Worksheet") Then
   BIZ_Tools_Open "Funding Worksheet"	
	
   Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet")
   
   GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtOverwireAmount"),FRM_DS_GetValue(objData, "2005_OverWireAmount_Null")
   UTIL_Win_SendKey "{TAB}"

   Set objData = Nothing
Else
	FRM_Logger_ReportFailEvent "Verify the 'Funding Worksheet' form under tools tab","Required form doesn't exists",Null
End If

'Verify the Credits grid Items in Funding Balancing Worksheet for OverWire Amount Null
BIZ_WorkFlow2015Itemization_OverWireAmtNull_FundingBalancingWorkSheet_Credits_Validate "2770_WorkFlow_2015Item_FundingSheet"

'Exit Loan 
BIZ_Loan_Exit False

''Omiiting sending LE,CD and eDisclosure since we are not verifying anything after sending them
''Refer to CTA-332 for more details
''Send LE Disclosure and validate in in Grid
'BIZ_Tools_Open "Disclosure Tracking"
'BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking "LE"
'Wait g_LongWaitMedium+15      'Explictitly using wait statement to handle sync issue
'intRowVal = BIZ_GetRowOfDisclosureType ("Initial","Yes","LE")
'boolVal   = UTIL_String_IsMatch(intRowVal ,0)
'FRM_VerifyTrue boolVal ,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Set Closing data in Closing Disclosure page 1
'BIZ_ClosingDisclosurePage1_SetClosingInformation "2770_WorkFlow_2015Item_FundingSheet"
'
''Send CD Disclosure and Validate in grid
'BIZ_Tools_Open "Disclosure Tracking"
'BIZ_DisclosureTrackingTool_NewDisclosureRecordLECDDateIssuedChecking "CD"
'Wait g_LongWaitMedium+15       'Explictitly using wait statement to handle sync issue
'intRowVal = BIZ_GetRowOfDisclosureType ("Initial","Yes","CD")
'boolVal   = UTIL_String_IsMatch(intRowVal ,0)
'FRM_VerifyTrue boolVal ,"Verify CD Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
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
'BIZ_Documents_SendeDisclosure "2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet","2770_WorkFlow_2015Item_FundingSheet"
'
''Close eFolder Window
'
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
''boolVal   = UTIL_String_IsMatch(intRowVal ,0)
'FRM_VerifyTrue intRowVal >= 0 ,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
