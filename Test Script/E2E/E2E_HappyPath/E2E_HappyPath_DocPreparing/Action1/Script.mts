'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: 
	'1 PTAC-1159 HP Doc Preparing 1-Assign to Loan Officer & Accept File 
	'2 PTAC-1160 HP Doc Preparing 2-Complete Vesting & Closing Conditions 
	'3 PTAC-1162 HP Doc Preparing 3-Complete Closing Vendor Information 
	'4 PTAC-1163 HP Doc Preparing 4-Complete Closing RegZ-CD with Plan code & Data Audit
	'5 PTAC-1165 HP Doc Preparing 5-Complete Doc Preparation
'@ Test Automation JIRA Task:  PTAC-1175 HappyPath_Docs Preparation
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
	'1 Forms_BorrowerInformationVesting,VerifyBIVesting,E2E_DocPreparing2
	'2 Forms_ClosingConditions,SetClosingConditions,E2E_DocPreparing2
	'3 Forms_ClosingConditions,AddClosingConditions,PTAC1175_DocPrep
	'4 Forms_ClosingVendorInformation,SetTitleInsuranceCompany,PTAC1175_DocPrep
	'5 Forms_ClosingVendorInformation,SetEscrowCompany,PTAC1175_DocPrep
	'6 Forms_ClosingVendorInformation,SetDocsPreparedBy,PTAC1175_DocPrep
	'7 Forms_ClosingDisclosurePage,SetLender,PTAC1175_DocPrep
	'8 Forms_REGZ_CD,SelectPlanCode,PTAC1175_DocPrep
'@ Pre-conditions: Loan Number which prepared Approval Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:	
	'1 Assign to Loan Officer & Accept File 
	'2 Complete Vesting & Closing Conditions 
	'3 Complete Closing Vendor Information 
	'4 Complete Closing RegZ-CD with Plan code & Data Audit
	'5 Complete Doc Preparation
'@ ExpectedResult: 
	'Complete Document Preparing Milestone
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-1175","Script Name: E2E_HappyPath_DocPreparing", Null

'====== PTAC-1159 HP Doc Preparing 1-Assign to Loan Officer & Accept File ======
RunAction "HPDocPreparing_AcceptFile_001", oneIteration

'====== PTAC-1160 HP Doc Preparing 2-Complete Vesting & Closing Conditions ======
RunAction "HPDocPreparing_Vesting&ClosingConditions_002", oneIteration

'====== PTAC-1162 HP Doc Preparing 3-Complete Closing Vendor Information ======
RunAction "HPDocPreparing_ClosingVendorInfo_003", oneIteration

'====== PTAC-1163 HP Doc Preparing 4-Complete Closing RegZ-CD with Plan code & Data Audit ======
RunAction "HPDocPreparing_ClosingRegzCD_004", oneIteration

'====== PTAC-1165 HP Doc Preparing 5-Complete Doc Preparation ======
RunAction "HPDocPreparing_CompleteDocPrep_005", oneIteration

If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS8Complete_HappyPath"
End If

'====== Save loan and exit ======
BIZ_Loan_Exit "True"

'====== User Logout ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
