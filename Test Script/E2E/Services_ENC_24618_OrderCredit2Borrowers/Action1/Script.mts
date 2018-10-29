'@**************************************************************************************************
'@Test Story: Automate 15.2 ENC-24618 15.2 Commit - Ability to record borrower consent to order credit report
'@Test Case : ENC-26770: TC #1 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Borr. Summary - Origination Form)
'             ENC-26774: TC #2 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Borr. Summary - Processing Form)
'             ENC-26777: TC #3 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Business Rules Settings)
'@ Test Automation JIRA Task: TA-4663
				
'@ Revision History:
	'2/19/2016	 New create Script.
'*************************************************************************************************

	FRM_RT_SetupTest(null)
	
	'==========================Login to Encompass==================================	
    BIZ_Login_UserLogin "sven_admin"
    
	RunAction "TC1_2_ENC24618_OrderCredit", oneIteration, "1"
	RunAction "TC1_2_ENC24618_OrderCredit", oneIteration, "2"
	RunAction "TC3_ENC24618_BusinessRule", oneIteration
	
	'=======================Logout of Application========================
    BIZ_Login_UserLogout
   
    FRM_RT_TearDownTest(Null)



