'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1166  Assign to Loan Officer & Accept File
	'2 PTAC-1167  Received signed Closing Docs
	'3 PTAC-1168  Complete Docs Signing
'@ Test Automation JIRA Task: PTAC - 1174  HappyPath_Docs Signing
'@ TestData: 
	'1 Loans, LoanTemplate and E2E_HappyPath 
	'2 Loans, Milestone and E2E_HappyPath_DocsSigning
	'3 Global_Data, Login and E2E_HappyPath_Admin
	'4 eFolder_Tab,SetDocumentsStatus and E2E_HappyPath
'@ Pre-conditions: Loan Number which finished Document Preparing is in the E2E Property file
'@ Description:  
'@ TestSteps:
	'Assign to Loan Officer & Accept File
	'Received signed Closing Docs
	'Complete Docs Signing
'@ ExpectedResult:
	'Document Signing milestone is completed for the Loan
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case: PTAC - 1174","Script Name - HappyPath_Docs Signing", Null

'====== PTAC-1166  Assign to Loan Officer & Accept File ======
RunAction "HPDocSigning_AssignToLoanOfficerNAcceptFile_001", oneIteration

'====== PTAC-1167  Received signed Closing Docs ======
RunAction "HPDocsSigning_ReceivedSignedClosingDocs_002", oneIteration

'====== PTAC-1168  Complete Docs Signing ======
RunAction "HPDocsSigning_CompleteDocsSigning_003", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Docs signed")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_HappyPath"
End If

'====== Exits the Loan ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)	
