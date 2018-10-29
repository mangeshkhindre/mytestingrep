'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase: 
	'1 PTAC-901 Doc Preparation 1- Clear Alerts
	'2 PTAC-904 Doc Preparation 2 - Complete Vesting and closing conditions
	'3 PTAC-923 Doc Preparation 3 - Fill the closing Vendor information form
	'4 PTAC-1007 Doc Preparation 4 - Encompass Compliance Services
	'5 PTAC-1009 Doc Preparation 5 - Order and receive CD 
	'6 PTAC-1008 Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
'@ TestData:
	'01 Loans, Milestone, E2E_CONVPURARM_DocPreparing
	'02 Loans, LoanTemplate, E2E_Closer
	'03 Forms_ATRQMManagement, SetATRQMEligibility, E2E_CONVPURARM
	'04 FRM_DS_GetTestData, Forms_ClosingConditions, SetClosingConditions, E2E_CONVPURARM
	'05 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_CONVPURARM
	'06 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_CONVPURARM
	'07 Forms_ClosingConditions, AddClosingConditions, E2E_CONVPURARM
	'08 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM1
	'09 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM2
	'10 Tools_FileContacts, CopySettlementService, E2E_CONVPURARM3
	'11 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVPURARM
	'12 eFolder_Tab, SendeDisclosures, E2E_CONVPURARM
	'13 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_CONVPURARM
	'14 eFolder_Tab, SelecteDisclosureDocs, E2E_CONVPURARM_CD
	'15 Global_Data, Website, E2E_CONVPURARM_Borrower
	'16 Forms_REGZ_CD, SelectPlanCode, E2E_CONVPURARM
 	'17 Forms_RegZ_CD, SetLoanInformation, E2E_CONVPURARM
	'18 Forms_RegZ_CD, OrderDocs, E2E_CONVPURARM	
	'19 Forms_RegZ_CD, RegZ_CD, E2E_CONVPURARM
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1021","Script Name: E2E_2CONVPURARM_DocumentPreparation", Null

'====== PTAC-901 Doc Preparation 1- Clear Alerts ======
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'====== PTAC-904 Doc Preparation 2 - Complete Vesting and closing conditions ======
RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

'====== PTAC-923 Doc Preparation 3 - Fill the closing Vendor information form ======
RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

'====== PTAC-1007 Doc Preparation 4 - Encompass Compliance Services ======
RunAction "DocPreparation_EncompassComplianceServices_004", oneIteration

'====== PTAC-1009 Doc Preparation 5- Order and receive CD ======
RunAction "DocPreparation_OrderReceiveCD_005", oneIteration

'====== PTAC-1008 - Complete REGZ-CD ======
RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
