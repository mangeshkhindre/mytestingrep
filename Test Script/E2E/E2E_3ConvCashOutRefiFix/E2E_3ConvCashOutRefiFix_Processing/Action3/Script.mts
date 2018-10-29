'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3137 CONVCASHOUTREFIFIX Processing 2- Order Fraud service
'@ Test Automation JIRA Task:  PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData: 
   '1 Services, FraudService, E2E_CONVCASHOUTREFIFIX
   '2 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on services and click order fraud certification.
   '2 Select Fraudguard drive from the provider list and  click submit.
   '3 Provide the following credentials and check the checkbox for fraud report and click order.
      'Fraudguard credentials:
	   'Username: TSTEM2FG
	   'Password: a1_Elliemae
'@ ExpectedResult: 
   '1 Fraud service provider window should open.
   '2 Fraudguard login window should open.
   '3 In the Fraud guard request window under 'view and check status' fraud report status should be completed. 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3137","CONVCASHOUTREFIFIX Processing 2- Order Fraud service", Null

'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()

'Enters the SSN number
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CONVCASHOUTREFFIX"
BIZ_Service_ProcessFraudGraud "E2E_CONVCASHOUTREFIFIX"