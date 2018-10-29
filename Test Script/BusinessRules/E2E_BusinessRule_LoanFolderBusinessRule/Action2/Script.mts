'@**************************************************************************************************
'@ TestStory: CTA-286 Script optimization for Business Rules
'@ TestCase:  PTAC-1424 Verifying the Loan Folder Rule with Set Up Origination Rule All to 'Yes'.
'				PTAC-1266 Verify the "Loan Folder Business Rule".
'@ Test Automation JIRA Task: CTA-291 E2E_LoanFolderBusinessRule_BusinessRule
'@ TestData: 
   'BusinessRule_LoanFolderBusinessRule, SetRuleForLoanFolder, PTAC-1424_BusinessRule 
   'Settings_Loansetup, AddLoanFolder, PTAC-1553_LoanFolder
'@ Pre-conditions: 
   '1 Go to Encompass > Settings > Loan Setup > Loan folders
   '2 Loan folder creation: Click on '+ Create new folder', enter 'folder name' value , save.
   '3 Persona creation:
      'Go to Company/User Setup > Personas,
      'Click on '+Add Persona', enter Persona name 'Access to All Features' Use the options selected for the created persona 'Koteswar Loan Officer' for an example in our new environment (http://eq1veabe30039.dco.elmae/Encompass$TEBE11172865 Build:17.1.0.0)
   '4 New User creation:
      'Go to Company/User Setup > Organization/Users,
      'Click on '+Add User', enter below fields,
      'User ID
      'Password
      'ReType Password
      'First Name
      'Last Name
      'Email
      'Working folder <assign the created loan folder ie
      'Loan Officer Active Licenses (Click on Edit Licenses and click on SELECT ALL, click on OK)
      'Personas(Select Loan Officer).
      'Access to Subordinate's Loans section:
      'Access to all loans in the same level(Checked).
      'Edit(option selected).
      'Click on save button.
   '5 To display the created loan folder in the pipeline for the Created user In Company/User Setup > User groups > Loans tab, under Access to Loan Folders section, check your <Folder Name>, save. 
'@ Description: Verifying the Loan Folder Rule with Set Up Origination Rule All to 'Yes'.
'@ TestSteps:
    '1  Login to Encompass with Admin user.
	'2  Navigate to through Encompass Settings -> Business Rules -> Loan Folder Busines Rule.
	'3  Select created Loan Folder from Loan Folder list and Set "Set Up Origination Rule" to "Yes", Save.
	'4  Login to Encompass with new user(Non admin user).
	'5  Go to Pipeline and select created Loan Folder.
	'6  Create a new loan from Pipeline, verify.
	'7  Go to Contacts tab, click on 'Originate a loan' button from Borrower Contacts tab, select any 'Loan' from the list, and click on 'Create New' button, 
	'8  Verify the 'created Loan folder' in the 'Loan Folder' dropdown.
	'9  Go to Pipeline and click on 'Duplicate Loan', verify.
	'10 Go to Pipeline, and select any other folder from Loan folder dropdown (ie koteswar), and select any loan, and click on 'Duplicate Loan' button.
	'11 Click on 'Select the folder for the new loan' dropdown and verify
	'12 Click on the 'Pipeline' tab(next to Home button) and select the 'Pipeline' menu(next to view button), and click on 'Import' button.
	'13 Select 'Fannie Mae 3.x', and click on Continue button.
	'14 Click on 'Loan folder' under 'Import To', verify the 'created loan folder' in the dropdown.	
'@ ExpectedResult:
    '1  Admin user to be logged in successfully.
    '2  Loan Folder Busines Rule screen should be displayed.
	'3  The rule to be saved.
	'4  The nonadmin user to be logged in successfully.
	'5  The 'selected loan folder' to be displayed in the 'Loan Folder' dropdown.
	'6  The 'New Loan' button should be editable.
	'7  The 'Originate Loan' popup window display.
	'8  The created 'Loanfolder' should displayed in the dropdown.
	'9  The 'Duplicate Loan' button is enabled, and the 'Duplicate Loan' popup window displayed and also, 'select the loanfolder for the new loan' dropdown, the 'created loan folder' to be displayed successfully.
	'10 It should display the 'Duplicate Loan' pop up window.
	'11 The created 'Loan folder' should be displayed in the dropdown successfully.
	'12 The 'Import' popup window display.
	'13 The 'Import From fannie Mae' window pop up display.
	'14 The created 'Loan folder' should be displayed in the dropdown.
'***************************************************************************************************
strLoanFolder = Parameter("strLoanFolder")

'====== PTAC-1424 Verifying the Loan Folder Rule with Set Up Origination Rule All to 'Yes'  ======
FRM_Logger_ReportStepEvent "Start Test Case:  PTAC-1424","Verifying the Loan Folder Rule with set up origination Rule All to 'Yes'", Null
         	
'====== Navigate to Business Rules->Loan Folder Business Rule ======
BIZ_Nav_HierarchyTree "Business Rules", "Loan Folder Business Rule"   

'====== To set Loan Folder Business Rule ======
BR_MyPipelineLoanFolderBusinessRule "PTAC-1424_BusinessRule",strLoanFolder

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

'====== Login to Encompass with non admin ======
BIZ_Login_UserLogin "BR_emilylo_172Banker"

'====== validate the Loan Folder with setup ======
BR_LoanFolderSetups "PTAC-1424_BusinessRule",strLoanFolder

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

FRM_Logger_ReportStepEvent "Start Test Case:  PTAC-1266","Verifying the Loan Folder Rule with Set Up  Origination Rule All to 'No'", Null
'====== Login to Encompass with admin ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"

'====== Navigate to Business Rules->Loan Folder Business Rule ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Business Rules", "Loan Folder Business Rule"   

'====== To set Loan Folder Business Rule with 'No'  ======
BR_MyPipelineLoanFolderBusinessRule "PTAC-1266_BusinessRule", strLoanFolder

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

'====== Login to Encompass with non admin ======
BIZ_Login_UserLogin "BR_emilylo_172Banker"

'====== validate the Loan Folder with setup ======
BR_LoanFolderSetups "PTAC-1266_BusinessRule", strLoanFolder

'====== Logout From Encompass ======
BIZ_Login_UserLogout()

