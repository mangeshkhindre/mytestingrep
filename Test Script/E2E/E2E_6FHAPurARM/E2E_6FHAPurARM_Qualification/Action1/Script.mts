'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : 
   '1 PTAC-1877 Qualification 1 - Assign the loan opener and loan officer and Accept file
   '2 PTAC-1878 Qualification 2 - Fill 2015 Itemization and FHA Management 
   '3 PTAC-1879 Qualification 3 - edisclosures 
   '4 PTAC-1880 Qualification 4 - Order Automated underwriting/Import conditions 
   '5 PTAC-1881 Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone 
'@ Test Automation JIRA Task: PTAC-2120 E2E_6FHAPURARM_Qualification
'@ TestData: 
   '1 Loans, LoanTemplate,E2E_FHAPURARM
   '2 Forms_2015Itemization, Set900Section, E2E_FHAPURARM
   '3 Forms_2015Itemization, Set1000Section, E2E_FHAPURARM
   '4 Forms_2015Itemization, Set1100Section, E2E_FHAPURARM
   '5 RegZ_LE_SetDisclosureInformation
   '6 Services, Underwriting, E2E_FHAPURARM
   '7 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
   '8 Loans, Milestone, E2E_Integration_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '1 Assign the loan opener and loan officer and Accept file
   '2 Fill 2015 Itemisation Details
   '3 edisclosures
   '4 Order Automated underwriting Import conditions
   '5 Order Encompass compliance service and finish the Qualification mIlestone
'@ ExpectedResult: 
   'Qualification Milestone should be finised1
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2120","Script Name: E2E_6FHAPURARM_Qualification", Null

'====== Call "Qualification_AssignLoan2LoanProcessor_001" Action ======
RunAction "Qualification_AssignLoan2LoanProcessor_001", oneIteration

'====== Call "Qualification_Fill2015Itemization_002" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification_eDisclosure" Action ======
RunAction "Qualification_eDislosure_003", oneIteration

'====== Call "Qualification_OrderAutomatedUnderWriting_004" Action ======
RunAction "Qualification_OrderAutomatedUnderWriting_004", oneIteration

'====== Call "Qualification_OrderComplianceService_005" Action ======
RunAction "Qualification_OrderComplianceService_005", oneIteration

FRM_RT_TearDownTest(Null)
