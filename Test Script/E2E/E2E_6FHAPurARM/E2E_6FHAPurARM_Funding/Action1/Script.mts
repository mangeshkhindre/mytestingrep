'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2131 Funding 1-Complete the funding worksheet
'@ Test Automation JIRA Task: PTAC-2205 E2E_6FHAPURARM_Funding
'@ TestData: 
    '1 Loans, Milestone, E2E_FHAPURARM_Funding
	'2 Tools_FundingWorkSheet, SetFundingClosing, E2E_FHAPURARM
	'3 Tools_FundingWorkSheet, SetWireInformation, E2E_FHAPURARM
	'4 Tools_FundingWorkSheet, SetFundingSource, E2E_FHAPURARM
	'5 Loans, LoanTemplate and E2E_Funder
	'6 Global_Data, Login and E2E_funder
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login as Funder and click 'Accept file' button.
    '2 Click on tools and click 'Funding worksheet'.
    '3 Complete the following fields in the funding worksheet:
	   'Under Funding/closing
	   'Funder:
	   'Sent to Funder:
	   'Funding Type:
	   'Clear to close:
	   'Funds ordered: 
    '4 Click on log and click on 'funding'.
	   'Under documents section check the check box for wiring instructions.
    '5 Click on magnifying lens next to Post closer and select 'Mary PCandShipper'.
	   'Click finish milestone.
'@ ExpectedResult: 
    '1 Should be able to login and accept file.
	'2 Funding worksheet should open.
	'3 Funding worksheet for funder user will open.
	   'It should show as received.
	'4 Milestone should be finished.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC- 2205","Script Name: E2E_6FHAPURARM_Funding", Null

RunAction "Funding_CompleteTheFundingWorksheet_001", oneIteration

FRM_RT_TearDownTest(Null)
