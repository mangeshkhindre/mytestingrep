'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
	'1 PTAC-3183 FHAPURCHASEFIX- Doc Preparation 1 - Clear Alerts 
	'2 PTAC-3184 FHAPURCHASEFIX- Doc Preparation 2 - Complete Vesting and closing conditions 
	'3 PTAC-3185 FHAPURCHASEFIX- Doc Preparation 3 - Fill the closing Vendor information form 
	'4 PTAC-3187 FHAPURCHASEFIX- Doc Preparation 4 - Order and receive CD
	'5 PTAC-3186 FHAPURCHASEFIX- Doc Preparation 5 - Encompass compliance services   
	'6 PTAC-3188 FHAPURCHASEFIX- Doc Preparation 6 - Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-3284 E2E_4FHAPURCASHFIX_DocumentPreparation
'@ TestData:
    '01 Loans, Milestone, E2E_FHAPURCASHFIX_DocPreparing
	'02 Loans, LoanTemplate, E2E_Closer
	'03 Forms_ATRQMManagement, SetATRQMEligibility, E2E_FHAPURCASHFIX
    '04 Forms_ClosingConditions, SetClosingConditions, E2E_FHAPURCASHFIX
	'05 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_FHAPURCASHFIX
	'06 Forms_BorrowerInformationVesting VerifyBIVesting, E2E_FHAPURCASHFIX
	'07 Forms_ClosingConditions, AddClosingConditions, E2E_FHAPURCASHFIX
    '08 Tools_FileContacts, CopySettlementService, E2E_FHAPURCASHFIX1
	'09 Tools_FileContacts, CopySettlementService, E2E_FHAPURCASHFIX2
	'10 Tools_FileContacts, CopySettlementService, E2E_FHAPURCASHFIX3
    '11 eFolder_Tab, SendeDisclosures, E2E_FHAPURCASHFIX"
	'12 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURCASHFIX"
	'13 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURCASHFIX_CD"
	'14 Global_Data, Website, E2E_FHAPURCASHFIX_Borrower
    '15 Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURCASHFIX
    '16 Forms_REGZ_CD, SelectPlanCode, E2E_FHAPURCASHFIX
 	'17 Forms_RegZ_CD, SetLoanInformation, E2E_FHAPURCASHFIX
	'18 Forms_RegZ_CD, OrderDocs, E2E_FHAPURCASHFIX	
	'19 Forms_RegZ_CD, RegZ_CD, E2E_FHAPURCASHFIX
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3284","Script Name: E2E_4FHAPURCASHFIX_DocumentPreparation", Null

'====== Doc Preparation 1 - Clear Alerts ======
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'====== Doc Preparation 2 - Complete Vesting and closing conditions ======
RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

'====== Doc Preparation 3 - Fill the closing Vendor information form ======
RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

'====== Doc Preparation 4 - Order and receive CD ======
RunAction "DocPreparation_OrderReceiveCD_004", oneIteration

'====== Doc Preparation 5 - Encompass Compliance Services ======
RunAction "DocPreparation_EncompassComplianceServices_005", oneIteration

'====== Doc Preparation 6 - Complete REGZ-CD ======
RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
