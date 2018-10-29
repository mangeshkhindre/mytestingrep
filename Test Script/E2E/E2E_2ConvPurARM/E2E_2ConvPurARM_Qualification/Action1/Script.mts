'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase: 
    '1 PTAC-318 Qualification 1 - Access the assigned Loan as "Loan Processer" 
    '2 PTAC-319 Qualification 2-Fill 2015 Itemization 
    '3 PTAC-664 Qualification 3 - edisclosures 
    '4 PTAC-320 Qualification 4 - Order Automated underwriting/Import conditions
    '5 PTAC-321 Qualification 5- Order Encompass compliance service     
'@ Test Automation JIRA Task: PTAC-992 E2E_2CONVPURARM_Qualification
'@ TestData: Global_Data, Forms_RegZ-LE, Forms_FNMAStreamlined, Forms_1003Page, Forms_VOD, Forms_BorrowerSummaryOrigin
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
    '1 Assign LOan Officer to Loan
    '2 Fill 2015 Itemisation Details
    '3 Order Automated underwriting Import conditions
    '4 Order Encompass compliance service
'@ ExpectedResult: 
	'Qualification Milestone should be finised
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-992","Script Name: E2E_2CONVPURARM_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoanLoanProcessor_001", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification_eDisclosure" Action ======
RunAction "Qualification_eDisclosure_003", oneIteration

'====== Call "Qualification3_OrderAutomatedunderwritingImportconditions" Action ======
RunAction "Qualification_OrderAutomatedUnderWritingImportConditions_004", oneIteration

'====== Call "Qualification4_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderCompliancService_005", oneIteration

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_CONVPURARM"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
