'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase: 
   '1 PTAC-3136 CONVCASHOUTREFIFIX - Processing 1-Order flood Certification
   '2 PTAC-3137 CONVCASHOUTREFIFIX - Processing 2- Order Fraud service
   '3 PTAC-3138 CONVCASHOUTREFIFIX - Processing 3-Complete and send 4506 and 4506-T forms.
   '4 PTAC-3200 CONVCASHOUTREFIFIX - Processing 4-Request conditions
   '5 PTAC-3203 CONVCASHOUTREFIFIX - Processing 5-Order Appraisal
   '6 PTAC-3206 CONVCASHOUTREFIFIX - Processing 6-Order title
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData: 
   '01 Global_Data, Login, E2E_Carollp
   '02 Loans, LoanTemplate,E2E_CONVCASHOUTREFIFIX
   '03 Loans, Milestone ,E2E_CONVCASHOUTREFIFIX_Processing
   '04 Services, FloodService, E2E_CONVCASHOUTREFIFIX
   '05 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower,E2E_CONVCASHOUTREFIFIX
   '06 Forms_ClosingVendorInformation, SetEscrowCompany,E2E_CONVCASHOUTREFIFIX
   '07 Tools_TQLServices, SetValuationServiceOrder, E2E_CONVCASHOUTREFIFIX
   '08 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Processing
   '09 Global_Data, Website, E2E_CONVCASHOUTREFIFIX_Appraisal
   '10 Global_Data, Website, E2E_CONVCASHOUTREFIFIX_TitleCenter
'@ Pre-conditions: File started milestone completed
'@ Description:  
'@ TestSteps: 
   '1 Order flood Certification
   '2 Order Fraud service
   '3 Complete and send 4506 and 4506-T forms.
   '4 Request conditions
   '5 Order Appraisal
   '6 Order title
'@ ExpectedResult: Processing milestone should be completed for the loan
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script : PTAC-3374","Script Name: E2E_3CONVCASHOUTREFIFIX_Processing", Null

'====== PTAC-3136 - Processing 1- Order flood Certification ======
RunAction "Processing_OrderFloodCertification_001", oneIteration

'====== PTAC-3137 - Processing 2- Order Fraud service ======
RunAction "Processing_OrderFraudService_002", oneIteration

'====== PTAC-3138 - Processing 3- Complete and send 4506 and 4506-T forms ======
RunAction "Processing_CompleteSendTforms_003", oneIteration

'====== PTAC-3200 - Processing 4- Request conditions ======
RunAction "Processing_RequestConditions_004", oneIteration

'====== PTAC-3203 - Processing 5- Order Appraisal ======
RunAction "Processing_OrderAppraisal_005", oneIteration

'====== PTAC-3206 - Processing 6- Order title ======
RunAction "Processing_OrderTitle_006", oneIteration

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_CONVCASHOUTREFIFIX"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True
'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
