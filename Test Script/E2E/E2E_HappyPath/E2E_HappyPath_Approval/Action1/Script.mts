'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: 
   'PTAC-1154 HP Approval 1- Assign to Loan Processor & Accept File 
   'PTAC-1155 HP Approval 2- Complete Closing Disclosure, Esign Process & Validate CD date
   'PTAC-1158 HP Approval 3- Complete Approval Process
'@ Test Automation JIRA Task:  PTAC-1234 E2E_HappyPath_Approval
'@ TestData: 
   '1 Global_Data,Login,E2E_HappyPath_Admin
   '2 Forms_FHAManagement,BasicInfo,E2E_Approval2_FHA
   '3 eFolder_Tab,SelectPackageTypeAndPlanCode,CFUN81_PackageType
   '4 eFolder_Tab,SelecteDisclosureDocs,E2E_CD_DisclosureTracking
   '5 eFolder_Tab,SendeDisclosures,E2E_HPQual3
   '6 WebCenter_Application,Basic,E2E_HPQualification3
   '7 Global_Data,Website,E2E_HappyPath_Borrower
'@ Pre-conditions: Loan Number that finished Resubmittal Milestone is in E2E Property file
'@ Description:  
'@ TestSteps: 
   '1 Assign Loan Processor and Accept File
   '2 Complete Closing Disclosure, E-sign Process and Validate CD Date
   '3 Complete Approval Milestone Process
'@ ExpectedResult: 
   'Approval Milestone should be finised
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script: PTAC-1234","Script Name: E2E_HappyPath_Approval ", Null

'====== Pre-requisite create the blan loan first ======
RunAction "CreateBlankLoan", oneIteration

'====== PTAC-1154 HP Approval 1- Assign to Loan Processor & Accept File ======
RunAction "HPApproval_AssignLoanAcceptFile_001", oneIteration
'
''====== PTAC-1155 HP Approval 2-Complete Closing Disclosure, Esign Process & Validate CD date ======
'RunAction "HPApproval_CompleteCD_eSign_002", oneIteration
'
''====== PTAC-1158 HP Approval 3- Complete Approval Process ======
'RunAction "HPApproval_CompleteApproval_003", oneIteration
'
'If(BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Approved")) Then 
'	BIZ_Forms_Open "Borrower Summary - Origination"
'	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS7Complete_HappyPath"
'End If
'
''====== Save loan and exit ======
'BIZ_Loan_Exit "True"
'
''====== User Logout ======
'BIZ_Login_UserLogout()
'FRM_RT_TearDownTest(Null)

