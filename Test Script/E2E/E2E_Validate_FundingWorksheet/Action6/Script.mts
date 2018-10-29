'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '1 PTAC-2284 - Workflow between 2015 Itemization and Funding Worksheet - 900 & 1000 Section
   '2 PTAC-2285 -Workflow between 2015 Itemization and Funding Balancing Worksheet - 900 & 1000 Sections
'@ Test Automation JIRA Task: PTAC-3732 E2E_2015Itemization_FundingWorkSheet_Section900And1000
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetProperty and 2770_WorkFlow_2015Item_FundingSheet_1
   '2 Forms_1003Page1,1003Page1 and 2770_WorkFlow_2015Item_FundingSheet
   '3 Forms_2015Itemization,Set1100Section and E2E_2015Itemization_Section1100
   '4 Forms_2015Itemization,Set1100Section and E2E_2015Itemization_Section1100_1
   '5 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and E2E_2015Itemization_Section1100_a
   '6 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and E2E_2015Itemization_Section1100_b
   '7 Forms_2015Itemization,SetFeeDetails and SetFeeDetails and E2E_2015Itemization_Section1100_c
   '8 Tools_FundingWorksheet4,VerifyFeeDetails and 2287_WorkFlow_2015Item_FundingSheet_1101a
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 actual steps
    '1 Originate  a new loan from Pipeline->click on the Pipeline tab->click on the Add button to create a new loan file->click on the 'New Loan' button 
    '2 Go to Pipeline , choose the loan file created, click the edit button and save the loan
    '3 Update the Borrower first name and Last  name, enter the data stated below, and save it:
    ' *Borrower Summary - Origination*:
    ' Appraised Value (356): $100k
	' Purpose of Loan (19): Purchase
	' Loan Type (1172): Conventional 
	' Lien Position (420): First
	' Property Will Be (1811): Primary
	' Amortization Type (608): Fixed
	' Purchase Price (136):  $100,000
	' Down Payment (1771):  10%
	' Down Payment (1335):  $10k
	' Loan Amount (1109): $90k
	' Note Rate (3): 5%
	' Qual Rate (1014): 5%
	' Term (4): 360
	' Due In (325): 360
	' *1003 Page1* :  
	' Address (1416) : 123 main street
	' City (1417) : Fremont
	' State (1418) : CA
	' Zip (1419) : 94536
	'*2015 Itemization*:  1100 Section
	' Borrower Paid Column:
	' 902:  $1,350
	' 903 (Edit Icon):  Rate = 0.45
	' 903 (Field 230):  $34.26
	' 904 (go to 1004 & click on Edit icon, enter 1.25 for Rate (Field 1752)):  $104.17
	' Fee Details Pop-Up:
	' Line 902:  $25 Lender POC
	' Line 903:  $25 Broker POC 
	' Line 904:  $25 Other POC
   'Step2 actual steps
	'1 Go to 2015 Itemization ->  900 Section
	' click on the Edit icon from line item 902 (MI) (Field 337) click GetMI button"
	' Click the Close button for MI (902)
   'Step3 actual steps
    '1 Go to 2015 Itemization  > Section 900 
   'Step4 actual steps
    '1 2015 Itemization -> Section 1000 > Aggregate Button -> click on the 'Aggregate' button next to line item 1011 (Field 558)
   'Step5 actual steps
    '1 2015 Itemization -> Section 1000 -> Line 1002
   'Step6 actual steps
    '1 2015 Itemization -> Section 1000 -> Line 1003
   'Step7 actual steps
    '1 2015 Itemization -> Section 1000 -> Line 1004
   'Step8 actual steps
    '1 2015 Itemization  > Section 1000 > Seller Paid (Lines 1002-1004)	24	2015 Itemization  > Section 1000 > Line 1002 > Fee Details	
   'Step9 actual steps
    '1 2015 Itemization  > Section 1000 > Line 1002 -> go to line item 1002 (Field 230)	2015 Itemization  > Section 1000 > Line 902 -> Paid By -> go to the Paid By drop down for line 902	
   'Step10 actual steps
    '1 2015 Itemization  > Section 1000 > Line 1003 > Fee Details 2015 Itemization  > Section 1000 > Line 1003	go to line item 1003 (Field 232)
   'Step11 actual steps
    '1 2015 Itemization -> Section 1000 -> go to the Paid By drop down for line 1003 2015 Itemization -> Section 1000 -> Line 1004 -> Fee Details
   'Step12 actual steps
    '1 2015 Itemization -> Section 1000 -> Line 1004	go to line item 1004 (Field 231) 2015 Itemization -> Section 1000 -> Line 1004 > Paid By ->go to the Paid By drop down for line 1004
   'Step13 actual steps
    '1 Tools -> Funding Worksheet -> scroll down to the bottom of the worksheet to view the fees
   'Step14 actual steps
    '1 Scroll down to the bottom of the worksheet to view the fees click on the check boxes next to each of the CD Line #
