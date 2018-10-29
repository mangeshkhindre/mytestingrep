'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase: 
   '1 PTAC-3110 CONVCASHOUTREFIFIX Qualification 1 - Access the assigned Loan as "Loan Processer"
   '2 PTAC-3307 CONVCASHOUTREFIFIX Qualification 2 - Get Rate Lock request and LO comp plan and Float.
   '3 PTAC-3308 CONVCASHOUTREFIFIX Qualification 3 - Get Rate Locked
   '2 PTAC-3113 CONVCASHOUTREFIFIX Qualification 4 - Fill 2015 Itemization
   '3 PTAC-3117 CONVCASHOUTREFIFIX Qualification 5 - eDisclosures
   '4 PTAC-3125 CONVCASHOUTREFIFIX Qualification 6 - Order Automated underwriting/Import conditions
   '5 PTAC-3126 CONVCASHOUTREFIFIX Qualification 7 - Order Encompass compliance service
'@ Test Automation JIRA Task: PTAC-3372 E2E_3CONVCASHOUTREFIFIX_Qualification
'@ TestData: 
   '1 Global_Data, Login, E2E_carollo
   '2 Loans, LoanTemplate, E2E_LoanOfficer
   '3 eFolder_Tab, SendeDisclosures, E2E_CONVCASHOUTREFIFIX
   '4 Services, Underwriting, E2E_CONVCASHOUTREFIFIX
   '5 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVCASHOUTREFIFIX
   '6 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Access the assigned Loan as "Loan Processer"
   '2 Fill 2015 Itemization
   '3 eDisclosures
   '4 Order Automated underwriting/Import conditions
   '5 Order Encompass compliance service
'@ ExpectedResult: Loan should complete Qualification Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3372","Script Name: E2E_3CONVCASHOUTREFIFIX_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoan2LoanProcessor_001", oneIteration

'====== Call "Qualification_GetRateLockRequestandLOCompPlanandFloat_002" Action ======
RunAction "Qualification_GetRateLockRequestAndLOCompPlanandFloat_002", oneIteration

'====== Call "Qualification_GetRateLocked_003" Action ======
RunAction "Qualification_GetRateLocked_003", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_004", oneIteration

'====== Call "Qualification3_eDisclosures" Action ======
RunAction "Qualification_eDisclosures_005", oneIteration

'====== Call "Qualification4_OrderAutomatedUnderwritingImportConditions" Action ======
RunAction "Qualification_OrderAutomatedUnderwritingImportConditions_006", oneIteration

'====== Call "Qualification5_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderComplianceService_007", oneIteration

FRM_RT_TearDownTest(Null)
