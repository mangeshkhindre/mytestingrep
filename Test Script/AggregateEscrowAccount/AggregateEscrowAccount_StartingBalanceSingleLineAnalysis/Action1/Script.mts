'@**************************************************************************************************
'@ TestStory: PTAC-2771 Aggregate Escrow Account 
'@ TestCase: PTAC-1079 Aggregate Escrow Account - Validate Escrow Starting Balance, Single Line Analysis, Aggregate Escrow Adjustment and Ending Balance
'@ Test Automation JIRA Task: PTAC-3132 AggregateEscrowAccount_ValidateStartingBalanceSingleLineAnalysis
'@ TestData: 
	'1 Forms_AggregateEscrowAccount, SetData, PTAC-1079_SetData
	'2 Forms_2015Itemization, Set1000Section, PTAC-1079_SetData
	'3 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-1079_SetData
	'4 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1079_SetData
	'5 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1079_SetData
	'6 Forms_2015Itemization, Set1000Section, PTAC-1079_VerifyMonthField
	'7 Forms_AggregateEscrowAccount, VerifyEscrowField, PTAC-1079_VerifyEscrowField
	'8 Forms_AggregateEscrowAccount, VerifyEscrowField, PTAC-1079_VerifyField
	'9 Forms_AggregateEscrowAccount, SetData, PTAC-1079_SetDueDate2
	'10 Forms_2015Itemization, Set1000Section, PTAC-1079_Verify
	'11 Forms_AggregateEscrowAccount, VerifyEscrowField, PTAC-1079_VerifyEscrowField
'@ Pre-conditions: The user is logged into Encompass.
'@ Description: Input data into Initial Escrow Account Setup screen to derive 'Aggregate Escrow Adjustment' and 'Ending Balance' calculation
'@ TestSteps:
	'1 Create a new loan with basic borrower information as mentioned in the test data.
	'2 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'3 In the 'Aggregate Escrow Account' form: Select '1st Payment Date' as 1st of next calendar month.
	'4 Click on 'Setup' button
	'5 In the 'Initial Escrow Account Setup' window, set the escrow for 12 months (set only 'Due Date 1')
	'6 For all the escrow types, enter the 'Due Date 1' as '1st Payment Date' and click on tab.
	'7 Click on 'OK' in 'Initial Escrow Account Setup' window.
	'8 Verify the 'Aggregate Escrow Account' form.
	'9 Go to Forms tab and click on '2015 Itemization' form.
	'10 In the '2015 Itemization' form: Enter the escrow data as per the test data. Click on Save button.
	'11 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'12 Validate the 'Starting Balance' field where the Escrow is paid once in a year. (set only 'Due Date 1' in 'Initial Escrow Account Setup' window)
	'13 Validate the 'Single Line Analysis' field where the Escrow is paid once in a year. (set only 'Due Date 1' in 'Initial Escrow Account Setup' window)
	'14 Validate the 'Aggregate Escrow Adjustment' field where the Escrow is paid once in a year. (set only 'Due Date 1' in 'Initial Escrow Account Setup' window)
	'15 Validate the 'Ending Balance' field. (set only 'Due Date 1' in 'Initial Escrow Account Setup' window)
	'16 Click on 'Setup' button.
	'17 In the 'Initial Escrow Account Setup' window: Set the 'Due Date 2' date for 'Haz Ins' (Hazard Insurance)
	'18 Click on OK button.
	'19 Go to Forms tab and click on '2015 Itemization' form.
	'20 In the '2015 Itemization' form:
	    'Verify the Hazard Insurance months
	    'Verify the Aggregate Adjust. Value.
	'21 Go to Forms tab and click on 'Aggregate Escrow Account' form.
	'22 Validate the 'Starting Balance' field when the Escrow is paid twice in a year. (set both 'Due Date 1' and 'Due Date 2' in 'Initial Escrow Account Setup' window)
	'23 Validate the 'Single Line Analysis' field when the Escrow is paid twice in a year. (set both 'Due Date 1' and 'Due Date 2' in 'Initial Escrow Account Setup' window)
	'24 Validate the 'Aggregate Escrow Adjustment' field when the Escrow is paid twice in a year. (set both 'Due Date 1' and 'Due Date 2' in 'Initial Escrow Account Setup' window)
