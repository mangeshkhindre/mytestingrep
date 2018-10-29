'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
    '1 PTAC-3170 FHAPURCHASEFIX- Submittal 1 - Receive documents, receive conditions. 
    '2 PTAC-3171 FHAPURCHASEFIX- Submittal 2 - Appraisal Fee increase and redisclosing LE 
'@ Test Automation JIRA Task: PTAC-3154 E2E_4FHAPURCASHFIX_Submittal
'@ TestData: 
	'01 Loans, Milestone and E2E_FHAPURCASHFIX_Submittal
	'02 Forms_2015Itemization, SetBasicData and E2E_FHAPURCASHFIX
	'03 Forms_LoanEstimatePage, SetReasons and E2E_FHAPURCASHFIX
	'04 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURCASHFIX
	'05 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
	'06 Global_Data, Website and E2E_FHAPURCASHFIX
	'07 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
	'08 Loans, MilestoneDocument and E2E_FHAPURCASHFIX_Submittal
	'09 Global,Login and E2E_marksuw
    '10 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '11 Loans, MilestoneDocument and E2E_FHAPURCASHFIX_Submittal
    '12 eFolder_Tab, AddConditionsFromSet and E2E_FHAPURCASHFIX
'@ Pre-conditions: Loan Number is in E2E Property file
'@ Description:  
'@ TestSteps: Receive Documents and Finish Submittal Milestone
'@ ExpectedResult: Submittal Milestone should be finised
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3154","Script Name: E2E_4FHAPURCASHFIX_Submittal", Null

'====== PTAC-3170 - Submittal 2- Receive Documents and Finish Milestone ======
RunAction "Submittal_ReceiveDocumentsAndReceiveConditions_001", oneIteration

'===== PTAC-3171 - Submittal 2- Appraisal Fee increase and redisclosing LE =====
RunAction "Submittal _AppraisalFeeIncreaseAndRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)