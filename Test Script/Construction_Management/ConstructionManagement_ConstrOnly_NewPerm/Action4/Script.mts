'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-1120 - TC #10 - CBIZ-2857; Button Functions - 'Linked to Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.   
'@ Test Automation JIRA Task:  PTAC-1740 ConstructionManagement_ConstrOnly_NewPerm
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_CashOutRefinance"
	'2 Forms_BorrowerSummaryOrigination,SeTransactionDetails,"PTAC-1352_CashOutRefinance"
	'3 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_ConstructionOnly"
	'4 Forms_BorrowerSummaryOrigination,SeTransactionDetails,"PTAC-1352_ConstructionOnly"
	'5 ConstructionManagement,SetLoanInfo,PTAC-1352_ConstructionOnly"
'@ Pre-conditions: 
'@ Description: Button Functions - 'Linked to Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save.
   '5 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '6 Click on New Bank Loan button
   '7 Enter the data mentioned in Test Data column, save.
   '8 click on the 'Linked Loans' tab
   '9 Click on Linked to Perm button, which opens a pop up screen,  and verify
  '10 elect the existing loan, and click on 'Link' button and verify
  '11 Select the 'Const-to-perm Sync' template, and click on 'Select' button and verify
  '12 Repeat steps 1-6
  '13 Click on NO option
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created with a Refinace Loan
   '5 New Loan pop up displayed
   '6 It navigates to Loan tab
   '7 The Loan is created with a Construction Only
   '8 It should display the Linked Loans screen
   '9 It opens a pop up 'Link to a Loan' screen
  '10 It opens a pop up 'Select Sync Template' screen
  '11 It shows the Pop up with 'Do you want to Synchronize data between two loans" 
  '12 Yes/No options
  '13 The UI validate the Construction loan displays on the left side (Current Input) and the Perm loan displays on the right side with data synced between the Construction loan and the Perm loan.
  '14 ields are matched in the Perm loan are below, 
  '15 Note Rate, Qual Rate, Term, Due In, Appraised value, Loan Type, Property will be
  '16 Steps to be created successfully
  '17 The UI validate the Construction loan displays on the left side (Current Input) and the Perm loan displays on the right side with no data synced. The Perm loan will display the data originally entered in the linked loan.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1120","Test Case- TC #10 - CBIZ-2857; Button Functions - 'Linked to Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.", Null

'Validate the Link loans Sync for  Event synchronize Yes
CM_ConstructionOnly_LinkLoans_NewPermSync "PTAC-1352_ConstructionOnly","PTAC-1352_CashOutRefinance","Yes"

'Validate the Link loans Sync for  Event synchronize No
CM_ConstructionOnly_LinkLoans_NewPermSync "PTAC-1352_ConstructionOnly","PTAC-1352_CashOutRefinance","No"


