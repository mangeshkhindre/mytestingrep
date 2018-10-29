'@**************************************************************************************************
'@ TestStory: PTAC-871 - CONVPURARM
'@ TestCase : PTAC-674 - Order Fraud service
'@ Test Automation JIRA Task: PTAC-990 E2E_2CONVPURARM_Processing
'@ TestData : 
	'Services, FraudService, E2E_CONVPURARM
	'"Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVPURARM
'@ Pre-conditions:
'@ Description   :
'@ TestSteps:
	'Change the SSN in borrower summary to  9120102121.
	'Change the present address to 
	 	'40 Brixton RD
	 	'Garden City, NY 11530 and click save.
	'click on services and click order fraud certification.
	'select Dataverify drive from the provider list and click submit.
	'Provide the following credentials 
	'Username: xmltqllos
	'Password: Tq1m@310s and click order.
'@ ExpectedResult: 
	'SSN should be changed.
	'Address should be changed.
	'Fraud service provider window should open.
	'Dataverify window login window should open.
	'Provide the following credentials 
	'Username: xmltqllos
	'Password: Tq1m@310s and click order.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-674","Test Case Name - PTAC-674 - Order Fraud service", Null
BIZ_Nav_SelectLoanTab()
'Enters the details in the Borrower section of Borrower summary Screen
'Saves the Loan Details
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CONVPURARM_BorrowerUpdated"
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_CONVPURARM"
