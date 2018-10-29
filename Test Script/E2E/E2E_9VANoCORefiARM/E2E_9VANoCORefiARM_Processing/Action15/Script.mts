'@******************************************************************************************
'@ TestStory:  PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2334 -Processing 6- Request Conditions
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData: 
	'1 eFolder_Tab, SetSendRequestData and E2E_VANoCORefiARM
	'2 Global_Data, Website and E2E_VANoCORefiARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click efolder and click request button.
	'2 Click add new and select 1003 URLA and flood hazard notice and click send.
	'3 Select for borrower signing option " esign" option.
	   'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'4 Click ok.
	'5 Click ok.
	'6 Login In gmail with
	   'user id : integrationborrower@gmail.com
	   'password:Integration-1.
	   'click on to electronic loan document request.
	'7 Sign-in to loan center with the following credentials
	   'Email- integrationborrower@gmail.com
	   'Password - Respa15
	'8 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'9 Click on document and click next. click 'adopt and sign'. Click on required -sign here in all places and Click finish.
'@ ExpectedResult: 
	'1 Request window will open.
	'2 Send request opens.
	'3 An email message has been sent to originator" message will be shown in a new window.
	'4 Loan detail page with e-sign will be shown.
	'5 Loan center should open.
	'6 Document should open.
	'7 In the loan center page it should show e-signed.
	'8 Click on document and click next. click 'adopt and sign'.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2334","Processing 6- Request Conditions", Null

'Send Request for the Loan 
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_VANoCORefiARM", "E2E_VANoCORefiARM"

'Login to Loan Center as Borrower and accept eSignature Document
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VANoCORefiARM_Borrower", "E2E_VANoCORefiARM"

BIZ_Nav_eFoler_Close()
