'@******************************************************************************************
'@ TestStory: E2E_2015Itemization
'@ TestCase: E2E_2015Itemization
'@ Test Automation JIRA Task: TA-4709
'@ TestData: "Forms_2015Itemization","Set800Section","E2E_2015Itemization_Section800"
'@ TestData: "Forms_2015Itemization","Set900Section","E2E_2015Itemization_Section900"
'@ TestData: "Forms_2015Itemization","Set1000Section","E2E_2015Itemization_Section1000"
'@ TestData: "Forms_2015Itemization","Set1100Section","E2E_2015Itemization_Section1100"
'@ TestData: "Forms_2015Itemization","Set1200Section","E2E_2015Itemization_Section1200"
'@ TestData: "Forms_2015Itemization","Set1300Section","E2E_2015Itemization_Section1300"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetBorrower","E2E_2015Itemization_BorrwerInfo"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetTransactionDetails","E2E_2015Itemization_TransactionDetail"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetProperty","E2E_2015Itemization_PropertyInfo"
'@ TestData: "Forms_2015Itemization","Set800Section","E2E_2015Itemization_Section800_CC"
'@ TestData: "Forms_2015Itemization","Set900Section","E2E_2015Itemization_Section900_CC"
'@ TestData: "Forms_2015Itemization","Set1000Section","E2E_2015Itemization_Section1000_CC"
'@ TestData: "Forms_2015Itemization","Set1100Section","E2E_2015Itemization_Section1100_CC"
'@ TestData: "Forms_2015Itemization","Set1200Section","E2E_2015Itemization_Section1200_CC"
'@ TestData: "Forms_2015Itemization","Set1300Section","E2E_2015Itemization_Section1300_CC"
'@ Pre-conditions: NA
'@ Description:  
'@ TestSteps:1.Login to Encompass
'            2.Call reusable action
'            3.Call reusable action
'            4.Call reusable action
	
'@ ExpectedResult: Mentioned in each Action					
'********************************************************************************************
FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

RunAction "TC1_CreateClosingCostTemplate", oneIteration

RunAction "TC2_TC3_VerifyAlertsAndFees", oneIteration

RunAction "TC4_VerifyFeesAndAlertAfterChange", oneIteration

'==========Come out of existing loan============
BIZ_Loan_Exit(False)

'=======================Logout of Application========================
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null) 

