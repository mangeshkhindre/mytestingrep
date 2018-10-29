'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1107  HP Processing 1 Order flood Certification
	'2 PTAC-1125  HP Processing 2 Order Fraud Service
	'3 PTAC-1126  HP Processing 3 Order Appraisal
	'4 PTAC-1127  HP Processing 4 Order title & Closing
	'5 PTAC-1148  HP Processing 5 Assign Loan processor and finishing the milestone
'@ Test Automation JIRA Task: PTAC - 1134 Happy Path Processing
'@ TestData: Global_Data/Login/admin_171
'@ Pre-conditions: File started milestone completed
'@ Description:  
'@ TestSteps: 
	'Perform Flood Certification for the Loan
	'Perform Fraud Service for the Loan 
	'Perform Order Appraisal for the Loan
	'Perform Title and Closing for the Loan
	'Assign Loan Processor and Finish Processing Milestone
'@ ExpectedResult: 
	'Flood Certification and Fraud Certification should be done for the Loan
	'Order Appraisal and Title and Closing operation is to be done for the Loan
	'Assign Loan Processor and Finish Processing Milestone	
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC - 1134","Script Name - Happy Path Processing", Null

'====== PTAC-1107 - HP Processing - Order Flood Certification ======
RunAction "Processing_AcceptFileAndPerformOrderFloodCertification_001", oneIteration

'====== PTAC-1126 - HP Processing - Order Appraisal ======
RunAction "Processing_OrderAppraisal_002", oneIteration

'====== PTAC-1125 - HP Processing - Order Fraud Certification ======
RunAction "Processing_FraudService_003", oneIteration

'====== PTAC-1127 - HP Processing - Order Title and closing ======
RunAction "Processing_OrderTitleAndClosing_004", oneIteration

'====== PTAC-1148 - HP Processing - Assign Loan processor and finishing the milestone ======
RunAction "Processing_AssignLoanProcessorFinishingtheMilestone_005", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_HappyPath"	
End If
'====== Saves the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


