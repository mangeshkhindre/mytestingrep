'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase: 
    '1 PTAC-3080 FHAPURCHASEFIX - Qualification 1 - Assign the loan opener and loan officer and Accept file
    '2 PTAC-3081 FHAPURCHASEFIX - Qualification 2 - Fill 2015 Itemization and FHA Management
    '3 PTAC-3082 FHAPURCHASEFIX - Qualification 3 - edisclosures
    '4 PTAC-3083 FHAPURCHASEFIX - Qualification 4 - Order Automated underwriting/Import conditions
    '5 PTAC-3084 FHAPURCHASEFIX - Qualification 5 - Order Encompass compliance service and finish the Qualification mIlestone
'@ Test Automation JIRA Task: PTAC-3151 E2E_4FHAPURCASHFIX_Qualification
'@ TestData:
	'01 Global_Data, Login and E2E_markuslo
	'02 Loans, LoanTemplate and E2E_LoanOfficer
	'03 Forms_2015Itemization, Set800Section and E2E_FHAPURCASHFIX
	'04 Forms_2015Itemization, Set900Section and E2E_FHAPURCASHFIX
	'05 Forms_2015Itemization, Set1000Section and E2E_FHAPURCASHFIX
	'06 Forms_2015Itemization, Set1100Section and E2E_FHAPURCASHFIX
	'07 Forms_2015Itemization, Set1200Section and E2E_FHAPURCASHFIX
	'08 Forms_FHAManagement, BasicInfo and E2E_FHAPURCASHFIX
	'09 Services, Underwriting and E2E_FHAPURCASHFIX
	'10 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
	'11 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURCASHFIX
	'12 eFolder_Tab, SelecteDisclosureDocs and E2E_FHAPURCASHFIX
	'13 Global_Data, Website and E2E_FHAPURCASHFIX_Borrower
	'14 Global_Data, Website and E2E_FHAPURCASHFIX_CoBorrower
	'15 Loans, Milestone and E2E_FHAPURCASHFIX_Qualification
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

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3151","Script Name: E2E_4FHAPURCASHFIX_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoanLoanProcessor_001", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification3_eDisclosure" Action ======
RunAction "Qualification_eDisclosure_003", oneIteration

'====== Call "Qualification4_OrderAutomatedunderwritingImportconditions" Action ======
RunAction "Qualification_OrderAutomatedUnderWritingImportConditions_004", oneIteration

'====== Call "Qualification5_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderCompliancService_005", oneIteration

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_FHAPURCASHFIX"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
