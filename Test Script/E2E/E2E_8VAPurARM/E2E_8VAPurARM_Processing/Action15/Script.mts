'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase: PTAC-2169 - Processing 6- Request Conditions
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: 
	'1 eFolder_Tab,SetSendRequestData,E2E_CONVPURARM
	'2 Global_Data,Website,E2E_CONVPURARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click efolder and click request button.
   '2 Click add new and select 1003 URLA and flood hazard notice and click send.
   '3 Select for borrower signing option " esign" option.
       'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization
       'and co-borrower authorization code. click send.
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
   '9 Click on document and click next. click 'adopt and sign'.
      'Click on required -sign here in all places and Click finish.
'@ ExpectedResult: 
   'Request window will open.
   'Send request opens.
   'An email message has been sent to originator" message will be shown in a new window.
   'Loan center should open.
   'Loan detail page with e-sign will be shown.
   'Document should open.
   'In the loan center page it should show e-signed.
   'Click on document and click next. click 'adopt and sign'.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2169","TestCase Name - Processing 6- Request Conditions", Null

BIZ_Loan_SaveLoanNumber()

'Clicks on eFolder
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_VAPURARM", "E2E_VAPURARM"

'Login To Loan Center as Borrower and accept eSignature 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VAPURARM_Borrower",  "E2E_VAPURARM"

BIZ_Nav_eFoler_Close()
