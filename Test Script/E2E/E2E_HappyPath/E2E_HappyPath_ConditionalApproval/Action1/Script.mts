'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1137  HP Conditional Approval 1 Assign to Loan Processor & Accept File
	'2 PTAC-1138  HP Conditional Approval 2 Complete VOD Verifications 
	'3 PTAC-1139  HP Conditional Approval 3 Complete VOE & VOR Verifications 
	'4 PTAC-1140  HP Conditional Approval 4 Rate Lock
	'5 PTAC-1148  HP Conditional Approval 5 Complete Secondary Registration
	'6 PTAC-1143  HP Conditional Approval 7 Complete Conditional Approval
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: Global_Data, Loan
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
	'Loan Processor is assinged and Loan is accepted
	'Complete VOD, VOE, VOR Details
	'Perform Rate Lock
	'Complete Secondary Registration
	'Complete Condtional Approval Milestone
'@ ExpectedResult: 
	'User should be able to finish the Conditional Approval Miestone
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case :  PTAC - 1144","Script Name - E2E_HappyPath_ConditionalApproval", Null

FRM_RT_SetupTest(null)

'====== PTAC-1137 - HP Conditional Approval 1 Assign to Loan Processor & Accept File ======
RunAction "HPConditionalApproval_AssigntoLoanProcessorAcceptFile_001", oneIteration

'====== PTAC-1137 - HP Conditional Approval 1 Assign to Loan Processor & Accept File ======
RunAction "HPConditionalApproval_CompleteVODVerifications_002", oneIteration

'====== PTAC-1138 - HP Conditional Approval 2 Complete VOD Verifications  ======
RunAction "HPConditionalApproval_CompleteVOEVORVerifications_003", oneIteration

'====== PTAC-1139 - HP Conditional Approval 3 Complete VOE & VOR Verifications  ======
RunAction "HPConditionalApproval_RateLock_004", oneIteration

'====== PTAC-1140 - HP Conditional Approval 4 Rate Lock ======
RunAction "HPConditionalApproval_CompleteSecondaryRegistration_005", oneIteration

'====== PTAC-1148 - HP Conditional Approval 5 Complete Secondary Registration ======
RunAction "HPConditionalApproval_ClearConditions_006", oneIteration

'====== PTAC-1143 - HP Conditional Approval 7 Complete Conditional Approval ======
RunAction "HPConditionalApproval_CompleteConditionalApproval_007", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Cond. Approval finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_HappyPath"
End If

'====== Exits the Loan ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
