'@**************************************************************************************************
'@ TestStory: PTAC-1441 Contact Setup
'@ TestCase: 
   '1 PTAC-606 - Verify Addition of Business Category
   '2 PTAC-619 - Verify Renaming of Business Category
   '3 PTAC-622 - Verify Mapping of Business Category to Business Contact
   '4 PTAC-621 - Verify Deletion of Business Category
'@ Test Automation JIRA Task: PTAC-1249, Settings_ContactSetUp_BussinessCategory
'@ TestData: Settings_ContactSetUp, SetData and ContactSetUpData
'@ Pre-conditions: 
   '1 User logged in  to Encompass as an Admin 
'@ Description:  
'@ TestSteps:
   '1 Verify Addition of Business Category
   '2 Verify Renaming of Business Category
   '3 Verify Mapping of Business Category to Business Contact
   '4 Verify Deletion of Business Category
'@ ExpectedResult:
   '1 Business Category with input name can be added successfully
   '2 Business Category can be renamed successfully
   '3 The Business Category LoanType is displayed in Dropdown values of label Category
   '4 Created status Details  available in the dropdown of Status field in Extra tab
   '5 Selected Amount category should be deleted
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: E2E_ContactSetup", "Script Name - Settings_ContactSetUp_BusinesCategories", null
'====== Go to Settings/Contact Setup/Business Categories ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Business Categories"

'====== Verify Addition of Business Category ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-606","Verify Addition of Business Category", Null
strcreateName = BIZ_ContactSetUp_StatusOrCategoryCreation ("ContactSetUpData","Category")

'====== Verify Renaming of Business Category ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-619","Verify Renaming of Business Category", Null
strRename = BIZ_ContactSetUp_RenameStatusOrCategory ("ContactSetUpData","Category",strcreateName)

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
'GUI_Window_Close SwfWindow("swfname:=MainForm")
'BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_SelectContactsTab()

'====== Verify Mapping of Business Category to Business Contacts ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-622","Verify Mapping of Business Category to Business Contact", Null
BIZ_ContactSetUp_MappingtoContacts strRename,"Category"

'====== Go to Settings/Contact Setup/Business Categories ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Business Categories"

'====== Verify Deletion of Business Category ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-621","Verify Deletion of Business Category", Null
BIZ_ContactSetUp_StatusOrCategoryDeletion strRename,"Category"

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")


