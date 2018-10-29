'@**************************************************************************************************
'@ TestStory: PTAC-2703  E2E_7FHACORefiARM
'@ TestCase: 
   '1 PTAC-2655 - FHACOREFIARM Submittal 1 - Receive documents, receive conditions.
   '2 PTAC-2656 - FHACOREFIARM Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-2717 E2E_7FHACORefiARM_Submittal
'@ TestData:
	'1 Loans, Milestone and E2E_FHACORefiARM_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_FHACORefiARM
	'3 Forms_LoanEstimatePage, SetReasons and E2E_FHACORefiARM
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHACORefiARM
	'5 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
	'6 Global_Data, Website and E2E_FHACORefiARM
	'7 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
	'8 Loans, MilestoneDocument and E2E_FHACORefiARM_Submittal
	'9 Global, Login and E2E_Clarklp
	'10 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'11 Loans, Milestone and E2E_FHACORefiARM_Submittal
'@ Pre-conditions: 
  'Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps:
   'Receive Documents and Finish Submittal Milestone
'@ ExpectedResult: 
  'Submittal Milestone should be finised
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2717","Script Name: E2E_7FHACORefiARM_Submittal", Null

'====== PTAC-2655 - Receive Documents and Receive Conditions ======
RunAction "Submittal_ReceiveDocumentsAndReceiveConditions_001", oneIteration

'====== PTAC-2656 - Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreaseAndRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)



