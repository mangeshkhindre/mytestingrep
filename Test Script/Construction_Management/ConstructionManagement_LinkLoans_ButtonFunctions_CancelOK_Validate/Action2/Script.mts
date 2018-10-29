'@**************************************************************************************************
'@ TestStory: PTAC -1352 Construction Management
'@ TestCase:
   '1 PTAC-1184 TC #36 - CBIZ-2857; Button Functions - 'Go To Construction' button (Link to Perm button); if 'Cancel' is clicked"	
   '2 PTAC-1185 TC #35 - CBIZ-2857; Button Functions - 'Go To Construction' button (2nd Loan; Link to Perm button); if 'Ok' is clicked"
'@ Test Automation JIRA Task: PTAC-1542 ConstructionManagement_LinkLoans_ButtonFunctions_CancelOK_Validate
'@ TestData: 
	'1 Construction_Manangement,SetLaonInfo,PTAC-1352_ConstructionOnly
	'2 Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1352_ConstructionOnly
	'3 Forms_BorrowerSummaryOrigination,SetTransactionDetails,PTAC-1352_ConstructionOnly
	'4 Forms_Forms_BorrowerSummaryOrigination,SetProperty, PTAC-1352_ConstructionOnly
'@ Pre-conditions: 
'@ Description: Verify LinkLoans ButtonFunctions  GoTo Construction Button and Go To Perm Button for Cancel and OK operation
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save.
   '5 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '5 Click on New Bank Loan button
   '6  Enter the data mentioned in Test Data column, save.
   '7 Go to Forms> Construction Management 
   '8 Click on Linked Loans tab, 
   '9 Click on Linked to Perm button, which opens a pop up screen,  and verify
   '10 Select the existing loan(which created in step1), and click on 'Link' button and verify
   '11 Select the 'Const-to-perm Sync' template, and click on 'Select' button and verify
   '12 Click on Yes option
   '13 Click on 'Go to Perm' button, Verify
   '14 Click on Cancel button in the message for the 1st Loan, verify
   '15 Click on the 'folder icon' next to '1st Loan #', and click on 'Go to Linked Loan', Verify
   '16 Click on Yes option, 
   '17 Click on Close button, and verify
   '18 Go to Forms> Construction Management > Linked Loans tab
   '19 Click on 'Go to Construction' button, 
   '20 Click on 'Cancel' button, verify
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab The Loan is created with a Refinace Loan
   '4 Rename the newly created Escrow record ,that populates in Escrow grid
   '5 New Loan pop up displayed It navigates to Loan tab The Loan is created with a Construction Only
   '6 Construction Management Form should be opened
   '7 It should display the Linked Loans screen
   '8 It opens a pop up 'Select Sync Template' screen
   '9 It shows the Pop up with 'Do you want to Synchronize data between two loans" Yes/No 
   '10 The 'Go to Perm' option is enabled
   '11 It shows the Pop up 'You must save both loans before you can switch the input position. Do you want to save the loans now?OK/Cancel
   '12 The 'Construction Loan(Current Input)' should display in Left side and 'Perm Loan' should be in right side'
   '13 It opens a pop up 'Do you want to save the changes to the Current Loan? Yes/No/Cancel
   '14 It opens the pop up window
   '15 It display the 2nd loan details
   '16 It opens the Linked Loans tab screen
   '17 It shows a pop up message
   '18 The 'Perm Loan(Current Input)' should display in Left side and 'Construction Loan' should be in right side'
'**************************************************************************************************


strCashOutRefiananceLoanNumber = Parameter("strCashOutRefiananceLoanNumber")
strConstructionLoanNumber      = Parameter("strConstructionLoanNumber")

'Create Cash-Out-Refinance Loan
Parameter("strCashOutRefiananceLoanNumber") = BIZ_ConstructionManagement_CashoutRefinanceLoan_Create("PTAC-1352_CashOutRefinance")

'Create Construction only loan
Parameter("strConstructionLoanNumber") = BIZ_ConstructionManagement_ConstructionLoan_Create("PTAC-1352_ConstructionOnly")

'Link the loans created
ConstructionManagement_LinkLoansButton "PTAC-1352_ConstructionOnly",Parameter("strCashOutRefiananceLoanNumber")



 
