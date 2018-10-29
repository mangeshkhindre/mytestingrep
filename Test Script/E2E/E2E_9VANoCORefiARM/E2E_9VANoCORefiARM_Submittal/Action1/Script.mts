'@******************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: 
	'PTAC- 2352 - Submittal 1- Receive documents, receive conditions
	'PTAC- 2354 - Submittal 2- Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC- 2919 E2E_9VANoCORefiARM_Submittal
'@ TestData:
	'1 Loans, Milestone and E2E_VANoCORefiARM_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_VANoCORefiARM
	'3 Forms_LoanEstimatePage, SetReasons and E2E_VANoCORefiARM
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_VANoCORefiARM
	'5 eFolder_Tab, SendeDisclosures and E2E_VANoCORefiARM
	'6 Global_Data, Website and E2E_VANoCORefiARM
	'7 eFolder_Tab, SendeDisclosures and E2E_VANoCORefiARM
	'8 Loans, MilestoneDocument and E2E_VANoCORefiARM_Submittal
	'9 Global,Login,E2E_marksuw
    '10 Loans,LoanTemplate and E2E_LoanProcessorDefault
    '11 Loans, MilestoneDocument and E2E_VANoCORefiARM_Submittal
    '12 eFolder_Tab,AddConditionsFromSet and E2E_VANoCORefiARM
'@ Pre-conditions: 
	'Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
	'Receive Documents and Finish Submittal Milestone
'@ ExpectedResult: 
	'Submittal Milestone should be finised
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2919","Script Name: E2E_9VANoCORefiARM_Submittal", Null

'====== Receive Documents Receive Conditions ======
RunAction "Submittal_ReceiveDocumentsReceiveConditions_001", oneIteration

'====== Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreaseandRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)