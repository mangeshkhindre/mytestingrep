'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3162 FHAPURCHASEFIX - Processing 2- Order Fraud Service
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData : 
	'1 Services, FraudService, E2E_FHAPURCASHFIX
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURCASHFIX
'@ Pre-conditions:
'@ Description   :
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
	'5 Fraud certification will be received in services view tab."
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3162","FHAPURCHASEFIX - Processing 2- Order Fraud Service", Null
BIZ_Nav_SelectLoanTab()
'Enters the details in the Borrower section of Borrower summary Screen
'Saves the Loan Details
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURCASHFIX_BorrowerUpdated"
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_FHAPURCASHFIX"