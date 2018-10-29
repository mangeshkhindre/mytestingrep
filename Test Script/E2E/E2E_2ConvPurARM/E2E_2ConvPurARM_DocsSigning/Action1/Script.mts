'@**************************************************************************************************
'@ TestStory: PTAC-871  E2E_2CONVPURARAM
'@ TestCase : PTAC-1056 - Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-1072  E2E_2CONVPURARM_DocsSigning
'@ TestData: 
	'1 Global_Data, Login and E2E_closer
    '2 eFolder_Tab, SetDocumentsStatus and E2E_CONVPURARM_AllDocument
    '3 Loans, LoanTemplate and E2E_Closer
    '4 Loans, Milestone and E2E_CONVPURARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Receive Closing Conditions
'@ ExpectedResult: 
   'Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1072","Script Name: E2E_2CONVPURARM_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
