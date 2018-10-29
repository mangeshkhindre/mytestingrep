'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-1112 - TC 3 - CBIZ-3873 Verify Homeowner’s Insurance and Property Taxes calculation should be defaulted to use	
   '2 PTAC-1113 - TC 4- CBIZ-3873 Verify Homeowner’s Insurance and Property Taxes calculation should be defaulted to use As Completed Appraised Value
'@ Test Automation JIRA Task: PTAC-1649 ConstructionManagement_ConstrPerm_HomeInsPropTax_AppraisedValue
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetBorrower and 1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'2 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'3 Forms_BorrowerSummaryOrigination, SetProperty and 1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'4 Forms_BorrowerSummaryOrigination, SetBorrower and 1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'5 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'6 Forms_BorrowerSummaryOrigination, SetProperty and "1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'7 Forms_ClosingDisclosurePage, SetClosingInformation and  1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'8 Forms_ClosingDisclosurePage, SetClosingInformation and  1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'9 Forms_1003page, 1003Page1 and  1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'10 Forms_1003page, 1003Page1 and  1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'11 ConstructionManagement, SetLoanInfo and  1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'12 ConstructionManagement, SetLoanInfo and  1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'13 Forms_2015 Itemization, SetFeeDetails and 1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'14 Forms_2015 Itemization, SetFeeDetails and 1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
	'15 Forms_1003Page, 1003Page2 and 1352_ConstrLoan_AsAppraisedVal_IntAqChck
	'16 Forms_1003Page, 1003Page2 and 1352_ConstrLoan_AsAppraisedVal_IntAqUnChck
'@ Pre-conditions: 
'@ Description: Construction Management ConstrPerm HomeInsPropTax Calculation as AppraisedValue Validation
   '1 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '2 Click on New Bank Loan button
   '3 Enter the data mentioned in Test Data column, save.
   '4 Navigate to 1003 page 1 and enter details for below field
	  'Original Cost ( 21)
	  'Existing Lien(10)
	  'Presentalue of Lot (a) (22)
	  'Cost of Improvements (b)(23)
   '5 Navigate to Construction Management > Loan Info tab and check the Field 1964 (Initial Acquisition of Land) is checked
   '6 Go to 2015 Itemization,
      'Line Item 903 - when edit box is opened then the calculations are defaulted as  'As Completed Purchase Price' and enter 1% for the rate, click Ok on pop up
      'Line Item 1004 - when edit box is opened then the calculations are defaulted as  As Completed Purchase Price and enter 1% for the rate,click Ok on pop up
   '7 Go to 1003 Page 2, RE taxes(Proposed) click on Edit box, Verify Proposed Housing Real Estate Taxes (Field 1405) 
   '8 Navigate to Borrower Summary - Origination form, update purpose of loan field and save the loan
   '9 Go to 1003 Page 2, click on Edit box,Verify Proposed Housing Hazard Insurance (Field 230) 
  '10 Go to 1003 Page 2, click on Edit box,Verify Proposed Housing Real Estate Taxes (Field 1405)  
'@ ExpectedResult:
   '1 New Loan pop up displayed
   '2 It navigates to Loan tab
   '3 The Loan is created with a Construction Only
   '4 Data should be entered successfully 
   '5 Field 1964 (Initial Acquisition of Land) should be  checked
   '6 It should display the drop down with 'As Completed Purchase Price' for Homeowner’s Insurance 903 Line item value will display as '141.67'As Completed Purchase Price' for Property Taxes 
     '1004 Line item value will display as '141.67'
   '7 As Completed Purchase Price' for RE Taxes option will display  and value '141.67' to be displayed in the text box
   '8 Loan should be saved successfully
   '9 It should display the drop down with 'As Completed Purchase Price' for Homeowner’s Insurance 903 Line item value will display as '141.67' (F231'As Completed Purchase Price' for Property Taxes
     '1004 Line item value will display as '141.67' (F231
'***************************************************************************************************


BIZ_Forms_Open "Borrower Summary - Origination"

'Set Basic Borrower info in borrower section
BIZ_Common_BorrowerSummaryOrigination_SetBorrower SwfWindow("swfname:=MainForm").Page("micclass:=Page"), Parameter("strRowID")

'SetTransaction details in transaction section
BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails SwfWindow("swfname:=MainForm").Page("micclass:=Page"), Parameter("strRowID")

'Set property details in  property section
BIZ_Common_BorrowerSummaryOrigination_SetProperty SwfWindow("swfname:=MainForm").Page("micclass:=Page"), Parameter("strRowID")


'Set Data in ClosingDisclosurePage1 page
BIZ_ClosingDisclosurePage1_SetClosingInformation Parameter("strRowID")

'Set Data in 1003Page1 
BIZ_1003Page1_SetData Parameter("strRowID")

BIZ_Loan_save

'Validate the HomeInsurance and PropertyTaxes calculation as As Appraised value in 2015 Itemization and 1003 Page 2
ConstructionManagement_HomeInsuranceandPropertyTaxes_Validate Parameter("strRowID"),Parameter("strCheckOnorOff"),Parameter("strConstrOnlyRowID"),Parameter("strConstrPermRowID")





