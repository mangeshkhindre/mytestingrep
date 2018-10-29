'@*************************************************************************************************
'@ TestStory: PTAC-3214 Loan Reassignment
'@ TestCase: PTAC-1595 - The objective of test case is to validate the implementation of Loan Reassignment into a loan file from one user to another.
'@ Test Automation JIRA Task: PTAC-3215  LoanReassignment_ValidateLoanReassignmentImplementation
'@ TestData: 
'@ Pre-conditions: Log into Encompass with Admin user
'@ Description: The objective of test case is to verify access rights under "Consumer Connect" tab of Encompass Settings for Closer persona
'@ TestSteps:
	'1 Go to Encompass settings  --> System administration --> Loan Reassignment.
	'2 In "Search for Loans" section,  make the following changes as seen in the test data column.
	'3 In "Select Loans to Reassign" section, select the loan from the list 
	'4 Go to the 3rd section (Select the Assign), from the dropdown 
	'5 Select the intended role and then select the required userid 
	'6 Go to the Section 4, Complete Assignment: Click on the "Reassign Loans" button 
	'7 Click on Close button Logout from Encompass 
	'8 Log into Encompass with Loan officer user
	'9 Click on "Pipeline" tab and search for loan (1701QA1690PR) under Automation folder
	'10 Double-click on loan to open  the file 
	'11 Verify the assign loan officer name in the log 
'@ ExpectedResult:
	'1 Loan Reassignment page should open
	'2 Search filters data should be displayed
	'3 The loan should be selected
	'4 The selected loan should displayed
	'5 The "Batch Loan Reassignment process" Popup window should be display with  Success message 
	'6 The popup should be closed
	'7 Admin should be logged out from Encompass
	'8 The loan officer user should be able to navigate Home page
	'9 The loan should be display in the grid
	'10 The loan should open under the loans tab
	'11 The officer user: loanofficer in the log
'**************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3215","Script Name - LoanReassignment_ValidateLoanReassignmentImplementation", Null

Dim strUser, strAssigneeUser, strLoanNum

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_login"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

LoanReassignment_SelectRole "Loan Officer"
'====== Create User1 ======
'====== Create User2 (Asignee) ======
'====== Logout from Encompass ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1595", "The objective of test case is to validate the implementation of Loan Reassignment into a loan file from one user to another.", Null
strUser 	   = BIZ_OrganizationUsers_CreateUser("PTAC-1595_User1")
strAssigneeUser = BIZ_OrganizationUsers_CreateUser("PTAC-1595_User2")

BIZ_Login_UserLogout()

'====== Log in with non admin user ======
'====== Create a loan ======
'====== Logout from Encompass ======

LoanReassignment_Login_NonAdminUser "PTAC-1595_User1", strUser

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View", "Automation" 'Loan Officer - Default View
Wait g_ShortWaitMedium
BIZ_Loan_Save()

strLoanNum = BIZ_Loan_GetLoanNumber()
wait g_LongWaitLarge 'explicit wait added due to sync
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=closeBtn")
wait g_ShortWaitTime 'explicit wait added due to sync

BIZ_Login_UserLogout()

'====== Login to the Encompass as admin ======
'====== Goto Settings/"System Administration"/"Loan Reassignment" ======
'====== Re-assign the loan to asignee ======
'====== Logout from Encompass ======
BIZ_Login_UserLogin "admin_login"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "System Administration", "Loan Reassignment"
BIZ_Settings_SystemAdministration_LoanReassignment_ReassignLoan "PTAC-1595", strLoanNum
wait g_LongWaitSmall 'explicit wait added due to sync

BIZ_Login_UserLogout()

'====== Login to the Encompass as asignee ======
'====== Search for assigned loan in Pipeline ======
'====== Verify assigned loan ======
'====== Verify loan officer name in log ======


LoanReassignment_Login_NonAdminUser "PTAC-1595_User2", strAssigneeUser
LoanReassignment_SearchLoanNumberinPipeline(strLoanNum)
LoanReassignment_VerifyAssignedLoan(strLoanNum)
BIZ_AlertsAndLog_ClickOnRecord "Log", "File Started"
LoanReassignment_AlertsAndLog_VerifyLoanOfficer strAssigneeUser
wait g_LongWaitSmall 'explicit wait added due to sync
BIZ_Loan_Exit True
'===== To logout from Encompass =====
BIZ_Login_UserLogout() 
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_login"
LoanReassignment_SelectRole "Closer"
'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
  
