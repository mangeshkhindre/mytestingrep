'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: 
   '1 PTAC-2416 - FHACOREFIARM Qualification 1 - Access the assigned Loan as "Loan Processer"
   '2 PTAC-2417 - FHACOREFIARM Qualification 2 - Fill 2015 Itemization
   '3 PTAC-2418 - FHACOREFIARM Qualification 3 - edisclosure
   '4 PTAC-2419 - FHACOREFIARM Qualification 4 - Order Automated underwriting/Import conditions
   '5 PTAC-2420 - FHACOREFIARM Qualification 5 - Order Encompass compliance service
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualification
'@ TestData:
   '1 Services,Underwriting and E2E_FHACORefiARM
   '2 eFolder_Tab,SendeDisclosures and E2E_FHACORefiARM
   '3 eFolder_Tab,SelectPackageTypeAndPlanCode and E2E_FHACORefiARM
   '4 eFolder_Tab,SelecteDisclosureDocs and E2E_FHACORefiARM
   '5 Global_Data,Website and E2E_FHACORefiARM_Borrower
   '6 Global_Data,Website and E2E_FHACORefiARM_CoBorrower
   '7 Loans, LoanTemplate and E2E_LoanOfficer
   '8 Global_Data, Login and E2E_markuslo
   '9 Loans, Milestone, E2E_Integration_Qualification
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

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2714","Script Name: E2E_7FHACORefiARM_Qualification", Null

'====== Call "Qualification1_Assignloantoloanprocessor" Action ======
RunAction "Qualification_AssignLoanLoanProcessor_001", oneIteration

'====== Call "Qualification2_Fill2015Itemization" Action ======
RunAction "Qualification_Fill2015Itemization_002", oneIteration

'====== Call "Qualification_eDisclosure" Action ======
RunAction "QUalification_eDislosure_003", oneIteration

'====== Call "Qualification3_OrderAutomatedunderwritingImportconditions" Action ======
RunAction "Qualification_OrderAutomatedUnderWritingImportConditions_004", oneIteration

'====== Call "Qualification4_OrderEncompasscomplianceservice" Action ======
RunAction "Qualification_OrderCompliancService_005", oneIteration

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Qualification") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS2Complete_FHACORefiARM"	
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
