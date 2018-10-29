'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase	: PTAC-1879 Qualification 3 - edisclosures 
'@ Test Automation JIRA Task:  PTAC-2120 E2E_6FHAPURARM_Qualification
'@ TestData: 
    '1 Services, Underwriting, E2E_FHAPURARM
    '2 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '01 Click e-folder 
    '02 Click e-disclosure 
    '03 Select a plan code-  Generic 5/1 Treasury ARM and click 'order disclosures' button 
    '04 Click on the fields and clear any audits which are in red color (Ignore others which are black)  click refresh audit button 
    '05 Click ""order edisclosures"" button in the disclosures audit window  
    '06 Click Add additional docs button 
    '07 Select Loan Estimate and click add 
    '08 Un-Check if all documents are selected and Click send only loan estimate 
    '09 Select for borrower signing option "" esign + wetsign"" option 'For borrower authentication method select Authorization code from
        'the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
    '10 Click ok 
    '11 Click ok 
    '12 Sign-in to loan center with the URL as per test data and the following credentials  
        'Email- integrationborrower@gmail.com
        'Password - Respa15
    '13 Click on to e-sign and give authorisation code as 1111 for borrower and click next 
    '14 Click on document and click next. click 'adopt and sign'  click on required -sign here in all places and click finish 
    '15 Sign-in to loan center with the URL as per test data and the following credentials
        'Email- integrationcoborrower@gmail.com
        'Password - Respa15
    '16 Click on to e-sign and give authorization code as 1111 for borrower and click next.
    '17 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish.
    '18 In the loan center page under print sign and upload documents, Click upload add any 2pdf documents.(Repeat for co-borrower)
    '19 In Encompass in disclosure tracking  click on the line item under disclosure history and check on "Intent to proceed" and click 'ok' 
'@ ExpectedResult: 
   '1 E-folder should open 
   '2 Send E-disclosure window should open 
   '3 Disclosure Audit window opens 
   '4 Window should refresh.
   '5 Select documents page should open 
   '6 A list of additional documents will be shown 
   '7 The selected documents has been added to the list based on current stacking order- message will appear 
   '8 Send edisclosure page with email message will be shown 
   '9 Window opens with the following message""Package includes one or more documents that require originators e-signature 
   '10 "An email message has been sent to originator" message will be shown in a new window 
   '11 Disclosure tracking tool is shown with(LE recieved date is shown) 
   '12 Loan detail page with e-sign will be shown for borrower.
   '13 Document should open.
   '14 In the loan center page it should show e-signed.
   '15 Loan detail page with e-sign will be shown for co-borrower.   
   '16 Document should open 
   '17 In the loan center page it should show e-signed 
   '18 Uploaded with a green tick mark will be shown in lan center page 
   '19 Disclosure details window will open 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC- 1879","Qualification 3 - edisclosures ", Null

Dim strLoanNumber
BIZ_Loan_SaveLoanNumber()

'Send eDisclosure Information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHAPURARM", "E2E_FHAPURARM", "E2E_FHAPURARM", "E2E_FHAPURARM"

BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURARM_Borrower", "E2E_FHAPURARM"

'Co-Borrower Logs into Loan Center
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURARM_CoBorrower", "E2E_FHAPURARM"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
