'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
    'PTAC-2319 Qualification 1 - Assign the loan opener and loan officer and Accept file
    'PTAC-2320 Qualification 2 - Fill 2015 Itemization
    'PTAC-2321 Qualification 3 - eDisclosures
    'PTAC-2322 Qualification 4 - Order Automated underwriting/Import conditions
    'PTAC-2323 Qualification 5 - Order Encompass compliance service and finish the Qualification milestone
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification
'@ TestData:
   '1 Global_Data, Login, E2E_carollo
   '2 Loans, LoanTemplate, E2E_LoanOfficer
   '3 eFolder_Tab, SendeDisclosures, E2E_VANoCORefiARM
   '4 Services, Underwriting, E2E_VANoCORefiARM
   '5 Tools_TQLServices, SetValuationServiceOrder, E2E_VANoCORefiARM
   '6 Loans, Milestone, E2E_VANoCORefiARM_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   'Detailed steps are mentioned at action level.
'@ ExpectedResult: 
   'Expected Results mentioned at action level.
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2807","Script Name: E2E_9VANoCORefiARM_Qualification", Null

'====== Qualification 1 - Assign the loan opener and loan officer and Accept file ======
RunAction "Qualification_AssignLoanOpenerLoanOfficer_001", oneIteration

'====== Qualification2- Fill 2015 Itemization ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Qualification 3 - eDisclosures ======
RunAction "Qualifcation_eDisclosures_003", oneIteration

'====== Qualification 4 - Order Automated underwriting/Import conditions ======
RunAction "Qualification_OrderUnderwriting_004", oneIteration

'====== Qualification 5. Order Encompass compliance service and finish the Qualification milestone ======
RunAction "Qualification_OrderComplianceService_005", oneIteration

FRM_RT_TearDownTest(Null)