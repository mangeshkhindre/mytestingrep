'@**************************************************************************************************
'@ TestStory: 
'@ TestCase:Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE
'@ Test Automation JIRA Task: 
'@ TestData: ConstructionManagement
'@ Pre-conditions: 
'@ Description: Construction to Perm, Fixed to Fixed with Step Rate, Construction Period = 13 Months, No Interest Only.
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner)
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Go to Reg-Z Form, and validate the Adjustable Payment section fields
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created successfully
   '5 The Adjustable Payment Table section is displayed with the following:
   '  Interest Only Payment? = Yes For your first 13 payments
   '  Optional Payment? = No
   '  Step Payments? = No
   '  Seasonal Payments? = No
   '  Monthly Principal and Interest Payments:
   '  First Change/Amount = $955 at 14th payment
   '  Subsequent Changes = No subsequent changes
   '  Maximum Payment = $955 starting at 14th payment

'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case","Scrpit Name - Settings_TablesandFees_Escrow_Fees", Null

'Login to the Encompass as admin
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_Pipeline_Forms_FormType "My Pipeline", "Construction Management"

RunAction "01_NoInterest_13Months", oneIteration

RunAction "02_NoInterest_12Months", oneIteration

RunAction "03_NoInterest_9Months", oneIteration

RunAction "04_60MInterest_9Months", oneIteration

RunAction "05_6MInterest_12Months", oneIteration

RunAction "06_6MInterest_13Months", oneIteration

RunAction "07_6MInterest_9Months_WithMortage", oneIteration
'
RunAction "08_36MInterest_12Months_Balloons240", oneIteration

RunAction "09_60MInterest_13Months_Balloons240", oneIteration

BIZ_Loan_Exit False
'====== To logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)



