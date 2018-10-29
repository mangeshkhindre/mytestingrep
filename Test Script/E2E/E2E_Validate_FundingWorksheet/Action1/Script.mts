'@**************************************************************************************************
'@ TestStory: PTAC-2770 Workflow 2015 Itemization
'@ TestCase:
   '01 PTAC-2256 Workflow between 2015 Itemization and Funding Worksheet - 700 Section
   '02 PTAC-2277 Workflow between 2015 Itemization and Funding Balancing Worksheet - 700 Section 
   '03 PTAC-2278 Workflow between 2015 Itemization and Funding Worksheet - 800 Section
   '04 PTAC-2279 Workflow between 2015 Itemization and Funding Balancing Worksheet - 800 Section 
   '05 PTAC-2280 Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Lender Paid Comp)			
   '06 PTAC-2281 Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Lender Paid Comp)
   '07 PTAC-2282 Workflow between 2015 Itemization and Funding Worksheet - 802 Section (Orig Disc Pts)	
   '08 PTAC-2283 Workflow between 2015 Itemization and Funding Balancing Worksheet - 802 Section (Orig Disc Pts)  
   '09 PTAC-2284 Workflow between 2015 Itemization and Funding Worksheet - 900 & 1000 Section
   '10 PTAC-2285 Workflow between 2015 Itemization and Funding Balancing Worksheet - 900 & 1000 Sections
   '11 PTAC-2287 Workflow between 2015 Itemization and Funding Worksheet - 1100 Section
   '12 PTAC-2286 Workflow between 2015 Itemization and Funding Balancing Worksheet -1100 Section     
   '13 PTAC-2288 Workflow between 2015 Itemization and Funding Worksheet - 1200 Section
   '14 PTAC-2289 Workflow between 2015 Itemization and Funding Balancing Worksheet -1200 Section  
   '15 PTAC-2290 Workflow between 2015 Itemization and Funding Worksheet - 1300 Section    
   '16 PTAC-2291 Workflow between 2015 Itemization and Funding Balancing Worksheet - 1300 Section    
'@ Test Automation JIRA Task: CTA-332 Script optimization of FundingWorksheet Module
'@ TestData: 
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
'@ ExpectedResult:
'***************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case-PTAC-2887","E2E_Workflow2015Itemization_FundingWorkSheet_800Section_Validate", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 700 section
'RunAction "Validate_WorkFlow2015Itemization_700Section", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 800 section
'RunAction "Validate_WorkFlow2015Itemization_800Section", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 802(Lender Paid Comp) section
'RunAction "Validate_WorkFlow2015Itemization_802Section_01", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 802(Orig Disc Pts) section
'RunAction "Validate_WorkFlow2015Itemization_802Section_02", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 900 and 1000 section
'RunAction "Validate_Workflow2015Itemization_900And1000Section", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 1100 section
'RunAction "Validate_WorkFlow2015Itemization_1100Section", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 1200 section
RunAction "Validate_WorkFlow2015Itemization_1200Section", oneIteration

'====== RunAction to validate the Funding Worksheet and Funding Balancing Worksheet for 1300 section
RunAction "Validate_WorkFlow2015Itemization_1300Section", oneIteration

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


