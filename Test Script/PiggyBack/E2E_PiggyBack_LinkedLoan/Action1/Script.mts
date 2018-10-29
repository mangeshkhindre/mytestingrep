'@**************************************************************************************************
'@ TestStory: PTAC-3157 Piggyback
'@ TestCase: 
   '1 PTAC-2406 Piggyback - Linked loan indicator in linked loans.
   '2 PTAC-2357 Piggyback - Display the Link icon in the top loan summary section
'@ Test Automation JIRA Task: PTAC-3158 Piggyback_LinkLoan
'@ TestData: 
'@ Pre-conditions: 
   '1 Run With 17203 Banker
'@ Description:  
'@ TestSteps:
   '1 Create two loans and link them
   '2 Modify second loan and sync data
'@ ExpectedResult:
   '1 Two loans should be created
   '2 Verify second loan modified data should be reflected in other loan after syncing
'***************************************************************************************************

FRM_RT_SetupTest(Null)

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

RunAction "PTAC-2406_Piggyback_LinkedLoanIndicatorInLinkedLoans", OneIteration, Parameter("strFirstLoan"), Parameter("strSecondLoan")

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Login_UserLogout()

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

RunAction "PTAC-2357_Piggyback_DisplayLinkinTopLoanSummarySection", oneIteration, Parameter("strFirstLoan"), Parameter("strSecondLoan")

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Login_UserLogout()
FRM_RT_TeardownTest(null)
