'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2250 Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2888 E2E_8VAPURARM_DocsSigning
'@ TestData:
	'1 Global_Data, Login and E2E_closer
    '2 eFolder_Tab, SetDocumentsStatus and E2E_VAPURARM
    '3 Loans, LoanTemplate and E2E_Closer
    '4 Loans, Milestone and E2E_VAPURARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Receive Closing Conditions
'@ ExpectedResult: 
   'Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2888","Script Name: E2E_8VAPURARM_DocsSigning", Null

'===== Docs Signing 1 - Receive Closing conditions =====
RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
