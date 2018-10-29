'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1318 CONVNOCASHREFIARM - Processing 1- Order flood Certification
   '2 PTAC-1319 CONVNOCASHREFIARM - Processing 2- Order Fraud service
   '3 PTAC-1332 CONVNOCASHREFIARM - Processing 3- Complete and send 4506 and 4506-T forms.
   '4 PTAC-1337 CONVNOCASHREFIARM - Processing 4- Forms VOD,VOE, VOL
   '5 PTAC-1339 CONVNOCASHREFIARM - Processing 5- Request conditions
   '6 PTAC-1360 CONVNOCASHREFIARM - Processing 6- Order Appraisal
   '7 PTAC-1361 CONVNOCASHREFIARM - Processing 7- Order title
'@ Test Automation JIRA Task: PTAC-1780 E2E_1ConvNoRefiARM_Processing
'@ TestData: 
   '1 Global_Data, Login, E2E_Carollp
   '2 Loans, LoanTemplate, E2E_ConvNoRefiARM
   '3 Loans, Milestone, E2E_ConvNoRefiARM_Processing
   '4 Services, FloodService, E2E_ConvNoRefiARM
   '5 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_ConvNoRefiARM
   '6 Forms_ClosingVendorInformation, SetEscrowCompany, E2E_ConvNoRefiARM
   '7 Tools_TQLServices, SetValuationServiceOrder, E2E_ConvNoRefiARM
   '8 Global_Data, Website, E2E_ConvNoRefiARM_Appraisal
   '9 Global_Data, Website, E2E_ConvNoRefiARM_TitleCenter
'@ Pre-conditions: File started milestone completed
'@ Description:  
'@ TestSteps: 
   '1 Order flood Certification
   '2 Order Fraud service
   '3 Complete and send 4506 and 4506-T forms.
   '4 Forms VOD,VOE, VOL
   '5 Request conditions
   '6 Order Appraisal
   '7 Order title
'@ ExpectedResult: Processing milestone should be completed for the loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Script : PTAC - 1780","Script Name :  E2E_1ConvNoRefiARM_Processing", Null

'====== PTAC-1318 - Processing 1- Order flood Certification ======
RunAction "Processing_OrderFloodCertification_001", oneIteration

'====== PTAC-1319 - Processing 2- Order Fraud service ======
RunAction "Processing_OrderFraudService_002", oneIteration

'====== PTAC-1332 - Processing 3- Complete and send 4506 and 4506-T forms ======
RunAction "Processing_CompleteSendTforms_003", oneIteration

'====== PTAC-1337 - Processing 4- Forms VOD,VOE, VOL ======
RunAction "Processing_FormsVODVOEVOL_004", oneIteration

'====== PTAC-1339 - Processing 5- Request conditions ======
RunAction "Processing_RequestConditions_005", oneIteration

'====== PTAC-1360 - Processing 6- Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== PTAC-1361 - Processing 7- Order title ======
RunAction "Processing_OrderTitle_007", oneIteration

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_ConvNoRefiARM"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
