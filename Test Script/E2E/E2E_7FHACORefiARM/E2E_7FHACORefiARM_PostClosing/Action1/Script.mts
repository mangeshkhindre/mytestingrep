'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
   '1 PTAC-2735 - FHACOREFIARM Post Closing 1 - Add Post Closing conditions 
   '2 PTAC-2741 - FHACOREFIARM Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
   '3 PTAC-2744 - FHACOREFIARM Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2724 E2E_7FHACORefiARM_PostClosing
'@ TestData:
   '1 Global, Login and E2E_closer
   '2 eFolder_Tab, AddConditionsFromSet and E2E_FHACORefiARM
   '3 eFolder_Tab, SetPostClosingConditionsStatus and E2E_FHACORefiARM
   '4 Loans, Milestone and E2E_FHACORefiARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Add Post Closing conditions 
   '2 Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac
   '3 Order Encompass Compliance services
'@ ExpectedResult: 
   'Loan should complete Post Closing Milestone
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2724","Script Name: E2E_7FHACORefiARM_PostClosing", Null

'====== PTAC-2735 - Add Post Closing conditions ======
RunAction "PostClosing_AddPostClosingConditions_001", oneIteration

'====== PTAC-2741 - Post Closing 2 - Investor service/Export PDD to GinnieMae/Fannie Mae/FreddieMac ======
RunAction "PostClosing_InvestorServicesExportPDD_002", oneIteration

'====== PTAC-2744 - Order Encompass Compliance Services ======
RunAction "PostClosing_OrderEncompassComplianceServices_003", oneIteration

FRM_RT_TearDownTest(Null)