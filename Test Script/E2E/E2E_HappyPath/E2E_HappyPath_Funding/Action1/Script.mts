'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1169 HP Funding 1- Assign to Loan Officer & Accept File 
	'2 PTAC-1170 HP Funding 2- Complete Funding Work sheet
	'3 PTAC-1171 HP Funding 3- Complete Funding 
'@ Test Automation JIRA Task:  PTAC-1176 E2E_HappyPath_Funding
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
	'1 Tools_FundingWorkSheet,SetFundingClosing,1129_FundingWorksheet
	'2 Tools_FundingWorkSheet,SetFundingSource,1129_FundingWorksheet
	'3 Tools_FundingWorkSheet,SetWireInformation,1129_FundingWorksheet
'@ Pre-conditions: Loan Number which finished Document Signing is in E2E Property file 
'@ Description:  
'@ TestSteps:	
	'1 Assign to Loan Officer & Accept File 
	'2 Complete Funding Work sheet
	'3 HP Funding 3- Complete Funding 
'@ ExpectedResult: 
	'Completed Funding Milestone
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case: PTAC - 1176","Script Name - E2E_HappyPath_Funding", Null

'====== PTAC-1169 HP Funding 1- Assign to Loan Officer & Accept File ======
RunAction "HPFunding_AssignAndAcceptFile_001", oneIteration

'====== PTAC-1170 HP Funding 2- Complete Funding Work sheet ======
RunAction "HPFunding_FundingWorksheet_002", oneIteration

'====== PTAC-1171 HP Funding 3- Complete Funding  ======
RunAction "HPFunding_CompleteFunding_003", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Funded")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS10Complete_HappyPath"
End If

'====== Save loan and exit ======
BIZ_Loan_Exit "True"

'====== User Logout ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
