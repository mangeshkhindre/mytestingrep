'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Other Loan Alerts Testcase
'@ Test Automation JIRA Task: TA-4815
'@ TestData: 
	'Forms_BorrowerSummaryorigination.xls "SetBorrower" "OtherAlerts_Borrower"
	'Forms_BorrowerSummaryorigination.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Forms_BorrowerSummaryorigination.xls "SetProperty" "OtherAlerts_Property"
	'Forms_BorrowerSummaryorigination.xls "SetCreditInformation" "OtherAlerts_CreditInformation"
	'Forms_RegZ_CD.xls "RegZ_CD" "OtherAlerts_Setdata"
	'Forms_TransmittalSummary.xls "SetProperty" "OtherAlerts_Property"
	'Forms_TransmittalSummary.xls "SetUnderwritingInfo" "OtherAlerts_UnderwritingInfo"
	'Tools_LockRequestForm.xls "SetRequest" "OtherAlerts_Request"
	'Tools_LockRequestForm.xls "SetProperty" "OtherAlerts_Property"
	'Tools_LockRequestForm.xls "SetTransactionDetails" "OtherAlerts_TransactionDetails"
	'Tools_LockRequestForm.xls "SetRateLockRequest" "OtherAlerts_RateLockRequest"
	'Tools_DisclosureTracking.xls "SetComplianceTimeline" "OtherAlerts_data"
	'Tools_ShippingDetail.xls "SetShippingDetail" "OtherAlerts_data"
	'Setttings_CompanyUserSetup.xls "OrganizationUsers_CreateUser" "sven_officer"
	'Global_Data.xls "Login" "sven_officer"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass
	'2 Run Action for TC1
	'3 Run Action for TC2
	'4 Run Action for TC3
	'5 Run Action for TC4
	'6 Run Action for TC5
	'7 Logout of Encompass
'@ ExpectedResult: 
'********************************************************************************************
FRM_RT_SetupTest(Null)
BIZ_Login_UserLogin "sven_admin"

BIZ_Alerts_EnableAlert "eConsent Not Yet Received"

RunAction "TC1_RateLockRequested", oneIteration
RunAction "TC2_eConsentNotReceived", oneIteration
RunAction "TC3_InvestorDeliveryDate", oneIteration
RunAction "TC4_eFolderUpdate", oneIteration
RunAction "TC5_RegistrationExpiration", oneIteration

FRM_RT_TeardownTest(null)
BIZ_Login_UserLogout()






