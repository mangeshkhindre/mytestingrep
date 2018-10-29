'@**************************************************************************************************
'@ TestStory:  PTAC-1665 - E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1319  - CONVNOCASHREFIARM - Processing 2- Order Fraud service
'@ Test Automation JIRA Task: PTAC-1780 E2E_1ConvNoRefiARM_Processing
'@ TestData: 
   '1 Services, FraudService, E2E_ConvNoRefiARM
   '2 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Change the SSN in borrower summary to  912010212.
   '2 Click on services and click order fraud certification
   '3 Select Fraudguard drive from the provider list and  click submit.
   '4 Provide the following credentials and check the checkbox for fraud report and click order.
	  'Fraudguard credentials:
	  'Username: TSTEM2FG
	  'Password: a1_Elliemae
'@ ExpectedResult: 
   '1 SSN should be changed.
   '2 Fraud service provider window should open.
   '3 Fraudguard login window should open.
   '4 In the Fraud guard request window under 'view and check status' fraud report status should be completed. 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1319","TestCase Name : CONVNOCASHREFIARM - Processing 2- Order Fraud service", Null

'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()

'Enters the SSN number
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_ConvNoRefiARM"
BIZ_Service_ProcessFraudGraud "E2E_ConvNoRefiARM"