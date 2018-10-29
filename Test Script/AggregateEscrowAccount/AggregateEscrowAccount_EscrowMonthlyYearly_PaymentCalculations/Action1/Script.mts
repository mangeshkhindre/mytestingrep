'@**************************************************************************************************
'@ TestStory: PTAC-2771 Aggregate Escrow Account 
'@ TestCase: PTAC-1078 Aggregate Escrow Account - Verify Escrow Monthly Payment, Yearly Payment and Escrowed Payment calculations
'@ Test Automation JIRA Task: PTAC-2792 AggregateEscrowAccount_VerifyEscrowMonthlyYearlyAndEscrowedPaymentCalculations
'@ TestData: 
	'1 Forms_AggregateEscrowAccount, SetData, PTAC-1078_SetData
	'2 Forms_AggregateEscrowAccount, SetData, PTAC-1078_DeleteCityTaxDueDate
	'3 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-1078_SetData
	'4 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1078_SetData
	'5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1078_SetData
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: Validate monthly escrows can be inputted, Yearly Amounts calculated, Escrowed checkboxes are checked, and Total Monthly Payment/Escrowed Payments are calculated
	'1 Yearly Escrow = (Monthly Escrow Amount * 12)
	'2 Total Monthly Payment = Sum of Monthly Escrow amounts 
	'3 Escrowed Payment = Sum of Scheduled Monthly Escrowed amount:
 '@ TestSteps:
	'1 Create a new loan with basic borrower information as mentioned in the test data.
	'2 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'3 In the 'Aggregate Escrow Account' form:
	  '1 Select '1st Payment Date' as 1st of next calendar month.
	  '2 Enter the Monthly Escrow amount as per the test data.
	  '3 Check the Yearly Escrow amount
	'4 Verify the 'Total Monthly Payment' field
	'5 Verify the 'Escrowed' and 'Escrowed Payment' fields before scheduling the Escrow Setup.
	'6 Click on 'Setup' button  in 'Aggregate Escrow Account' form.
	'7 In the 'Initial Escrow Account Setup' window: For all the escrow types, enter the 'Due Date 1' as '1st Payment Date' and click on tab.
	'8 Click on 'OK' in 'Initial Escrow Account Setup' window.
	'9 In the 'Aggregate Escrow Account' form, verify the 'Escrowed' check boxes after scheduling the Escrow Setup.
	'10 Verify the 'Escrowed Payment' field after scheduling the Escrow Setup.
	'11 Click on 'Setup' button.
	'12 In the 'Initial Escrow Account Setup' window: Delete the 'Due Date 1' date for 'City Taxes' (City Property Tax)
	'13 In the 'Aggregate Escrow Account' form, verify the 'Escrowed Payment' field after removing the 'City Taxes' escrow schedule.
'@ ExpectedResult:
	'1 A new loan with basic borrower information is created.
	'2 Aggregate Escrow Form is opened.
	  '1 1st payment date is displays the selected date.
	  '2 'Monthly' escrow amounts are displayed as per the test data.
	  '3 'Yearly' amount for all the escrow fees is calculated as: Monthly escrow amount * 12 (for all the escrows)
	'3 Total Monthly Payment' field should display the sum of Monthly escrow fees entered:
	'  Total Monthly Payment = (Tax + Hazard Insurance + Mortgage Insurance + Flood Insurance + City Property Tax)
	'4 For all the Escrows, all the 'Escrowed' check boxes should be 'Unchecked' and grayed out.
	'5 Escrowed Payment' field should be empty.
	'6 'Initial Escrow Account Setup' window is opened.
	'7 First payment Date is displayed as '1st Payment Date' selected date.
	'8 'The 'Due Date month' row i.e. 3/2017 is updated with '12' (months) for all the escrow columns.
	'9 Changes are saved and 'Initial Escrow Account Setup' window gets closed.
	'10 For the scheduled escrows i.e. for the below, 'Escrowed' check boxes should be 'Checked' and grayed out:
	   '1 Tax
	   '2 Hazard Insurance
	   '3 Mortgage Insurance
	   '4 Flood Insurance
	   '5 City Property Tax
	'11 Escrowed Payment' field should display the sum of scheduled monthly escrow fees: (Tax + Hazard Insurance + Mortage Insurance + Flood Insurance + City Property Tax)
	'12 City Taxes column displays empty values for below rows: Due Date 1, Due Date month' row i.e. '3/2017'
	'13 Should not calculate the monthly 'City Property Tax' amount in 'Escrowed Payment'.
	'14 Escrowed Payment' field should display the sum of only scheduled monthly escrow fees: (Tax + Hazard Insurance + Mortgage Insurance + Flood Insurance)
'***************************************************************************************************

FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1078", "Aggregate Escrow Account - Verify Escrow Monthly Payment, Yearly Payment and Escrowed Payment calculations", Null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Open Borrower Summary - Origination Form ======
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-1078_SetData"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1078_SetData"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-1078_SetData"
BIZ_Loan_Save()

'====== Open Aggregate Escrow Account Form ======
'====== Set Data in Aggregate Escrow Account Form ======
BIZ_Forms_Open "Aggregate Escrow Account"
BIZ_AggregateEscrowAccount_SetData "PTAC-1078_SetData"

'====== Verify Escrowed Total Monthly Payment and Yearly Payment ======
'====== Verify Escrowed CheckBoxes before scheduling ======
'====== Verify Escrowed Payment before scheduling ======
AggregateEscrowAccount_VerifyEscrowYearlyAndTotalMonthlyPayment "PTAC-1078_SetData"
AggregateEscrowAccount_VerifyEscrowedCheckBoxes "BeforeScheduling"
AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "BeforeScheduling"

'====== Validate First payment Date is displayed as '1st Payment Date' selected date ======
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("html id:=Button1", "index:=0")
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=HUD1ESSetupDialog"), 30
AggregateEscrowAccount_SetupWindow_ValidateFirstPaymentDate "PTAC-1078_SetData"

'====== Verify Escrowed CheckBoxes after scheduling ======
'====== Verify Escrowed Payment after scheduling ======
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1078_SetData"
AggregateEscrowAccount_VerifyEscrowedCheckBoxes "AfterScheduling"
AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "AfterScheduling"

'====== Delete City Tax Due Date1 ======
'====== verify the 'Escrowed Payment' field after removing the 'City Taxes' escrow schedule. ======
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1078_DeleteCityTaxDueDate"
AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "AfterDeleteCityTaxDueDate"
BIZ_Loan_Exit True

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null) 
