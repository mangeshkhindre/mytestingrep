'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM	
'@ TestCase: 
    '1 PTAC-2202 - Submittal 1 - Receive documents, receive conditions
    '2 PTAC-2206 - Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC- 2412 E2E_8VAPURARM_Submittal
'@ TestData: 
	'1 Global, Loans
	'2 Global, Login, E2E_marksuw
    '3 Loans, LoanTemplate, E2E_VAPURARM
    '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_VAPURARM
	'5 eFolder_Tab, SelectPlanCode, E2E_VAPURARM
	'6 eFolder_Tab, SelecteDisclosureDocs , E2E_VAPURARM
	'7 eFolder_Tab, SendeDisclosures, E2E_VAPURARM
 	'8 Global_Data, Website, E2E_VAPURARM_Borrower
 	'9 eFolder_Tab, SendeDisclosures, E2E_VAPURARM
 	'10 Loans, MilestoneDocument, E2E_VAPURARM_Submittal
'@ Pre-conditions: 
	'Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Receive Documents and Finish Submittal Milestone
    '2 Appraisal Fee increase and redisclosing LE
'@ ExpectedResult: 
	'Submittal Milestone should be finised
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2412","Script Name: E2E_8VAPURARM_Submittal", Null

'====== PTAC-2202 - Submittal 1- Receive documents, receive conditions ======
RunAction "Submittal_ReceiveDocumentsReceiveConditions_001", oneIteration

'====== PTAC-2206 - Submittal 2 - Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreasesAndRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)
