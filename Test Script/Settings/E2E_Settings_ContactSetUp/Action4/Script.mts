'@**************************************************************************************************
'@ TestStory: PTAC-1441 Contact Setup
'@ TestCase: 
   '1 PTAC-625 - Verify Add Public Business Contact Group
   '2 PTAC-626 - Verify Edit Public Business Contact Group 
   '3 PTAC-629 - Verify Delete Public Business Contact Group
'@ Test Automation JIRA Task: PTAC-1348 Settings_ContactSetUp_PublicBussinessContactGroup
'@ TestData: Settings_ContactSetUp, SetData and ContactSetUpData
'@ Pre-conditions: 
   '1 User logged in  to Encompass as an Admin
'@ Description:  
'@ TestSteps:
   '1 Verify Add Public Business Contact Group
   '2 Verify Edit Public Business Contact Group 
   '3 Verify Delete Public Business Contact Group
'@ ExpectedResult:
   '1 New Public Business Contact Group with given name Loans created
   '2 Added contacts count appears as 1 under # of Contacts Column header
   '3 Loans group should be deleted
'***************************************************************************************************


FRM_Logger_ReportInfoEvent "Start Test Case: E2E_ContactSetup", "Script Name - Settings_ContactSetUp_PublicBussinessContactGroup", null
	


'====== Go to Settings/Contact Setup/Public Business Contact Groups ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Contact Setup", "Public Business Contact Groups"

'====== Verify Add Public Business Contact Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-625","Verify Add Public Business Contact Group", Null
strcreateContactSetUp = BIZ_ContactSetUp_CreatePublicBussinessContactGroup ("ContactSetUpData")

'====== Verify Edit Public Business Contact Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-626","Verify Edit Public Business Contact Group", Null
BIZ_ContactSetUp_EditPublicBussinessContactGroup strcreateContactSetUp

'====== Verify Delete Public Business Contact Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-629","Verify Delete Public Business Contact Group", Null
BIZ_ContactSetUp_DeletePublicBussinessContactGroup strcreateContactSetUp

GUI_Window_Close SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")


