'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase:  
    'PTAC-1131 HP Submittal 1 Assign UnderWriter & Accept File
	'PTAC-1132 HP Submittal 2 Complete Underwriter Summary
	'PTAC-1135 HP Submittal 3 Complete Transmittal Summary
	'PTAC-1136 HP Submittal 4 Complete Submittal
'@ Test Automation JIRA Task: PTAC-1145 E2E_HappyPath_Submittal
'@ TestData: Global_Data,Login,admin_171
	'Tools_UnderwriterSummary,UWP1_SetUnderWriterDetails,E2E_Submittal2
	'Forms_TransmittalSummary,SetProperty,Core2p_Integration
'@ Pre-conditions: Loan Number which completed the Processing Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
	'Underwriter accepts the file
	'Complete Underwriter summary details
	'Complete Transmittal Summary Details
	'Complete the Submittal Details
'@ ExpectedResult:
	'Submittal Milestone should be finished for the Loan
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1145","Script Name: E2E_HappyPath_Submittal", Null

'====== PTAC-1131 HP Submittal 1 Assign UnderWriter & Accept File ======
RunAction "HPSubmittal_UnderwriterAcceptFile_001", oneIteration

'====== PTAC-1132 HP Submittal 2 Complete Underwriter Summary ======
RunAction "HPSubmittal_UnderwriterSummary_002", oneIteration

'====== PTAC-1135 HP Submittal 3 Complete Transmittal Summary ======
RunAction "HPSubmittal_TransmittalSummary_003", oneIteration

'====== PTAC-1136  HP Submittal 4 Complete Submittal ======
RunAction "HPSubmittal_CompleteSubmittal_004", oneIteration

'====== Save loan and exit ======
BIZ_Loan_Exit "True"

'====== User Logout ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
