'TestFlow to Create Consumer Connect Loan, Account Creation and Login

FRM_RT_SetupTest(null)

'======== Create Loan from ConsumerConnect ========   
Call BIZ_CreateCCLoan("CCLoan_Encompass")

'======== Create Account Sign in for user with First name and last Name ========   
Call  BIZ_CCAccountSignIn(strRowID,Environment("FirstName"),Environment("LastName"))

'======== Login and Logout in Encompass with User ID and password ========  
Call BIZ_CClogin("CCLoan_Encompass",Environment("CCUserName"),Environment("CCPassword"))

FRM_RT_TeardownTest Null


