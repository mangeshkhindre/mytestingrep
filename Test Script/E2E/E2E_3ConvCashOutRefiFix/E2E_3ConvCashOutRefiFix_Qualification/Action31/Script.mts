'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3117 CONVCASHOUTREFIFIX Qualification 5 - eDisclosures
'@ Test Automation JIRA Task: PTAC-3372 E2E_3CONVCASHOUTREFIFIX_Qualification
'@ TestData: eFolder_Tab, SendeDisclosures, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on e-folder.	
   '2 Click on e-disclosure.	
   '3 Select a plan code- Generic 5/1 Libor ARM (WSJ)and click 'order disclosures' button.	
   '4 Click ""order edisclosures"" button in the disclosures audit window..	
   '5 Click 'Add additional docs' button.	
   '6 Select Loan Estimate and click add.
	  'Click 'ok' in the pop up message.	
   '7 Check if all documents are selected and Click send in the select documents window.	
   '8 Check the checkboxes for borrower and co borrower. 
	  'Select for borrower signing option "" esign + wetsign"" option. For borrower authentication method select 
	  'Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	  'Click 'yes' in the pop up.	
   '9 Click 'Next' button and sign in all places and click 'Finish' button.	
   '10 Click ok.	
   '11 Login to Gmail as borrower.
	   'click on to electronic loan document request.	
   '12 Sign-in to loan center with the following credentials
	    'Email- integrationborrower@gmail.com
	    'Password - Respa15	
      'Select your loan from the list in loan status page.
   '13 Click on to e-sign and give authorization code as 1111 for borrower and click next.	
   '14 Click on document and click next. click 'adopt and sign'.
	   'Click on required -sign here in all places and click finish.	
   '15 In the loan center page under print sign and upload documents, Click upload add any 2pdf documents.	
   '16 In Encompass in disclosure tracking.
       'click on the line item under disclosure history and check on ""Intent to proceed"" and click 'ok'.	
'@ ExpectedResult: 
   '1 E-folder should open.
   '2 Send E-disclosure window should open.
   '3 Disclosure Audit window opens.
   '4 'Select documents' page should open.
   '5 A list of additional documents will be shown. 
   '6 Pop up message will open with the following message 'The selected documents has been added to the list 
      'based on current stacking order- message will appear'.
      'Pop up will close.
   '7 Send edisclosure page with email message will be shown.
   '8 Window opens with the following message " The package includes one or more documents that you must esign before you 
      'can retrieve the borrower signed documents".
	  'Esign document will open. 
   '9 The disclosure package has been sent to borrower window will open.
   '10 Disclosure tracking tool page opens. ( LE received date is shown).
   '11 Loan center page should open.
   '12 Loan detail page with e-sign will be shown.
   '13 Document should open.
   '14 In the loan center page it should show e-signed.
   '15 Uploaded with a green tick mark will be shown in loan center page.
   '16 Disclosure details window will open.

'@**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3117", "CONVCASHOUTREFIFIX Qualification 5 - eDisclosures", Null
Dim strLoanNumber
BIZ_Loan_SaveLoanNumber()

'Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_CONVCASHOUTREFIFIX", "E2E_CONVCASHOUTREFIFIX", "E2E_CONVCASHOUTREFIFIX",  "E2E_CONVCASHOUTREFIFIX"

'Login with Borrower and accept & eSign the document
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVCASHOUTREFIFIX_Borrower", "E2E_CONVCASHOUTREFIFIX"

'Login with Co Borrower and accept & eSign the document
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVCASHOUTREFIFIX_CoBorrower", "E2E_CONVCASHOUTREFIFIX"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
