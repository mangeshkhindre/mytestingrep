'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM	
'@ TestCase : PTAC-780 Submittal 1- Receive documents and finish milestone 
'@ Test Automation JIRA Task: PTAC-993 E2E_2CONVPURARM_Submittal
'@ TestData: 
	'1 Global, Login and E2E_marksuw
	'2 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'3 Loans, Milestone and E2E_CONVPURARM_Submittal
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps: Receive Documents and Finish Submittal Milestone
'@ ExpectedResult: Submittal Milestone should be finised
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-993","Script Name: E2E_2CONVPURARM_Submittal", Null

'====== PTAC-780 - Receive Documents and Finish Milestone ======
RunAction "Submittal_ReceiveDocumentsAndFinishMilestone_001", oneIteration

FRM_RT_TearDownTest(Null)
