'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase:  PTAC-1152  HP Resubmittal 2- Complete Underwriter summary(Final Review)
'@ Test Automation JIRA Task: PTAC--1172
'@ TestData: "Services"
'@ Pre-conditions: 
'@ Description: Order title and closing and finish milestone.
'@ TestSteps:
	'1 Go to 'Tools' tab and select 'Underwriter Summary'.
	'2 Click on 'UW P2'.
	'3 Enter the test data in 'Under writer Summary Page 2'
    '4 Click 'Save' button..
'@ ExpectedResult: 
    '1 The Underwriter page should open
	'2 Should be able to enter values and save loan.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1152","TestCase Name - HP Resubmittal 2- Complete Underwriter summary(Final Review)", Null

BIZ_Tools_Open("Underwriter Summary")

BIZ_UnderwriterSummary_UWP2_SetHeaderData "E2E_HappyPath"

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()