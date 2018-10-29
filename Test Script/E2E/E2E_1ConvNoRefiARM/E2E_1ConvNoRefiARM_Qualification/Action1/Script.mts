'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1267 CONVNOCASHREFIARM - Qualification 1 - Access the assigned Loan as "Loan Processer"
   '2 PTAC-1269 CONVNOCASHREFIARM - Qualification 2 - Fill 2015 Itemization
   '3 PTAC-1264 CONVNOCASHREFIARM - Qualification 3 - eDisclosures
   '4 PTAC-1270 CONVNOCASHREFIARM - Qualification 4 - Order Automated underwriting/Import conditions
   '5 PTAC-1359 CONVNOCASHREFIARM -  Qualification 5 - Order Encompass compliance service
'@ Test Automation JIRA Task: PTAC-1664 E2E_1ConvNoRefiARM_Qualification
'@ TestData: 
   '1 Global_Data, Login, E2E_carollo
   '2 Loans, LoanTemplate, E2E_LoanOfficer
   '3 eFolder_Tab, SendeDisclosures, E2E_ConvNoRefiARM
   '4 Services, Underwriting, E2E_ConvNoRefiARM
   '5 Tools_TQLServices, SetValuationServiceOrder, E2E_ConvNoRefiARM
   '6 Loans, Milestone, E2E_ConvNoRefiARM_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Access the assigned Loan as "Loan Processer"
   '2 Fill 2015 Itemization
   '3 eDisclosures
   '4 Order Automated underwriting/Import conditions
   '5 Order Encompass compliance service
'@ ExpectedResult:  Loan should complete Qualification Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1664","Script Name: E2E_1ConvNoRefiARM_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoan2LoanProcessor_001", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification3_eDisclosures" Action ======
RunAction "Qualification_eDisclosures_003", oneIteration

'====== Call "Qualification4_OrderAutomatedUnderwritingImportConditions" Action ======
RunAction "Qualification_OrderAutomatedUnderwritingImportConditions_004", oneIteration

'====== Call "Qualification5_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderComplianceService_005", oneIteration

FRM_RT_TearDownTest(Null) @@ hightlight id_;_5512916_;_script infofile_;_ZIP::ssf42.xml_;_
