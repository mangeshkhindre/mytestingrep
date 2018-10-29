'@**************************************************************************************************
'@ TestStory: PTAC-1441 Contact Setup
'@ TestCase: 
   '1 PTAC-584 - Verify Add Borrower Contact Status
   '2 PTAC-585 - Verify Rename Borrower Contact Status 
   '3 PTAC-597 - Verify Mapping of Borrower Contact Status to Borrower Contacts
   '4 PTAC-588 - Verify Delete Borrower Contact Status
'@ Test Automation JIRA Task: PTAC-1236 - Settings_ContactSetUp_BorrowerContactStatus
'@ TestData: Settings_ContactSetUp, SetData and ContactSetUpData
'@ Pre-conditions: 
   '1 User logged in  to Encompass as an Admin 
'@ Description:  
'@ TestSteps:
   '1 Verify Add Borrower Contact Status
   '2 Verify Rename Borrower Contact Status
   '3 Verify Mapping of Borrower Contact Status to Borrower Contacts
   '4 Verify Delete Borrower Contact Status
'@ ExpectedResult:
   '1 New Status with entered input name appears
   '2 Renamed status appears
   '3 Created status Details  available in the dropdown of Status field in Extra tab
   '4 Selected Status should be deleted
'***************************************************************************************************


FRM_Logger_ReportInfoEvent "Start Test Case: E2E_ContactSetup", "Script Name - Settings_ContactSetUp_ContactSetup", null
'====== Go to Settings/Contact Setup/Borrower Contact Status ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Borrower Contact Status"

'====== Verify Add Borrower Contact Status ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-584","Verify Adding the Borrower Contact Status", Null
strcreateName = BIZ_ContactSetUp_StatusOrCategoryCreation ("ContactSetUpData","Status")

'====== Verify Rename Borrower Contact Status ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-585","Verify Renaming of Borrower Contact Status", Null
strRename = BIZ_ContactSetUp_RenameStatusOrCategory ("ContactSetUpData","Status",strcreateName)

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
'GUI_Window_Close SwfWindow("swfname:=MainForm")
'BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_SelectContactsTab()

'====== Verify Mapping of Borrower Contact Status to Borrower Contacts ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-597","Verify Mapping of Borrower Contact Status to Borrower Contacts", Null
BIZ_ContactSetUp_MappingtoContacts strRename,"Status"

'====== Go to Settings/Contact Setup/Borrower Contact Status ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Borrower Contact Status"

'====== Verify Delete Borrower Contact Status ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-588","Verify Deleting of Borrower Contact Status", Null
BIZ_ContactSetUp_StatusOrCategoryDeletion strRename,"Status"

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")


