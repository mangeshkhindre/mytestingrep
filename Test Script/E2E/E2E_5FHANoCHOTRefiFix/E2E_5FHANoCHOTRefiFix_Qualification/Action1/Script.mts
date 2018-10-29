'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
	'1 PTAC-1815 FHANOCHOTREFIFIX - Qualification 1 - Access the assigned Loan as "Loan Processer"
	'2 PTAC-1816 FHANOCHOTREFIFIX - Qualification 2 - Fill 2015 Itemization
	'3 PTAC-1520 FHANOCHOTREFIFIX - Qualification 3 - edisclosures	
	'4 PTAC-1817 FHANOCHOTREFIFIX - Qualification 4 - Order Automated underwriting/Import conditions
	'5 PTAC-1818 FHANOCHOTREFIFIX - Qualification 5 - Order Encompass compliance service
'@ Test Automation JIRA Task: PTAC-2447 E2E_5FHANoCHOTRefiFix_Qualification
'@ TestData:
    '1 Loans, LoanTemplate and E2E_LoanOfficer
    '2 Global_Data, Login and E2E_Clarklo
    '3 Forms_2015Itemization, Set800Section and FHANOCHOTREFIFIX
    '4 Services, Underwriting and E2E_FHANoCHOTRefiFix
    '5 eFolder_Tab, SendeDisclosures and E2E_FHANoCHOTRefiFix
    '6 Loans, Milestone and E2E_FHANOCHOTREFIFIX_Qualification
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
	'1 Assign LOan Officer to Loan
	'2 Fill 2015 Itemisation Details
	'3 Order Automated underwriting Import conditions
	'4 Order Encompass compliance service
'@ ExpectedResult: Qualification Milestone should be finised
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2447","Script Name : E2E_5FHANoCHOTRefiFix_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoanToLoanProcessor_001", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification_eDisclosure" Action ======
RunAction "Qualification_eDislosure_003", oneIteration

'====== Call "Qualification3_OrderAutomatedunderwritingImportconditions" Action ======
RunAction "Qualification_OrderAutomatedUnderWritingImportConditions_004", oneIteration

'====== Call "Qualification4_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderComplianceService_005", oneIteration

FRM_RT_TearDownTest(Null)
