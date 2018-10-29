'@**************************************************************************************************
'@ TestStory: PTAC-871- CONVPURARM
'@ TestCase: 
	'1 PTAC-671 - Order Flood Certification
	'2 PTAC-674 - Order Fraud Service
	'3 PTAC-695 - Complete and send 4506 and 4506T forms
	'4 PTAC-700 - Forms VOD, VOE, VOR, VOL
	'5 PTAC-701 - Request Conditions
	'6 PTAC-707 - Order Appraisal
	'7 PTAC-762 - Order Title
'@ Test Automation JIRA Task: PTAC-990 E2E_2CONVPURARM_Processing
'@ TestData: N/A
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-990","Script Name: E2E_2CONVPURARM_Processing", Null

'====== PTAC-671 - Order Flood Certification ======
RunAction "Processing_OrderfFoodCertification_001", oneIteration

'====== PTAC-674 - Order Fraud Service ======
RunAction "Processing_OrderFraudService_002", oneIteration

'====== PTAC-695 - Complete and send 4506 and 4506T forms ======
RunAction "Processing_CompleteAndSend4506and4506_TForms_003", oneIteration

'====== PTAC-700 - Forms VOD, VOE, VOR, VOL ======
RunAction "Processing_FormsVODVOEVORVOL_004", oneIteration

'====== PTAC-701 - Request Conditions ======
RunAction "Processing_RequestConditions_005", oneIteration

'====== PTAC-707 - Order Appraisal ======
RunAction "Processing_OrderAppraisal_006", oneIteration

'====== PTAC-762 - Order Title ======
RunAction "Processing_OrderTitle_007", oneIteration

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_CONVPURARM"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null) @@ hightlight id_;_Browser("New QA1 - Ellie Mae, Inc.").Page("DocuSign").WebButton("Adopt and Sign")_;_script infofile_;_ZIP::ssf37.xml_;_
 @@ hightlight id_;_Browser("New QA1 - Ellie Mae, Inc.").Page("DocuSign").WebButton("SignRequired - Sign Here 2")_;_script infofile_;_ZIP::ssf42.xml_;_


