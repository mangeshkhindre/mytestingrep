'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX	
'@ TestCase: 
    '1 PTAC-3208 CONVCASHOUTREFIFIX Submittal 1 - Receive documents, receive conditions.
    '2 PTAC-3209 CONVCASHOUTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-3375 E2E_3CONVCASHOUTREFIFIX_Submittal
'@ TestData: 
    '01 Global, Login, E2E_marksuw
    '02 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '03 Loans, MilestoneDocument and E2E_CONVCASHOUTREFIFIX_Submittal 
    '04 eFolder_Tab, AddConditionsFromSet and E2E_CONVCASHOUTREFIFIX
    '05 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_Submittal
    '06 Forms_2015Itemization, SetBasicData and E2E_CONVCASHOUTREFIFIX
    '07 Forms_LoanEstimatePage, SetReasons and E2E_CONVCASHOUTREFIFIX
    '08 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_CONVCASHOUTREFIFIX
    '09 eFolder_Tab, SendeDisclosures and E2E_CONVCASHOUTREFIFIX
    '10 Global_Data, Website and E2E_CONVCASHOUTREFIFIX
    '11 eFolder_Tab, SendeDisclosures and E2E_CONVCASHOUTREFIFIX
    '12 Loans, MilestoneDocument and E2E_CONVCASHOUTREFIFIX_Submittal
'@ Pre-conditions: Loan number which finished processing milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Receive documents,Receive conditions
    '2 Appraisal Fee increase and redisclosing LE
'@ ExpectedResult: 
    '1 Submittal worksheet will open for Carol Tomatis-LP
    '2 Document details window will open
    '3 File should be attached(In document details window under files you should be able to see the file attachment)
    '4 E-folder will open
    '5 Error message window pop up will open
    '6 Window will disappear
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3375","Script Name: E2E_3CONVCASHOUTREFIFIX_Submittal", Null

'====== PTAC-3208 - Receive documents,Receive conditions ======
RunAction "Submittal_ReceiveDocumentsAndReceiveCondition_001", oneIteration

'====== PTAC-3209 - Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreaseRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)


