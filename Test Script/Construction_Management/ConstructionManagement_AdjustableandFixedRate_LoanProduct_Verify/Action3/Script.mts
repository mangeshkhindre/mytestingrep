'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-615 TC 1 - CBIZ-4696 - Construction Loans - Loan Product (LE1.X5) logic for Amortization Type - Fixed Rate	
   '2 PTAC-801 TC 1 - CBIZ-4696 - Construction Loans - Loan Product (LE1.X5) logic for Amortization Type - Fixed Rate
'@ Test Automation JIRA Task: PTAC-1737", "ConstructionManagement_AdjustableandFixedRate_LoanProductVerify"
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetBorrower,"PTAC-1352_LEandCD_Amortization_Fixed"
   '2 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_LEandCD_Amortization_Fixed"
   '3 Forms_BorrowerSummaryOrigination,SetTransactionDetails,"PTAC-1352_LEandCD_Amortization_Fixed"
   '4 Forms_BorrowerSummaryOrigination,SetBorrower,"PTAC-1352_LEandCD_Amortization_ARM"
   '5 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_LEandCD_Amortization_ARM"
   '6 Forms_BorrowerSummaryOrigination,SetTransactionDetails,"PTAC-1352_LEandCD_Amortization_ARM"
   '7 Forms_RegZ-LE,SetConstruction,PTAC-1352_LEandCD_Amortization_6P
   '8 Forms_RegZ-LE,SetConstruction,PTAC-1352_LEandCD_Amortization_12P
   '9 Forms_RegZ-LE,SetConstruction,PTAC-1352_LEandCD_Amortization_13P
   '10 Forms_RegZ-LE,SetConstruction,PTAC-1352_LEandCD_Amortization_24P
   '11 Forms_RegZ-LE,SetConstruction,PTAC-1352_LEandCD_Amortization_25P
   '12 Forms_RegZ-CD,RegZ-CD,PTAC-1352_LEandCD_Amortization_Fixed
   '13 Forms_RegZ-CD,RegZ-CD,PTAC-1352_LEandCD_Amortization_ARM
   '14 Forms_RegZ-LE,SetARM,PTAC-1352_LEandCD_Amortization_ARM
'@ Pre-condition
'@ Description: Verify Loan Product for Fixed and Adjustable Interest Rate for a period of 6Months,12Months,13Months,24Months,25Months
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to Forms -> Loan Estimate Page 1 and Verify values for fields LE1.X5 (Product) under 'Amortization Type' section
   '6 Click on Print icon Go to StandardForms tab, select 'Loan Estimate' under 'Look In-General Forms' dropdown option, click on 'Add' button, 
   '7 Click on 'Preview' button, and Verify the 'Product' on the top right corner of page 1 of the PDF
   '8 Go to Forms -> CD Page 1, under 'Loan Information' section Verify values for fields LE1.X5 (Product)
   '9 Click on Print icon Go to StandardForms tab, select 'Closing Disclosure' under 'Look In-General Forms' dropdown option, click on 'Add' button, 
   '10 Click on 'Preview' button, and Verify the 'Product' on the top right corner of page 1 of the PDF
   '11 Go to Forms RegZ-LE and Enter 12 for Period (Field ID 1176), save
   '12 Repeat Step 2 to 5 and verify LE1.X5 (Product)
   '13 Go to Forms RegZ-LE and Enter 13 for Period (Field ID 1176), save
   '14 Repeat Step 2 to 5 and verify LE1.X5 (Product)
   '15 Go to Forms RegZ-LE and Enter 14 for Period (Field ID 1176), Save
   '16 Repeat Step 2 to 5 and verify LE1.X5 (Product)
   '17 Go to Forms RegZ-LE and Enter 24 for Period (Field ID 1176), Save
   '18 Repeat Step 2 to 5 and verify LE1.X5 (Product)
   '19 Go to Forms RegZ-LE and Enter 25 for Period (Field ID 1176), Save
   '20 Repeat Step 2 to 5 and verify LE1.X5 (Product)   
'@ ExpectedResult:
   '1 Admin should be able to login successfully,New Loan pop up displayed,It navigates to Loan tab,The Loan is created.
   '2 The value to be displayed for the 'Product' LE1.X5 should be  '5 mo. Interest Only, Fixed Rate'
   '3 The Loan Estimate should display under 'Selected Forms'
   '4 Rename the newly created Escrow record ,that populates in Escrow grid
   '5 It should display 'Product'(LE1.X5) should be  "5 mo. Interest Only, Fixed Rate" and for Adjustable Rate
   '6 It should display 'Product'(LE1.X5) should be  "5 mo. Interest Only, Fixed Rate" and for Adjustable Rate
   '7 The Print popup window will display,The 'Closing Disclosure' should display under 'Selected Forms'
   '8 It should display 'Product'(LE1.X5) should be  "5 mo. Interest Only, Fixed Rate"
   '9 For Period (Field ID 1176) Values should be entered and loan should be saved successfully.
   '10 LE1.X5 (Product) should be  "11 mo. Interest Only, Fixed Rate" and for Adjustable Rate
   '11 For Period (Field ID 1176) Values should be entered and loan should be saved successfully.
   '12 LE1.X5 (Product) should be  "1 Year Interest Only, Fixed Rate" and for Adjustable Rate
   '13 For Period (Field ID 1176) Values should be entered and loan should be saved successfully.
   '14 LE1.X5 (Product) should be  13 mo. Interest Only, Fixed Rate and for Adjustable Rate
   '15 For Period (Field ID 1176) Values should be entered and loan should be saved successfully.
   '16 LE1.X5 (Product) should be  "23 mo. Interest Only, Fixed Rate" and for Adjustable Rate
   '17 For Period (Field ID 1176) Values should be entered and loan should be saved successfullay.
   '18 LE1.X5 (Product) should be  "2 Year Interest Only, Fixed Rate" and for Adjustable Rate
'***************************************************************************************************

'Navigate to Pipeline Tab>Create loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"

'Set Borrower Data in Borrower Summary Origination
BIZ_BorrowerSummaryOrigination_SetBorrower Parameter("strRowID")
BIZ_BorrowerSummaryOrigination_SetProperty Parameter("strRowID")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails Parameter("strRowID")

'Set Disbursement period in RegZ_CD form 
BIZ_RegZ_CD_SetData Parameter("strRowID")

If Parameter("strAmortizationType") = "AdjustableRate" Then
	BIZ_RegZ_LE_SetAdjustableRateMortgage Parameter("strRowID")
End If

'Save Laon 
BIZ_Loan_Save()



