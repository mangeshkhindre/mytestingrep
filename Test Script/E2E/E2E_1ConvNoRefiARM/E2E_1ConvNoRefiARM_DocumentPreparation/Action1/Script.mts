'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
    '1 PTAC-1408 CONVNOCASHREFIARM - Doc Preparation 1 - Clear Alerts
    '2 PTAC-1409 CONVNOCASHREFIARM - Doc Preparation 2 - Complete Vesting and closing conditions
    '3 PTAC-1410 CONVNOCASHREFIARM - Doc Preparation 3 - Fill the closing Vendor information form
    '4 PTAC-1411 CONVNOCASHREFIARM - Doc Preparation 4 - Encompass compliance services
    '5 PTAC-1412 CONVNOCASHREFIARM - Doc Preparation 5 - Order and receive CD
    '6 PTAC-1414 CONVNOCASHREFIARM - Doc Preparation 6 - Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-1836 E2E_1ConvNoRefiARM_DocumentPreparation
'@ TestData:
    '01 Loans, LoanTemplate and E2E_Closer
    '02 Loans, Milestone and E2E_ConvNoRefiARM_Funding
    '03 Forms_RegZ_CD, SetLoanInformation and E2E_ConvNoRefiARM
 	'04 Forms_REGZ_CD, SelectPlanCode and E2E_ConvNoRefiARM
 	'05 Forms_RegZ_CD, RegZ_CD and E2E_ConvNoRefiARM
 	'06 Forms_RegZ_CD, OrderDocs and E2E_ConvNoRefiARM
 	'07 Forms_ClosingConditions, SetClosingConditions and E2E_ConvNoRefiARM
	'08 Forms_ClosingConditions, AddClosingConditions and E2E_ConvNoRefiARM
	'09 Tools_FileContacts, CopySettlementService and E2E_ConvNoRefiARM1
	'10 Tools_FileContacts, CopySettlementService and E2E_ConvNoRefiARM2
	'11 Tools_FileContacts, CopySettlementService and E2E_ConvNoRefiARM3
	'12 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
	'13 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_ConvNoRefiARM
	'14 eFolder_Tab, SelecteDisclosureDocs and E2E_ConvNoRefiARM_CD
	'15 Global_Data, Website and E2E_ConvNoRefiARM_Borrower
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1836","Script Name: E2E_1ConvNoRefiARM_DocumentPreparation", Null

'====== Doc Preparation 1- Clear Alerts ======
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'====== Doc Preparation 2 - Complete Vesting and Closing Conditions ======
RunAction "DocPreparation_CompleteVestingClosingConditions_002", oneIteration

'====== Doc Preparation 3 - Fill the Closing Vendor Information Form ======
RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

'====== Doc Preparation 4- Order and Receive CD ======
RunAction "DocPreparation_OrderReceiveCD_004", oneIteration

'====== Doc Preparation 5 - Encompass Compliance Services ======
RunAction "DocPreparation_EncompassCompliancServices_005", oneIteration

'======  Doc Preparation 6- Complete REGZ-CD ======
RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
