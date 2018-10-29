'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2118 Doc Preparation 5 - Order and receive CD
'@ Test Automation JIRA Task: PTAC-2126 E2E_6FHAPURARM_DocumentPrepartion
'@ TestData: 
    '1 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
	'2 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURARM
	'3 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURARM_CD
	'4 Global_Data, Website, E2E_FHAPURARM_Borrower
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1 Click on e-folder.
	'2 Click on e-disclosure.
	'3 Click 'order disclosures' button.
	'4 Click "order edisclosures" button in the disclosures audit window.
	'5 Click Add additional docs button.
	'6 Select 'Closing Disclosure' and click add.
	'7 Unselect all documents and select only the 'Closing disclosure' and Click send in the select documents window.
	'8 Select for borrower signing option " esign " option.
	   'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'9 Click ok.
	'10 Click ok.
	'11 Login to gmail as borrower.
	    'click on to electronic loan document request.
	'12 Sign-in to loan center as borrower with the following credentials
	'13 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'14 Click on document and click next. click 'adopt and sign'.
	    'Click on required -sign here in all places and click finish.
'@ ExpectedResult:
    '1 E-folder should open.
	'2 Send E-disclosure window should open.
	'3 Disclosure Audit window opens.
	'4 Select documents page should open.
	'5 A list of additional documents will be shown.
	'6 The selected documents has been added to the list based on current stacking order- message will appear.
	'7 Send edisclosure page with email message will be shown.
	'8 Window opens with the following message""Package includes one or more documents that require originators e-signature"".
	'9 An email message has been sent to originator" message will be shown in a new window.
	'10 Disclosure tracking tool is shown with(CD received date is shown).
	'11 Loan center page should open.
	'12 Loan detail page with e-sign will be shown.
	'13 Document should open.
	'14 In the loan center page it should show e-signed.
'**************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC- 2118","Doc Preparation 5- Order and receive CD", Null

'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHAPURARM", "E2E_FHAPURARM_CD", "E2E_FHAPURARM", "E2E_FHAPURARM"

'Login to Loan Center and Accept eSign Document
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURARM_Borrower","E2E_FHAPURARM"

BIZ_Nav_eFoler_Close()
