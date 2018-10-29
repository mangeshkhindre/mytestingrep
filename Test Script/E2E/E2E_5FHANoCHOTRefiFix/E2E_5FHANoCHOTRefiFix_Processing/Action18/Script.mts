'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1823 FHANOCHOTREFIFIX Processing 3- Complete and send 4506 and 4506-T Forms
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
    '1 eFolder_Tab, SetSendRequestData, E2E_FHANoCHOTRefiFix_4506 
    '2 Global_Data, Website, E2E_FHANoCHOTRefiFix_Borrower
	'3 Global_Data, Website, E2E_FHANoCHOTRefiFix_CoBorrower
	'4 eFolder_Tab, SendeDisclosures, E2E_FHANOCHOTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 GO to Forms and select request for copy of tax return
   '02 Click new verification button.'Tax form is for -select borrower from dropdown.'Click copy from borrower summary button
   '03 Repeat the same process for co-borrower. select co borrower from dropdown and click copy from borrower summary button
   '04 Repeat the same process but select both from the dropdown
   '05 Click save
   '06 GO to Forms and select request for copy of transcript 4506-T
   '07 Click new verification button. Tax form is for -select borrower from dropdown. Click copy from borrower summary button
   '08 Repeat the same process for co-borrower. select co borrower from dropdown and click copy from borrower summary button
   '09 Repeat the same process but select both from the dropdown
   '10 Click save
   '11 Go to e-folder and click request
   '12 Click the add documents button
   '13 Find the IRS 4506 and 4506-T documents and select and click add
   '14 Click preview and view the documents
   '15 Click 'send' button.Select for borrower signing option " esign" option. For borrower authentication method select Authorization code
       'from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
   '16 Sign in as borrower in integrationborrower@gmail.com and in the email electronic 
       'signature document for loan documents click here to visit the website
   '17 Sign-in to loan center with the following credentials
		' Email- integrationborrower@gmail.com
		' Password - Respa15
   '18 Click on to e-sign and give authorisation code as 1111 for borrower and click next
   '19 Click on document and click next. click 'adopt and sign'
   '20 Click on required -sign here in all places and click finish
''@ ExpectedResult: 
   '01 Request for copy of tax return window will open
   '02 Borrower, co-borrower and both should be added under request for
   '03 It should be saved
   '04 Request for transcript of tax return window will open
   '05 Borrower, co-borrower and both should be added under request for
   '06 It should be saved
   '07 Request window will open
   '08 Documents should be added
   '09 Should be able to view the documents
   '10 Request package has been sent to borrower message will appear
   '11 Encompass loan center will open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1823","FHANOCHOTREFIFIX Processing 3- Complete and send 4506 and 4506-T Forms", Null

Dim strLoanNumber
BIZ_Nav_SelectLoanTab()
BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Copy of Tax Return"
BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Transcript of Tax"

'Clicks on eFolder and Send the 4506 and 4506T Document Request
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_FHANoCHOTRefiFix", "E2E_FHANoCHOTRefiFix_4506"

'Borrower Logs in to Loan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_Borrower", "E2E_FHANoCHOTRefiFix"

'Co-Borrower Logs in to Loan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_CoBorrower", "E2E_FHANoCHOTRefiFix"

BIZ_Nav_eFoler_Close()
