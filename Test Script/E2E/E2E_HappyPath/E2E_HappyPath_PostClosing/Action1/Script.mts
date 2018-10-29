'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1178 - Assign to Shipper & Accept File
	'2 PTAC-1179 - Add Conditions from Conditions sets
	'3 PTAC-1180 - Complete Post-Closing
'@ Test Automation JIRA Task: PTAC - 1173 HappyPath_PostClosing
'@ TestData: "eFolder_Tab", Global_Data, Loans
'@ Pre-conditions: Loan Number which finished Funding Milestone in E2E Property file
'@ Description:  
'@ TestSteps:
	'1 Assign to Shipper & Accept File
	'2 Add Conditions from Conditions sets
	'3 Complete Post-Closing
'@ Expected Result
	'Complete Post Closing Milestone Script
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case : PTAC - 1173","Script Name - HappyPath_PostClosing", Null

'====== PTAC-1178 - Assign to Shipper & Accept File ======
RunAction "HPPostClosing_AssignToShipperAcceptFile_001", oneIteration

'====== PTAC-1179 - Add Conditions from Conditions sets ======
RunAction "HPostClosing_AddConditionsConditionsSets_002", oneIteration

'====== PTAC-1180 - Complete Post-Closing ======
RunAction "HPPostClosing_CompletePostClosing_003", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Post Closing finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination" 
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS11Complete_HappyPath"
End If


'====== Exits the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)

	
