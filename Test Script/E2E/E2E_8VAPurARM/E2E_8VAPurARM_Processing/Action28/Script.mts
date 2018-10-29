'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase: PTAC-2165 - Processing 2- Order Fraud service
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: Services, FraudService, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Change the SSN in borrower summary to  9120102121.
   '2 Change the present address to 
	   '40 Brixton RD
	   'Garden City, NY 11530 and click save.
   '3 Click on services and click order fraud certification.
   '4 select Dataverify drive from the provider list and click submit.
   '5 Provide the following credentials 
	   'Username: xmltqllos
	   'Password: Tq1m@310s and click order.
'@ ExpectedResult: 
    'SSN should be changed.
	'Address should be changed.
	'Fraud service provider window should open.
	'Dataverify window login window should open.
	'Fraud certification will be received in services view tab.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2165","Test Case Name - Processing 2- Order Fraud service", Null

BIZ_Nav_SelectLoanTab()
'Enters the details in the Borrower section of Borrower summary Screen
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_VAPURARM_BorrowerUpdated"
'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_VAPURARM"
