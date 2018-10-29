'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3167 FHAPURCHASEFIX - Processing 6- Request Conditions
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData: 
	'1 eFolder_Tab, SetSendRequestData, E2E_FHAPURCASHFIX
	'2 Global_Data, Website, E2E_FHAPURCASHFIX_CoBorrower
	'3 Global_Data, Website, E2E_FHAPURCASHFIX_Borrower
	'4 eFolder_Tab, SendeDisclosures, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click efolder and click request button.
	'02 Click add new and select 1003 URLA and flood hazard notice and click send.
	'03 Select for borrower signing option " esign" option.
	'04 For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization 
	'05 and co-borrower authorization code. click send.
	'06 Click ok.
	'07 Login In gmail with
	    'user id : integrationborrower@gmail.com
	    'password:Integration-1.
	'08 click on to electronic loan document request.
	'09 Sign-in to loan center with the following credentials
	    'Email- integrationborrower@gmail.com
	    'Password - Respa15
	'10 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'11 Click on document and click next. click 'adopt and sign'.
	'12 Click on required -sign here in all places and Click finish.
'@ ExpectedResult: 
	'1 Request window will open.
	'2 Send request opens.
	'3 An email message has been sent to originator" message will be shown in a new window.
	'4 Loan detail page with e-sign will be shown.
	'5 Loan center should open.
	'6 Document should open.
	'7 In the loan center page it should show e-signed.
	'8 Click on document and click next. click 'adopt and sign'.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3167","FHAPURCHASEFIX - Processing 6- Request Conditions", Null

'Clicks on eFolder and Sends Request for Documents
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_FHAPURCASHFIX", "E2E_FHAPURCASHFIX"

'Login to Loan Center as Borrower and accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURCASHFIX_Borrower", "E2E_FHAPURCASHFIX"

BIZ_Nav_eFoler_Close()
