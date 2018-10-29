'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3219 FHAPURCHASEFIX- Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-3285 E2E_4FHAPURCASHFIX_DocsSigning
'@ TestData: 
	'1 Global_Data, Login and E2E_closer
    '2 eFolder_Tab, SetDocumentsStatus and E2E_FHAPURCASHFIX_AllDocument
    '3 Loans, LoanTemplate and E2E_Closer
    '4 Loans, Milestone  and E2E_FHAPURCASHFIX_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: Receive Closing Conditions
'@ ExpectedResult: Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3285","Script Name: E2E_4FHAPURCASHFIX_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
