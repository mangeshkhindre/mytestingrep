'@**************************************************************************************************
 '@ TestStory: PTAC-2398 E2E_8VAPURARM
 '@ TestCase : PTAC-2248 Doc Preparation 5 - Order and receive CD 
 '@ Test Automation JIRA Task: PTAC-2402 E2E_8VAPURARM_DocumentPreparation
 '@ TestData: 
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
	'1 Click on e-folder.
	'2 Click on e-disclosure.
	'3 Click 'order disclosures' button.
	'4 Click ""order edisclosures"" button in the disclosures audit window.
	'5 Click Add additional docs button.
	'6 Select 'Closing Disclosure' and click add.
	'7 Unselect all documents and select only the 'Closing disclosure' and Click send in the select documents window.
	'8 Select for borrower signing option " esign " option.
	'9 For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'10 Click ok.
	'11 Click ok.
	'12 Login to gmail as borrower.
	'13 click on to electronic loan document request.
	'14 Sign-in to loan center as borrower with the following credentials
	'15 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'16 Click on document and click next. click 'adopt and sign'.
	'17 Click on required -sign here in all places and click finish.
 '@ ExpectedResult:
    '1  E-folder should open.
	'2  Send E-disclosure window should open.
	'3  Disclosure Audit window opens.
	'4  Select documents page should open.
	'5  A list of additional documents will be shown.
	'6  The selected documents has been added to the list based on current stacking order- message will appear.
	'7  Send edisclosure page with email message will be shown.
	'8  Window opens with the following message""Package includes one or more documents that require originators e-signature.
	'9  "An email message has been sent to originator" message will be shown in a new window.
	'10 Disclosure tracking tool is shown with(CD received date is shown).
	'11 Loan center page should open.
	'12 Loan detail page with e-sign will be shown.
	'13 Document should open.
	'14 In the loan center page it should show e-signed.
 '***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC- 2248","Doc Preparation 4 - Order and receive CD", Null

Dim strLoanNumber

'Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_VAPURARM", "E2E_VAPURARM_CD", "E2E_VAPURARM", "E2E_VAPURARM"

BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_VAPURARM_Borrower", "E2E_VAPURARM"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
