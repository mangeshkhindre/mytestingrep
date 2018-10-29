'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2438 FHACOREFIARM Processing 6- Request conditions
'@ Test Automation JIRA Task: PTAC-2716 E2E_7FHACORefiARM_Processing
'@ TestData: 
	'1 eFolder_Tab, SetSendRequestData and E2E_FHACORefiARM
	'2 Global_Data, Website and E2E_FHACORefiARM_CoBorrower
	'3 Global_Data, Website and  E2E_FHACORefiARM_Borrower
	'4 eFolder_Tab, SendeDisclosures and E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click efolder and click request button.
	'2 Click add new and select 1003 URLA and flood hazard notice and click send.
	'3 Select for borrower signing option " esign" option.
	   'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization 
	   'and co-borrower authorization code. click send.
	'4 CLONE - Click ok.Click 'ok' in the pop up.
    '5 Click ok.Click 'ok' in the pop up.
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
	'1 Request window will open.
	'2 Send request opens.
    '3 A pop up will open.Pop up will close.
	'4 An email message has been sent to originator" message will be shown in a new window.
	'5 Loan center should open.Loan detail page with e-sign will be shown.
	'6 Document should open.
	'7 In the loan center page it should show e-signed.
	'8 Click on document and click next. click 'adopt and sign'.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2438","Test Case Name - FHACOREFIARM Processing 6- Request conditions", Null

'Clicks on eFolder abd Sends Request Document
blnSendRequestStatus = BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest("E2E_FHACORefiARM",  "E2E_FHACORefiARM")

If(blnSendRequestStatus = 0) Then 
	'Login to loan Center as Borrower and Accept eSignature
	BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHACORefiARM_Borrower", "E2E_FHACORefiARM"
End If

BIZ_Nav_eFoler_Close()