'@ ExpectedResult:
  'Step1 Expected steps
    '1 User able to update the loan
  'Step2 Expected steps
    '1"MIP/PMI/Guarantee Fee Calculation pop-up window:
	' field 1107 = 1.5% = $1,350
	' field 1199 = 0.5%
	' field 1198 = 120
	' field 1201 = 0.25%
	' field 1200 = 240 
	' field 1205 = 78%"
  'Step3 Expected steps
  	' 903 (Field 642):  $68.52
	' 904 (Field NEWHUD.X591):  $208.34
	' loan should update
	' 903 (Field 642):  $18.48
	' 903 (Field 230):  $34.24"
	' Total Broker Amount Paid (Field NEWHUD2.X2197 & NEWHUD2.X2204):  $1375
    ' Total Fee Amount (Field NEWHUD2.X2181):  $1350
    ' Section 32 Points and Fees (Field NEWHUD2.X2205):   -$75" 902:  B
    ' Total Broker Amount Paid (Field NEWHUD2.X2233 & NEWHUD2.X2237):  $93.52
    ' Total Fee Amount (Field NEWHUD2.X2214):  $68.48
    ' Section 32 Points and Fees (Field NEWHUD2.X2238):   $0"903:
    ' Total Lender Amount Paid (Field NEWHUD2.X2269 & NEWHUD2.X2270):  $233.34
    ' Total Fee Amount (Field NEWHUD2.X2181):  $208.34"
  'Step4 Expected steps
    ' Aggregate Adjustment (Field 558):  $175.91
  'Step5 Expected steps
	' Field 1387:  2
	' Field 230:  $34.24
	' Field 656:  $18.48
	' Field 596:  $50
	' Field SYS.X317:  B"   
  'Step6 Expected steps
	' Field 1296:  2
	' Field 232:  $37.50
	' Field 338:  $25.00
	' Field 563:  $50
	' Field SYS.X319:  L"
  'Step7 Expected steps
    ' Field 1386:  2
	' Field 231:  $104.17
	' Field 655:  $158.34
	' Field 595:  $50
	' Field SYS.X323:  Blank
  'Step8 Expected steps
    ' loan should update
	' Total Broker Amount Paid (Field NEWHUD2.X2560 & NEWHUD2.X2567):  $25
	' Total Fee Amount (Field NEWHUD2.X2544):  $68.48
	' Section 32 Points and Fees (Field NEWHUD2.X2568):   $0"
  'Step9 Expected steps
    ' 1002 (Field 656):  $18.48" 1002:  B
  'Step10 Expected steps
    ' "Total Lender Amount Paid (Field NEWHUD2.X2596 & NEWHUD2.X2600:  $25.00
	' Total Fee Amount (Field NEWHUD2.X2577):  $75
	' Section 32 Points and Fees (Field NEWHUD2.X2601):   $0"
	' 1003(Field 232):  $37.50
	' 1003 (Field 338):  $25.00"
  'Step11 Expected steps
    ' 1003:  L
	' Total Other Amount Paid (Field NEWHUD2.X2632 & NEWHUD2.X2633):  $25.00
	' Total Fee Amount (Field NEWHUD2.X2610):  $208.34
  'Step12 Expected steps
    ' 1004 (Field 655):  $158.34
	' 1004:  O
  'Step13 Expected steps
    '1 Total Lender Amount Paid (Field NEWHUD2.X2893 & NEWHUD2.X2897):  $25.00
    ' "CD Line:
	' 902:  B.01  
	' 902:  B.01
	' 903:  F.01
	' 903:  F.01
	' 904:  F.04
	' 904:  F.04
	' 1002:  G.01
	' 1002:  G.01
	' 1003:  G.02
	' 1003:  G.02
	' 1004:  G.03
	' 1004:  G.03
	' 1011:  G.08
	'2 Itemization Line #:
	' 902.
	' 902.
	' 903.
	' 903.
	' 904.
	' 904.
	' 1002.
	' 1002.
	' 1003.
	' 1003.
	' 1004.
	' 1004.
	' 1011.
	'3 Fee Description:
	' 902.  Mortgage Insurance Premium
	' 902.  Mortgage Insurance Premium
	' 903. Homeowner's Insurance Premium
	' 903. Homeowner's Insurance Premium
	' 904. Property Taxes
	' 904. Property Taxes
	' 1002. Homeowner's Insurance
	' 1002. Homeowner's Insurance
	' 1003. Mortgage Insurance
	' 1003. Mortgage Insurance
	' 1004. Property Taxes
	' 1004. Property Taxes
	' 1011. Aggregate Adjustment"
	'4 Paid By:
	' 902.  Broker
	' 902.  Seller
	' 903.  Lender
	' 903.  Seller
	' 904.  Other
	' 904.  Seller
	' 1002. Broker
	' 1002. Seller
	' 1003. Lender
	' 1003. Seller
	' 1004. Borrower
	' 1004. Seller
	' 1011. Blank"
	'5 Paid To:
	' 902.  Lender/Other  
	' 902.  Lender/Other  
	' 903.  Lender/Other  
	' 903.  Lender/Other  
	' 904.  Lender/Other  
	' 904.  Lender/Other  
	' 1002. Lender/Other  
	' 1002. Lender/Other  
	' 1003. Lender/Other  
	' 1003. Lender/Other 
	' 1004. Lender/Other  
	' 1004. Lender/Other  
	' 1011. Lender/Other 
	' Amount:
	' 902: $1,275.00
	' 902: $50.00
	' 903:   -$6.52
	' 903:  $50.00
	' 904:  $133.34
	' 904:  $50.00
	' 1002:  $18.48
	' 1002:  $50.00
	' 1003:  $25.00
	' 1003:  $50.00
	' 1004:  $158.34
	' 1004:  $50.00
	' 1011:   -$175.9
  'Step14 Expected steps
    '1 PAC BROKER 902:  $1,350.00 1002:  $25.00 
    '  PAC LENDER 903:  $68.52 1003:  $25.00
    '  PAC OTHER 904:  $208.34 1004:  $25.00
    '  POC BROKER 902:  $25.00
    '  POC LENDER 903:  $25.00
    '  POC OTHER 904:  $25.00
    '2 Total Deductions (1989): $1,752.73 
    '  Lender Credits (4083):  $118.52
    '  Wire Transfer Amount (1990):  $89,665.79
  'Step15 Expected steps    
	'1  Wire Transfer Amount (1990):  $89,715.79
	'2  Lender Credits:  $118.52
	'3  Total Loan Amount:  $$91,300.00
	'   Total Debits:  $91,418.52
	'4  Wire Transfer Amount:  $89,675.00
	'   Total Credits:  $90,950.00
	'5  Credit Description:
	'6  Total Credits:  $90,000
	'   Wire Transfer Amount:  $89,625.00
	'7  LE Disclosure record information should display in the Disclosure History pane
	'8  CD Disclosure record information should display in the Disclosure History pane
	'9  Disclosure should be emailed successfully & documents added to the Documents pane in the Documents tab    
