'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-1118 - Test Case- TC #4 - CBIZ-2857; Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side"	
'@ Test Automation JIRA Task: PTAC-1740 ConstructionManagement_ConstrOnly_NewPerm
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrBtn_NewPermBtn
	'2 Forms_BorrowerSummaryOrigination,SeTransactionDetails,1352_ConstrBtn_NewPermBtn
	'3 ConstructionManagement,SetLoanInfo,1352_ConstrBtn_NewPermBtn
'@ Pre-conditions: 
'@ Description: Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side
'@ TestSteps:
  '1 Log into Encompass as Admin/password	
  '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
  '3 Click on New Bank Loan button
  '4 Enter the data mentioned in Test Data column, save
  '5 click on the 'Linked Loans' tab
  '6 click on the 'New Perm' button	
  '7 Select Const to perm Sync template and click on 'Select' button, verify
  '8 Click on Yes option verify
  '9 Without logout from Encompass, Repeat the steps 1-4, 
  '10 Click on No option verify
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The data should be saved
   '5 The Linked Loans screens populated
   '6 It displays the 'Select Sync template' form opened
   '7 Message pop up 'Do you want to Synchronize data between two loans" Yes/No options
   '8 The UI validate the Construction loan displays on the left side (Current Input) and the Perm loan displays on the right side with data synced between the Construction loan and the Perm loan depending on the fields saved in the sync template.
   '9 steps to be created successfully
   '10 In the UI validate the Construction loan displays on the left side (Current Input) and the Perm loan displays on the right side with no data synced. The Perm loan will not display data in any of the fields.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1118","Test Case- TC #4 - CBIZ-2857; Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side", Null

'Validate the Link loans Sync for  Event synchronize No
CM_ConstructionOnly_LinkLoans_NewPerm "1352_ConstrBtn_NewPermBtn","No"

'Validate the Link loans Sync for  Event synchronize Yes
CM_ConstructionOnly_LinkLoans_NewPerm "1352_ConstrBtn_NewPermBtn","Yes"

