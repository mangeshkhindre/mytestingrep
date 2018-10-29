'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix	
'@ TestCase: 
	'1 PTAC-1843 - FHANOCHOTREFIFIX Submittal 1- Receive documents, receive conditions.
	'2 PTAC-1948 - FHANOCHOTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-2702 E2E_5FHANoCHOTRefiFix_Submittal
'@ TestData: 
	'1 Global, Loans
	'2 Global, Login, E2E_marksuw
	'3 Loans, LoanTemplate, E2E_FHANoCHOTRefiFi
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps: Receive Documents and Finish Submittal Milestone
'@ ExpectedResult: Submittal Milestone should be finised
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2702","Script Name: E2E_5FHANoCHOTRefiFix_Submittal", Null

'====== PTAC-1843 - Receive Documents and Finish Milestone ======
RunAction "Submittal_ReceiveDocumentsAndReceiveConditions_001", oneIteration

'====== PTAC- 1948 - FHA NOCHOTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreaseAndRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)