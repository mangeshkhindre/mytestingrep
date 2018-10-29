'@**************************************************************************************************
'@ TestStory:  CTA-286 - Script optimization for Business Rules
'@ TestCase: 
   '1 PTAC-1653 Verify 'Next Follow-up date' for DOT/Mortgage - Initial Request in Collateral Tracking
   '2 PTAC-1655 Verify 'Next Follow-up date' for Final Title Policy - Initial Request in Collateral Tracking
'@ Test Automation JIRA Task: CTA-289 - E2E_CollateralTracking_BusinessRule
'@ TestData: Global_Data, login and PTAC-1653 
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Login to Encompass with Admin user
   '2 Navigate to through Encompass Settings -> Business Rules -> Collateral Tracking
   '3 Click on New(+) Carrier
   '4 Enter value in the "Drop down value" and click on OK button 
   '5 Enter "Days between Follow-ups" under DOT/Mortgage, save
   '6 Login to Encompass with new user(Non admin user )
   '7 Go to Pipeline and select created Loan Folder
   '8 Click on a New Loan.
   '9 Go to Tools section and Click on Collateral Tracking
   '10 Click on Add Request button
   '11 Enter details mentioned in the test data, Click on OK button.
   '12 Verify the 'Next Follow-up date'        
'@ ExpectedResult:
   '1 Admin should be able to login
   '2 Collateral Tracking window should be displayed.
   '3 It displayed the 'Preferred Carrier Options' window
   '4 "Carrier name" should be added in Preferred Carrier Drop down section.
   '5 Details should be saved.
   '6 User should able to login successfully.
   '7 Created loan folder should be displayed.
   '8 It should open the new loan
   '9 Collateral Tracking window should be displayed.
   '10 Add Initial Request popup should be displayed.
   '11 It should show the 'initial request' tab details, and also, it adds the record in the 'Tracking History' section.
   '12 Follow-up date should be after four days of Last Request Date
      
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1653","Verify 'Next Follow-up date' for DOT/Mortgage - Initial Request in Collateral Tracking", Null

BIZ_Login_UserLogin "admin_core2p"
BR_NavigateCollateralTracking()

Set objCollateralTrackingPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objAddCollateralPopUp     = objCollateralTrackingPage.SwfWindow("swfname:=SecondaryFieldDatilForm")
Set objScrollbar              = objCollateralTrackingPage.SwfScrollBar("swfname:=vPanelScrollBar")
boolExist = GUI_List_ClickRow(objCollateralTrackingPage.SwfObject("swfname:=listCarriers"), objScrollbar, False, "CollateralTracking_1", False, False, False, "Single")
If boolExist Then
	GUI_SwfObject_Click objCollateralTrackingPage.SwfObject("swfname:=buttonDelete")
End If
boolExist1 = GUI_List_ClickRow(objCollateralTrackingPage.SwfObject("swfname:=listCarriers"), objScrollbar, False, "CollateralTracking_2", False, False, False, "Single")
If boolExist1 Then
	GUI_SwfObject_Click objCollateralTrackingPage.SwfObject("swfname:=buttonDelete")
End If

BR_EnabledDOTMortgage "PTAC-1653"
BR_BusinessRules_Close
BIZ_Login_UserLogout()

'===== Login to Encompass with Non Admin User and Verify Next Followup Date =====
BIZ_Login_UserLogin "BR_KrUser1_NonAdmin"
BR_VerifyNextFollowUpdate_withNonAdmin "PTAC-1653"
BIZ_Loan_Exit(False)
BIZ_Nav_SelectHomeTab
'====== Logout from Encompass ======
BIZ_Login_UserLogout()

'===== Login to Encompass with Admin User and do settings =====
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1655","Verify 'Next Follow-up date' for Final Title Policy - Initial Request in Collateral Tracking ", Null
BIZ_Login_UserLogin "admin_core2p"
BR_NavigateCollateralTracking()
BR_EnabledFinalTitlePolicy "PTAC-1653"
BR_BusinessRules_Close
BIZ_Login_UserLogout()

'===== Login to Encompass with Non Admin User and Verify Nex tFollow Update Final Title =====
BIZ_Login_UserLogin "BR_KrUser1_NonAdmin"
BR_VerifyNextFollowUpdateFinalTitle_withNonAdmin "PTAC-1653"
BIZ_Loan_Exit(False)

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "PTAC-1533_BusinessRule"

BR_NavigateCollateralTracking()
'====== Navigate to Business Rules and delete existing Carrier ======
BR_DeleteCarrierName "CollateralTracking_1"
BR_DeleteCarrierName "CollateralTracking_2"
BIZ_Nav_Settings_Close

