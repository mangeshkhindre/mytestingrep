'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: Add Test data file name, Sheet name and Row Id.
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 As a Loan Officer, after a loan is originated via the Pipeline tab or Borrower Contacts, go to the Borrower 
	'2 Summary - Origination Form input data in the following fieldsâ€¦.
'@ ExpectedResult: Once the credit report is imported into the loan file the user should be able to select and 
'					import liabilities from the credit report to page 2 of the 1003
'********************************************************************************************
	
FRM_RT_SetupTest(null)

'======== Login to the Encompass as Admin =======================
BIZ_Login_UserLogin "admin_default"	

RunAction "TC1_2_E2E_DetailsOfTransactions", oneIteration, "1"

RunAction "TC1_2_E2E_DetailsOfTransactions", oneIteration, "2"

'================Logout of Encompass application=================
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)

