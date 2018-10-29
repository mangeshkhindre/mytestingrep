'@**************************************************************************************************
'@ TestStory: Test #10 (CBIZ-3706): Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE
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
   '  Interest Only Payment? = Yes For your first 9 payments
   '  Optional Payment? = No
   '  Step Payments? = No
   '  Seasonal Payments? = No
   '  Monthly Principal and Interest Payments:
   '  First Change/Amount = $955 at 10th payment
   '  Subsequent Changes = No subsequent changes
   '  Maximum Payment = $955 starting at 10th payment

'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-572", "Test #10 (CBIZ-3706): Construction to Perm Loans - Adjustable Payment (AP) Table logic - STEP RATE", Null
    
'Go to Settings/'Tables and Fees/"Escrow
BIZ_Forms_Open "Construction Management"

'Create a loan with 13 months 13 Months, Interest Only = 60 months, Balloon = 240 Months, Mortgage Insurance
strConstrLoan = BIZ_ConstructionManagement_LoanCreation("ConstructionManagement_13Mo60MInterest240Ballons_withMortage")

'Construction to Perm, Fixed to Fixed with Step Rate, Construction Period = 13 Months, Interest Only = 60 months, Balloon = 240 Months, Mortgage Insurance
'Note: Additional change to scenario is switching the Step Rate in which Permanent Phase is higher than Construction phase.
If UTIL_String_IsNotEmpty(strConstrLoan) = True Then
	BIZ_RegZLE_AP_validations "ConstructionManagement_13Mo60MInterest240Ballons_withMortage"
Else
	FRM_Logger_ReportFailEvent "AP Validations", "Unable to perform AP validations as Loan has not Created successfully", Null
End IF