'***************************************************************************************************
Dim strRowIDCommon, objData,intRowVal,boolVal

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2284","Workflow between 2015 Itemization and Funding Worksheet - 900 & 1000 Section", Null

'====== Go to Pipeline>>NewLoanButton>>Forms ====== 
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'Set data in Borrower summary Origination Page and Create  Loan
BIZ_BorrowerSummaryOrigination_SetBorrower "2770_WorkFlow_2015Item_FundingSheet_2284"
BIZ_BorrowerSummaryOrigination_SetProperty "2770_WorkFlow_2015Item_FundingSheet_2284"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2770_WorkFlow_2015Item_FundingSheet_2284"
BIZ_1003Page1_SetMailingAddress "2770_WorkFlow_2015Item_FundingSheet_2284"
BIZ_RegZ_LE_SetDisclosureInformation "2770_WorkFlow_2015Item_FundingSheet_2284"

BIZ_Forms_Open "2015 Itemization"

'Click on edit button 902 section and set MIand PI details
BIZ_2015Itemization_EditFieldButton_SetMiandPiDetails 3, "2770_WorkFlow_2015Item_FundingSheet_2284"

'Set data in 902 Section and Validate the Fee details
BIZ_2015Itemization_Set900Section "2770_WorkFlow_2015Item_FundingSheet_2284_902"     
BIZ_2015Itemization_SetFeeDetails "902","2770_WorkFlow_2015Item_FundingSheet_2284_902" 
BIZ_2015Itemization_ValidateFeeDetails "902","2770_WorkFlow_2015Item_FundingSheet_2284_902"

 
Set objData 			   = FRM_DS_GetTestData("Forms_2015Itemization", "Set900Section", "2770_WorkFlow_2015Item_FundingSheet_2284")
Set obj2015ItemzationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
Set objInsuranceDialog    = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=InsuranceDialog")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "L251_Months")) Then
	GUI_WebEdit_Set obj2015ItemzationPage.WebEdit("html id:=l_L251"), FRM_DS_GetValue(objData, "L251_Months")
