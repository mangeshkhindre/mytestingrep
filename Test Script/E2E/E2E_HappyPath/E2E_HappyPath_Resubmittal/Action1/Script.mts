'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1150  HP Resubmittal 1- Assign UnderWriter & Accept File
	'2 PTAC-1152  HP Resubmittal 2- Complete Underwriter summary(Final Review)
	'3 PTAC-1153  HP Resubmittal 3- Complete Resubmittal
'@ Test Automation JIRA Task: PTAC-1172  E2E_HappyPath_Resubmittal
'@ TestData: Global_Data
'@ Pre-conditions: Loan Number which completed the Conditional Approval Milestone is in E2E Property file
'@ Description: Order title and closing and finish milestone. 
'@ TestSteps:
	'1 Assign UnderWriter & Accept File
	'2 Complete Underwriter summary(Final Review)
	'3 Complete Resubmittal
'@ ExpectedResult: 
	'Resubmittal Milestone is completed for the Loan
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC - 1172","Scrpit Name : E2E_HappyPath_Resubmittal", Null

FRM_RT_SetupTest(null)

'====== PTAC-1150 - HP Resubmittal 1- Assign UnderWriter & Accept File ======
RunAction "HPResubmittal_AssignUnderWriterNAcceptFile_001", oneIteration

'====== PTAC-1152 - HP Resubmittal 2- Complete Underwriter summary(Final Review) ======
RunAction "HPResubmittal_CompleteUnderwriterSummaryFinal Review_002", oneIteration

'====== PTAC-1153 - HP Resubmittal 3- Complete Resubmittal ======
RunAction "HPResubmittal_CompleteResubmittal_003", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Resubmittal finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS6Complete_HappyPath"
End If

'====== Exits the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
