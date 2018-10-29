'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM	
'@ TestCase: 
   '1 PTAC-1363 - CONVNOCASHREFIARM - Submittal 1 - Receive documents, receive conditions
   '2 PTAC-1365 - CONVNOCASHREFIARM - Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-1781 E2E_1ConvNoRefiARM_Submittal
'@ TestData: 
   '1 Global, Login, E2E_marksuw
   '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, MilestoneDocument and E2E_ConvNoRefiARM_Submittal
   '4 eFolder_Tab,AddConditionsFromSet and E2E_ConvNoRefiARM
   '5 Loans, Milestone and E2E_ConvNoRefiARM_Submittal
   '6 Forms_2015Itemization, SetBasicData and E2E_ConvNoRefiARM
   '7 Forms_LoanEstimatePage, SetReasons and E2E_ConvNoRefiARM
   '8 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_ConvNoRefiARM
   '9 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
   '10 Global_Data, Website and E2E_ConvNoRefiARM
   '11 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
   '12 Loans, MilestoneDocument and E2E_ConvNoRefiARM_Submittal
'@ Pre-conditions: Loan number which finished processing milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Receive documents,Receive conditions
'@ ExpectedResult: 
   '1 Submittal worksheet will open for Carol Tomatis-LP
   '2 Document details window will open
   '3 File should be attached(In document details window under files you should be able to see the file attachment)
   '4 E-folder will open
   '5 Error message window pop up will open
   '6 Window will disappear
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1781","Script Name: E2E_1ConvNoRefiARM_Submittal", Null

'====== PTAC-1363 - Receive documents,Receive conditions ======
RunAction "Submittal_ReceiveDocumentsAndReceiveCondition_001", oneIteration

'====== PTAC-1365 - Appraisal Fee increase and redisclosing LE ======
RunAction "Submittal_AppraisalFeeIncreaseRedisclosingLE_002", oneIteration

FRM_RT_TearDownTest(Null)