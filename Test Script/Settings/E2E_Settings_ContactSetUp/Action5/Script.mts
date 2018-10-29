'@**************************************************************************************************
'@ TestStory: PTAC-1109 Contacts
'@ TestCase: 
   '1 PTAC-576 : Creation of new Borrower Contact and Verification
   '2 PTAC-583 : Duplicate Borrower Contact and Verification
   '3 PTAC-579 : Edit Borrower Contact and Verification
   '3 PTAC-580 : Delete Borrower Contact and Verification
'@ Test Automation JIRA Task: PTAC-1110 Contacts_BorrowerContact_Operations
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC576_BorrowerInfo
   '2 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC579_BorrowerInfo 
'@ Pre-conditions: 
   '1 User login  to Encompass as Admin
   '2 Navigate to Contacts tab
'@ Description:  
'@ TestSteps:
   '1 Creation of new Borrower Contact and Verification
   '2 Duplicate Borrower Contact and Verification
   '3 Edit Borrower Contact and Verification
   '4 Delete Borrower Contact and Verification
'@ ExpectedResult:
   '1 New Borrower Contact Should be created
   '2 Duplicate Borrower contact is added 
   '3 Borrower Contact gets saved and Edited Contact appears in the Contacts list
   '4 Borrower Contact should be deleted
'***************************************************************************************************


FRM_Logger_ReportInfoEvent "Start Test Case: E2E_ContactSetup", "Script Name - Settings_ContactSetUp_BorrowerContact_Operations", null
	
'====== Create BorrowerContact and Validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-576","Validate Creation of BorrowerContact", Null
strLastName = BIZ_Contacts_BorrowerContact_Add ("PTAC576_BorrowerInfo")

'====== Duplicate BorrowerContact and Validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-583","Validate Duplicate BorrowerContact", Null
BIZ_Contacts_BorrowerContact_Duplicate strLastName

'====== Edit BorrowerContact and Validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-579","Validate Edit BorrowerContact", Null
strBorrowerName = BIZ_Contacts_BorrowerContact_Edit ("PTAC579_BorrowerInfo", strLastName)
Contacts_BorrowerContact_EditValidation "PTAC579_BorrowerInfo",strBorrowerName

'====== Delete BorrowerContact and Validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-580","Validate Delete BorrowerContact", Null
BIZ_Contacts_DeleteBorrowerContact split(strBorrowerName,";")(1),strLastName


