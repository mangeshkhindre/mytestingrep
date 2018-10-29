'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
	'1. PTAC-3161 FHAPURCHASEFIX - Processing 1- Order Flood Certification
	'2. PTAC-3162 FHAPURCHASEFIX - Processing 2- Order Fraud Service
	'3. PTAC-3163 FHAPURCHASEFIX - Processing 3- Complete and send 4506 and 4506T forms
	'4. PTAC-3166 FHAPURCHASEFIX - Processing 4- Forms VOD, VOE, VOR, VOL
	'5. PTAC-3167 FHAPURCHASEFIX - Processing 5- Request Conditions
	'6. PTAC-3168 FHAPURCHASEFIX - Processing 6- Order Appraisal
	'7. PTAC-3169 FHAPURCHASEFIX - Processing 7- Order Title
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData:
	'1 Global_Data, Login, E2E_markuslp
	'2 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'3 Loans, Milestone, E2E_FHAPURCASHFIX_Processing
	'4 Services, FloodService, E2E_FHAPURCASHFIX
	'1 Services, FraudService, E2E_FHAPURCASHFIX
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURCASHFIX
	'  eFolder_Tab, SetSendRequestData, E2E_FHAPURCASHFIX_4506
	'  Tools_TQLServices, SetValuationServiceOrder, E2E_FHAPURCASHFIX
	'1 Forms_VOD, SetVODData, E2E_FHAPURCASHFIX
	'2 Forms_VOE, SetVOEData, E2E_FHAPURCASHFIX
	'3 Forms_VOR, SetVORData, E2E_FHAPURCASHFIX
	'4 Forms_VOL, SetVOLData, E2E_FHAPURCASHFIX
	'1 eFolder_Tab, SetSendRequestData, E2E_FHAPURCASHFIX
	'2 Global_Data, Website, E2E_FHAPURCASHFIX_CoBorrower
	'3 Global_Data, Website, E2E_FHAPURCASHFIX_Borrower
	'4 eFolder_Tab, SendeDisclosures, E2E_FHAPURCASHFIX
	'1 Tools_OrderAppraisal, SetOrderAppraisal, E2E_FHAPURCASHFIX
	'2 Global_Data, Website, E2E_FHAPURCASHFIX_Appraisal
	'3 Services, AppraisalService, E2E_FHAPURCASHFIX
'@ Pre-conditions: N/A
'@ Description: N/A
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
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3153","Script Name: E2E_4FHAPURCASHFIX_Processing", Null

'====== PTAC-3161 - Order Flood Certification ======
RunAction "Processing_OrderfFoodCertification_001", oneIteration

'====== PTAC-3162 - Order Fraud Service ======
RunAction "Processing_OrderFraudService_002", oneIteration

'====== PTAC-3163 - Complete and send 4506 and 4506T forms ======
RunAction "Processing_CompleteAndSend4506and4506_TForms_003", oneIteration

'====== PTAC-3166 - Forms VOD, VOE, VOR, VOL ======
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'====== PTAC-3167 - Request Conditions ======
RunAction "Processing_RequestConditions_005", oneIteration

'====== PTAC-3168 - Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== PTAC-3169 - Order Title ======
RunAction "Processing_OrderTitle_007", oneIteration

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_FHAPURCASHFIX"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