End If

GUI_WebButton_Click obj2015ItemzationPage.WebButton("html id:=StandardButton4") 

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "1311_Rate")) Then
 GUI_WebEdit_Set objInsuranceDialog.SwfEdit("swfname:=rateTxt"), FRM_DS_GetValue(objData, "1311_Rate")
End If

GUI_WebButton_Click  objInsuranceDialog.SwfButton("swfname:=okBtn")
   
'Set data in 903 Section and Validate the Fee details
BIZ_2015Itemization_Set900Section "2770_WorkFlow_2015Item_FundingSheet_2284_903"    
BIZ_2015Itemization_SetFeeDetails "903","2770_WorkFlow_2015Item_FundingSheet_2284_903" 
BIZ_2015Itemization_ValidateFeeDetails "903","2770_WorkFlow_2015Item_FundingSheet_2284_903"

'Click on 1004 edit Button and set data 
GUI_WebButton_Click obj2015ItemzationPage.WebButton("html id:=StandardButton6")

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=InsuranceDialog"),30) Then
	GUI_SwfEdit_Set objInsuranceDialog.SwfEdit("swfname:=rateTxt"), FRM_DS_GetValue(objData, "RateTxt_1004")
End If

GUI_WebButton_Click  objInsuranceDialog.SwfButton("swfname:=okBtn")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "NEWHUD2.X4397_Mnths")) Then
	GUI_WebEdit_Set obj2015ItemzationPage.WebEdit("html id:=TextBox658"), FRM_DS_GetValue(objData, "NEWHUD2.X4397_Mnths")
End If

'Set data in 904 Section and Validate the Fee details
BIZ_2015Itemization_Set900Section "2770_WorkFlow_2015Item_FundingSheet_2284_904"    											'seller  and paid by ned to 
BIZ_2015Itemization_SetFeeDetails "904","2770_WorkFlow_2015Item_FundingSheet_2284_904" 											'Set broker poc,pac
BIZ_2015Itemization_ValidateFeeDetails "904","2770_WorkFlow_2015Item_FundingSheet_2284_904"

Set objData 	= FRM_DS_GetTestData("Forms_1003Page", "SetMiandPiDetails", "2770_WorkFlow_2015Item_FundingSheet_2284")
Set obj1003Page = SwFwindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objMIPWin 	= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog")

