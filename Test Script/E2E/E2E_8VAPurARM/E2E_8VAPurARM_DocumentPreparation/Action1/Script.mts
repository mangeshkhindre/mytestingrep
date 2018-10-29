'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase: 
	'1 PTAC-2244 Doc Preparation 1 - Clear Alerts
	'2 PTAC-2245 Doc Preparation 2 - Complete Vesting and closing conditions
	'3 PTAC-2246 Doc Preparation 3 - Fill the closing Vendor information form
	'4 PTAC-2247 Doc Preparation 4 - Encompass compliance services
	'5 PTAC-2248 Doc Preparation 5 - Order and receive CD 
	'6 PTAC-2249 Doc Preparation 6 - Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-2402 E2E_8VAPURARM_DocumentPreparation
'@ TestData:
    '1 Loans, Milestone, E2E_VAPURARM_DocPreparing
	'2 Loans, LoanTemplate, E2E_Closer
    '3 Forms_ClosingConditions, SetClosingConditions, E2E_VAPURARM
	'4 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_VAPURARM
	'5 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_VAPURARM
	'6 Forms_ClosingConditions, AddClosingConditions, E2E_VAPURARM
    '7 Forms_REGZ_CD, SelectPlanCode, E2E_VAPURARM
 	'8 Forms_RegZ_CD, SetLoanInformation, E2E_VAPURARM
	'9 Forms_RegZ_CD, OrderDocs, E2E_VAPURARM	
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
	'1 Clear Alerts
	'2 Complete Vesting and closing conditions
	'3 Fill the closing Vendor information form
	'4 Order and receive CD 
	'5 Complete REGZ-CD Details
'@ ExpectedResult: Loan should complete the Document Preparation Milestone
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2402","Script Name: E2E_8VAPURARM_DocumentPreparation", Null

'===== Doc Preparation 1 - Clear Alerts =====
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'===== Doc Preparation 2 - Complete Vesting and closing conditions =====
RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

'===== Doc Preparation 3 - Fill the closing Vendor information form =====
RunAction "DocPreparation_FillTheClosingVendorInformationform_003", oneIteration

'===== Doc Preparation 4 - Order and receive CD  =====
RunAction "DocPreparation_OrderAndReceiveCD_004", oneIteration

'===== Doc Preparation 5 - Encompass compliance services =====
RunAction "DocPreparation_EncompassComplianceServices_005", oneIteration

'===== Doc Preparation 6 - Complete REGZ-CD =====
RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
