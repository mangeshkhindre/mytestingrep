'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase: 
   '1 PTAC-1821 FHANOCHOTREFIFIX Processing 1- Order Flood Certification
   '2 PTAC-1822 FHANOCHOTREFIFIX Processing 2- Order Fraud Service
   '3 PTAC-1823 FHANOCHOTREFIFIX Processing 3- Complete and send 4506 and 4506-T Forms
   '4 PTAC-1826 FHANOCHOTREFIFIX Processing 4- Forms VOD,VOE, VOL
   '5 PTAC-1827 FHANOCHOTREFIFIX Processing 5- Request conditions
   '6 PTAC-1828 FHANOCHOTREFIFIX Processing 6- Order Appraisal
   '7 PTAC-1829 FHANOCHOTREFIFIX Processing 7- Order title
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
   '1  Global_Data, Login, E2E_Carollp
   '2  Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3  Services, FraudService, E2E_FHANoCHOTRefiFix
   '4  eFolder_Tab, SetSendRequestData, E2E_FHANoCHOTRefiFix_4506 
   '5  Global_Data, Website, E2E_FHANoCHOTRefiFix_Borrower
   '6  Global_Data, Website, E2E_FHANoCHOTRefiFix_CoBorrower
   '7  eFolder_Tab, SendeDisclosures, E2E_FHANOCHOTREFIFIX
   '8  Forms_VOD, SetVODData, E2E_FHANoCHOTRefiFix
   '9  Forms_VOE, SetVOEData, E2E_FHANoCHOTRefiFix
   '10 Forms_VOR, SetVORData, E2E_FHANoCHOTRefiFix
   '11 Forms_VOL, SetVOLData, E2E_FHANoCHOTRefiFix
   '12 Tools_OrderAppraisal, SetOrderAppraisal, E2E_FHANoCHOTRefiFix
   '13 Global_Data, Website, E2E_FHANoCHOTRefiFix_Appraisal
   '14 Services, TitleNClosing, E2E_FHANoCHOTRefiFix
   '15 Global_Data, Website, E2E_FHANoCHOTRefiFix_TitleCenter
   '16 Services, TitleService, E2E_FHANoCHOTRefiFix
   '17 eFolder_Tab, AttachDocuments, E2E_FHANoCHOTRefiFix
   '18 Tools_TQLServices, SetValuationServiceOrder, E2E_FHANoCHOTRefiFix
'@ Pr e-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Order Flood Certification
   '2 Order Fraud Service
   '3 Complete and Send 4506 and 4506-T Forms
   '4 Forms VOD,VOE, VOL
   '5 Request Conditions
   '6 Order Appraisal
   '7 Order Title
'@ ExpectedResult: 
   'Processing Milestone is finished for the Loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2880","Script Name: E2E_5FHANoCHOTRefiFix_Processing", Null

RunAction "Processing_OrderFloodCertification_001", oneIteration

RunAction "Processing_OrderFraudService_002", oneIteration

RunAction "Processing_CompleteSend4506N4506_TForms_003", oneIteration

RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

RunAction "Processing_RequestConditions_005", oneIteration

RunAction "Processing_OrderAppraisal_006", oneIteration

RunAction "Processing_OrderTitle_007", oneIteration

FRM_RT_TearDownTest(Null)
