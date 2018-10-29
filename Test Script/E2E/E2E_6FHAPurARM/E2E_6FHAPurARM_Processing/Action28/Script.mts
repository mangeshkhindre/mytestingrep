'@**************************************************************************************************
'@ TestStory : PTAC-2010- E2E_6FHAPURARM
'@ TestCase  : PTAC-1910 - Processing 2- Order Fraud service
'@ Test Automation JIRA Task: PTAC-2121 E2E_6FHAPURARM_Processing
'@ TestData: Services, FraudService, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Change the present address to 
	   '40 Brixton RD
	   'Garden City, NY 11530 and click save.
	'2 click on services and click order fraud certification.
	'3 select Dataverify drive from the provider list and click submit.
	'4 Provide the following credentials and click order.
	   'Username: xmltqllos
	   'Password: Tq1m@310s 
'@ ExpectedResult: 
	'1 Address should be changed.
	'2 Fraud service provider window should open.
	'3 Dataverify window login window should open.
	'4 Fraud certification will be received in services view tab.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1910","Test Case Name: Processing 2- Order Fraud service", Null

BIZ_Nav_SelectLoanTab()

'Enters the details in the Borrower section of Borrower summary Screen
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURARM_BorrowerUpdated"

'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()

BIZ_Service_ProcessFraudGraud "E2E_FHAPURARM"