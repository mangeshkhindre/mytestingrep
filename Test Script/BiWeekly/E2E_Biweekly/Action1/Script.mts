
'@**************************************************************************************************
'@ TestStory:CBIZ-13631
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: 
		'1 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_Biweekly
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: " ValidateF5 (Monthly Payment) ,F228 (Proposed P&I) , F1724 (First Mtg P&I) for variou Combinations of Term and Lien Positions
	
 '@ TestSteps:
	'1 Create a new loan with basic borrower information as mentioned in the test data.
	'2 Navigate to FNMA Streamlined 1003 to set Biweekly ON
 '@ ExpectedResult:
	'1 Open Borrower Summary - Origination Form and validate F5 (Monthly Payment) = $581.56
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
	
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: CBIZ-13028", "Script Name - E2E_BiWeekly_Loan_Term_Calculattions", Null

RunAction "VerifyLienValue_NoteRate", oneIteration
RunAction "VerifyLoanTermsCalculations", oneIteration

BIZ_Login_UserLogout()





















































































''====== Verify Escrowed Total Monthly Payment and Yearly Payment ======
''====== Verify Escrowed CheckBoxes before scheduling ======
''====== Verify Escrowed Payment before scheduling ======
'AggregateEscrowAccount_VerifyEscrowYearlyAndTotalMonthlyPayment "PTAC-1078_SetData"
'AggregateEscrowAccount_VerifyEscrowedCheckBoxes "BeforeScheduling"
'AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "BeforeScheduling"
'
''====== Validate First payment Date is displayed as '1st Payment Date' selected date ======
'GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("html id:=Button1", "index:=0")
'GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=HUD1ESSetupDialog"), 30
'AggregateEscrowAccount_SetupWindow_ValidateFirstPaymentDate "PTAC-1078_SetData"
'
''====== Verify Escrowed CheckBoxes after scheduling ======
''====== Verify Escrowed Payment after scheduling ======
'BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1078_SetData"
'AggregateEscrowAccount_VerifyEscrowedCheckBoxes "AfterScheduling"
'AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "AfterScheduling"
'
''====== Delete City Tax Due Date1 ======
''====== verify the 'Escrowed Payment' field after removing the 'City Taxes' escrow schedule. ======
'BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1078_DeleteCityTaxDueDate"
'AggregateEscrowAccount_VerifyEscrowedPayment "PTAC-1078_SetData", "AfterDeleteCityTaxDueDate"
'BIZ_Loan_Exit false
'
''===== To logout from Encompass =====
'BIZ_Login_UserLogout()  
'FRM_RT_TearDownTest(Null) 
'
'gui















