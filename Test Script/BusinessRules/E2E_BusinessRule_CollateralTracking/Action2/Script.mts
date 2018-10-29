'@**************************************************************************************************
'@ TestStory: CTA-286 - Script optimization for Business Rules
'@ TestCase: 
   '1 PTAC-1651:Verify the New Preferred Carrier added for 'Collateral Tracking'
   '2 PTAC-1652:Verify the Deleted Preferred Carrier removed from 'Collateral Tracking'
'@ Test Automation JIRA Task: CTA-289 - E2E_CollateralTracking_BusinessRule
'@ TestData: Global_Data,Login and PTAC-1533_BusinessRule
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Login to Encompass with Admin user
   '2 Navigate to through Encompass Settings -> Business Rules -> Collateral Tracking
   '3 Click on New(+) Carrier
   '4 Enter value in the "Drop down value" and click on OK button 
   '5 Login to Encompass with new user(Non admin user )
   '6 Go to Pipeline and select created Loan Folder
   '7 Click on a New Loan.
   '8 Go to Tools section and Click on Collateral Tracking
   '9 Click on Add Receipt button
   '10 Enter shipment date, Verfiy the "Carrier name" in the Carrier dropdown
  
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Collateral Tracking window should be displayed.
   '3 It displayed the 'Preferred Carrier Options' window
   '4 "Carrier name" should be added in Preferred Carrier Drop down section.
   '5 User should able to login successfully.
   '6 Created loan folder should be displayed.
   '7 It should open the new loan
   '8 Collateral Tracking window should be displayed.
   '9 Add Initial Receipt popup should be displayed.
   '10 Newly created Carrier name should be displayed in Carrier drop down list successfully
      
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1651","Verify the New Preferred Carrier added for 'Collateral Tracking' ", Null

'====== Navigate to Business rules and create new carrier ======
strCarrierName = BR_NavigateCollateralTracking_CreateNewCarrier("")
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non admin ======
BIZ_Login_UserLogin "PTAC-1533_BusinessRuleNonAdmin"

'====== Navigate to Collateral Tracking page and Verify Carrier Name ======
BR_VerifyCarrierName_withNonAdmin "",strCarrierName,"Add"
BIZ_Loan_Exit(False)
BIZ_Nav_SelectHomeTab
BIZ_Login_UserLogout()

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1652","Verify the Deleted Preferred Carrier removed from 'Collateral Tracking'", Null
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "PTAC-1533_BusinessRule"

'====== Navigate to Business Rules and delete existing Carrier ======
BR_NavigateCollateralTracking_DeleteExistingCarrier "",strCarrierName
BIZ_Login_UserLogout()

'====== Login to the Encompass as Non Admin ======
BIZ_Login_UserLogin "PTAC-1533_BusinessRuleNonAdmin"
BR_VerifyCarrierName_withNonAdmin "",strCarrierName,"Delete"
BIZ_Loan_Exit(False)
BIZ_Nav_SelectHomeTab

BIZ_Login_UserLogout()