GUI_WebButton_Click obj1003Page.WebButton("html id:=StandardButton5")
    
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "1757_Calculate")) Then
    GUI_SwfComboBox_Select objMIPWin.SwfComboBox("swfname:=typeCombo"),FRM_DS_GetValue(objData, "1757_Calculate")
End If

GUI_SwfButton_Click objMIPWin.SwfButton("swfname:=okBtn")

'Set data in Escrow Table Window
E2E_Workflow2015Itemzation_1000Section_InitialEscrowAccountSetup_SetData "2770_WorkFlow_2015Item_900Borrower_Aggregate"

'Set data in 1002,1003,1004 Section
BIZ_2015Itemization_Set1000Section "2770_WorkFlow_2015Item_FundingSheet_2284_1002"
BIZ_2015Itemization_Set1000Section "2770_WorkFlow_2015Item_FundingSheet_2284_1003"
BIZ_2015Itemization_Set1000Section "2770_WorkFlow_2015Item_FundingSheet_2284_1004"

'Set Fee Details and Validate in 1002 Section
BIZ_2015Itemization_SetFeeDetails "1002","2770_WorkFlow_2015Item_FundingSheet_2284_1002" 
BIZ_2015Itemization_ValidateFeeDetails "1002","2770_WorkFlow_2015Item_FundingSheet_2284_1002"

'Set Fee Details and Validate in 1003 Section 
BIZ_2015Itemization_SetFeeDetails "1003","2770_WorkFlow_2015Item_FundingSheet_2284_1003" 
BIZ_2015Itemization_ValidateFeeDetails "1003","2770_WorkFlow_2015Item_FundingSheet_2284_1003"

'Set Fee Details and Validate in 1004 Section
BIZ_2015Itemization_SetFeeDetails "1004","2770_WorkFlow_2015Item_FundingSheet_2284_1004" 
BIZ_2015Itemization_ValidateFeeDetails "1004","2770_WorkFlow_2015Item_FundingSheet_2284_1004"

'Validate the fee details in Funding fee table and check check boxes
BIZ_FundingWorksheet_FundingFeeTable_FeeDetails_Validate "2770_WorkFlow_2015Item_FundingSheet_RowIds_900and1000"
BIZ_FundingWorksheet_CheckFeeLines()

'Validate the total deductions
Set objData = FRM_DS_GetTestData("Tools_FundingWorKSheet", "VerifyFeeDetails", "2770_WorkFlow_2015Item_FundingSheet_900and1000")

GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxDeduction"), FRM_DS_GetValue(objData, "1989_TotalDeductions"),"Total Deductions"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxLenderCredit"), FRM_DS_GetValue(objData, "4083_LenderCredits"),"Lender Credits"
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfEdit("swfname:=textBoxWireAmount"), FRM_DS_GetValue(objData, "1990_WireTransferAmt"),"Wire Transfer Amount"

Set objData 			  = Nothing
Set obj2015ItemzationPage = Nothing
Set objInsuranceDialog    = Nothing
Set obj1003Page 		  =	Nothing
Set objMIPWin 			  = Nothing

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-2285","Workflow between 2015 Itemization and Funding Balancing Worksheet - 900 & 1000 Sections", Null

strRowIDCommon =  "2770_WorkFlow_2015Item_FundingSheet_900and1000"

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
WorkFlow2015Itemization_FundingBalancingWorksheet_900and1000Section_Credits_Validate strRowIDCommon

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

'Verify the Items Credit Grid of funding balancing WorkSheet for Overwire Amount Null
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
'
'GUI_Object_WaitTillEnabledX SwfWindow("swfname:=eFolderDialog"),180
'GUI_Window_Close SwfWindow("swfname:=eFolderDialog")
'
'Wait g_ShortWaitMedium
'intRowVal = BIZ_GetRowOfDisclosureType ("Revised","Yes","LE")
'boolVal = UTIL_String_IsNotEmpty(intRowVal)
'FRM_VerifyTrue boolVal,"Verify LE Disclosure record information should display in the Disclosure History pane","Displayed the Required information"
'
''Save Loan
'BIZ_Loan_Save
