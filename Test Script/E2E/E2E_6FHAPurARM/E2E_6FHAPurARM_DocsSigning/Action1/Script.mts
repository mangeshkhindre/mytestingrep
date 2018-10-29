'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARAM
'@ TestCase : PTAC-2130 Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2921 E2E_6FHAPURARM_DocsSigning
'@ TestData:
	'1 Global_Data, Login and E2E_closer
	'2 eFolder_Tab, SetDocumentsStatus and E2E_FHAPURARM_AllDocument
	'3 Loans, LoanTemplate and E2E_Closer
	'4 Loans, Milestone, E2E_FHAPURARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps: Receive Closing Conditions
'@ ExpectedResult: Document Signing Milestone is finished
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC- 2921","Script Name: E2E_6FHAPURARM_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
