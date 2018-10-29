'@**************************************************************************************************
'@ TestStory:  PTAC-1665 - E2E_1ConvNoRefiARM
'@ TestCase:  PTAC-1332  - CONVNOCASHREFIARM - Processing 3- Complete and send 4506 and 4506-T forms
'@ Test Automation JIRA Task:  PTAC-1780 E2E_1ConvNoRefiARM_Processing
'@ TestData: 
   '1 Services, FraudService, E2E_ConvNoRefiARM
   '2 Forms_ClosingVendorInformation, SetEscrowCompany, E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1:
   '1 Go to Forms and select request for copy of tax return.
   '2 click new verification button.
   '3 Tax form is for -select borrower from dropdown.
   '4 Click copy from borrower summary button.
   '5 Repeat the same process for co-borrower. select co borrower from dropdown and click copy from borrower summary button.
   '6 Repeat the same process but select both from the dropdown.
   '7 Click save.  
   'Step2:
   '1 Go to Forms and select request for copy of transcript 4506-T.
   '2 Click new verification button.
   '3 Tax form is for -select borrower from dropdown.
   '4 Click 'copy from borrower summary' button.
   '5 Repeat the same process for co-borrower. Select co borrower from dropdown and click 'copy from borrower summary' button.
   '6 Repeat the same process but select both from the dropdown.
   '7 click save.   
   'Step3:
   '01 Go to e-folder and click on 'Request' button.
   '02 Click the 'Add documents' button.
   '03 Find the IRS 4506 and 4506-T documents and select and Click 'add'.
   '04 Click preview and view the documents.
   '05 Select for borrower signing option " esign" option.
   '06 For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
   '07 Sign in as borrower in integrationborrower@gmail.com and in the email electronic signature document for loan documents click here to visit the website.
   '08 Sign-in to loan center with the following credentials
       'Email- integrationborrower@gmail.com
       'Password - Respa15
   '09 Click on to e-sign and give authorisation code as 1111 for borrower and click next.
   '10 Click on document and click next. click 'adopt and sign'.
   '11click on required -sign here in all places and click finish.
'@ ExpectedResult: 
   'Step1 Expected Result:
   '1 Request for copy of tax return window will open.
   '2 Borrower, co-borrower and both should be added under request for.
   '3 It should be saved.   
   'Step2 Expected Result:
   '1 Request for copy of tax return window will open
   '2 Borrower, co-borrower and both should be added under request for
   '3 It should be saved. 
   'Step3 Expected Result:
   '1 Request window will open.
   '2 Documents should be added.
   '3 Should be able to view the documents.
   '4 Request package has been sent to borrower message will appear.
   '5 Encompass loan center will open.
   '6 Loan detail page with e-sign will be shown.
   '7 Document should open.
   '8 In the loan center page it should show e-signed.
 '***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1332","Test Case Name : CONVNOCASHREFIARM - Processing 3- Complete and send 4506 and 4506-T forms", Null

Dim strLoanNumber
BIZ_Nav_SelectPipelineTab()
GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,0,2,True,True,False,"Double"

BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Copy of Tax Return"
BIZ_RequestforTranscripOfTax_NewFormNUpdateNSaveDetails "Request for Transcript of Tax"

'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()

'Clicks on eFolder and Send the 4506 and 4506T Document Request
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM_4506"

'Logs in to Loan Center as Borrower as accepts eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_ConvNoRefiARM_Borrower", "E2E_ConvNoRefiARM"

'Logs in to Loan Center as Co-Borrower as accepts eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_ConvNoRefiARM_CoBorrower", "E2E_ConvNoRefiARM"

BIZ_Nav_eFoler_Close() @@ hightlight id_;_Browser("DocuSign").Page("DocuSign").WebButton("SignRequired - Sign Here 2")_;_script infofile_;_ZIP::ssf7.xml_;_
