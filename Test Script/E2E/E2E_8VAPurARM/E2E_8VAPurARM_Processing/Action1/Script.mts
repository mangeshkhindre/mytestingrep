'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase: 
   '1 PTAC-2163 - Processing 1- Order Flood Certification
   '2 PTAC-2165 - Processing 2- Order Fraud service
   '3 PTAC-2166 - Processing 3- Complete and send 4506 and 4506T forms
   '4 PTAC-2168 - Processing 4- Forms VOD, VOE, VOR, VOL
   '5 PTAC-2169 - Processing 5- Request Conditions
   '6 PTAC-2170 - Processing 6- Order Appraisal
   '7 PTAC-2171 - Processing 7- Order Title
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: 
   '1 Global_Data, Login, E2E_carollp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3 Services, FraudService, E2E_CONVPURARM
   '4 eFolder_Tab, SetSendRequestData, E2E_CONVPURARM_4506
   '5 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVPURARM
   '6 Forms_VOD, SetVODData, E2E_CONVPURARM
   '7 Forms_VOE, SetVOEData, E2E_CONVPURARM
   '8 Forms_VOR, SetVORData, E2E_CONVPURARM
   '9 Forms_VOL, SetVOLData, E2E_CONVPURARM
   '10 eFolder_Tab, SetSendRequestData, E2E_CONVPURARM
   '11 Global_Data, Website, E2E_CONVPURARM_Borrower
   '12 Tools_OrderAppraisal, SetOrderAppraisal, E2E_CONVPURARM
   '13 Global_Data, Website, E2E_CONVPURARM_Appraisal
   '14 Services, TitleNClosing, E2E_VAPURARM
   '15 Global_Data, Website, E2E_VAPURARM_TitleCenter
   '16 Services, TitleService, E2E_VAPURARM
   '17 eFolder_Tab, AttachDocuments, E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Order Flood Certification
   '2 Order Fraud service
   '3 Complete and send 4506 and 4506T forms
   '4 Forms VOD, VOE, VOR, VOL
   '5 Request Conditions
   '6 Order Appraisal
   '7 Order Title
'@ ExpectedResult: 
   'Processing Milestone is finished for the Loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2411","Script Name: E2E_8VAPURARM_Processing", Null

'====== PTAC-2163 -Processing 1- Order Flood Certification ======
RunAction "Processing_OrderFloodCertifications_001", oneIteration

'====== PTAC-2165 -Processing 2- Order Fraud service ======
RunAction "Processing_OrderFraudServices_002", oneIteration

'====== PTAC-2166 -Processing 3- Complete and send 4506 and 4506T forms ======
RunAction "Processing_CompleteSend4506And4506_Tforms_003", oneIteration

'====== PTAC-2168 -Processing 4- Forms VOD, VOE, VOR, VOL ======
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'====== PTAC-2169 -Processing 5- Request Conditions ======
RunAction "Processing_RequestCondition_005", oneIteration

'====== PTAC-2170 -Processing 6- Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== PTAC-2171 -Processing 7- Order Title ======
RunAction "Processing_OrderTitles_007", oneIteration

FRM_RT_TearDownTest(Null)
