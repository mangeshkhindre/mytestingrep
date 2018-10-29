'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase:  PTAC-1559 Verify Appraisal Order with Loan type as 'Conventional'
'@ Test Automation JIRA Task: PTAC-1837 BusinessRules_AppraisalOrderLoanTypeAsConventional
'@ TestData: 
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1559
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1559
'@ Pre-conditions: 
'@ Description: Create New under one folder, set Business rules in Appraisal Order Management
'@ TestSteps:
   '1 Login to Encompass with Admin user
      'Navigate to through Encompass Settings -> Business Rules ->Appraisal Order Management
      'Click on Change Setting button
      'select loan Type as 'Conventional',select Ordering Optional as 'Approved Appraisers Only' and select 'Loan Officer' Persona and check 'Enable Ordering' check box
      'Click on 'Manage Appraisers' tab and select 'Integration Testing Appraisal Services' option
      'Click on Close button
   '2 Login to Encompass with new user(Non admin user )
      'Go to Pipeline and select created Loan Folder
      'Create a New Loan mentioned in test data, Save
      'Go to Services section and Click on Order Appraisal
      'Select appraiser as "Integration Testing Appraisal Services"  and Click on Next button
      'Fill the Phone number, Due Date(Current Date), and Click on Submit order and verify the Order Appraisal.
'@ ExpectedResult:
   '1 Admin should be able to login
      'Appraisal Order Management window should be displayed.
      'Appraisal Management pop up will display with default 'Appraisal Ordering Options' tab
      'Options to be selected.
      'The Appraisal setting should be changed
      'The Appraisal Management pop up should be closed
   '2 User should able to login successfully.
      'Created loan folder to be displayed.
      'The loan should be created successfully.
      'Order Appraisal- Approved Appraisers Only' popup should be displayed
      'It should populate with 'Name', 'Email', 'Property Address', 'Loan number' are auto populated.
      'It should show the message as 'Your Appraisal order has been sent to to Integration Testing Appraisal Services' successfully.
'***************************************************************************************************

Set objData = FRM_DS_GetTestData("BusinessRule_PersonaAccessToFields", "AppraiserOrderDetails", "PTAC-1559")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If strExecutionFlag = "Y" Then
	
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1559","Verify Appraisal Order with Loan type as 'Conventional'", Null

Dim strLoanNumber
'====== Login With Admin User for settings ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"
BIZ_OrganizationUsers_CreateUser "PTAC-1559"
BR_AdminUser_ChangeSettings "PTAC-1559"

'====== Logout with Admin User ======
BIZ_Login_UserLogout()

'====== Login With Non-Admin User ======
'====== Create New Loans and generate Appraiser Order======
BIZ_Login_UserLogin "BR_ExportAndImportRules_NonAdmin"
strLoanNumber = BR_CreateLoanWithBorrowerSummaryOriginationInfo("PTAC-1559")
Wait g_ShortWaitMedium + g_ShortWaitMedium 'Due To Sync Issue We Are Explicitly Passing Wait Statement
BR_OrderAppraisal_NonAdmin "PTAC-1559",strLoanNumber
BIZ_Loan_Exit(False)
Wait g_ShortWaitMedium + g_ShortWaitMedium 'Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_Nav_SelectHomeTab

'====== Logout form the Applicaion with Non Admin ======
BIZ_Login_UserLogout()

End if
