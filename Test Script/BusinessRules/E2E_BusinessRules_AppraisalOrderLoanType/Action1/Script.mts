'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase:
   '1 PTAC-1559 Verify Appraisal Order with Loan type as 'Conventional'
   '2 PTAC-1560 Verify Appraisal Order with Loan type as 'FHA'
   '3 PTAC-1564 Verify Appraisal Order with Loan type as 'HELOC'
   '4 PTAC-1562 Verify Appraisal Order with Loan type as 'USDA_RHS'
   '5 PTAC-1561 Verify Appraisal Order with Loan type as 'VA'
   '6 PTAC-1563 Verify Appraisal Order with Loan type as 'Other'
'@ Test Automation JIRA Task: PTAC-1837 BusinessRules_AppraisalOrderLoanType
'@ TestData: 
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1559
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1559
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1560
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1560
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1561
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1561
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1562
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1562
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1563
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1563
   'BusinessRule_PersonaAccessToFields,AppraiserOrderDetails,PTAC-1564
   'BusinessRule_PersonaAccessToFields,RuleDetails,PTAC-1564
   
'@ Pre-conditions: 
'@ Description: Create New under one folder, set Business rules in Appraisal Order Management
'@ TestSteps:
   '1 Login to Encompass with Admin user
      'Navigate to through Encompass Settings -> Business Rules ->Appraisal Order Management
      'Click on Change Setting button
      'select any loan Type ,select Ordering Optional as 'Approved Appraisers Only' and select 'Loan Officer' Persona and check 'Enable Ordering' check box
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

FRM_RT_SetupTest(Null)
   
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1837","Script Name: BusinessRules_AppraisalOrderLoanType", Null

'====== PTAC-1559 Verify Appraisal Order with Loan type as 'Conventional' ======
RunAction "BusinessRules_AppraisalOrderLoanType_Conventional_001", oneIteration

'====== PTAC-1560 Verify Appraisal Order with Loan type as 'FHA' ======
RunAction "BusinessRules_AppraisalOrderLoanType_FHA_002", oneIteration

'====== PTAC-1562 Verify Appraisal Order with Loan type as 'USDA_RHS' ======
RunAction "BusinessRules_AppraisalOrderLoanType_VA_003", oneIteration

'====== PTAC-1561 Verify Appraisal Order with Loan type as 'VA' ======
RunAction "BusinessRules_AppraisalOrderLoanType_USDA_RHS_005", oneIteration

'====== PTAC-1563 Verify Appraisal Order with Loan type as 'Other' ======
RunAction "BusinessRules_AppraisalOrderLoanType_Other_006", oneIteration

FRM_RT_TearDownTest(Null)









