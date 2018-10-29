'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-2183 FHANOCHOTREFIFIX Docs Signing 1 - Receive Closing conditions
'@ Test Automation JIRA Task: PTAC-2708 E2E_5FHANoCHOTRefiFix_DocsSigning
'@ TestData: 
    '1 Global_Data, Login and E2E_markuslp
    '2 eFolder_Tab, SetDocumentsStatus and E2E_FHANoCHOTRefiFix_AllDocument
    '3 Loans, LoanTemplate and E2E_Closer
    '4 Loans, Milestone and E2E_FHANOCHOTREFIFIX_DocsSigning
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login as Closer.
    '2 Go to your loan and click on e-folder.
    '3 Select 'Closing documents' from the 'Document Group ' dropdown.
    '4 Select all documents from the list and click 'edit document icon' and check the check boxes for reviewed and received.
    '5 Click on magnifying lens and select 'funder user' as funder and click on finished.
'@ ExpectedResult: 
    '1 Should be able to login.
    '2 E-folder should open.
    '3 Should be able to see a list of closing documents.
    '4 Should be able to click received and reviewed.
    '5 Should be able to finish the milestone.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2708","Script Name: E2E_5FHANoCHOTRefiFix_DocsSigning", Null

RunAction "DocsSigning_ReceiveClosingCondition_001", oneIteration

FRM_RT_TearDownTest(Null)
