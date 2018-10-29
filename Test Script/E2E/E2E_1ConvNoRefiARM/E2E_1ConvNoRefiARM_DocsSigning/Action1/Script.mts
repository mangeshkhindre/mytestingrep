'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1432 - CONVNOCASHREFIARM - Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2255   E2E_1ConvNoRefiARM_DocsSigning
'@ TestData:
	'1 Global_Data, Login and E2E_markuslp
    '2 eFolder_Tab, SetDocumentsStatus and E2E_ConvNoRefiARM_AllDocument
    '3 Loans, LoanTemplate and E2E_Closer
    '4 Loans, Milestone and E2E_ConvNoRefiARM_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Receive Closing Conditions
'@ ExpectedResult: 
   'Document Signing Milestone is finished
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2255","Script Name: E2E_1ConvNoRefiARM_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
