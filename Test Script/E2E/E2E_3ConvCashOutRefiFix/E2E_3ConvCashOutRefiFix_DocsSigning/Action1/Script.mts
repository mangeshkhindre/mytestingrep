'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3485 CONVCASHOUTREFIFIX Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-3380 E2E_3CONVCASHOUTREFIFIX_DocsSigning
'@ TestData:
    '1 Global_Data, Login, E2E_markuslp
    '2 eFolder_Tab, SetDocumentsStatus, E2E_Integration
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: Receive Closing Conditions
'@ ExpectedResult: Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3380","Script Name: E2E_3CONVCASHOUTREFIFIX_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)