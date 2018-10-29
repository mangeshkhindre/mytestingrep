'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
    '1 PTAC-2157 - Qualification 1- Access the assigned Loan as Loan ProcesserAssign LOan Officer to Loan
	'2 PTAC-2158 - Qualification 2- Fill 2015 Itemisation
	'3 PTAC-2159 - Qualification 3- edisclosures
	'4 PTAC-2160 - Qualification 4- Order Automated underwriting Import conditions
	'5 PTAC-2161 - Qualification 5- Order Encompass compliance service and finish the Qualification mIlestone
'@ Test Automation JIRA Task: PTAC-2409 E2E_8VAPURARM_Qualification 
'@ TestData:
   '01 Loans, LoanTemplate and E2E_LoanOfficer
   '02 Global_Data, Loan and E2E_carollo
   '03 Forms_2015Itemization, Set900Section and E2E_VAPURARM
   '04 Forms_2015Itemization, Set1000Section and E2E_VAPURARM
   '05 Forms_2015Itemization, Set1100Section and E2E_VAPURARM
   '06 Services, Underwriting and E2E_VAPURARM
   '07 eFolder_Tab, SendeDisclosures and E2E_VAPURARM
   '08 Forms_VA, VA_26-0286 and E2E_VAPURARM
   '09 Forms_VA, VA_26-1805 and E2E_VAPURARM
   '10 Forms_VA, VA_26-1820 and E2E_VAPURARM
   '11 Forms_VA, VA_26-6393 and E2E_VAPURARM
   '12 Forms_VA, VA_26-8261A and E2E_VAPURARM
   '13 Forms_VA, VAManagement_BasicInfo and E2E_VAPURARM
   '14 Forms_VA, VAManagement_Qualification and E2E_VAPURARM
   '15 Forms_VA, VAManagement_Tracking and E2E_VAPURARM
   '16 Loans, Milestone and E2E_Integration_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
	'1 Assign LOan Officer to Loan
	'2 Fill 2015 Itemisation Details
	'3 Order Automated underwriting Import conditions
	'4 Order Encompass compliance service
'@ ExpectedResult: 
	'Qualification Milestone should be finised
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2409","Script Name: E2E_8VAPURARM_Qualification", Null

'====== PTAC-2157 - VAPURARM - Qualification 1- Access the assigned Loan as Loan ProcesserAssign LOan Officer to Loan ======
RunAction "Qualification_AssignLoanToLoanProcessor_001", oneIteration

'====== PTAC-2158 - VAPURARM - Qualification 2- Fill 2015 Itemisation ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== PTAC-2159 - VAPURARM - Qualification 3- edisclosures ======
RunAction "QUalification_eDislosure_003", oneIteration

'====== PTAC-2160 - VAPURARM - Qualification 4- Order Automated underwriting Import conditions ======
RunAction "Qualification_OrderAutomatedUnderwritingImportConditions_004", oneIteration

'====== PTAC-2161 - VAPURARM - Qualification 5--Order Encompass compliance service and finish the Qualification mIlestone ======
RunAction "Qualification_OrderEncompassComplianceService_005", oneIteration

FRM_RT_TearDownTest(Null)
