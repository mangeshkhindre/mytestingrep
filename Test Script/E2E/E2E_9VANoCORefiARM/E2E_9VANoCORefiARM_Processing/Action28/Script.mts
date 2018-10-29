'@******************************************************************************************
'@ TestStory:  PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC-2330 - Processing 2- Order Fraud service
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData: Services, FraudService and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Change the SSN in borrower summary to  9120102121.
	'2 Change the present address to 
	   '40 Brixton RD
	   'Garden City, NY 11530 and click save.
	'3 click on services and click order fraud certification.
	'4 select Dataverify drive from the provider list and click submit.
	'5 Provide the following credentials 
	   'Username: xmltqllos
	   'Password: Tq1m@310s and click order.
'@ ExpectedResult: 
	'1 SSN should be changed.
	'2 Address should be changed.
	'3 Fraud service provider window should open.
	'4 Dataverify window login window should open.
	'5 Fraud certification will be received in services view tab
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2330","Processing 2- Order Fraud service", Null

BIZ_Nav_SelectLoanTab()

'Enters the details in the Borrower section of Borrower summary Screen
'Saves the Loan Details
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_VANoCORefiARM_BorrowerUpdated"
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_VANoCORefiARM"
