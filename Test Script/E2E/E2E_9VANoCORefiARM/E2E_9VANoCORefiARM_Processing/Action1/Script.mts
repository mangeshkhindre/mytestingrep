'@******************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
	'1. PTAC-2328 -Processing 1- Order Flood Certification
	'2. PTAC-2330 -Processing 2- Order Fraud service
	'3. PTAC-2331 -Processing 3- Complete and send 4506 and 4506T forms
	'4. PTAC-2333 -Processing 4- Forms VOD, VOE, VOR, VOL
	'5. PTAC-2334 -Processing 5- Request Conditions
	'6. PTAC-2335 -Processing 6- Order Appraisal
	'7. PTAC-2336 -Processing 7- Order Title
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData: 
	'1 Global_Data, Logi and E2E_carollp
    '2 Loans, LoanTemplat and E2E_LoanProcessorDefault
	'3 Services, FraudService and E2E_VANoCORefiARM
	'4 eFolder_Tab, SetSendRequestDat and E2E_VANoCORefiARM_4506
	'5 Tools_TQLServices, SetValuationServiceOrder and E2E_VANoCORefiARM
	'6 Forms_VOD, SetVODData and E2E_VANoCORefiARM
	'7 Forms_VOE, SetVOEData and E2E_VANoCORefiARM
	'8 Forms_VOR, SetVORData and E2E_VANoCORefiARM
	'9 Forms_VOL, SetVOLData and E2E_VANoCORefiARM
	'10 eFolder_Tab, SetSendRequestData and E2E_VANoCORefiARM
	'11 Global_Data, Website and E2E_VANoCORefiARM_Borrower
	'12 Tools_OrderAppraisal, SetOrderAppraisal and E2E_VANoCORefiARM
	'13 Global_Data, Website and E2E_VANoCORefiARM_Appraisal
	'14 Services, TitleNClosing and E2E_VANoCORefiARM
	'15 Global_Data, Website and E2E_VANoCORefiARM_TitleCenter
	'16 Services, TitleService and E2E_VANoCORefiARM
	'17 eFolder_Tab, AttachDocuments and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'Order Flood Certification
	'Order Fraud service
	'Complete and send 4506 and 4506T forms
	'Forms VOD, VOE, VOR, VOL
	'Request Conditions
	'Order Appraisal
	'Order Title
'@ ExpectedResult: 
	'Processing Milestone is finished for the Loan
'********************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2897","Script Name: E2E_9VANoCORefiARM_Processing", Null

'====== Order flood certification ======
RunAction "Processing_OrderFloodCertifications_001", oneIteration

'====== Order Fraud service ======
RunAction "Processing_OrderFraudServices_002", oneIteration

'====== Complete and send4506 and 4506_Tforms ======
RunAction "Processing_CompleteSend4506And4506_Tforms_003", oneIteration

'====== Forms VOD VOE VOR VOl  ======
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'====== Request conditions ======
RunAction "Processing_RequestCondition_005", oneIteration

'====== Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== Order Title ======
RunAction "Processing_OrderTitles_007", oneIteration

FRM_RT_TearDownTest(Null)