'@ ExpectedResult:
	'1 A new loan with basic borrower information is created.
	'2 Aggregate Escrow Form is opened.
	'3 All the fields in the form should be empty.
	'4 1st payment date is displays the selected date.
	'5 'Initial Escrow Account Setup' window is opened.
	'6 First payment Date is displayed as '1st Payment Date' selected date.
	'7 The 'Due Date month' row i.e. 3/2017 is updated with '12' (months) for all the escrow columns.
	'8 Changes are saved and 'Initial Escrow Account Setup' window gets closed.
	'9 All the fields will be empty except '1st Payment Date'
	'10 2015 Itemization' Form is opened.
	'11 Should calculate the escrow for only 11 months, months text box should display '11'.
	    'Note: 1st month escrow amount will be paid in cash by the borrower.
	'12 Borrower column calculates the escrow as: (11 months * escrow amount)
	'13 Aggregate Escrow Form is opened.
	'14 Escrow fields in the form should be displayed with values.
	    'Starting Balance = ((Monthly Tax * 11) + (Monthly Hazard Insurance * 11) + (MI * 11) + (Flood Insurance * 11) + (City Property Tax * 11)) (Should consider the months from '2015 Itemization' form Months)
	'15 Single Line Analysis = ((Monthly Tax * 11) + (Monthly Hazard Insurance * 11) + (MI * 11) + (Flood Insurance * 11) + (City Property Tax * 11))
	'16 '1. Aggregate Escrow Adjustment = (Single Line Analysis - Starting Balance) 'Aggregate Escrow Adjustment' amount should be empty when the esrows are set to 12 months. 
	    '(Note: 'Escrow amount paid in cash by the Borrower)
	'17 Ending Balance = (Yearly Tax + Yearly Hazard Insurance + Yearly MI + Yearly Flood Insurance + Yearly Property Tax)
	'18 '1. 'Haz Ins' column displays: updates 'Due Date month' row i.e. '3/2017' from 12 to 6, updates 'Due Date month' row i.e. '8/2017' from <empty>  to 6
	'19 'Initial Escrow Account Setup' window is closed. '2015 Itemization' Form is opened.
	'20 1002. 'Homeowner's Ins.' months will be changed from '11' to '6' (as the 2nd Due Date is set)
	'21 1011. 'Aggregate Adjust.' displays one month escrow fee for 'Homeowner's Ins.' as negative value (-50)
	    'Note: This one month escrow will be paid in cash by the borrower and hence will not be included in escrow.
	'22 Aggregate Escrow Form is opened.
	'23 Starting Balance = ((Monthly Tax * 11) + (Monthly Hazard Insurance * 5) + (MI * 11) + (Flood Insurance * 11) + (City Property Tax * 11))
	    '(Should consider the months from '2015 Itemization' form Months)
	'24 Single Line Analysis = ((Monthly Tax * 11) + (Monthly Hazard Insurance * 6) + (MI * 11) + (Flood Insurance * 11) + (City Property Tax * 11))
	    '(Hazard Insurance through Escrow + Borrower paid in cash for one month)
	'25 'Aggregate Escrow Adjustment = (Single Line Analysis - Starting Balance)
	    '(Note: Escrow amount paid in cash by the Borrower in the first month.)
'***************************************************************************************************

FRM_RT_SetupTest(Null)

'===== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1079", "Aggregate Escrow Account - Validate Escrow Starting Balance, Single Line Analysis, Aggregate Escrow Adjustment and Ending Balance", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Set Data in Borrower Summary - Origination Form ======
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-1079_SetData"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1079_SetData"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-1079_SetData"
BIZ_Loan_Save()

'====== Set Data in Aggregate Escrow Account Form ======
BIZ_AggregateEscrowAccount_SetData "PTAC-1079_SetData"

'====== Validate First payment Date is displayed as '1st Payment Date' selected date ======
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("html id:=Button1", "index:=0")
GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=HUD1ESSetupDialog"), 30
AggregateEscrowAccount_SetupWindow_ValidateFirstPaymentDate "PTAC-1079_SetData"

'====== Set Due Date 1 in Aggregate Escrow Account Set up Window and Validate Empty Escrowed field======
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1079_SetData"
AggregateEscrowAccount_InitialEscrowAccountSetUp_ValidateDueDateMonth "PTAC-1079_SetData"
AggregateEscrowAccount_ValidateEmptyEscrowedField "PTAC-1079_SetData"

'====== Go to 2015 Itemization &  Set data in 2015 form ======
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set1000Section "PTAC-1079_SetData"

'====== Verify month field in 2015 Itemization & verify borrower field in 2015 Itemization form ======
AggregateEscrowAccount_2015Itemization_VerifySection1000MonthField "PTAC-1079_VerifyMonthField"
AggregateEscrowAccount_2015Itemization_VerifyBorrowerField "PTAC-1079_VerifyMonthField"

'====== Go to Aggregate Escrow Account ======
'====== Verify Escrowed field in Aggregate Escrow Account ======
'====== Validate fields in Aggregate Escrow Account after setting Due Date1 ======
'====== Validate Ending Balance ======
BIZ_Forms_Open "Aggregate Escrow Account"
AggregateEscrowAccount_ValidateEscrowedField "PTAC-1079_VerifyEscrowField"
AggregateEscrowAccount_SetDueDate1_ValidateField "PTAC-1079_VerifyField"

'====== Set Due Date2 in In Aggregate Escrow Setup window ======
'====== Go to 2015 Itemization ======
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-1079_SetDueDate2"
AggregateEscrowAccount_InitialEscrowAccountSetUp_ValidateDueDateMonth "PTAC-1079_VerifyDueDateMonthRow"
BIZ_Forms_Open "2015 Itemization"
AggregateEscrowAccount_2015Itemization_VerifyField "PTAC-1079_Verify"

'====== Go to Aggregate Escrow Account ======
'====== Validate fields in Aggregate Escrow Account after setting Due Date2 ======
BIZ_Forms_Open "Aggregate Escrow Account"
AggregateEscrowAccount_SetDueDate2_ValidateField "PTAC-1079_VerifyEscrowField"
BIZ_Loan_Exit True

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null) 
