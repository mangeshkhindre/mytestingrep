'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC- 2372 - Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2923 E2E_9VANoCORefiARM_DocsSigning
'@ TestData: 
	'1 Global_Data, Login and E2E_markuslp
    '2 eFolder_Tab, SetDocumentsStatus and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Receive Closing Conditions
'@ ExpectedResult: 
   'Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2923","Script Name: E2E_9VANoCORefiARM_DocsSigning", Null

'===== Docs Signing 1 - Receive Closing conditions =====
RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)