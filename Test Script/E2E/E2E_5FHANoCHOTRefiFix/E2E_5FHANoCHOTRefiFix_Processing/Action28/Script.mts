'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1822 FHANOCHOTREFIFIX Processing 2- Order Fraud Service
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: Services, FraudService, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Change the SSN in borrower summary to  912010212
   '2 Click on services and click order fraud certification
   '3 Select Fraudguard drive from the provider list and click submit..
   '4 Provide the following credentials and check the checkbox for fraud report click order.
'@ ExpectedResult: 
   '1 SSN should be changed
   '2 Fraud service provider window should open
   '3 Fraudguard window login window should open
   '4 In the Fraud guard request window under 'view and check status' fraud report status should be completed.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1822","FHANOCHOTREFIFIX Processing 2- Order Fraud Service", Null

BIZ_Nav_SelectLoanTab()
'Enters the details in the Borrower section of Borrower summary Screen
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHANoCHOTRefiFix_BorrowerUpdated"
'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()
BIZ_Service_ProcessFraudGraud "E2E_FHANoCHOTRefiFix"