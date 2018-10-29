'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E 
'@ TestCase:  	
	'PTAC-1181 HP Shipping 1 Accept File by Shipper 
	'PTAC-1182 HP Shipping 2 Completing the Shipping Details
	'PTAC-1183 HP Shipping 3 Complete Shipping- Loan file Complete
'@ Test Automation JIRA Task:  PTAC-1177 E2E_HappyPath_Shipping
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
	'Tools_ShippingDetail,SetShippingDetail,E2E_HappyPath
	'Tools_ShippingDetail,SetShipTo,E2E_HappyPath
	'Tools_ShippingDetail,SetCustomerService,E2E_HappyPath
	'Tools_ShippingDetail,SetPostClosingTrailingDocs,E2E_HappyPath
	'Tools_ShippingDetail,SetPayment,E2E_HappyPath
	'Tools_ShippingDetail,SetInsurance,E2E_HappyPath
	'Tools_ShippingDetail,SetNoteDelivery,E2E_HappyPath
	'Tools_ShippingDetail,SetTaxesNotice,E2E_HappyPath
	'Tools_ShippingDetail,SetMersRegistration,E2E_HappyPath
	'Tools_ShippingDetail,SetPhysicalFileStorage,E2E_HappyPath	
'@ Pre-conditions: Loan Number which completed the Processing Milestone is in E2E Property file
'@ Description:  
'@ TestSteps:	
	'Accept File by Shipper 
	'Completing the Shipping Details
	'Complete Shipping- Loan file Complete
'@ ExpectedResult: 
	'Complete Shipping Milestone for the LOan Number
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC - 1177","Script Name - E2E_HappyPath_Shipping", Null

'====== PTAC-1181 HP Shipping 1- Accept File by Shipper ======
RunAction "HPShipping_AcceptFileByShipper_001", oneIteration

'====== PTAC-1182 HP Shipping 2- Completing the Shipping Details ======
RunAction "HPShipping_ShippingDetails_002", oneIteration

'====== PTAC-1183 HP Shipping 3- Complete Shipping- Loan file Complete ======
RunAction "HPShipping_CompleteShipping_003", oneIteration

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Shipping finished")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Completed_HappyPath"
	FRM_Logger_ReportPassEvent "E2E Shipping Milestone", "Shipping Milestone is finished", Null
End If

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Completed")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS12Completed_HappyPath"
	FRM_Logger_ReportPassEvent "E2E Completion Milestone", "Completion Milestone is finished", Null
End If

'====== Save loan and exit ======
BIZ_Loan_Exit "True"

'====== User Logout ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)


 @@ hightlight id_;_791638_;_script infofile_;_ZIP::ssf1.xml_;_
