'@**************************************************************************************************
'@ TestStory: PTAC-2010- E2E_6FHAPURARM
'@ TestCase: 
   '1 PTAC-1909 - Processing 1- Order flood Certification
   '2 PTAC-1910 - Processing 2- Order Fraud service
   '3 PTAC-1911 - Processing 3- Complete and send 4506 and 4506-T forms
   '4 PTAC-1913 - Processing 4- Forms VOD,VOE, VOR,VOL
   '5 PTAC-1914 - Processing 5- Request conditions
   '6 PTAC-1915 - Processing 6- Order Appraisal
   '7 PTAC-1916 - Processing 7- Order title
'@ Test Automation JIRA Task: PTAC-2121 E2E_6FHAPURARM_Processing
'@ TestData: 
   '1 Global_Data, Login and E2E_FHAPURARM_Janetlp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3 Services, FraudService, E2E_FHAPURARM
   '4 eFolder_Tab, SetSendRequestData, E2E_FHAPURARM_4506
   '5 Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURARM
   '6 Forms_VOD, SetVODData, E2E_FHAPURARM
   '7 Forms_VOE, SetVOEData, E2E_FHAPURARM
   '8 Forms_VOR, SetVORData, E2E_FHAPURARM
   '9 eFolder_Tab, SetSendRequestData, E2E_FHAPURARM
  '10 Global_Data, Website, E2E_FHAPURARM_Borrower
  '11 Tools_OrderAppraisal, SetOrderAppraisal, E2E_FHAVPURARM
  '12 Global_Data, Website, E2E_FHAPURARM_Appraisal
  '13 Services, TitleNClosing, E2E_FHAPURARM
  '14 Global_Data, Website, E2E_FHAPURARM_TitleCenter
  '15 Services, TitleService, E2E_FHAPURARM
  '16 eFolder_Tab, AttachDocuments, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'Order Flood Certification
	'Order Fraud service
	'Complete and send 4506 and 4506T forms
	'Forms VOD, VOE, VOR, VOL
	'Request conditions
	'Order Appraisal
	'Order title
'@ ExpectedResult: 
	'Processing Milestone is finished for the Loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2121","Script Name: E2E_6FHAPURARM_Processing", Null

'===== Processing 1- Order flood Certification =====
RunAction "Processing_FloodCertification_001", oneIteration

'===== Processing 2- Order Fraud service =====
RunAction "Processing_OrderFraudService_002", oneIteration

'===== Processing 3- Complete and send 4506 and 4506T forms =====
RunAction "Processing_CompleteAndSend4506And4506_TForms_003", oneIteration

'===== Processing 5- Forms VOD, VOE, VOR, VOL =====
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'===== Processing 6-Request Conditions =====
RunAction "Processing_RequestConditions_005", oneIteration

'===== Processing 7- Order Appraisal =====
RunAction "Processing_OrderAppraisal_006", oneIteration

'===== Processing 8- Order Title =====
RunAction "Processing_OrderTitle_007", oneIteration

FRM_RT_TearDownTest(Null)
