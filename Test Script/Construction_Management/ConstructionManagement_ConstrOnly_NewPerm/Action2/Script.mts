'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
   '1 PTAC-1187 - TC #34 - CBIZ-2857; Scenario #1 - Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.
'@ '@ Test Automation JIRA Task: PTAC-1740 ConstructionManagement_ConstrOnly_NewPerm
'@ TestData:  
	'1 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrBtn_NewPermBtn
	'2 Forms_BorrowerSummaryOrigination,SeTransactionDetails,1352_ConstrBtn_NewPermBtn
	'3 ConstructionManagement,SetLoanInfo,1352_ConstrBtn_NewPermBtn
'@ Pre-conditions:
'@ Description: Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save.
   '5 Go to Forms> Construction Management 
   '6 Click on Linked Loans tab,	
   '7 Select the 'Const-to-perm Sync' template, and click on 'Select' button and verify
   '8 Click on Yes option
   '9 Click on Ok button in the popup, verify
   '10 Click on 'Go to Construction'
   '11 Click on OK button, it displays the popup message, verify
   '12 Click on OK button in the pop up message and verify  
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It opens the Borrower Summary Origination Form
   '4 The Loan is created.
   '5 Construction Management Form should be opened
   '6 It should display the Linked Loans screen
   '7 It opens a pop up 'Select Sync Template' screen
   '8 It shows a pop up message as 'You must save both loans before you can switch the input position? Do you want to save the loans now?'
   '9 The Construction loan has been switched to current input screen' message displayed.
   '10 The 'Go to Construction' button label changes to reflect "Go to Perm"      
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1187","Test Case- TC #34 - CBIZ-2857; Button Functions - 'Go To Construction' button (2nd Loan; New Perm button); if 'Ok' is clicked", Null

'Create a Construction Loan
BIZ_ConstructionManagement_ConstructionLoan1003_Create "1352_ConstrBtn_NewPermBtn"

'Link the loans
BIZ_Forms_Open "Construction Management"
BIZ_ConstructionManagement_LinkLoans "1352_ConstrBtn_NewPermBtn","NoLoanNumber","New Perm"

'Sync and validate the loans
BIZ_ConstructionManagement_LinkedLoan_SyncedData_Validate "","1352_ConstrBtn_NewPermBtn","Yes","New Perm"


