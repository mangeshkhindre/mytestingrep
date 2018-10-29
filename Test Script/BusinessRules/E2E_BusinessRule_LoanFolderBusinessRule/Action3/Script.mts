'@**************************************************************************************************
'@ TestStory: CTA-286 Script optimization for Business Rules
'@ TestCase: PTAC-1426 Verifying the Loan Folder Rule with Set Up Move Rule: Finished Milestone.
'			 '2 PTAC-1427 Verifying the Loan Folder Rule with Set Up Move Rule: Loan Status.
'@ Test Automation JIRA Task: CTA-291 E2E_LoanFolderBusinessRule_BusinessRule
'@ TestData: 
   'Settings_Loansetup, AddLoanFolder, PTAC-1553_LoanFolder
   'BusinessRule_LoanFolderBusinessRule,SetRuleForLoanFolder, PTAC-1426_BusinessRule
'@ Pre-conditions: 
    '1 Go to Encompass > Settings > Loan Setup > Loan folders.
    '2 Loan folder creation: click on '+ Create new folder', enter 'folder name' value , save.
    '3 Persona creation:
       'Go to Company/User Setup > Personas.
       'Click on '+Add Persona', enter Persona name 'Access to All Features' Use the options selected for the created persona 'Koteswar Loan Officer' for an example in our new environment 
    '4 New User creation:
       'Go to Company/User Setup > Organization/Users,
       'Click on '+Add User', enter below fields,
       '-User ID
       '-Password
       '-ReType Password
       '-First Name
       '-Last Name
       '-Email
       '-Working folder <assign the created loan folder ie 
       '-Loan Officer Active Licenses (Click on Edit Licenses and click on SELECT ALL, click on OK)
       '-Personas(Select Loan Officer)
       '-Access to Subordinate's Loans section:
       'Access to all loans in the same level(Checked)
       'Edit(option selected)
       'Click on save button
    '5 To display the created loan folder in the pipeline for the Created user,In Company/User Setup > User groups > Loans tab, under Access to Loan Folders section, check your <Folder Name>, save
'@ Description:Verifying the Loan Folder Rule with Set Up Move Rule: Finished Milestone.
'@ TestSteps:
   '1  Login to Encompass with Admin user.
   '2  Navigate to through Encompass Settings -> Business Rules -> Loan Folder Busines Rule
   '3  Select created Loan Folder from Loan Folder list and Set "Set Up Origination Rule" to "Yes", and also,setup move rule(checked) Finished milestone (choose the Qualification from dropdown) Save.
   '4  Login to Encompass with new user(Non admin user )
   '5  Go to Pipeline and choose any other Loan folder from Loan folder dropdown, 
   '6  Click on + New loan, again click on 'New Bank Loan' button 
   '7  Navigate to 'Log' tab, and select 'Qualification' milestone, and click on 'Loan Opener' browse option and choose any 'select Loan team member', click on OK button and also, click on 'Finished' button, save 
   '8  Close the loan from Loan tab.
   '9  Go to Pipeline, and search with loan which is created.
   '10 Select the loan and click on 'Move to Folder' button.
   '11 Select the 'created loan folder' from dropdown, click on OK button.
   '12 Choose on 'Yes' option, Verify.
   '13 In pipeline, choose the 'created loan folder' and enter the loan number in the Loan number field, verify.
'@ ExpectedResult:
    '1  Admin user to be logged in successfully.
    '2  Loan Folder Busines Rule screen should be displayed.
    '3  The rule to be saved.
    '4  Non Admin User to be logged in to encompass.
    '5  Another Loan folder to be displayed in the 'Loan Folder' dropdown.
    '6  New loan window opens.
    '7  The milestone should be saved and Loan created.
    '8  The Loan to be closed.
    '9  The loan should be displayed in the grid.
    '10 The Move loans pop up to be displayed.
    '11 It will show a message 'Are you sure you want to move a loan <loan number>.
    '12 The loan number moved to 'created loan folder' successfully.
    '13 The Loan number to be displayed successfully.
'*************************************************************************************************** 
strLoanFolder = Parameter("strLoanFolder")

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1426", "Verifying the Loan Folder Rule with Set Up Move Rule: Loan Status", Null

'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to Business Rules->SettLoan Folder Business Ruleings ======
BIZ_Nav_HierarchyTree "Business Rules", "Loan Folder Business Rule"

'====== User set the values for Business Rule Setup ======
BR_MyPipeLineLoanFolderBusinessRule "PTAC-1426_BusinessRule",strLoanFolder

'====== PTAC-1426_BusinessRule ======
BIZ_Login_UserLogout()

'====== Login to Encompass with non admin ======
BIZ_Login_UserLogin "BR_emilylo_172Banker"

'====== used to Setup Loan Folder with Finished Milestone and verify Laon ======
BR_VerifyingLoanFolderSetUp strLoanFolder

'====== PTAC-1426_BusinessRule ======
BIZ_Login_UserLogout()

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1427","Verifying the Loan Folder Rule with Set Up Move Rule: Finished Milestone", Null
'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to Business Rules->Loan Folder Business Rule ======
BIZ_Nav_HierarchyTree "Business Rules", "Loan Folder Business Rule"

'======  used to set Loan Folder Business Rule ======
BR_MyPipeLineLoanFolderBusinessRule "PTAC-1427_BusinessRule",strLoanFolder

'====== PTAC-1426_BusinessRule ======
BIZ_Login_UserLogout()

'====== Login to Encompass with non admin ======
BIZ_Login_UserLogin "BR_emilylo_172Banker"

'====== used to Setup Loan Folder with Finished Milestone and verify Laon ======
BR_VerifyingLoanFolderSetUp strLoanFolder

'====== PTAC-1426_BusinessRule ======
BIZ_Login_UserLogout()


