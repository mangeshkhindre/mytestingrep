'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANOCHOTREFIFIX
'@ TestCase: 
   '1 PTAC-2031 FHANOCHOTREFIFIX Doc Preparation 1- Clear Alerts
   '2 PTAC-2141 FHANOCHOTREFIFIX Doc Preparation 2- Complete Vesting and closing conditions
   '3 PTAC-2142 FHANOCHOTREFIFIX Doc Preparation 3- Fill the closing Vendor information form
   '4 PTAC-2143 FHANOCHOTREFIFIX Doc Preparation 4- Encompass compliance services
   '5 PTAC-2144 FHANOCHOTREFIFIX Doc Preparation 5- Order and receive CD
   '6 PTAC-2181 FHANOCHOTREFIFIX Doc Preparation 6- Complete REGZ-CD
'@ Test Automation JIRA Task: PTAC-2705 E2E_5FHANOCHOTREFIFIX_DocumentPreparation
'@ TestData:
   '1 Loans, Milestone, E2E_FHANOCHOTREFIFIX_DocPreparing
   '2 Loans, LoanTemplate, E2E_Closer
   '3 Forms_ClosingConditions, SetClosingConditions, E2E_FHANOCHOTREFIFIX
   '4 Forms_BorrowerInformationVesting, SetVestingInformation, E2E_FHANOCHOTREFIFIX
   '5 Forms_BorrowerInformationVesting, VerifyBIVesting, E2E_FHANOCHOTREFIFIX
   '6 Forms_ClosingConditions, AddClosingConditions, E2E_FHANOCHOTREFIFIX
   '7 Forms_REGZ_CD, SelectPlanCode, E2E_FHANOCHOTREFIFIX
   '8 Forms_RegZ_CD, SetLoanInformation, E2E_FHANOCHOTREFIFIX
   '9 Forms_RegZ_CD, OrderDocs, E2E_FHANOCHOTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 FHANOCHOTREFIFIX Doc Preparation 1- Clear Alerts
   '2 FHANOCHOTREFIFIX Doc Preparation 2 - Complete Vesting and closing conditions
   '3 FHANOCHOTREFIFIX Doc Preparation 3 - Fill the closing Vendor information form
   '4 FHANOCHOTREFIFIX Doc Preparation 4 - Encompass compliance services
   '5 FHANOCHOTREFIFIX Doc Preparation 5- Order and receive CD
   '6 FHANOCHOTREFIFIX Doc Preparation 6- Complete REGZ-CD
'@ ExpectedResult: Loan should complete the Document Preparation Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2705","Script Name - E2E_5FHANOCHOTREFIFIX_DocumentPrepartion", Null

RunAction "DocPreparation_ClearAlerts_001", oneIteration

RunAction "DocPreparation_CompleteVestingAndClosingConditions_002", oneIteration

RunAction "DocPreparation_FillClosingVendorInformationForm_003", oneIteration

RunAction "DocPreparation_EncompassComplianceServices_004", oneIteration

RunAction "DocPreparation_OrderAndReceiveCD_005", oneIteration

RunAction "DocPreparation_CompleteREGZ_CD_006", oneIteration

FRM_RT_TearDownTest(Null)
