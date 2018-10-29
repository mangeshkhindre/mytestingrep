'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase: 
    'PTAC-2113 Doc Preparation 1 - Clear Alerts
    'PTAC-2114 Doc Preparation 2 - Complete Vesting and closing conditions
    'PTAC-2116 Doc Preparation 3 - Fill the closing Vendor information form
    'PTAC-2117 Doc Preparation 4 - Encompass compliance services
    'PTAC-2118 Doc Preparation 5 - Order and receive CD
    'PTAC-2119 Doc Preparation 6 - Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-2126 E2E_6FHAPURARM_DocumentPreparation
'@ TestData:
    '1 Loans, Milestone, E2E_FHAPURARM_DocPreparing
	'2 Loans, LoanTemplate, E2E_Closer
	'3 Forms_ATRQMManagement, SetATRQMEligibility, E2E_FHAPURARM
	'4 Forms_ClosingConditions, SetClosingConditions, E2E_FHAPURARM
	'5 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_FHAPURARM
	'6 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_FHAPURARM
	'7 Forms_ClosingConditions, AddClosingConditions, E2E_FHAPURARM
	'8 Tools_FileContacts, CopySettlementService, E2E_FHAPURARM1
	'9 Tools_FileContacts, CopySettlementService, E2E_FHAPURARM2
	'10 Tools_FileContacts, CopySettlementService, E2E_FHAPURARM3
	'11 Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURARM
	'12 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
	'13 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURARM
	'14 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURARM_CD
	'15 Global_Data, Website, E2E_FHAPURARM_Borrower	
	'16 Forms_REGZ_CD, SelectPlanCode, E2E_FHAPURARM
 	'17 Forms_RegZ_CD, SetLoanInformation, E2E_FHAPURARM
	'18 Forms_RegZ_CD, OrderDocs, E2E_FHAPURARM	
	'19 Forms_RegZ_CD, RegZ_CD, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: 
    '1 Clear Alerts
    '2 Complete Vesting and closing conditions
    '3 Fill the closing Vendor information form
    '4 Encompass compliance services
    '5 Order and receive CD 
    '6 Complete REGZ-CD
'@ ExpectedResult: 
    'Loan should be created
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2126","Script Name: E2E_FHAPURARM_Document Prepartion", Null

RunAction "DocPreparation_ClearAlerts_001", oneIteration

RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

RunAction "DocPreparation_FillTheClosingVendorInformationForm_003", oneIteration

RunAction "DocPreparation_EncompassComplianceServices_004", oneIteration

RunAction "DocPreparation_OrderAndReceiveCD_005", oneIteration

RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)