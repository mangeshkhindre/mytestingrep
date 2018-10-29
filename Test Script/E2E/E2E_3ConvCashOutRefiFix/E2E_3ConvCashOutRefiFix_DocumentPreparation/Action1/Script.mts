'@**************************************************************************************************
'@ TestStory: PTAC-3770 E2E_3CONVCASHOUTREFFIX
'@ TestCase: 
    '1 PTAC-3326 CONVCASHOUTREFFIX Doc Preparation 1 - Clear Alerts 
    '2 PTAC-3368 CONVCASHOUTREFFIX Doc Preparation 2 - Complete Vesting and closing conditions 
    '3 PTAC-3400 CONVCASHOUTREFFIX Doc Preparation 3 - Fill the closing Vendor information form 
    '4 PTAC-3402 CONVCASHOUTREFFIX Doc Preparation 4 - Encompass compliance services 
    '5 PTAC-3401 CONVCASHOUTREFFIX Doc Preparation 5 - Order and receive CD 
    '6 PTAC-3482 CONVCASHOUTREFFIX Doc Preparation 6 - Complete REGZ-CD 
'@ Test Automation JIRA Task: PTAC-3379 E2E_3CONVCASHOUTREFFIX_DocumentPreparation
'@ TestData:
    '01 Loans, LoanTemplate, E2E_Closer
    '02 Loans, Milestone, E2E_CONVCASHOUTREFFIX_Funding
    '03 Forms_RegZ_CD, SetLoanInformation, E2E_CONVCASHOUTREFFIX
 	'04 Forms_REGZ_CD, SelectPlanCode, E2E_CONVCASHOUTREFFIX
 	'05 Forms_RegZ_CD, RegZ_CD, E2E_CONVCASHOUTREFFIX
 	'06 Forms_RegZ_CD, OrderDocs, E2E_CONVCASHOUTREFFIX
 	'07 Forms_ClosingConditions, SetClosingConditions, E2E_CONVCASHOUTREFFIX
	'08 Forms_ClosingConditions, AddClosingConditions, E2E_CONVCASHOUTREFFIX
	'09 Tools_FileContacts, CopySettlementService, E2E_CONVCASHOUTREFFIX1
	'10 Tools_FileContacts, CopySettlementService, E2E_CONVCASHOUTREFFIX2
	'11 Tools_FileContacts, CopySettlementService, E2E_CONVCASHOUTREFFIX3
	'12 eFolder_Tab, SendeDisclosures, E2E_CONVCASHOUTREFFIX
	'13 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_CONVCASHOUTREFFIX
	'14 eFolder_Tab, SelecteDisclosureDocs, E2E_CONVCASHOUTREFFIX_CD
	'15 Global_Data, Website, E2E_CONVCASHOUTREFFIX_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Doc Preparation 1 - Clear Alerts
    '2 Doc Preparation 2 - Complete Vesting and closing conditions
    '3 Doc Preparation 3 - Fill the closing Vendor information form
    '4 Doc Preparation 4 - Encompass compliance services
    '5 Doc Preparation 5 - Order and receive CD
    '6 Doc Preparation 6 - Complete REGZ-CD
'@ ExpectedResult: Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3379","Script Name: E2E_3CONVCASHOUTREFFIX_DocumentPreparation", Null

'====== Doc Preparation 1- Clear Alerts ======
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'====== Doc Preparation 2 - Complete Vesting and Closing Conditions ======
RunAction "DocPreparation_CompleteVestingClosingConditions_002", oneIteration

'====== Doc Preparation 3 - Fill the Closing Vendor Information Form ======
RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

'====== Doc Preparation 4 - Encompass Compliance Services ======
RunAction "DocPreparation_EncompassCompliancServices_004", oneIteration

'====== Doc Preparation 5- Order and Receive CD ======
RunAction "DocPreparation_OrderReceiveCD_005", oneIteration

'======  Doc Preparation 6- Complete REGZ-CD ======
RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
