'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3200 CONVCASHOUTREFIFIX - Processing 5-Request conditions
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing 
'@ TestData: 
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
   '1 Click on 'efolder' and click on request button.
   '2 Click add new and select '1003 URLA' and 'Flood hazard notice' and click send.
   '3 Select for borrower signing option " esign" option.
      'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
   '4 CLONE - Click ok.
      'Click 'ok' in the pop up.
   '5 Click ok.
      'Click 'ok' in the pop up.
   '6 Login In gmail with
	  'user id : integrationborrower@gmail.com
	  'password:Integration-1.
	  'click on to electronic loan document request.
   '7 Sign-in to loan center with the following credentials
	  'Email- integrationborrower@gmail.com
	  'Password - Respa15
   '8 Click on to e-sign  and and give authorization code as 1111 for borrower and click next.
   '9 Click on document and click next. click 'adopt and sign'.
   	  'Click on required -sign here in all places and Click finish.
'@ ExpectedResult:
   '1 Request window will open.
   '2 Send request opens.
   '3 A pop up will open.
      'Pop up will close.
   '4 An email message has been sent to originator" message will be shown in a new window.
      'This pop up should close.
   '5 Loan center should open.
      'Loan detail page with e-sign will be shown.
   '6 Document should open. 
   '7 In the loan center page it should show e-signed.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3200","CONVCASHOUTREFIFIX - Processing 5-Request conditions", Null

'Clicks on eFolder and Sends Document Request
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_CONVCASHOUTREFIFIX", "E2E_CONVCASHOUTREFIFIX"

'Logs into Loan Center as Borrower and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVCASHOUTREFIFIX_Borrower", "E2E_CONVCASHOUTREFIFIX"
	
BIZ_Nav_eFoler_Close()
