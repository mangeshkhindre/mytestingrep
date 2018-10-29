'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3163 FHAPURCHASEFIX - Processing 3- Complete and send 4506 and 4506T forms
'@ Test Automation JIRA Task:  PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData: 
	'eFolder_Tab, SetSendRequestData, E2E_FHAPURCASHFIX_4506 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 test steps:
	'1 GO to Forms and select request for copy of tax return.
	'2 click new verification button. 	'Tax form is for -select borrower from dropdown. 	'Click copy from borrower summary button.
	'3 repeat the same process for co-borrower. select co borrower from dropdown and click copy from borrower summary button.
	'4 repeat the same process but select both from the dropdown.
	'5 click save.
   'Step2 test steps:
	'1 GO to Forms and select request for copy of transcript 4506-T.
	'2 click new verification button. Tax form is for -select borrower from dropdown. Click copy from borrower summary button.
	'3 repeat the same process for co-borrower. select co borrower from dropdown and click copy from borrower summary button.
	'4 repeat the same process but select both from the dropdown.
	'5 click save.
   'Step3 test steps:
	'1 Go to e-folder and click request.
	'2 click the add documents button.
	'3 Find the IRS 4506 and 4506-T documents and select and click add.
	'4 click preview and view the documents.
	'5 Select for borrower signing option " esign" option. For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'6 sign in as borrower in integrationborrower@gmail.com and in the email electronic signature document for loan documents click here to visit the website.
	'7 sign-in to loan center with the following credentials
	   'Email- integrationborrower@gmail.com
	   'Password - Respa15
	'8 click on to e-sign and give authorisation code as 1111 for borrower and click next.
	'9 click on document and click next. click 'adopt and sign'.
	'10 click on required -sign here in all places and click finish.
'@ ExpectedResult: 
   'Step1 Expected Result:
	'1 Request for copy of tax return window will open.
	'2 borrower, co-borrower and both should be added under request for.
	'3 It should be saved.
   'Step2 Expected Result:
	'1 Request for copy of tax return window will open.
	'2 borrower, co-borrower and both should be added under request for.
	'3 It should be saved.
   'Step3 Expected Result:
	'1 request window will open.
	'2 documents should be added.
	'3 should be able to view the documents.
	'4 request package has been sent to borrower message will appear.
	'5 Encompass loan center will open.
	'6 Loan detail page with e-sign will be shown.
	'7 Document should open.
	'8 In the loan center page it should show e-signed.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3163","FHAPURCHASEFIX - Processing 3- Complete and send 4506 and 4506T forms", Null

Dim strLoanNumber
BIZ_Nav_SelectLoanTab()
BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Copy of Tax Return"
BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Transcript of Tax"

'Clicks on eFolder
'Send the 4506 and 4506T Document Request
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_FHAPURCASHFIX", "E2E_FHAPURCASHFIX_4506"

BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURCASHFIX_Borrower", "E2E_FHAPURCASHFIX"

BIZ_Nav_eFoler_Close()
