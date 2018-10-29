'@**************************************************************************************************
'@ TestStory: PTAC-2703- E2E_7FHACORefiARM
'@ TestCase: 
	'1 PTAC-2422 - FHACOREFIARM Processing 1- Order flood Certification
	'2 PTAC-2434 - FHACOREFIARM Processing 2- Order Fraud service
	'3 PTAC-2435 - FHACOREFIARM Processing 3- Complete and send 4506 and 4506-T forms.
	'4 PTAC-2437 - FHACOREFIARM Processing 4- Forms VOD,VOE, VOL
	'5 PTAC-2438 - FHACOREFIARM Processing 5- Request conditions
	'6 PTAC-2620 - FHACOREFIARM Processing 6- Order Appraisal
	'7 PTAC-2654 - FHACOREFIARM Processing 7- Order title
'@ Test Automation JIRA Task: PTAC-2716 E2E_7FHACORefiARM_Processing
'@ TestData:
	'1 eFolder_Tab, SetSendRequestData and E2E_FHACORefiARM
	'2 Global_Data, Website and E2E_FHACORefiARM_CoBorrower
	'3 Global_Data, Website and  E2E_FHACORefiARM_Borrower
	'4 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
	'5 Tools_TQLServices, SetValuationServiceOrder, E2E_FHACORefiARM
	'6 Tools_OrderAppraisal, SetOrderAppraisal, E2E_FHACORefiARM
	'7 Global_Data, Website, E2E_FHACORefiARM_Appraisal
	'8 Services, AppraisalService, E2E_FHACORefiARM
	'9 eFolder_Tab, SetSendRequestData, E2E_FHACORefiARM_4506 
	'10 Global_Data, Login, E2E_markuslp
	'11 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'12 Loans, Milestone, E2E_FHACORefiARM_Processing
	'13 Services, FloodService, E2E_FHACORefiARM
	'14 Forms_VOD, SetVODData, E2E_FHACORefiARM
	'15 Forms_VOE, SetVOEData, E2E_FHACORefiARM
	'16 Forms_VOR, SetVORData, E2E_FHACORefiARM
	'17 Forms_VOL, SetVOLData, E2E_FHACORefiARM
	'18 Services, FraudService, E2E_FHACORefiARM
	'19 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHACORefiARM
	'20 Services, TitleNClosing, E2E_FHACORefiARM
	'21 Global_Data, Website, E2E_FHACORefiARM_TitleCenter
	'22 Services, TitleService, E2E_FHACORefiARM
	'23 eFolder_Tab, AttachDocuments, E2E_FHACORefiARM
	'24 Loans, MilestoneDocument, E2E_FHACORefiARM_Processing
'@ Pre-conditions: N/A
'@ Description: N/A
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

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2716","Script Name: E2E_7FHACORefiARM_Processing", Null

'====== PTAC-2422 -FHACOREFIARM Processing 1- Order Flood Certification ======
RunAction "Processing_OrderfFoodCertification_001", oneIteration

'====== PTAC-2434 -FHACOREFIARM Processing 2- Order Fraud Service ======
RunAction "Processing_OrderFraudService_002", oneIteration

'====== PTAC-2435 -FHACOREFIARM Processing 3- Complete and send 4506 and 4506T forms ======
RunAction "Processing_CompleteAndSend4506And4506_TForms_003", oneIteration

'====== PTAC-2437 -FHACOREFIARM Processing 4- Forms VOD, VOE, VOR, VOL ======
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'====== PTAC-2438 -FHACOREFIARM Processing 5- Request Conditions ======
RunAction "Processing_RequestConditions_005", oneIteration

'====== PTAC-2620 -FHACOREFIARM Processing 6- Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== PTAC-2654 -FHACOREFIARM Processing 7- Order Title ======
RunAction "Processing_OrderTitle_007", oneIteration


If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_FHACORefiARM"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)

