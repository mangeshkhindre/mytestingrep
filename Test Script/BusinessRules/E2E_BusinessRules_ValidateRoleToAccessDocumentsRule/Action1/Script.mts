'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase: PTAC-1358 Verifying the 'Role to Access Documents' rule.
'@ Test Automation JIRA Task: PTAC-2138 BusinessRules_ValidateRoleToAccessDocumentsRule. 
'@ TestData: Settings_Loansetup, AddLoanFolder, PTAC-1553_LoanFolder.
'@ Pre-conditions: 
   '1 Go to Encompass > Settings > Loan Setup > Loan folders
   '2 Loan folder creation: Click on '+ Create new folder', enter 'folder name' value , save
   '3 New User creation: Go to Company/User Setup > Organization/Users,
   '4 Click on '+Add User', enter below fields,
      '-User ID
      '-Password
      '-ReType Password
      '-First Name
      '-Last Name
      '-Email
      '-Working folder <assign the created loan folder ie Loan Officer Active Licenses (Click on Edit Licenses and click on SELECT ALL, click on OK).
      '-Personas(Select Loan Officer).
      '-Access to Subordinate's Loans section:
      'Access to all loans in the same level(Checked).
      'Edit(option selected).
      '-Click on save button.
   '5 To display the created loan folder in the pipeline for the Created user.
   '6 In Company/User Setup > User groups > Loans tab, under Access to Loan Folders section, check your <Folder Name>, save.
'@ Description: Verifying the 'Role to Access Documents' rule 
'@ TestSteps:
   '1 Login to Encompass with Admin user.
      'Navigate to through Encompass Settings -> Business Rules -> "Role Access to Documents".
      'Under 'If a document is added by' section, select the 'Loan Officer'.
      'Select the 'Loan Officer', 'Loan Processor','Underwriter', save.
      'Under 'Protected Documents' section, select the 'Loan Officer', 'Loan Processor', save.
      'Close the 'Role Access to Documents' screen.
      'Logout from Encompass. 
   '2 Login with Encompass with Non Admin User.
   '3 Go to Pipeline and select created Loan Folder.
   '4 Click on a new loan from Pipeline, verify.
   '5 Go to Forms > Borrower Summary Origination, fill the details, Save.
   '6 Click on efolder button.
   '7 Click on 'Documents' tab, and click on 'Add new document'.
   '8 Click on Ok button.
   '9 In Details section, enter the details for name, description and click on  Access" button, Verify the "Access" checkbox for the Roles.
'@ ExpectedResult:
   '1 Admin user to be logged in successfully.
     '"Role Access to Document" screen should be displayed.
     'The following role can access the document' section displayed at right side.
     'The roles to be saved.
     'The roles to be saved for Protected Documents section.
     ''Role Access to Documents' screen to be closed.
     'Encompass should be logged off successfully.
   '2 User able to login successfully.
   '3 The 'selected loan folder' to be displayed in the 'Loan Folder' drop down.
   '4 The 'New Loan' screen should be displayed.
   '5 The Loan is created successfully.
   '6 It should display the 'Encompass efolder' screen.
   '7 It opens the 'Add Document' pop up.
   '8 Document Details(Untitled) screen should be displayed.
   '9 It opens the 'Document Access Rights' pop up window and checkbox are displayed for 'Loan Officer', 'Loan Opener','Loan Processor' are Checked successfully and also, the 'Loan Officer', 'Loan Processor' should display with '*'(asterik) symbols.
'***************************************************************************************************

FRM_RT_SetupTest(Null) 

strLoanFolder = "Automation"

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2138" ,"Script Name:BusinessRule_ValidateRoleToAccessDocumentsRule", Null

'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"

'====== PTAC-1358 Verifying the 'Role to Access Documents' rule ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1358","Verifying the 'Role to Access Documents rule", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Business Rules", "Role Access to Documents"
BR_RoleToAccessDocumentRule_AdminUser

'====== Pre condition to create Loan Folder and Non Admin User ID   ======
BR_CreateNewLoanFolder "PTAC-1553_LoanFolder", strLoanFolder 
BIZ_OrganizationUsers_CreateUser "1533_LoanStatus"

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

'===== Login to Encompass with non admin ======
BIZ_Login_UserLogin "BR_emilylo_172Banker"

'====== This function is for set Borrower summary details and creates the new loan ======
BR_LoanFolder_BorrowerSummary strLoanFolder

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)

