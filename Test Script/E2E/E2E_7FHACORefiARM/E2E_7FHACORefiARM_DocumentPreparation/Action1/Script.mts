'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
   '1 PTAC-2685 FHACOREFIARM Doc Preparation 1 - Clear Alerts
   '2 PTAC-2686 FHACOREFIARM Doc Preparation 2 - Complete Vesting and closing conditions
   '3 PTAC-2687 FHACOREFIARM Doc Preparation 3 - Fill the closing Vendor information form
   '4 PTAC-2688 FHACOREFIARM Doc Preparation 4 - Encompass compliance services
   '5 PTAC-2692 FHACOREFIARM Doc Preparation 5 - Order and receive CD
   '6 PTAC-2730 FHACOREFIARM Doc Preparation 6- Complete REGZ-CD 
'@ Test Automati JIRA Task: PTAC-2721 E2E_7FHACORefiARM_DocumentPreparation
'@ TestData:
    '1 Loans, Milestone, E2E_FHACORefiARM_DocPreparing
    '2 Loans, LoanTemplate, E2E_Closer
    '3 Forms_ClosingConditions, SetClosingConditions, E2E_FHACORefiARM
    '4 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_FHACORefiARM
    '5 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_FHACORefiARM
    '6 Forms_ClosingConditions, AddClosingConditions, E2E_FHACORefiARM
'@ Pre-conditions: 
	'Loan Number is in E2E Property file
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

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2721","Script Name: E2E_7FHACORefiARM_DocumentPreparation", Null

'====== PTAC-2685 FHACOREFIARM Doc Preparation 1 - Clear Alerts ======
RunAction "DocPreparation_ClearAlerts_001", oneIteration

'====== PTAC-2686 FHACOREFIARM Doc Preparation 2 - Complete Vesting and closing conditions ======
RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

'====== PTAC-2687 FHACOREFIARM Doc Preparation 3 - Fill the closing Vendor information form ======
RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

'====== PTAC-2688 FHACOREFIARM Doc Preparation 4 - Encompass compliance services ======
RunAction "DocPreparation_EncompassComplianceServices_004", oneIteration

	'====== PTAC-2692 FHACOREFIARM Doc Preparation 5 - Order and receive CD======
RunAction "DocPreparation_OrderReceiveCD_005", oneIteration

'======  PTAC-2730 FHACOREFIARM Doc Preparation 6- Complete REGZ-CD  ======
RunAction "DocPreparation_CompleteREGZ-CD_006", oneIteration

FRM_RT_TearDownTest(Null)
