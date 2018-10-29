'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2434 FHACOREFIARM Processing 2- Order Fraud service
'@ Test Automation JIRA Task: PTAC-2716 E2E_7FHACORefiARM_Processing
'@ TestData : 
	'1 Services, FraudService, E2E_FHACORefiARM
	'2 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHACORefiARM
'@ Pre-conditions:
'@ Description   :
'@ TestSteps:
	'1 Change the SSN in borrower summary to  912010212.
	'2 Click on services and click order fraud certification.
	'3 Select Fraudguard drive from the provider list and  click submit.
	'4 Provide the following credentials and check the checkbox for fraud report and click order.
'@ ExpectedResult: 
	'1 SSN should be changed.
	'2 Fraud service provider window should open.
	'3 Fraudguard login window should open.
	'4 In the Fraud guard request window under 'view and check status' fraud report status should be completed. 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2434","Test Case Name - FHACOREFIARM Processing 2- Order Fraud service", Null

BIZ_Nav_SelectLoanTab()
'Enters the details in the Borrower section of Borrower summary Screen
'Saves the Loan Details
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHACORefiARM_BorrowerUpdated"
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_FHACORefiARM"