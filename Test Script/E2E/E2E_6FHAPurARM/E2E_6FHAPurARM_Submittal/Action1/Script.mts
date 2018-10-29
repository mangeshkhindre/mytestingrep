'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM	
'@ TestCase: 
	'1 PTAC-2040 Submittal 1 - Receive documents, receive conditions.
	'2 PTAC-2041 Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC- 2122 E2E_6FHAPURARM_Submittal
'@ TestData: 
	'1 eFolder_Tab, AddConditionsFromSet and E2E_FHAPURARM
	'2 Global, Login and E2E_marksuw
	'3 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURARM
	'5 eFolder_Tab, SelectPlanCode and E2E_FHAPURARM
	'6 eFolder_Tab, SelecteDisclosureDocs and E2E_FHAPURARM
	'7 eFolder_Tab, SendeDisclosures and E2E_FHAPURARM
 	'8 Global_Data, Website and E2E_FHAPURARM_Borrower
 	'9 eFolder_Tab, SendeDisclosures and E2E_FHAPURARM
 	'10 Loans, MilestoneDocument and E2E_FHAPURARM_Submittal
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Receive Documents and Finish Submittal Milestone
	'2 Appraisal Fee increase and redisclosing LE
'@ ExpectedResult: Submittal Milestone should be finished
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2122","Script Name: E2E_6FHAPURARM_Submittal", Null

'===== Submittal 1- Receive documents, receive conditions =====
RunAction "Submittal_ReceiveDocumentsAndReceiveConditions_001", oneIteration

'===== Submittal 2- Appraisal Fee increase and redisclosing LE =====
RunAction "Submittal_AppraisalFeeIncreaseAndRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)
