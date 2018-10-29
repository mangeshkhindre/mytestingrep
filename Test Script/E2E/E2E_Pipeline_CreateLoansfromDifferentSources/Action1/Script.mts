'@**************************************************************************************************
'@ TestStory: PTAC-1753 Create Loans From different Source
'@ TestCase:
   '1 PTAC-1543 Creating a loan from Encompass with template	
   '2 PTAC-1544 Creating a Blank loan from encompass
   '3 PTAC-1546 Create a Loan by duplication
   '4 PTAC-1545 Creating a loan from borrower contacts
'@ Test Automation JIRA Task: PTAC-1832 CreateLoansFromDifferentSources_LoanCreation
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1832_LoanCreation
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1832_LoanDetails
	'3 Forms_BorrowersummarOrigination,SetBorrower,PTAC-1832_ContactDetails
'***************************************************************************************************
FRM_RT_SetupTest(null)
'=========== Log into Encompasss==========
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present===========
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

FRM_Logger_ReportStepEvent "Test Scenario: Create a new loan form different sources","Create a new loan form different sources", Null

'====== Run Action to  create a New blank loan from loan template created in loan template sets======
RunAction "CreateLoan_LoanTemplate", oneIteration

'====== Run Action to create new blank loan without a loan tempalte ======
RunAction "CreateLoan_Pipeline", oneIteration, Parameter("strLoanNumber")

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Login_UserLogout()

'=========== Log into Encompasss==========
BIZ_Login_UserLogin "admin_core2p"

'====== Run Action to Duplicate a loan  ======
RunAction "CreateLoan_Contacts_LoanOriginate", oneIteration

'====== Run Action to set contact details and originate loan ======
RunAction "CreateLoan_Loan_Duplicate", oneIteration, Parameter("strLoanNumber")

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
